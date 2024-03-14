import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Bar,
  Rectangle,
} from "recharts";
const BarChartContainer = ({ data }) => {
  return (
    <ResponsiveContainer height={300} width="100%">
      <BarChart data={data} margin={{ top: 50}}>
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
            color: "#bef8fd",
          }}
        />
        <Bar
          dataKey="count"
          stroke="#2cb1bc"
          fill="#bef8fd"
          barSize={75}
          activeBar={<Rectangle fill="#2cb1bc" stroke="#000000" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default BarChartContainer;
