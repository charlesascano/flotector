import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// Map waste types to specific colors to match your design
const TYPE_COLORS = {
  plastic: '#053774',
  paper: '#15A33D',
  metal: '#9E9E9E',
  glass: '#4FC3F7',
  pile: '#FF7043',
  textile: '#FFC107',
  // Fallback colors
  default: '#CCCCCC'
};

const RADIAN = Math.PI / 180;

// Custom label render function
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, payload }) => {
  if (percent < 0.05) return null; // Hide label if slice is too small (< 5%)
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontWeight="700"
      fontSize={12}
      pointerEvents="none"
    >
      {payload.percentage}
    </text>
  );
};

export default function WasteTypeChart({ data }) {
  // 1. Handle empty data
  if (!data || data.length === 0) {
    return (
      <div className="chart-card-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px' }}>
        <p style={{ color: '#949494' }}>No waste data available</p>
      </div>
    );
  }

  // 2. Calculate Total & Percentages
  const total = data.reduce((sum, d) => sum + d.value, 0);

  // 3. Process Data (Sort, Color, Percentage)
  const processedData = [...data]
    .sort((a, b) => b.value - a.value)
    .map((item) => {
      const key = item.name.toLowerCase();
      return {
        ...item,
        // Use mapped color or fallback
        color: TYPE_COLORS[key] || TYPE_COLORS.default,
        // Calculate percentage string
        percentage: total > 0 ? `${((item.value / total) * 100).toFixed(1)}%` : '0%'
      };
    });

  return (
    <div className="chart-card-container">
      <h2 className="chart-title">Waste By Type</h2>

      <div className="donut-chart-layout-container">
        {/* Donut Chart */}
        <div className="donut-chart-wrapper" style={{ height: '300px' }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={processedData}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={105}
                paddingAngle={2}
                labelLine={false}
                label={renderCustomizedLabel}
              >
                {processedData.map((entry, i) => (
                  <Cell key={`cell-${i}`} fill={entry.color} stroke={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center label */}
          <div className="donut-chart-center-label">
            <div className="donut-center-text-top">
              Total<br />Detections
            </div>
            <div className="donut-center-text-bottom">{total}</div>
          </div>
        </div>

        {/* Legend */}
        <div className="donut-chart-legend">
          <div className="legend-row header">
            <span className="legend-cell type-header">Type</span>
            <span className="legend-cell">Count</span>
            <span className="legend-cell">Percent</span>
          </div>

          {processedData.map((entry, i) => (
            <div className="legend-row" key={i}>
              <span className="legend-cell legend-type">
                <span className="legend-color-dot" style={{ backgroundColor: entry.color }} />
                {/* Capitalize name */}
                {entry.name.charAt(0).toUpperCase() + entry.name.slice(1)}
              </span>
              <span className="legend-cell">{entry.value}</span>
              <span className="legend-cell">{entry.percentage}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}