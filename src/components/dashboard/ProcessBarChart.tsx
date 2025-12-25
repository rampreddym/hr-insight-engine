import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const data = [
  { name: "Talent Acquisition", score: 72, status: "partial" },
  { name: "Performance Mgmt", score: 45, status: "misaligned" },
  { name: "Learning & Dev", score: 88, status: "aligned" },
  { name: "Compensation", score: 65, status: "partial" },
  { name: "Succession", score: 58, status: "partial" },
  { name: "Workforce Plan", score: 42, status: "misaligned" },
];

const getBarColor = (status: string) => {
  switch (status) {
    case "aligned":
      return "hsl(160, 84%, 39%)";
    case "partial":
      return "hsl(38, 92%, 50%)";
    default:
      return "hsl(0, 72%, 51%)";
  }
};

export function ProcessBarChart() {
  return (
    <div className="glass-card p-6">
      <div className="mb-6">
        <h3 className="font-serif text-lg font-semibold">Process Alignment by Area</h3>
        <p className="text-sm text-muted-foreground">Current scores across HR functions</p>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 25% 18%)" horizontal={false} />
            <XAxis 
              type="number" 
              domain={[0, 100]}
              stroke="hsl(215 20% 55%)" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              type="category" 
              dataKey="name" 
              stroke="hsl(215 20% 55%)" 
              fontSize={11}
              tickLine={false}
              axisLine={false}
              width={110}
            />
            <Tooltip
              contentStyle={{ 
                backgroundColor: 'hsl(222 47% 9%)', 
                border: '1px solid hsl(222 25% 18%)',
                borderRadius: '8px',
                boxShadow: '0 8px 24px -4px hsl(222 47% 3% / 0.6)'
              }}
              labelStyle={{ color: 'hsl(210 40% 96%)', fontWeight: 600 }}
              formatter={(value: number) => [`${value}%`, 'Score']}
            />
            <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={20}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.status)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
