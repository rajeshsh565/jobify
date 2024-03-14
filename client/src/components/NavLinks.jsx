import { NavLink } from "react-router-dom";
import links from "../utils/links";
import { useDashboardContext } from "../pages/DashboardLayout";

const NavLinks = ({isBigSideBar}) => {
       const {toggleSideBar, user } = useDashboardContext();
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, icon } = link;
        if(path==='admin' && user.role !== 'admin') return;
        return (
          <NavLink
            to={path}
            key={text}
            className="nav-link"
            onClick={isBigSideBar?null:toggleSideBar}
            end
          >
            <div className="icon">{icon}</div>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
}
export default NavLinks