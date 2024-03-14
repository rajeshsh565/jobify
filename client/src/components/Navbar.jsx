import Wrapper from "../assets/wrappers/Navbar";
import { useDashboardContext } from "../pages/DashboardLayout";
import Logo from "./Logo";
import { FaAlignLeft } from "react-icons/fa6";
import LogoutContainer from "../components/LogoutContainer"
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const {toggleSideBar} = useDashboardContext();
  return (
    <Wrapper>
      <div className="nav-center">
        <button className="toggle-btn" type="button" onClick={toggleSideBar}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo/>
          <h3 className="logo-text">Dashboard</h3>
        </div>
        <div className="btn-container">
          <ThemeToggle/>
          <LogoutContainer/>
        </div>
      </div>
    </Wrapper>
  );
};
export default Navbar;
