import { FaBug, FaCalendarCheck, FaSuitcaseRolling } from "react-icons/fa6";
import Wrapper from "../assets/wrappers/StatsContainer";
import StatItem from "./StatItem";

const StatsContainer = ({ data }) => {
  const stats = [
    {
      title:"pending",
      count:data.pending || 0,
      icon:<FaSuitcaseRolling/>,
      color:"#f59e0b",
      bcg:"#fef3c7",
      id: 1
    },
    {
      title:"interview",
      count:data.interview || 0,
      icon:<FaCalendarCheck/>,
      color:"#647acb",
      bcg:"#e0e8f9",
      id: 2
    },
    {
      title:"rejected",
      count:data.rejected || 0,
      icon:<FaBug/>,
      color:"#d66a6a",
      bcg:"#ffeeee",
      id: 3
    },
  ]

  return (
    <Wrapper>
      {stats.map((stat)=>{
        return <StatItem key={stat.id} {...stat}/>
      })}
    </Wrapper>
  );
};
export default StatsContainer;
