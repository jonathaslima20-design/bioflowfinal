'use client';

import { Leaf } from 'lucide-react';
import { SOCIALS_BY_KEY } from '@/lib/socials';
import type { BioThemeProps, BioThemeMeta } from '@/themes/types';
import { getThemeSettings } from '@/themes/types';
import { BioflowzyBadge } from '@/components/bio/BioflowzyBadge';

export const botanicalMeta: BioThemeMeta = {
  key: 'botanical',
  name: 'Botanical',
  description: 'Spa premium: line-art botanico animado, sage/terracota e serif leve.',
  available: true,
  defaults: {
    bg_color: '#F4F2EC',
    button_color: '#87A878',
    text_color: '#2D3A2E',
  },
  palettes: {
    bg: ['#F4F2EC', '#EBE6D6', '#F8F5ED', '#E9E3D0', '#F0EADB', '#FAF7EF'],
    accent: ['#87A878', '#B06A41', '#9F7E4A', '#4F6A5F', '#D4A373', '#7B8A62'],
    text: ['#2D3A2E', '#3A2E25', '#1F2937', '#44403C'],
  },
  controls: [
    { key: 'density', label: 'Densidade de ilustracoes', type: 'slider', min: 0, max: 6, step: 1, default: 3, group: 'Ilustracoes' },
    { key: 'stroke', label: 'Espessura das linhas', type: 'select', options: [
      { value: '0.75', label: 'Fina' },
      { value: '1.25', label: 'Media' },
      { value: '2', label: 'Grossa' },
    ], default: '1.25', group: 'Ilustracoes' },
    { key: 'natural', label: 'Cor natural do accent', type: 'color', palette: ['#87A878', '#B06A41', '#9F7E4A', '#4F6A5F', '#D4A373', '#7B8A62'], default: '#87A878', group: 'Paleta' },
    { key: 'ornament', label: 'Micro-ornamentos', type: 'toggle', default: true, group: 'Detalhes' },
  ],
};

const Leaf1 = ({ stroke, color }: { stroke: string; color: string }) => (
  <svg viewBox="0 0 120 180" className="w-full h-full" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round">
    <path d="M60 180 Q60 120 60 20" className="bot-draw" />
    <path d="M60 150 Q30 140 15 120" className="bot-draw" />
    <path d="M60 130 Q90 120 105 100" className="bot-draw" />
    <path d="M60 110 Q30 100 18 80" className="bot-draw" />
    <path d="M60 90 Q90 80 102 62" className="bot-draw" />
    <path d="M60 70 Q35 60 25 44" className="bot-draw" />
    <path d="M60 50 Q85 42 96 28" className="bot-draw" />
    <circle cx="60" cy="20" r="3" fill={color} />
  </svg>
);

const Leaf2 = ({ stroke, color }: { stroke: string; color: string }) => (
  <svg viewBox="0 0 120 180" className="w-full h-full" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round">
    <path d="M60 180 C40 140 30 90 60 20 C90 90 80 140 60 180 Z" className="bot-draw" />
    <path d="M60 180 L60 20" className="bot-draw" />
  </svg>
);

