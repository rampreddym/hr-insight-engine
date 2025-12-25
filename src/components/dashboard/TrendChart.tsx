import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", bersin: 45, gartner: 52, ulrich: 48 },
  { month: "Feb", bersin: 48, gartner: 55, ulrich: 50 },
  { month: "Mar", bersin: 52, gartner: 58, ulrich: 54 },
  { month: "Apr", bersin: 55, gartner: 60, ulrich: 57 },
  { month: "May", bersin: 60, gartner: 65, ulrich: 62 },
  { month: "Jun", bersin: 68, gartner: 70, ulrich: 67 },
];

export function TrendChart() {
  return (
    <div className="glass-card p-6">
      <div className="mb-6">
        <h3 className="font-serif text-lg font-semibold">Framework Alignment Trend</h3>
        <p className="text-sm text-muted-foreground">Score progression over time</p>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="bersinGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(186, 72%, 45%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(186, 72%, 45%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gartnerGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="ulrichGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(280, 65%, 55%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(280, 65%, 55%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 25% 18%)" />
            <XAxis 
              dataKey="month" 
              stroke="hsl(215 20% 55%)" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="hsl(215 20% 55%)" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
              domain={[0, 100]}
            />
            <Tooltip
              contentStyle={{ 
                backgroundColor: 'hsl(222 47% 9%)', 
                border: '1px solid hsl(222 25% 18%)',
                borderRadius: '8px',
                boxShadow: '0 8px 24px -4px hsl(222 47% 3% / 0.6)'
              }}
              labelStyle={{ color: 'hsl(210 40% 96%)', fontWeight: 600 }}
            />
            <Area
              type="monotone"
              dataKey="bersin"
              stroke="hsl(186, 72%, 45%)"
              strokeWidth={2}
              fill="url(#bersinGradient)"
              name="Josh Bersin"
            />
            <Area
              type="monotone"
              dataKey="gartner"
              stroke="hsl(160, 84%, 39%)"
              strokeWidth={2}
              fill="url(#gartnerGradient)"
              name="Gartner"
            />
            <Area
              type="monotone"
              dataKey="ulrich"
              stroke="hsl(280, 65%, 55%)"
              strokeWidth={2}
              fill="url(#ulrichGradient)"
              name="Dave Ulrich"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[hsl(186,72%,45%)]" />
          <span className="text-xs text-muted-foreground">Josh Bersin</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[hsl(160,84%,39%)]" />
          <span className="text-xs text-muted-foreground">Gartner</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[hsl(280,65%,55%)]" />
          <span className="text-xs text-muted-foreground">Dave Ulrich</span>
        </div>
      </div>
    </div>
  );
}
