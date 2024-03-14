import Wrapper from "../assets/wrappers/JobsContainer";
import Job from "./Job";
import { useAllJobsContext } from "../pages/AllJobs";
const JobsContainer = () => {
  const { data } = useAllJobsContext();
  const { jobs, totalJobsFound } = data;
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h4>No Jobs to Display</h4>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>{totalJobsFound} jobs found</h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job}></Job>;
        })}
      </div>
    </Wrapper>
  );
};
export default JobsContainer;
