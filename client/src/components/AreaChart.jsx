import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
} from "recharts";

const AreaChartContainer = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tick={{
            fill: "#c2bfbf",
          }}
        />
        <YAxis
          allowDecimals={false}
          tick={{
            fill: "#c2bfbf",
          }}
        />
        <Tooltip
          contentStyle={{
            background: "#000",
            color: "#2cb1bc",
          }}
        />
        <Area type="monotone" dataKey="count" stroke="#2cb1bc" fill="#bef8fd" />
      </AreaChart>
    </ResponsiveContainer>
  );
};
export default AreaChartContainer;
