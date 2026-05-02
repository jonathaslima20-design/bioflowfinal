'use client';

import { TrendingUp, Users, MousePointerClick, Activity, ArrowUpRight, Circle } from 'lucide-react';
import { SOCIALS_BY_KEY } from '@/lib/socials';
import type { BioThemeProps, BioThemeMeta } from '@/themes/types';
import { getThemeSettings } from '@/themes/types';
import { BioflowzyBadge } from '@/components/bio/BioflowzyBadge';

export const saasMeta: BioThemeMeta = {
  key: 'saas',
  name: 'Dashboard SaaS',
  description: 'Admin panel premium com KPIs, grafico e tabela de links com status.',
  available: true,
  defaults: {
    bg_color: '#F8FAFC',
    button_color: '#3B82F6',
    text_color: '#0F172A',
  },
  palettes: {
    bg: ['#F8FAFC', '#F1F5F9', '#FFFFFF', '#0F172A', '#020617', '#E2E8F0'],
    accent: ['#3B82F6', '#10B981', '#F59E0B', '#EC4899', '#8B5CF6', '#06B6D4'],
    text: ['#0F172A', '#1E293B', '#F8FAFC', '#FFFFFF'],
  },
  controls: [
    { key: 'density', label: 'Densidade', type: 'select', options: [
      { value: 'compact', label: 'Compacta' }, { value: 'normal', label: 'Normal' }, { value: 'relaxed', label: 'Espacosa' },
    ], default: 'normal', group: 'Layout' },
    { key: 'kpis', label: 'Mostrar KPIs', type: 'toggle', default: true, group: 'Widgets' },
    { key: 'chartStyle', label: 'Estilo do grafico', type: 'select', options: [
      { value: 'area', label: 'Area' }, { value: 'bar', label: 'Barras' }, { value: 'line', label: 'Linha' },
    ], default: 'area', group: 'Widgets' },
    { key: 'tint', label: 'Tinta do accent', type: 'slider', min: 0, max: 100, step: 5, suffix: '%', default: 12, group: 'Aparencia' },
  ],
};

