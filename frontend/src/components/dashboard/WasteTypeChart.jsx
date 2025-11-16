import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// Default donut data
const donutChartData = [
  { name: 'Plastic', value: 12, color: '#053774', percentage: '28.6%' },
  { name: 'Pile', value: 22, color: '#FF7043', percentage: '42.9%' },
  { name: 'Metal', value: 12, color: '#9E9E9E', percentage: '28.6%' },
  { name: 'Glass', value: 12, color: '#4FC3F7', percentage: '28.6%' },
  { name: 'Textile', value: 7, color: '#FFC107', percentage: '14.3%' },
  { name: 'Paper', value: 7, color: '#15A33D', percentage: '14.3%' },
];

// Label for donut slices
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, payload }) => {
  if (percent < 0.05) return null;

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

// Main Component
export default function WasteTypeChart({ data = donutChartData }) {
  const sortedData = [...data].sort((a, b) => b.value - a.value);
  const total = sortedData.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="chart-card-container">
      <h2 className="chart-title">Waste By Type</h2>

      <div className="donut-chart-layout-container">
        {/* Donut Chart */}
        <div className="donut-chart-wrapper" style={{ height: '300px' }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={sortedData}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={105}
                paddingAngle={2}
                labelLine={false}
                label={renderCustomizedLabel}
              >
                {sortedData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} stroke={entry.color} />
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

          {sortedData.map((entry, i) => (
            <div className="legend-row" key={i}>
              <span className="legend-cell legend-type">
                <span className="legend-color-dot" style={{ backgroundColor: entry.color }} />
                {entry.name}
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
