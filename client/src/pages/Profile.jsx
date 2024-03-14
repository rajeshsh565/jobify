import { useOutletContext, Form, useNavigation } from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import errorString from "../utils/errorString";
import { useRef } from "react";
import { FaUserCircle } from "react-icons/fa";

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    try {
      const image = formData.get("avatar");
      if (image.size > 5000000) {
        toast.error("File Size bigger than allowed!");
        return null;
      }
      await customFetch.patch("/users/update-user", formData);
      queryClient.invalidateQueries(["user"]);
      toast.success("User Info Updated Successfully!");
      return null;
    } catch (error) {
      toast.error(errorString(error));
      return null;
    }
  };

const Profile = () => {
  const { user } = useOutletContext();
  const submitting = useNavigation().state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title">Profile</h4>
        {user.avatar ? (
          <img src={user.avatar} className="img profile" />
        ) : (
          <FaUserCircle className="img profile" />
        )}
        <div className="form-row img-selector-row">
          <label htmlFor="avatar" className="form-row img-selector-row">
            Select an Image (Max. 5MB)
          </label>
          <div className="form-input img-selector-div">
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="images/*"
              className="img img-selector"
            ></input>
          </div>
        </div>
        <div className="form-center">
          <FormRow type="text" name="name" defaultValue={user.name} />
          <FormRow
            type="text"
            name="lastName"
            labelText="last name"
            defaultValue={user.lastName}
          />
          <FormRow type="email" name="email" defaultValue={user.email} />
          <FormRow type="text" name="location" defaultValue={user.location} />
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
export default Profile;
