'use client';

import { ArrowRight } from 'lucide-react';
import { SOCIALS_BY_KEY } from '@/lib/socials';
import type { BioThemeProps, BioThemeMeta } from '@/themes/types';
import { getThemeSettings } from '@/themes/types';
import { BioflowzyBadge } from '@/components/bio/BioflowzyBadge';

export const liquidMeta: BioThemeMeta = {
  key: 'liquid',
  name: 'Liquid',
  description: 'Blobs organicos animados, botoes pilula gooey e gradientes pastel.',
  available: true,
  defaults: {
    bg_color: '#FEF9F0',
    button_color: '#F472B6',
    text_color: '#1F2937',
  },
  palettes: {
    bg: ['#FEF9F0', '#F0FDFA', '#FDF2F8', '#EFF6FF', '#F0FDF4', '#FEF3C7'],
    accent: ['#F472B6', '#5EEAD4', '#FB923C', '#60A5FA', '#4ADE80', '#FBBF24'],
    text: ['#1F2937', '#0F172A', '#FFFFFF', '#0C4A6E'],
  },
  controls: [
    { key: 'speed', label: 'Velocidade da fluidez', type: 'slider', min: 10, max: 60, step: 2, suffix: 's', default: 30, group: 'Movimento' },
    { key: 'blobCount', label: 'Quantidade de blobs', type: 'slider', min: 1, max: 5, step: 1, default: 3, group: 'Fundo' },
    { key: 'gooey', label: 'Intensidade gooey', type: 'slider', min: 5, max: 25, step: 1, default: 12, group: 'Cards' },
    { key: 'secondary', label: 'Gradiente secundario', type: 'color', palette: ['#5EEAD4', '#FBBF24', '#60A5FA', '#4ADE80', '#FB923C', '#F472B6'], default: '#5EEAD4', group: 'Movimento' },
  ],
};

