'use client';

import { useEffect, useState } from 'react';
import { Flame, Zap } from 'lucide-react';
import { SOCIALS_BY_KEY } from '@/lib/socials';
import type { BioThemeProps, BioThemeMeta } from '@/themes/types';
import { getThemeSettings } from '@/themes/types';
import { BioflowzyBadge } from '@/components/bio/BioflowzyBadge';

export const flashMeta: BioThemeMeta = {
  key: 'flash',
  name: 'Deals Flash',
  description: 'Urgency-driven: countdown por link, preco grande e barra de estoque.',
  available: true,
  defaults: {
    bg_color: '#FFF7ED',
    button_color: '#DC2626',
    text_color: '#111827',
  },
  palettes: {
    bg: ['#FFF7ED', '#FEF2F2', '#FFFBEB', '#111827', '#1A1A1A', '#FFFFFF'],
    accent: ['#DC2626', '#EF4444', '#F97316', '#EA580C', '#C026D3', '#EAB308'],
    text: ['#111827', '#1F2937', '#FAFAFA', '#FFFFFF'],
  },
  controls: [
    { key: 'duration', label: 'Duracao do countdown (horas)', type: 'slider', min: 1, max: 72, step: 1, suffix: 'h', default: 24, group: 'Countdown' },
    { key: 'urgencyColor', label: 'Cor de urgencia', type: 'color', palette: ['#DC2626', '#EF4444', '#F97316', '#EA580C', '#C026D3', '#EAB308'], default: '#DC2626', group: 'Visual' },
    { key: 'progressBar', label: 'Barra de progresso de estoque', type: 'toggle', default: true, group: 'Estoque' },
    { key: 'currency', label: 'Moeda', type: 'select', options: [
      { value: 'BRL', label: 'R$' }, { value: 'USD', label: '$' }, { value: 'EUR', label: '€' },
    ], default: 'USD', group: 'Precos' },
  ],
};

const SYM: Record<string, string> = { BRL: 'R$', USD: '$', EUR: '€' };

function useHourCountdown(hours: number) {
  const [end] = useState(() => Date.now() + hours * 3600_000);
  const [left, setLeft] = useState<{ h: number; m: number; s: number }>({ h: hours, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, end - Date.now());
      setLeft({ h: Math.floor(diff / 3600000), m: Math.floor((diff / 60000) % 60), s: Math.floor((diff / 1000) % 60) });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [end]);
  return left;
}

