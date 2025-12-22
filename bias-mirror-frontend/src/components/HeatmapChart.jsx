import React from "react";
import { BarChart, Bar, XAxis, Tooltip, Cell } from "recharts";

export default function HeatmapChart({ highlights = [], text = "" }) {
  // 1. Fallback: If no highlights, show empty state
  if (!highlights || highlights.length === 0) {
    return (
      <div className="text-gray-500 text-sm italic p-4 border border-dashed border-gray-700 rounded-lg">
        No bias detected
      </div>
    );
  }

  // 2. Data Mapping 
  const data = highlights.map((h, i) => {
    // If 'confidence' is missing, we default to 1.0 (100%) so the bar SHOWS UP.
    const score = h.confidence !== undefined ? h.confidence : 1.0;
    
    return {
      name: h.label,
      score: score,
      label: h.label,
      fill: "#7c4dff" 
    };
  });

  return (
    //  strictly define width/height in pixels to stop the "width(-1)" crash.
    <div className="mt-4 p-4 bg-gray-900/50 rounded-xl border border-gray-800">
      
      <BarChart width={350} height={180} data={data} barSize={40}>
        <XAxis 
          dataKey="name" 
          stroke="#9ca3af" 
          tick={{ fill: '#d1d5db', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip 
          cursor={{ fill: 'rgba(255,255,255,0.05)' }}
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const d = payload[0].payload;
              return (
                <div className="bg-gray-800 border border-gray-700 p-2 rounded text-xs text-white">
                  <span className="font-bold capitalize text-purple-400">{d.label}</span>
                  <span className="ml-2 text-gray-300">{Math.round(d.score * 100)}%</span>
                </div>
              );
            }
            return null;
          }}
        />
        <Bar dataKey="score" radius={[4, 4, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
}