export function BotanicalTheme({ profile, links, socials, videos, banners, track }: BioThemeProps) {
  const s = getThemeSettings(profile, 'botanical', botanicalMeta.controls);
  const accent = s.natural || profile.button_color || '#87A878';
  const bg = profile.bg_color || '#F4F2EC';
  const text = profile.text_color || '#2D3A2E';
  const t = (a: string, b: string | null) => track?.(a, b);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: bg, color: text, fontFamily: 'Georgia, "Times New Roman", serif' }}>
      {s.density > 0 && (
        <>
          <div className="absolute left-[-20px] top-20 w-32 h-48 opacity-30 pointer-events-none" aria-hidden>
            <Leaf1 stroke={s.stroke} color={accent} />
          </div>
          {s.density > 1 && (
            <div className="absolute right-[-30px] top-40 w-28 h-44 opacity-25 pointer-events-none" style={{ transform: 'scaleX(-1) rotate(15deg)' }} aria-hidden>
              <Leaf2 stroke={s.stroke} color={accent} />
            </div>
          )}
          {s.density > 2 && (
            <div className="absolute left-[-10px] bottom-40 w-24 h-36 opacity-20 pointer-events-none" style={{ transform: 'rotate(25deg)' }} aria-hidden>
              <Leaf2 stroke={s.stroke} color={accent} />
            </div>
          )}
          {s.density > 3 && (
            <div className="absolute right-[-20px] bottom-24 w-32 h-48 opacity-25 pointer-events-none" aria-hidden>
              <Leaf1 stroke={s.stroke} color={accent} />
            </div>
          )}
        </>
      )}

      <div className="relative max-w-md mx-auto px-6 pt-[72px] pb-24">
        <div className="flex flex-col items-center text-center">
          {s.ornament && (
            <div className="flex items-center gap-3 mb-6 text-xs tracking-[0.4em] uppercase opacity-70" style={{ fontFamily: 'var(--font-space-grotesk), monospace', color: accent }}>
              <Leaf className="w-3 h-3" />
              <span>Est. 2026</span>
              <Leaf className="w-3 h-3" />
            </div>
          )}

          <div className="rounded-full overflow-hidden" style={{ width: profile.avatar_size ?? 108, height: profile.avatar_size ?? 108, border: `1px solid ${accent}66`, padding: 4 }}>
            <div className="w-full h-full rounded-full overflow-hidden">
              {profile.avatar_url && <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />}
            </div>
          </div>
          <h1 className="mt-5 text-4xl tracking-tight" style={{ fontWeight: 400, color: text, letterSpacing: '-0.01em' }}>
            {profile.display_name || `@${profile.username}`}
          </h1>
          <div className="mt-2 flex items-center gap-2 text-xs tracking-[0.3em] uppercase opacity-60" style={{ fontFamily: 'var(--font-space-grotesk), monospace' }}>
            <div className="w-4 h-px" style={{ background: accent }} />
            <span>@{profile.username}</span>
            <div className="w-4 h-px" style={{ background: accent }} />
          </div>
          {profile.bio && <p className="mt-5 text-[15px] italic leading-relaxed opacity-90 max-w-xs">{profile.bio}</p>}

          {socials?.length > 0 && (
            <div className="mt-6 flex gap-4 flex-wrap justify-center">
              {socials.map((soc: any) => {
                const meta = SOCIALS_BY_KEY[(soc.platform || '').toLowerCase()];
                const Icon = meta?.icon;
                return (
                  <a key={soc.id} href={soc.url} target="_blank" rel="noreferrer" onClick={() => t('social', soc.id)}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                    style={{ border: `1px solid ${accent}66`, color: text, background: `${bg}` }}>
                    {Icon && <Icon className="w-4 h-4" />}
                  </a>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-10 flex flex-col gap-3">
          {links.map((l: any) => (
            <a key={l.id} href={l.url} target="_blank" rel="noreferrer" onClick={() => t('link', l.id)}
              className="group relative pl-5 pr-5 py-4 flex items-center justify-between overflow-hidden botanical-card"
              style={{ background: '#FFFFFF', border: `1px solid ${accent}33`, color: text, borderRadius: 4 }}>
              <div className="flex items-center gap-3">
                <Leaf className="w-4 h-4 transition-transform group-hover:rotate-12" style={{ color: accent }} />
                <span className="text-[15px]" style={{ fontWeight: 500 }}>{l.title}</span>
              </div>
              <span className="text-xs opacity-50 transition-transform group-hover:translate-x-1" style={{ color: accent }}>&mdash;&rarr;</span>
              <div className="absolute bottom-0 left-0 h-px botanical-line" style={{ background: accent, width: '0%' }} aria-hidden />
            </a>
          ))}

          {banners?.map((b: any) => {
            const inner = (
              <div className="overflow-hidden" style={{ border: `1px solid ${accent}33`, height: b.size === 'sm' ? 100 : b.size === 'lg' ? 240 : 160, borderRadius: 4 }}>
                {b.image_url && <img src={b.image_url} alt="" className="w-full h-full object-cover" />}
              </div>
            );
            return b.link_url ? <a key={b.id} href={b.link_url} target="_blank" rel="noreferrer" onClick={() => t('banner', b.id)}>{inner}</a> : <div key={b.id}>{inner}</div>;
          })}

          {videos.map((v: any) => (
            <figure key={v.id} style={{ border: `1px solid ${accent}33`, borderRadius: 4, overflow: 'hidden', background: '#FFFFFF' }}>
              <div className="relative aspect-video bg-black">
                {v.embed_url ? <iframe src={v.embed_url} className="absolute inset-0 w-full h-full" allowFullScreen />
                  : v.thumbnail ? <img src={v.thumbnail} alt="" className="w-full h-full object-cover" /> : null}
              </div>
              {v.title && <figcaption className="px-4 py-3 text-sm italic" style={{ color: text }}>{v.title}</figcaption>}
            </figure>
          ))}
        </div>

        {!profile.is_pro && <BioflowzyBadge bgColor={profile.bg_color} />}
      </div>

      <style jsx>{`
        :global(.bot-draw) { stroke-dasharray: 400; stroke-dashoffset: 400; animation: bot-draw 3s ease forwards; }
        :global(.botanical-card:hover .botanical-line) { width: 100%; transition: width 500ms ease; }
        :global(.botanical-card) { transition: transform 250ms ease; }
        :global(.botanical-card:hover) { transform: translateY(-2px); }
        @keyframes bot-draw { to { stroke-dashoffset: 0; } }
        @media (prefers-reduced-motion: reduce) {
          :global(.bot-draw) { animation: none !important; stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}

export default BotanicalTheme;
