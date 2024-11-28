import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, AlertCircle } from 'lucide-react';

const mockRecentData = [
  { year: '2019', consumption: 4250000, cost: 29750000 },
  { year: '2020', consumption: 3980000, cost: 27860000 },
  { year: '2021', consumption: 4120000, cost: 28840000 },
  { year: '2022', consumption: 4380000, cost: 30660000 },
  { year: '2023', consumption: 4520000, cost: 31640000 }
];

export default function ElectricityStats() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Electricity Consumption Statistics</h2>
        <a
          href="/data/electricity-stats-2023.pdf"
          className="flex items-center gap-2 text-auroville-primary hover:text-opacity-80"
        >
          <Download className="h-5 w-5" />
          <span>Download Full Report</span>
        </a>
      </div>

      <div className="mb-6">
        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg mb-6">
          <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-gray-900">Note on Data</h3>
            <p className="text-sm text-gray-600">
              The statistics shown here are from 2019-2023. Historical data (2001-2005) can be accessed through the archives.
              All consumption values are in kWh and costs in INR.
            </p>
          </div>
        </div>

        <div className="h-80 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockRecentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="consumption"
                name="Consumption (kWh)"
                stroke="#E27B58"
                activeDot={{ r: 8 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="cost"
                name="Cost (INR)"
                stroke="#82ca9d"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">Latest Statistics (2023)</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Total Consumption: 4,520,000 kWh</li>
              <li>Total Cost: ₹31,640,000</li>
              <li>Average Monthly Consumption: 376,667 kWh</li>
              <li>Average Monthly Cost: ₹2,636,667</li>
            </ul>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">5-Year Trends</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Consumption Growth: +6.35%</li>
              <li>Cost Increase: +6.35%</li>
              <li>Peak Year: 2023 (4.52M kWh)</li>
              <li>Lowest Year: 2020 (3.98M kWh)</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="font-medium text-gray-900 mb-2">Historical Data Access</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/archives/electricity/2001-2005-annual.pdf"
            className="text-sm text-auroville-primary hover:underline"
          >
            Annual Data (2001-2005)
          </a>
          <a
            href="/archives/electricity/2001-2005-monthly-units.pdf"
            className="text-sm text-auroville-primary hover:underline"
          >
            Monthly Units (2001-2005)
          </a>
          <a
            href="/archives/electricity/2001-2005-monthly-cost.pdf"
            className="text-sm text-auroville-primary hover:underline"
          >
            Monthly Costs (2001-2005)
          </a>
        </div>
      </div>
    </div>
  );
}