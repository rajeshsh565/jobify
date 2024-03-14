import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { SmallSideBar, BigSideBar, Navbar, Loading } from "../components";
import Wrapper from "../assets/wrappers/Dashboard";
import { createContext, useContext, useState, useEffect } from "react";
import { checkDefaultTheme } from "../App";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import errorString from "../utils/errorString";
import { useQuery } from "@tanstack/react-query";

const userQuery = {
  queryKey: ["user"],
  queryFn: async () => {
    const { data } = await customFetch.get("/users/current-user");
    return data;
  },
};

export const loader = (queryClient) => async () => {
  try {
    await queryClient.ensureQueryData(userQuery);
    return null;
  } catch (error) {
    setTimeout(() => {
      toast.error(errorString(error));
    }, 100);
    return redirect("/");
  }
};
const DashboardContext = createContext();

const DashboardLayout = ({ queryClient }) => {
  const { data } = useQuery(userQuery);
  const { user } = data;
  const navigate = useNavigate();
  const [showSideBar, setShowSideBar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());
  const [isAuthError, setIsAuthError] = useState(false);

  // interceptor to logout(redirect back to home) if a request comes but user is not allowed.
  customFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        setIsAuthError(true);
      }
      return Promise.reject(error);
    }
  );

  const toggleSideBar = () => {
    setShowSideBar(!showSideBar);
  };
  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    localStorage.setItem("darkTheme", newDarkTheme);
  };
  const logoutUser = async () => {
    navigate("/");
    await customFetch.get("/auth/logout");
    queryClient.invalidateQueries();
    toast.success("Logging Out...");
  };

  useEffect(() => {
    if (isAuthError) logoutUser();
  });
  return (
    <DashboardContext.Provider
      value={{
        user,
        showSideBar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSideBar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSideBar />
          <BigSideBar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              {useNavigation().state === "loading" ? (
                <Loading />
              ) : (
                <Outlet context={{ user }} />
              )}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};
export const useDashboardContext = () => {
  return useContext(DashboardContext);
};
export default DashboardLayout;
