import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { redirect } from "react-router-dom";
import errorString from "../utils/errorString";

export const action = async({params}) => {
  const {id} = params;
  try {
    await customFetch.delete(`/jobs/${id}`);
    toast.success("Job Deleted Successfully!");
    return redirect("/dashboard/all-jobs");
  } catch (error) {
    toast.error(errorString(error));
    return redirect("/dashboard/all-jobs");
  }
}