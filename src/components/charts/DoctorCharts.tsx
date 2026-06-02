"use client";

import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const workloadData = [
  { day: "Mon", appointments: 12 },
  { day: "Tue", appointments: 15 },
  { day: "Wed", appointments: 18 },
  { day: "Thu", appointments: 14 },
  { day: "Fri", appointments: 16 },
  { day: "Sat", appointments: 6 },
];

export function DoctorWorkloadChart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ height: 240, background: "var(--bg-tertiary)", borderRadius: 8 }} />;
  }

  return (
    <div style={{ width: "100%", height: 240 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={workloadData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
          <XAxis dataKey="day" stroke="var(--text-muted)" fontSize={11} tickLine={false} />
          <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} />
          <Tooltip
            contentStyle={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-subtle)",
              borderRadius: 6,
              color: "var(--text-primary)",
              fontSize: 12,
            }}
          />
          <Line
            type="monotone"
            dataKey="appointments"
            stroke="var(--accent)"
            strokeWidth={3}
            dot={{ r: 4, stroke: "var(--bg-card)", strokeWidth: 2, fill: "var(--accent)" }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
