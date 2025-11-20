import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Helper to format date string "2025-11-20" -> "Nov 20"
const formatDateTick = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

// Custom Tooltip to show full date
const CustomLineTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="recharts-custom-tooltip" style={{ background: 'white', padding: '10px', border: '1px solid #ccc' }}>
        <p className="tooltip-label" style={{ fontWeight: 'bold', marginBottom: '5px' }}>
           {/* Label is the raw date string, format it nicely */}
           {new Date(label).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        <p className="tooltip-value" style={{ color: '#15A33D' }}>
          Submissions: {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

function SubmissionsGraph({ data }) {
  // 1. Handle empty data case
  if (!data || data.length === 0) {
    return (
      <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#949494' }}>
        No submission data for this period
      </div>
    );
  }

  // 2. Calculate Y-Axis Max dynamically
  const maxValue = Math.max(...data.map((d) => d.submissions));
  const yMax = maxValue === 0 ? 10 : Math.ceil((maxValue * 1.1) / 10) * 10;

  return (
    <>
      <h2 className="chart-title" style={{ fontSize: "calc(8px + 1vw)" }}>Submissions over time</h2>
      <ResponsiveContainer width="100%" height="100%" minHeight={250}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <XAxis
            dataKey="date" // Corresponds to the SQL 'date' field
            tickFormatter={formatDateTick} // Formats "2025-11-20" to "Nov 20"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#949494', fontSize: 11, fontWeight: 500 }}
            interval="preserveStartEnd"
            minTickGap={30}
          />
          <YAxis
            domain={[0, yMax]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9C9E9E', fontSize: 11, fontWeight: 600 }}
          />
          <Tooltip content={<CustomLineTooltip />} />
          <Line
            type="monotone"
            dataKey="submissions" // Corresponds to the SQL 'submissions' field
            stroke="#15A33D"
            strokeWidth={4}
            dot={false}
            activeDot={{
              r: 6,
              stroke: '#15A33D',
              fill: 'white',
              strokeWidth: 2,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

export default SubmissionsGraph;