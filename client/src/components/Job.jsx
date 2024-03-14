import { FaBriefcase, FaLocationArrow } from "react-icons/fa6";
import Wrapper from "../assets/wrappers/Job";
import JobInfo from "./JobInfo";
import day from "dayjs";
import { Form, Link } from "react-router-dom";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { FaCalendarAlt } from "react-icons/fa";
day.extend(advancedFormat);

const Job = ({
  _id,
  company,
  position,
  createdAt,
  jobStatus,
  jobType,
  jobLocation,
}) => {
  const date = day(createdAt).format("Do MMM YYYY");
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${jobStatus}`}>{jobStatus}</div>
        </div>
        <footer className="actions">
          <Link
            to={`../edit-job/${_id}`}
            className="btn block-btn edit-btn"
          >
            Edit
          </Link>
          <Form method="post" action={`/dashboard/delete-job/${_id}`}>
            <button type="submit" className="btn block-btn delete-btn">
              Delete
            </button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
};
export default Job;
