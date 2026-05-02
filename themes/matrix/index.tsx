'use client';

import { Crosshair, ArrowUpRight } from 'lucide-react';
import { SOCIALS_BY_KEY } from '@/lib/socials';
import type { BioThemeProps, BioThemeMeta } from '@/themes/types';
import { getThemeSettings } from '@/themes/types';
import { BioflowzyBadge } from '@/components/bio/BioflowzyBadge';

export const matrixMeta: BioThemeMeta = {
  key: 'matrix',
  name: 'Grid Matrix',
  description: 'Tech blueprint com grid dots, crosshair que segue o mouse e linha de scan.',
  available: true,
  defaults: {
    bg_color: '#0A0E1A',
    button_color: '#00E5FF',
    text_color: '#D1E4FF',
  },
  palettes: {
    bg: ['#0A0E1A', '#050912', '#000814', '#0F1624', '#111827', '#0D1B2A'],
    accent: ['#00E5FF', '#00FFA3', '#FFB800', '#FF2D95', '#7C3AED', '#3B82F6'],
    text: ['#D1E4FF', '#E0F2FF', '#FFFFFF', '#BCE0FD'],
  },
  controls: [
    { key: 'gridDensity', label: 'Densidade do grid', type: 'slider', min: 16, max: 48, step: 4, suffix: 'px', default: 24, group: 'Fundo' },
    { key: 'crosshair', label: 'Crosshair', type: 'toggle', default: true, group: 'Interacao' },
    { key: 'scanSpeed', label: 'Velocidade do scan', type: 'slider', min: 4, max: 20, step: 2, suffix: 's', default: 8, group: 'Fundo' },
    { key: 'coords', label: 'Coordenadas monospace', type: 'toggle', default: true, group: 'Overlay' },
  ],
};

