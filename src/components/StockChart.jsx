import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function StockChart({ data }) {
  if (!data || data.length === 0) return null;

  const chartData = data.map((point) => ({
    time: new Date(point.time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    close: point.close,
  }));

  return (
    <div style={{ height: 300, marginTop: "1.5rem" }}>
      <h3 style={{ marginBottom: "0.5rem" }}>Intraday Price (5 min)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <XAxis dataKey="time" />
          <YAxis
            domain={["auto", "auto"]}
            tickFormatter={(v) => v.toFixed(0)}
          />
          <Tooltip formatter={(value) => value.toFixed(2)} />
          <Line type="monotone" dataKey="close" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
