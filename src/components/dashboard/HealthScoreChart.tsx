import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface HealthScoreChartProps {
  score: number;
  aligned: number;
  partial: number;
  misaligned: number;
}

export function HealthScoreChart({ score, aligned, partial, misaligned }: HealthScoreChartProps) {
  const data = [
    { name: "Aligned", value: aligned, color: "hsl(160, 84%, 39%)" },
    { name: "Partial", value: partial, color: "hsl(38, 92%, 50%)" },
    { name: "Needs Work", value: misaligned, color: "hsl(0, 72%, 51%)" },
  ];

  const getScoreColor = (s: number) => {
    if (s >= 75) return "hsl(160, 84%, 39%)";
    if (s >= 50) return "hsl(38, 92%, 50%)";
    return "hsl(0, 72%, 51%)";
  };

  const getScoreLabel = (s: number) => {
    if (s >= 75) return "Healthy";
    if (s >= 50) return "Moderate";
    return "At Risk";
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-serif text-lg font-semibold">Adoption Health Score</h3>
          <p className="text-sm text-muted-foreground">Overall framework alignment</p>
        </div>
        <div 
          className="px-3 py-1 rounded-full text-sm font-medium"
          style={{ 
            backgroundColor: `${getScoreColor(score)}20`,
            color: getScoreColor(score)
          }}
        >
          {getScoreLabel(score)}
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="relative w-40 h-40">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(222 47% 9%)', 
                  border: '1px solid hsl(222 25% 18%)',
                  borderRadius: '8px',
                  boxShadow: '0 8px 24px -4px hsl(222 47% 3% / 0.6)'
                }}
                labelStyle={{ color: 'hsl(210 40% 96%)' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span 
              className="text-4xl font-bold font-serif"
              style={{ color: getScoreColor(score) }}
            >
              {score}
            </span>
            <span className="text-xs text-muted-foreground">Score</span>
          </div>
        </div>

        <div className="flex-1 space-y-3">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm">{item.name}</span>
              </div>
              <span className="text-sm font-semibold">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
