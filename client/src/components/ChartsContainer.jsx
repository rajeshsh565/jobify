import { useState } from "react"
import Wrapper from "../assets/wrappers/ChartsContainer"
import BarChartContainer from "./BarChart";
import AreaChartContainer from "./AreaChart";

const ChartsContainer = ({data}) => {
  const [isBarchart, setIsBarchart]=useState(true);
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button onClick={()=>setIsBarchart(!isBarchart)}>{isBarchart? 'Bar Chart' : 'Area Chart' }</button>
      {isBarchart? <BarChartContainer data={data}/> : <AreaChartContainer data={data}/>}
    </Wrapper>
  )
}
export default ChartsContainer