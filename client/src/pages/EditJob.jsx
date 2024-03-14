import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect } from "../components";
import { Form, redirect, useLoaderData, useNavigation } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { JobStatus, JobType } from "../../../utils/constants";
import errorString from "../utils/errorString";
import { useQuery } from "@tanstack/react-query";

const editJobQuery = (id) => {
  return {
    queryKey: ["job", id],
    queryFn: async () => {
      const { data } = await customFetch.get(`/jobs/id/${id}`);
      return data;
    },
  };
};

export const loader = (queryClient) => {
  return async ({ params }) => {
    try {
      await queryClient.ensureQueryData(editJobQuery(params.id));
    } catch (error) {
      return redirect("/dashboard/all-jobs");
    }
    return params.id;
  };
};

export const action =
  (queryClient) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.patch(`/jobs/id/${params.id}`, data);
      queryClient.invalidateQueries(["job"]);
      toast.success("Job Updated Successfully!");
      return redirect("/dashboard/all-jobs");
    } catch (error) {
      toast.error(errorString(error));
      return error;
    }
  };

const EditJob = () => {
  const id = useLoaderData();
  const { data } = useQuery(editJobQuery(id));
  const { job } = data;
  const submitting = useNavigation().state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Edit Job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" defaultValue={job.position} />
          <FormRow type="text" name="company" defaultValue={job.company} />
          <FormRow
            type="text"
            name="jobLocation"
            defaultValue={job.jobLocation}
          />
          <FormRowSelect
            name="jobStatus"
            labelText="job status"
            defaultValue={job.jobStatus}
            list={Object.values(JobStatus)}
          />
          <FormRowSelect
            name="jobType"
            labelText="job type"
            defaultValue={job.jobType}
            list={Object.values(JobType)}
          />
          <button
            type="submit"
            className="btn btn-block form-btn"
            disabled={submitting}
          >
            {submitting ? "submitting..." : "submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};
export default EditJob;