export function LiquidTheme({ profile, links, socials, videos, banners, track }: BioThemeProps) {
  const s = getThemeSettings(profile, 'liquid', liquidMeta.controls);
  const accent = profile.button_color || '#F472B6';
  const bg = profile.bg_color || '#FEF9F0';
  const text = profile.text_color || '#1F2937';
  const secondary = s.secondary || '#5EEAD4';
  const t = (a: string, b: string | null) => track?.(a, b);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: bg, color: text }}>
      <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
        <defs>
          <filter id="liquid-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation={s.gooey} />
            <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" />
          </filter>
          <filter id="liquid-turb">
            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="2" seed="4">
              <animate attributeName="baseFrequency" dur={`${s.speed}s`} values="0.01;0.03;0.01" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" scale="25" />
          </filter>
        </defs>
        <g filter="url(#liquid-goo)">
          {Array.from({ length: s.blobCount }).map((_, i) => {
            const colors = [accent, secondary, '#FBBF24', '#60A5FA', '#4ADE80'];
            return (
              <circle key={i} cx={`${20 + i * 25}%`} cy={`${15 + i * 22}%`} r={120 - i * 10} fill={colors[i % colors.length]} opacity={0.45}>
                <animate attributeName="cx" dur={`${s.speed + i * 4}s`} values={`${15 + i * 20}%;${30 + i * 18}%;${15 + i * 20}%`} repeatCount="indefinite" />
                <animate attributeName="cy" dur={`${s.speed + i * 3}s`} values={`${15 + i * 20}%;${35 + i * 15}%;${15 + i * 20}%`} repeatCount="indefinite" />
              </circle>
            );
          })}
        </g>
      </svg>

      <div className="relative max-w-md mx-auto px-5 pt-[72px] pb-24">
        <div className="flex flex-col items-center text-center">
          <div className="relative" style={{ width: profile.avatar_size ?? 110, height: profile.avatar_size ?? 110 }}>
            <div className="absolute inset-[-8px] liquid-blob" style={{ background: `linear-gradient(135deg, ${accent}, ${secondary})` }} aria-hidden />
            <div className="relative w-full h-full overflow-hidden liquid-blob-mask">
              {profile.avatar_url && <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />}
            </div>
          </div>
          <h1 className="mt-6 text-3xl tracking-tight" style={{ fontWeight: 700, color: text, letterSpacing: '-0.02em' }}>
            {profile.display_name || `@${profile.username}`}
          </h1>
          <p className="text-sm opacity-70 mt-1">@{profile.username}</p>
          {profile.bio && <p className="mt-3 text-sm opacity-85 max-w-xs leading-relaxed">{profile.bio}</p>}

          {socials?.length > 0 && (
            <div className="mt-6 flex gap-2 flex-wrap justify-center">
              {socials.map((soc: any) => {
                const meta = SOCIALS_BY_KEY[(soc.platform || '').toLowerCase()];
                const Icon = meta?.icon;
                return (
                  <a key={soc.id} href={soc.url} target="_blank" rel="noreferrer" onClick={() => t('social', soc.id)}
                    className="w-11 h-11 rounded-full flex items-center justify-center transition-transform hover:scale-110 liquid-pill"
                    style={{ background: '#FFFFFF', color: text, boxShadow: `0 6px 16px ${accent}33` }}>
                    {Icon && <Icon className="w-4 h-4" />}
                  </a>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-col gap-3">
          {links.map((l: any) => (
            <a key={l.id} href={l.url} target="_blank" rel="noreferrer" onClick={() => t('link', l.id)}
              className="relative group px-6 py-4 rounded-full flex items-center justify-between liquid-pill overflow-hidden"
              style={{ background: '#FFFFFF', boxShadow: `0 8px 24px ${accent}25`, color: text }}>
              <span className="relative z-10 font-medium">{l.title}</span>
              <div className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-1" style={{ background: accent, color: '#fff' }}>
                <ArrowRight className="w-4 h-4" />
              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(90deg, ${accent}22, ${secondary}22)` }} aria-hidden />
            </a>
          ))}

          {banners?.map((b: any) => {
            const inner = (
              <div className="overflow-hidden rounded-3xl" style={{ height: b.size === 'sm' ? 100 : b.size === 'lg' ? 240 : 160, boxShadow: `0 8px 24px ${accent}22` }}>
                {b.image_url && <img src={b.image_url} alt="" className="w-full h-full object-cover" />}
              </div>
            );
            return b.link_url ? <a key={b.id} href={b.link_url} target="_blank" rel="noreferrer" onClick={() => t('banner', b.id)}>{inner}</a> : <div key={b.id}>{inner}</div>;
          })}

          {videos.map((v: any) => (
            <div key={v.id} className="overflow-hidden rounded-3xl" style={{ background: '#FFFFFF', boxShadow: `0 8px 24px ${accent}25` }}>
              <div className="relative aspect-video bg-black">
                {v.embed_url ? <iframe src={v.embed_url} className="absolute inset-0 w-full h-full" allowFullScreen />
                  : v.thumbnail ? <img src={v.thumbnail} alt="" className="w-full h-full object-cover" /> : null}
              </div>
              {v.title && <div className="p-4 text-sm font-medium">{v.title}</div>}
            </div>
          ))}
        </div>

        {!profile.is_pro && <BioflowzyBadge bgColor={profile.bg_color} />}
      </div>

      <style jsx>{`
        :global(.liquid-blob) {
          border-radius: 55% 45% 50% 50% / 50% 55% 45% 50%;
          animation: liquid-morph ${s.speed * 0.3}s ease-in-out infinite;
        }
        :global(.liquid-blob-mask) {
          border-radius: 55% 45% 50% 50% / 50% 55% 45% 50%;
          animation: liquid-morph ${s.speed * 0.3}s ease-in-out infinite;
        }
        :global(.liquid-pill) { transition: transform 300ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 300ms; }
        :global(.liquid-pill:hover) { transform: translateY(-3px) scale(1.01); }
        @keyframes liquid-morph {
          0%, 100% { border-radius: 55% 45% 50% 50% / 50% 55% 45% 50%; }
          33% { border-radius: 45% 55% 60% 40% / 55% 50% 50% 45%; }
          66% { border-radius: 50% 50% 45% 55% / 45% 55% 45% 55%; }
        }
        @media (prefers-reduced-motion: reduce) {
          :global(.liquid-blob), :global(.liquid-blob-mask) { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

export default LiquidTheme;
