import Wrapper from "../assets/wrappers/DashboardFormPage";
import {
  Form,
  redirect,
  useNavigation,
  useOutletContext,
} from "react-router-dom";
import { FormRow, FormRowSelect } from "../components";
import { JobStatus, JobType } from "../../../utils/constants";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useDashboardContext } from "./DashboardLayout";
import errorString from "../utils/errorString";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/jobs", data);
    toast.success("Job Added Successfully!");
    return redirect("/dashboard/all-jobs");
  } catch (error) {
    toast.error(errorString(error));
    return error;
  }
};

const AddJob = () => {
  // const { user } = useOutletContext();
  const {user} = useDashboardContext();
  const submitting = useNavigation().state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Add Job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" />
          <FormRow type="text" name="company" />
          <FormRow
            type="text"
            name="jobLocation"
            labelText="Job Location"
            defaultValue={user.location}
          />
          <FormRowSelect
            name="jobStatus"
            labelText="Job Status"
            defaultValue={JobStatus.PENDING}
            list={Object.values(JobStatus)}
          />
          <FormRowSelect
            name="jobType"
            labelText="Job Type"
            defaultValue={JobType.FULL_TIME}
            list={Object.values(JobType)}
          />
          <button
            type="submit"
            className="btn btn-block form-btn"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};
export default AddJob;
