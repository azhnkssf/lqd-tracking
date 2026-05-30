import { memo, type ReactNode } from 'react';
import { Avatar, Card, Chip } from '@heroui/react';
import Sparkline from './Sparkline';
import { IcoCheck, IcoClock, IcoUp } from './icons';

const CHART = [42, 58, 51, 73, 65, 88, 76, 92, 84, 97, 89, 108];

const ACTIVITY = [
  { init: 'SK', name: 'Somchai K.', action: 'Payment received', amount: '฿32,000', status: 'paid',   color: '#3b82f6' },
  { init: 'NW', name: 'Narin W.',   action: 'Case filed',       amount: '฿9,500',  status: 'filed',  color: '#8b5cf6' },
  { init: 'MT', name: 'Malee T.',   action: 'Judgment issued',  amount: '฿4,200',  status: 'judged', color: '#14b8a6' },
];

const STATUS_META: Record<string, { color: string; icon: ReactNode; label: string }> = {
  paid:   { color: '#16a34a', icon: <IcoCheck />, label: 'Paid' },
  filed:  { color: '#2563eb', icon: <IcoUp />,   label: 'Filed' },
  judged: { color: '#7c3aed', icon: <IcoClock />, label: 'Judged' },
};

const RightPanel = memo(function RightPanel() {
  return (
    <aside className="rp" aria-hidden="true">
      <div className="rp-inner">
        <div className="rp-top">
          <Chip
            color="accent"
            size="lg"
            variant="soft"
            className="mb-3 inline-flex min-w-max items-center gap-2 rounded-full !px-4 !py-0.5 text-[10px] font-extrabold uppercase tracking-[.08em]"
          >
            <span className="h-2 w-2 rounded-full bg-green-600" />
            Secured workspace
          </Chip>

          <h2 className="rp-headline" style={{ marginTop: '10px' }}>
            LQD Management System
          </h2>
          <p className="rp-sub">ศูนย์กลางสำหรับจัดการข้อมูลลูกหนี้ บันทึกการชำระเงิน และติดตามพอร์ตงานคดี</p>
        </div>

        <Card className="portfolio-snapshot-card rounded-2xl border border-[#dbe7f7] bg-white/85 shadow-[0_12px_32px_rgba(15,23,42,.06)]">
          <Card.Content className="!p-0">
            <div className="portfolio-snapshot-content">
              <div className="portfolio-snapshot-copy">
                <p className="hero-eyebrow">PORTFOLIO SNAPSHOT</p>
                <p className="hero-num">฿284,920</p>
                <p className="hero-caption">Outstanding balance under active monitoring</p>
              </div>
              <div className="portfolio-snapshot-chart">
                <Sparkline data={CHART} color="#2563eb" glow="rgba(37,99,235,.6)" />
              </div>
            </div>
          </Card.Content>
        </Card>

        <div className="pills">
          {[
            { label: 'Active cases', val: '2,418', color: '#2563eb' },
            { label: 'Filing', val: '684', color: '#4f46e5' },
            { label: 'Judged', val: '86', color: '#0f766e' },
          ].map((s) => (
            <Card
              key={s.label}
              className="pill-card rounded-2xl border border-[#dbe7f7] bg-white/85 shadow-[0_12px_32px_rgba(15,23,42,.06)]"
            >
              <Card.Content className="!p-0">
                <div className="pill-card-content">
                  <p className="pill-label">{s.label}</p>
                  <p className="pill-val" style={{ color: s.color }}>{s.val}</p>
                </div>
              </Card.Content>
            </Card>
          ))}
        </div>

        <Card className="feed-card rounded-2xl border border-[#dbe7f7] bg-white/85 shadow-[0_12px_32px_rgba(15,23,42,.06)]">
          <Card.Content className="!p-0">
            <div className="feed-card-content">
              <div className="feed-head">
                <p className="feed-title">Today&apos;s queue</p>
                <span className="feed-live"><span className="live-dot" />Updated</span>
              </div>

              <div className="feed-rows">
                {ACTIVITY.map((a, i) => {
                  const m = STATUS_META[a.status];

                  return (
                    <div key={i} className="feed-row" style={{ animationDelay: `${0.45 + i * 0.09}s` }}>
                      <Avatar className="feed-avatar" style={{ background: a.color }}>
                        <Avatar.Fallback className="feed-avatar-text">{a.init}</Avatar.Fallback>
                      </Avatar>

                      <div className="feed-info">
                        <p className="feed-name">{a.name}</p>
                        <p className="feed-action">{a.action}</p>
                      </div>

                      <div className="feed-right">
                        <p className="feed-amount">{a.amount}</p>
                        <Chip
                          size="sm"
                          variant="soft"
                          className="feed-status-chip"
                          style={{ color: m.color, borderColor: `${m.color}40`, background: `${m.color}12` }}
                        >
                          {m.icon}
                          {m.label}
                        </Chip>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>
    </aside>
  );
});

export default RightPanel;
