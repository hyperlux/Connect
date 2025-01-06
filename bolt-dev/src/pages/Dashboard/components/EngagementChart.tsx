import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', residents: 3100, volunteers: 180, visitors: 450 },
  { month: 'Feb', residents: 3150, volunteers: 195, visitors: 520 },
  { month: 'Mar', residents: 3200, volunteers: 210, visitors: 580 },
  { month: 'Apr', residents: 3220, volunteers: 225, visitors: 620 },
  { month: 'May', residents: 3246, volunteers: 240, visitors: 680 }
];

export default function EngagementChart() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Community Growth</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area 
              type="monotone" 
              dataKey="residents" 
              stackId="1" 
              stroke="#E27B58" 
              fill="#FDF1EC" 
            />
            <Area 
              type="monotone" 
              dataKey="volunteers" 
              stackId="1" 
              stroke="#82ca9d" 
              fill="#82ca9d" 
            />
            <Area 
              type="monotone" 
              dataKey="visitors" 
              stackId="1" 
              stroke="#8884d8" 
              fill="#8884d8" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-auroville-primary"></div>
          <span className="text-sm text-gray-600">Residents</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#82ca9d]"></div>
          <span className="text-sm text-gray-600">Volunteers</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#8884d8]"></div>
          <span className="text-sm text-gray-600">Visitors</span>
        </div>
      </div>
    </div>
  );
}