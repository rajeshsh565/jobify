import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { StatItem } from "../components";
import { redirect, useLoaderData } from "react-router-dom";
import { FaCalendarCheck, FaSuitcaseRolling } from "react-icons/fa6";
import Wrapper from "../assets/wrappers/StatsContainer";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/users/admin/get-stats");
    return data;
  } catch (error) {
    const errStr = error?.response?.data?.msg;
    toast.error(
      errStr
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    );
    return redirect("/dashboard");
  }
};

const Admin = () => {
  const { users, jobs } = useLoaderData();
  return (
    <Wrapper>
      <StatItem
        title="current users"
        count={users}
        icon={<FaSuitcaseRolling />}
        color="#e9b949"
        bcg="#fcefc7"
      />
      <StatItem
        title="total jobs"
        count={jobs}
        icon={<FaCalendarCheck />}
        color="#647acb"
        bcg="#e0e8f9"
      />
    </Wrapper>
  );
};
export default Admin;