const Sparkline = ({ style, color }: { style: string; color: string }) => {
  const pts = [10, 14, 9, 18, 15, 22, 19, 28, 25, 32, 30, 38];
  const w = 320, h = 60;
  const max = Math.max(...pts);
  const min = Math.min(...pts);
  const px = (i: number) => (i / (pts.length - 1)) * w;
  const py = (v: number) => h - ((v - min) / (max - min)) * (h - 6) - 3;
  const path = pts.map((v, i) => `${i === 0 ? 'M' : 'L'}${px(i)} ${py(v)}`).join(' ');
  if (style === 'bar') {
    const bw = w / pts.length - 2;
    return (
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-14">
        {pts.map((v, i) => <rect key={i} x={px(i) - bw / 2} y={py(v)} width={bw} height={h - py(v)} fill={color} opacity={0.85} rx={2} />)}
      </svg>
    );
  }
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-14">
      {style === 'area' && <path d={`${path} L${w} ${h} L0 ${h} Z`} fill={color} opacity={0.18} />}
      <path d={path} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export function SaasTheme({ profile, links, socials, videos, banners, track }: BioThemeProps) {
  const s = getThemeSettings(profile, 'saas', saasMeta.controls);
  const accent = profile.button_color || '#3B82F6';
  const bg = profile.bg_color || '#F8FAFC';
  const text = profile.text_color || '#0F172A';
  const isDark = bg === '#0F172A' || bg === '#020617';
  const card = isDark ? '#1E293B' : '#FFFFFF';
  const border = isDark ? '#334155' : '#E2E8F0';
  const muted = isDark ? '#94A3B8' : '#64748B';
  const t = (a: string, b: string | null) => track?.(a, b);
  const pad = s.density === 'compact' ? 'p-3' : s.density === 'relaxed' ? 'p-5' : 'p-4';

  return (
    <div className="min-h-screen pt-[72px] pb-24 px-4" style={{ backgroundColor: bg, color: text, fontFamily: 'var(--font-inter), system-ui' }}>
      <div className="max-w-md mx-auto space-y-3">
        <div className={`rounded-xl ${pad}`} style={{ background: card, border: `1px solid ${border}` }}>
          <div className="flex items-center gap-3">
            <div className="rounded-full overflow-hidden" style={{ width: 44, height: 44 }}>
              {profile.avatar_url && <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold truncate">{profile.display_name || profile.username}</div>
              <div className="text-xs flex items-center gap-1.5" style={{ color: muted }}>
                <Circle className="w-2 h-2 fill-green-500 text-green-500" /> online · @{profile.username}
              </div>
            </div>
            <div className="px-2 py-1 rounded-md text-[10px] font-medium" style={{ background: `${accent}${Math.round(s.tint * 2.55).toString(16).padStart(2, '0')}`, color: accent }}>PRO</div>
          </div>
          {profile.bio && <p className="mt-3 text-sm" style={{ color: muted }}>{profile.bio}</p>}
        </div>

        {s.kpis && (
          <div className="grid grid-cols-3 gap-2">
            {[
              { l: 'Views', v: (links.length * 248).toLocaleString(), d: '+12.3%', icon: Users },
              { l: 'Clicks', v: (links.length * 67).toLocaleString(), d: '+8.1%', icon: MousePointerClick },
              { l: 'CTR', v: '27.2%', d: '+2.4%', icon: Activity },
            ].map((k, i) => {
              const Icon = k.icon;
              return (
                <div key={i} className={`rounded-xl ${pad}`} style={{ background: card, border: `1px solid ${border}` }}>
                  <div className="flex items-center justify-between">
                    <Icon className="w-4 h-4" style={{ color: accent }} />
                    <span className="text-[10px] text-green-500">{k.d}</span>
                  </div>
                  <div className="mt-2 text-lg font-bold leading-none">{k.v}</div>
                  <div className="text-[10px]" style={{ color: muted }}>{k.l}</div>
                </div>
              );
            })}
          </div>
        )}

        <div className={`rounded-xl ${pad}`} style={{ background: card, border: `1px solid ${border}` }}>
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-semibold">Engagement</div>
            <div className="flex items-center gap-1 text-xs" style={{ color: muted }}>
              <TrendingUp className="w-3.5 h-3.5" style={{ color: accent }} /> Last 12 days
            </div>
          </div>
          <Sparkline style={s.chartStyle} color={accent} />
        </div>

        {socials?.length > 0 && (
          <div className={`rounded-xl ${pad}`} style={{ background: card, border: `1px solid ${border}` }}>
            <div className="text-xs uppercase tracking-wider mb-2" style={{ color: muted }}>Channels</div>
            <div className="flex gap-2 flex-wrap">
              {socials.map((soc: any) => {
                const meta = SOCIALS_BY_KEY[(soc.platform || '').toLowerCase()];
                const Icon = meta?.icon;
                return (
                  <a key={soc.id} href={soc.url} target="_blank" rel="noreferrer" onClick={() => t('social', soc.id)}
                    className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors hover:bg-black/5"
                    style={{ border: `1px solid ${border}`, color: text }}>
                    {Icon && <Icon className="w-4 h-4" />}
                  </a>
                );
              })}
            </div>
          </div>
        )}

        <div className={`rounded-xl ${pad}`} style={{ background: card, border: `1px solid ${border}` }}>
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-semibold">Links</div>
            <div className="text-xs" style={{ color: muted }}>{links.length} total</div>
          </div>
          <div className="flex flex-col">
            {links.map((l: any, i: number) => (
              <a key={l.id} href={l.url} target="_blank" rel="noreferrer" onClick={() => t('link', l.id)}
                className="group flex items-center justify-between py-2.5 border-b last:border-b-0 transition-colors hover:bg-black/[0.02]"
                style={{ borderColor: border }}>
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-md flex items-center justify-center text-xs font-bold"
                    style={{ background: `${accent}${Math.round(s.tint * 2.55).toString(16).padStart(2, '0')}`, color: accent }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">{l.title}</div>
                    <div className="text-[10px]" style={{ color: muted }}>Active · {Math.round(50 + Math.random() * 200)} clicks</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" style={{ color: accent }} />
              </a>
            ))}
          </div>
        </div>

        {banners?.map((b: any) => {
          const inner = (
            <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${border}`, height: b.size === 'sm' ? 100 : b.size === 'lg' ? 240 : 160 }}>
              {b.image_url && <img src={b.image_url} alt="" className="w-full h-full object-cover" />}
            </div>
          );
          return b.link_url ? <a key={b.id} href={b.link_url} target="_blank" rel="noreferrer" onClick={() => t('banner', b.id)}>{inner}</a> : <div key={b.id}>{inner}</div>;
        })}

        {videos.map((v: any) => (
          <div key={v.id} className="rounded-xl overflow-hidden" style={{ background: card, border: `1px solid ${border}` }}>
            <div className="relative aspect-video bg-black">
              {v.embed_url ? <iframe src={v.embed_url} className="absolute inset-0 w-full h-full" allowFullScreen />
                : v.thumbnail ? <img src={v.thumbnail} alt="" className="w-full h-full object-cover" /> : null}
            </div>
            {v.title && <div className="p-3 text-sm font-medium">{v.title}</div>}
          </div>
        ))}

        {!profile.is_pro && <BioflowzyBadge bgColor={profile.bg_color} />}
      </div>
    </div>
  );
}

export default SaasTheme;
