type SparklineProps = {
  data: number[];
  color: string;
  glow: string;
};

export default function Sparkline({ data, color, glow }: SparklineProps) {
  const W = 170;
  const H = 50;
  const PAD_X = 6;
  const PAD_Y = 5;

  const min = Math.min(...data), max = Math.max(...data);
  const usableW = W - PAD_X * 2;
  const usableH = H - PAD_Y * 2;

  const pts = data.map((v, i) => {
    const x = PAD_X + (i / (data.length - 1)) * usableW;
    const y = H - PAD_Y - ((v - min) / (max - min || 1)) * usableH;
    return `${x},${y}`;
  });

  const line = `M${pts.join(' L')}`;
  const area = `M${PAD_X},${H - PAD_Y} L${pts.join(' L')} L${W - PAD_X},${H - PAD_Y} Z`;
  const gId = `g${color.replace('#', '')}`;
  const lastValue = data[data.length - 1];
  const lastX = W - PAD_X;
  const lastY = H - PAD_Y - ((lastValue - min) / (max - min || 1)) * usableH;

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <linearGradient id={gId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity=".32" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gId})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="1.8"
        style={{ filter: `drop-shadow(0 0 5px ${glow})` }} />
      <circle cx={lastX} cy={lastY} r="3.5" fill={color}
        style={{ filter: `drop-shadow(0 0 6px ${glow})` }} />
    </svg>
  );
}
