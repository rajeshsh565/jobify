import { StatusCodes } from "http-status-codes";
import Job from "../Models/JobModel.js";
import "http-status-codes";
import mongoose from "mongoose";
import dayjs from "dayjs";

// Get all Jobs
export const getAllJobs = async (req, res) => {
  const isAdmin = req.user.role === "admin";
  const { search, company, jobStatus, jobType, sort, page, limit } = req.query;
  //Query Params for Search
  const queryObject = {
    createdBy: req.user.id
  };
  if(isAdmin){
    delete queryObject.createdBy;
  }
  if (search) {
    queryObject.$or = [
      { position: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
    ];
  }
  if (jobStatus && jobStatus !== "all") {
    queryObject.jobStatus = jobStatus;
  }
  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }

  //Sorting
  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "position",
    "z-a": "-position",
  };
  const sortKey = sortOptions[sort];

  //Pagination
  const totalJobsFound = await Job.countDocuments(queryObject);

  const pageNo = page || 1;
  const limitter = limit || 10;
  const skipper = (pageNo - 1) * limitter;
  const totalPages = Number(Math.ceil(totalJobsFound / limitter));

  const jobs = await Job.find(queryObject)
    .sort(sortKey || sortOptions.newest)
    .skip(skipper)
    .limit(limitter);
  res
    .status(StatusCodes.OK)
    .json({ totalJobsFound, currentPage: pageNo, totalPages, jobs });
};

// Create new Job
export const createJob = async (req, res) => {
  req.body.createdBy = req.user.id;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "job created!", job });
};

// Get/Read Single Job
export const getJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  res.status(StatusCodes.OK).json({ msg: "job found", job });
};

//Update Single Job
export const updateJob = async (req, res) => {
  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(StatusCodes.OK).json({
    msg: `job successfully updated with id: ${req.param.id}`,
    updatedJob,
  });
};

//Delete Single Job
export const deleteJob = async (req, res) => {
  const deletedJob = await Job.findByIdAndDelete(req.params.id);
  res
    .status(StatusCodes.OK)
    .json({ msg: `job successfully deleted.`, deletedJob });
};

//Job Stats
export const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    {
      $match: {
        createdBy: { $eq: new mongoose.Types.ObjectId(String(req.user.id)) },
      },
    },
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((acc, stat) => {
    const { _id: title, count } = stat;
    acc[title] = count;
    return acc;
  }, {});
  const jobStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    rejected: stats.rejected || 0,
  };
  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(String(req.user.id)) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $count: {} },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);
  monthlyApplications = monthlyApplications.map((data) => {
    const {
      _id: { year, month },
      count,
    } = data;
    const date = dayjs()
      .month(month - 1)
      .year(year)
      .format("MMM YY");
    return { date, count };
  });
  res.status(StatusCodes.OK).json({ jobStats, monthlyApplications });
};
