import { JobsContainer, SearchContainer } from "../components";
import customFetch from "../utils/customFetch";
import { createContext, useContext } from "react";
import { useLoaderData } from "react-router-dom";
import PageBtnContainer from "../components/PageBtnContainer";
import { useQuery } from "@tanstack/react-query";

const allJobsQuery = (params) => {
  const { search, jobStatus, jobType, sort, page } = params;
  return {
    queryKey: [
      "jobs",
      search ?? "",
      jobStatus ?? "all",
      jobType ?? "all",
      sort ?? "newest",
      page ?? "1",
    ],
    queryFn: async () => {
      const { data } = await customFetch.get("/jobs", { params });
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const queryParams = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    await queryClient.ensureQueryData(allJobsQuery(queryParams));
    return queryParams;
  };

const AllJobsContext = createContext();

const AllJobs = () => {
  const queryParams = useLoaderData();
  const {data} = useQuery(allJobsQuery(queryParams));
  return (
    <AllJobsContext.Provider value={{ data, queryParams }}>
      <SearchContainer />
      <JobsContainer />
      <PageBtnContainer />
    </AllJobsContext.Provider>
  );
};

export const useAllJobsContext = () => {
  return useContext(AllJobsContext);
};

export default AllJobs;