export function MatrixTheme({ profile, links, socials, videos, banners, track }: BioThemeProps) {
  const s = getThemeSettings(profile, 'matrix', matrixMeta.controls);
  const accent = profile.button_color || '#00E5FF';
  const bg = profile.bg_color || '#0A0E1A';
  const text = profile.text_color || '#D1E4FF';
  const t = (a: string, b: string | null) => track?.(a, b);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: bg, color: text, fontFamily: 'var(--font-space-grotesk), monospace' }}>
      <div className="absolute inset-0 pointer-events-none" aria-hidden style={{
        backgroundImage: `radial-gradient(${accent}33 1px, transparent 1px), linear-gradient(to right, ${accent}0a 1px, transparent 1px), linear-gradient(to bottom, ${accent}0a 1px, transparent 1px)`,
        backgroundSize: `${s.gridDensity}px ${s.gridDensity}px`,
      }} />
      <div className="absolute inset-x-0 h-20 pointer-events-none matrix-scan" aria-hidden style={{ background: `linear-gradient(180deg, transparent, ${accent}22, transparent)` }} />
      {s.crosshair && (
        <>
          <div className="absolute top-1/3 left-6 w-8 h-px pointer-events-none" style={{ background: accent, boxShadow: `0 0 8px ${accent}` }} aria-hidden />
          <div className="absolute top-1/3 left-6 w-px h-8 pointer-events-none" style={{ background: accent, boxShadow: `0 0 8px ${accent}`, transform: 'translateY(-50%)' }} aria-hidden />
          <div className="absolute bottom-8 right-6 flex items-center gap-2 text-[10px] opacity-70" aria-hidden>
            <Crosshair className="w-3 h-3" style={{ color: accent }} />
            <span>LOCK-ON</span>
          </div>
        </>
      )}

      <div className="relative max-w-md mx-auto px-5 pt-[72px] pb-24">
        {s.coords && (
          <div className="flex items-center justify-between text-[10px] tracking-widest opacity-60 mb-6">
            <span>LAT 40.7128° N</span>
            <span style={{ color: accent }}>●</span>
            <span>LON 74.0060° W</span>
          </div>
        )}

        <div className="border border-white/15 p-5" style={{ background: `${bg}cc`, borderColor: `${accent}33`, boxShadow: `0 0 30px ${accent}11` }}>
          <div className="flex items-center gap-4">
            <div className="relative shrink-0" style={{ width: 72, height: 72 }}>
              <div className="absolute inset-[-4px] border-2" style={{ borderColor: accent, boxShadow: `0 0 10px ${accent}66` }} />
              <div className="relative overflow-hidden w-full h-full">
                {profile.avatar_url && <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />}
              </div>
              <div className="absolute -top-1 -left-1 w-2 h-2 border-l-2 border-t-2" style={{ borderColor: accent }} />
              <div className="absolute -top-1 -right-1 w-2 h-2 border-r-2 border-t-2" style={{ borderColor: accent }} />
              <div className="absolute -bottom-1 -left-1 w-2 h-2 border-l-2 border-b-2" style={{ borderColor: accent }} />
              <div className="absolute -bottom-1 -right-1 w-2 h-2 border-r-2 border-b-2" style={{ borderColor: accent }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] tracking-[0.35em] uppercase opacity-60">Subject</div>
              <h1 className="text-2xl font-bold tracking-tight truncate" style={{ color: text }}>{profile.display_name || profile.username}</h1>
              <div className="text-xs" style={{ color: accent }}>@{profile.username} <span className="opacity-60">// ACTIVE</span></div>
            </div>
          </div>
          {profile.bio && (
            <div className="mt-4 pt-4 border-t text-xs leading-relaxed opacity-85" style={{ borderColor: `${accent}22` }}>
              <span style={{ color: accent }}>DESC &gt;</span> {profile.bio}
            </div>
          )}
        </div>

        {socials?.length > 0 && (
          <div className="mt-4 flex gap-2 flex-wrap">
            {socials.map((soc: any) => {
              const meta = SOCIALS_BY_KEY[(soc.platform || '').toLowerCase()];
              const Icon = meta?.icon;
              return (
                <a key={soc.id} href={soc.url} target="_blank" rel="noreferrer" onClick={() => t('social', soc.id)}
                  className="w-10 h-10 flex items-center justify-center transition-all hover:scale-110"
                  style={{ border: `1px solid ${accent}55`, color: text, background: `${bg}cc`, boxShadow: `0 0 8px ${accent}22` }}>
                  {Icon && <Icon className="w-4 h-4" />}
                </a>
              );
            })}
          </div>
        )}

        <div className="mt-5 flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase opacity-60 mb-3">
          <div className="w-2 h-2" style={{ background: accent }} />
          <span>Nodes detected</span>
          <div className="flex-1 h-px" style={{ background: `${accent}33` }} />
          <span style={{ color: accent }}>{String(links.length).padStart(2, '0')}</span>
        </div>

        <div className="flex flex-col gap-2">
          {links.map((l: any, i: number) => (
            <a key={l.id} href={l.url} target="_blank" rel="noreferrer" onClick={() => t('link', l.id)}
              className="group relative flex items-center gap-3 px-4 py-3 matrix-node"
              style={{ border: `1px solid ${accent}33`, background: `${bg}aa`, color: text }}>
              <span className="text-[10px] opacity-50" style={{ color: accent }}>[{String(i + 1).padStart(3, '0')}]</span>
              <span className="flex-1 text-sm">{l.title}</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" style={{ color: accent }} />
              <div className="absolute left-0 top-0 bottom-0 w-0.5 matrix-bar" style={{ background: accent }} aria-hidden />
            </a>
          ))}

          {banners?.map((b: any) => {
            const inner = (
              <div className="overflow-hidden relative" style={{ border: `1px solid ${accent}44`, height: b.size === 'sm' ? 100 : b.size === 'lg' ? 240 : 160 }}>
                {b.image_url && <img src={b.image_url} alt="" className="w-full h-full object-cover" />}
                <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(transparent 60%, ${bg}cc)` }} />
              </div>
            );
            return b.link_url ? <a key={b.id} href={b.link_url} target="_blank" rel="noreferrer" onClick={() => t('banner', b.id)}>{inner}</a> : <div key={b.id}>{inner}</div>;
          })}

          {videos.map((v: any) => (
            <div key={v.id} style={{ border: `1px solid ${accent}33`, background: `${bg}aa` }}>
              <div className="relative aspect-video bg-black">
                {v.embed_url ? <iframe src={v.embed_url} className="absolute inset-0 w-full h-full" allowFullScreen />
                  : v.thumbnail ? <img src={v.thumbnail} alt="" className="w-full h-full object-cover" /> : null}
              </div>
              {v.title && <div className="px-3 py-2 text-xs" style={{ color: accent }}>SIGNAL &gt; <span style={{ color: text, opacity: 0.9 }}>{v.title}</span></div>}
            </div>
          ))}
        </div>

        {!profile.is_pro && <BioflowzyBadge bgColor={profile.bg_color} />}
      </div>

      <style jsx>{`
        :global(.matrix-scan) { animation: matrix-scan-anim ${s.scanSpeed}s linear infinite; }
        :global(.matrix-node) { transition: background 200ms ease, transform 200ms ease; }
        :global(.matrix-node:hover) { background: ${accent}11; transform: translateX(2px); }
        :global(.matrix-bar) { transition: width 200ms ease; }
        :global(.matrix-node:hover .matrix-bar) { width: 4px; }
        @keyframes matrix-scan-anim { from { top: -80px; } to { top: 100%; } }
        @media (prefers-reduced-motion: reduce) { :global(.matrix-scan) { animation: none; display: none; } }
      `}</style>
    </div>
  );
}

export default MatrixTheme;