export function FlashTheme({ profile, links, socials, videos, banners, track }: BioThemeProps) {
  const s = getThemeSettings(profile, 'flash', flashMeta.controls);
  const urgency = s.urgencyColor || '#DC2626';
  const bg = profile.bg_color || '#FFF7ED';
  const text = profile.text_color || '#111827';
  const isDark = bg === '#111827' || bg === '#1A1A1A';
  const card = isDark ? '#1F2937' : '#FFFFFF';
  const muted = isDark ? '#94A3B8' : '#6B7280';
  const border = isDark ? '#374151' : '#FDE68A';
  const counter = useHourCountdown(s.duration);
  const t = (a: string, b: string | null) => track?.(a, b);

  return (
    <div className="min-h-screen pt-[72px] pb-24 px-4" style={{ backgroundColor: bg, color: text, fontFamily: 'var(--font-inter), system-ui' }}>
      <div className="max-w-md mx-auto">
        <div className="rounded-2xl p-4 mb-4 relative overflow-hidden" style={{ background: urgency, color: '#fff' }}>
          <div className="absolute inset-0 pointer-events-none opacity-20" aria-hidden style={{ background: `repeating-linear-gradient(45deg, transparent 0 10px, #fff3 10px 11px)` }} />
          <div className="relative flex items-center gap-3">
            <Flame className="w-8 h-8 flash-pulse" />
            <div className="flex-1">
              <div className="text-[10px] tracking-[0.3em] uppercase opacity-90">Flash Sale Ends In</div>
              <div className="text-3xl tabular-nums font-black" style={{ letterSpacing: '-0.02em' }}>
                {String(counter.h).padStart(2, '0')}:{String(counter.m).padStart(2, '0')}:{String(counter.s).padStart(2, '0')}
              </div>
            </div>
            <Zap className="w-6 h-6 flash-pulse" />
          </div>
        </div>

        <div className="rounded-2xl p-5 mb-4" style={{ background: card, border: `1px solid ${border}` }}>
          <div className="flex items-center gap-3">
            <div className="rounded-full overflow-hidden shrink-0" style={{ width: 56, height: 56, border: `2px solid ${urgency}` }}>
              {profile.avatar_url && <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-black tracking-tight truncate">{profile.display_name || profile.username}</h1>
              <div className="text-xs" style={{ color: muted }}>@{profile.username} · LIVE DEALS</div>
            </div>
            <div className="px-2 py-1 text-[10px] tracking-[0.2em] uppercase font-bold rounded" style={{ background: urgency, color: '#fff' }}>HOT</div>
          </div>
          {profile.bio && <p className="mt-3 text-sm" style={{ color: muted }}>{profile.bio}</p>}
        </div>

        {socials?.length > 0 && (
          <div className="flex gap-2 mb-4 flex-wrap">
            {socials.map((soc: any) => {
              const meta = SOCIALS_BY_KEY[(soc.platform || '').toLowerCase()];
              const Icon = meta?.icon;
              return (
                <a key={soc.id} href={soc.url} target="_blank" rel="noreferrer" onClick={() => t('social', soc.id)}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                  style={{ background: card, border: `1px solid ${border}`, color: text }}>
                  {Icon && <Icon className="w-4 h-4" />}
                </a>
              );
            })}
          </div>
        )}

        <div className="flex flex-col gap-3">
          {links.map((l: any, i: number) => {
            const basePrice = ((l.id?.charCodeAt?.(0) || 65) * 5) % 400 + 39;
            const salePrice = (basePrice * 0.6).toFixed(2);
            const oldPrice = basePrice.toFixed(2);
            const discount = 40;
            const stock = 8 + (i * 13) % 85;
            return (
              <a key={l.id} href={l.url} target="_blank" rel="noreferrer" onClick={() => t('link', l.id)}
                className="group relative block rounded-2xl overflow-hidden flash-card" style={{ background: card, border: `1px solid ${border}` }}>
                <div className="flex gap-3 p-3">
                  <div className="relative shrink-0 rounded-lg overflow-hidden" style={{ width: 96, height: 96, background: `linear-gradient(135deg, ${urgency}22, ${urgency}08)` }}>
                    <div className="absolute inset-0 flex items-center justify-center text-3xl font-black" style={{ color: urgency }}>
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div className="absolute top-1 left-1 px-1.5 py-0.5 text-[9px] font-bold rounded text-white" style={{ background: urgency }}>-{discount}%</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] uppercase tracking-wider font-bold" style={{ color: urgency }}>Limited</div>
                    <div className="text-sm font-bold leading-tight line-clamp-2">{l.title}</div>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-xl font-black" style={{ color: urgency }}>{SYM[s.currency]}{salePrice}</span>
                      <span className="text-xs line-through" style={{ color: muted }}>{SYM[s.currency]}{oldPrice}</span>
                    </div>
                    {s.progressBar && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-[10px] mb-1">
                          <span style={{ color: muted }}>Only {stock}% left!</span>
                          <span className="font-bold" style={{ color: urgency }}>Hurry!</span>
                        </div>
                        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: `${urgency}22` }}>
                          <div className="h-full rounded-full flash-bar" style={{ width: `${stock}%`, background: urgency }} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="px-3 pb-3">
                  <div className="w-full text-center py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-transform group-hover:scale-[1.02]" style={{ background: urgency, color: '#fff' }}>
                    Grab it now &rarr;
                  </div>
                </div>
              </a>
            );
          })}

          {banners?.map((b: any) => {
            const inner = (
              <div className="rounded-2xl overflow-hidden" style={{ border: `2px solid ${urgency}`, height: b.size === 'sm' ? 100 : b.size === 'lg' ? 240 : 160 }}>
                {b.image_url && <img src={b.image_url} alt="" className="w-full h-full object-cover" />}
              </div>
            );
            return b.link_url ? <a key={b.id} href={b.link_url} target="_blank" rel="noreferrer" onClick={() => t('banner', b.id)}>{inner}</a> : <div key={b.id}>{inner}</div>;
          })}

          {videos.map((v: any) => (
            <div key={v.id} className="rounded-2xl overflow-hidden" style={{ background: card, border: `1px solid ${border}` }}>
              <div className="relative aspect-video bg-black">
                {v.embed_url ? <iframe src={v.embed_url} className="absolute inset-0 w-full h-full" allowFullScreen />
                  : v.thumbnail ? <img src={v.thumbnail} alt="" className="w-full h-full object-cover" /> : null}
              </div>
              {v.title && <div className="p-3 text-sm font-bold">{v.title}</div>}
            </div>
          ))}
        </div>

        {!profile.is_pro && <BioflowzyBadge bgColor={profile.bg_color} />}
      </div>

      <style jsx>{`
        :global(.flash-pulse) { animation: flash-pulse 1s ease-in-out infinite; }
        :global(.flash-bar) { animation: flash-glow 1.6s ease-in-out infinite; }
        :global(.flash-card) { transition: transform 200ms ease, box-shadow 200ms ease; }
        :global(.flash-card:hover) { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,0.08); }
        @keyframes flash-pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.15); } }
        @keyframes flash-glow { 0%,100% { opacity: 1; } 50% { opacity: 0.7; } }
        @media (prefers-reduced-motion: reduce) { :global(.flash-pulse), :global(.flash-bar) { animation: none; } }
      `}</style>
    </div>
  );
}

export default FlashTheme;
