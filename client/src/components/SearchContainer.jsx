import { Form, Link, useSubmit } from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect } from "../components";
import { useAllJobsContext } from "../pages/AllJobs";
import { JobStatus, JobType, SortOptions } from "../../../utils/constants";

const SearchContainer = () => {
  const { queryParams } = useAllJobsContext();
  const { search, jobStatus, jobType, sort } = queryParams;
  const isRequired = false;
  const submit = useSubmit();
  const debounce = (onChange) => {
    let myTimeout;
    return (e)=>{
      const form = e.currentTarget.form;
      clearTimeout(myTimeout);
      myTimeout = setTimeout(()=>{
        onChange(form);
      },2500)
    }
  }
  return (
    <Wrapper>
      <Form className="form">
        <div className="form-center">
          <FormRow
            name="search"
            defaultValue={search}
            isRequired={false}
            onChange={debounce((form)=>submit(form))}
          />
          <FormRowSelect
            name="jobStatus"
            defaultValue={jobStatus}
            labelText="Job Status"
            list={["all", ...Object.values(JobStatus)]}
            onChange={(e) => submit(e.currentTarget.form)}
          />
          <FormRowSelect
            name="jobType"
            defaultValue={jobType}
            labelText="Job Type"
            list={["all", ...Object.values(JobType)]}
            onChange={(e) => submit(e.currentTarget.form)}
          />
          <FormRowSelect
            name="sort"
            defaultValue={sort}
            list={Object.values(SortOptions)}
            onChange={(e) => submit(e.currentTarget.form)}
          />
          <Link to="/dashboard/all-jobs" className="btn btn-block form-btn">
            Reset Search Values
          </Link>
          {/* <button className="btn btn-block form-btn">Submit</button> */}
        </div>
      </Form>
    </Wrapper>
  );
};
export default SearchContainer;
