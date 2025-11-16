import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Default data
const lineChartData = [
  { name: 'Mon', submissions: 30 },
  { name: 'Tue', submissions: 45 },
  { name: 'Wed', submissions: 40 },
  { name: 'Thu', submissions: 55 },
  { name: 'Fri', submissions: 60 },
  { name: 'Sat', submissions: 70 },
  { name: 'Sun', submissions: 65 },
];

// Tooltip
const CustomLineTooltip = ({ active, payload, label }) =>
  active && payload?.length ? (
    <div className="recharts-custom-tooltip">
      <p className="tooltip-label">{label}</p>
      <p className="tooltip-value">Submissions: {payload[0].value}</p>
    </div>
  ) : null;

// Main Component
function SubmissionsGraph({ data = lineChartData }) {
  const maxValue = Math.max(...data.map((d) => d.submissions));
  const yMax = Math.ceil((maxValue * 1.1) / 10) * 10;

  return (
    <div className="chart-card-container">
      <h2 className="chart-title">Submissions over time</h2>

      <div style={{ width: '100%', height: '300px' }}>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
          >
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#949494', fontSize: 11, fontWeight: 500 }}
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
              dataKey="submissions"
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
      </div>
    </div>
  );
}

export default SubmissionsGraph;
