'use client';

import { Bookmark } from 'lucide-react';
import { SOCIALS_BY_KEY } from '@/lib/socials';
import type { BioThemeProps, BioThemeMeta } from '@/themes/types';
import { getThemeSettings } from '@/themes/types';
import { BioflowzyBadge } from '@/components/bio/BioflowzyBadge';

export const paperMeta: BioThemeMeta = {
  key: 'paper',
  name: 'Paper',
  description: 'Papel de algodao com textura real, marca-paginas e tipografia humanista.',
  available: true,
  defaults: {
    bg_color: '#FBF8F1',
    button_color: '#D97706',
    text_color: '#1C1917',
  },
  palettes: {
    bg: ['#FBF8F1', '#F5EFE0', '#FFFFFF', '#F3EEDF', '#F9F5EC', '#E8E0CC'],
    accent: ['#D97706', '#DC2626', '#16A34A', '#2563EB', '#DB2777', '#0891B2'],
    text: ['#1C1917', '#292524', '#0C0A09', '#44403C'],
  },
  controls: [
    { key: 'texture', label: 'Intensidade da textura', type: 'slider', min: 0, max: 100, step: 10, suffix: '%', default: 40, group: 'Papel' },
    { key: 'bookmarkColor', label: 'Cor do marca-paginas', type: 'color', palette: ['#D97706', '#DC2626', '#16A34A', '#2563EB', '#DB2777', '#7C3AED'], default: '#D97706', group: 'Marca-paginas' },
    { key: 'letterhead', label: 'Timbre no topo', type: 'toggle', default: true, group: 'Cabecalho' },
    { key: 'fold', label: 'Dobra sutil', type: 'toggle', default: true, group: 'Papel' },
  ],
};

export function PaperTheme({ profile, links, socials, videos, banners, track }: BioThemeProps) {
  const s = getThemeSettings(profile, 'paper', paperMeta.controls);
  const accent = profile.button_color || '#D97706';
  const bg = profile.bg_color || '#FBF8F1';
  const text = profile.text_color || '#1C1917';
  const bookmarkColor = s.bookmarkColor || accent;
  const t = (a: string, b: string | null) => track?.(a, b);

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: bg, color: text, fontFamily: 'var(--font-inter), system-ui, sans-serif' }}>
      <div className="absolute inset-0 pointer-events-none paper-grain" aria-hidden style={{ opacity: s.texture / 100 }} />
      {s.fold && <div className="absolute inset-y-0 left-1/2 w-px pointer-events-none" style={{ background: `${text}08`, boxShadow: `1px 0 2px ${text}05` }} aria-hidden />}

      <div className="relative max-w-md mx-auto px-6 pt-[72px] pb-24">
        {s.letterhead && (
          <div className="flex items-center justify-between text-[10px] tracking-[0.4em] uppercase opacity-60 mb-10 pb-4 border-b" style={{ borderColor: `${text}20` }}>
            <span>Correspondencia</span>
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: `${text}40` }} />
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: `${text}40` }} />
            </div>
            <span>N° 001</span>
          </div>
        )}

        <div className="flex flex-col items-center text-center">
          <div className="rounded-full overflow-hidden paper-avatar" style={{ width: profile.avatar_size ?? 100, height: profile.avatar_size ?? 100, boxShadow: `0 2px 8px ${text}15` }}>
            {profile.avatar_url && <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />}
          </div>
          <h1 className="mt-5 text-3xl tracking-tight" style={{ fontWeight: 600, color: text, letterSpacing: '-0.02em' }}>
            {profile.display_name || `@${profile.username}`}
          </h1>
          <p className="text-sm mt-1 opacity-70">@{profile.username}</p>
          {profile.bio && <p className="mt-4 text-[15px] leading-relaxed opacity-90 max-w-xs">{profile.bio}</p>}

          {socials?.length > 0 && (
            <div className="mt-6 flex gap-4 flex-wrap justify-center">
              {socials.map((soc: any) => {
                const meta = SOCIALS_BY_KEY[(soc.platform || '').toLowerCase()];
                const Icon = meta?.icon;
                return (
                  <a key={soc.id} href={soc.url} target="_blank" rel="noreferrer" onClick={() => t('social', soc.id)}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:-translate-y-0.5"
                    style={{ background: '#FFFFFF', color: text, boxShadow: `0 2px 6px ${text}12` }}>
                    {Icon && <Icon className="w-4 h-4" />}
                  </a>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-10 flex flex-col gap-3">
          {links.map((l: any, i: number) => {
            const colors = [bookmarkColor, '#DC2626', '#16A34A', '#2563EB', '#DB2777'];
            const color = colors[i % colors.length];
            return (
              <a key={l.id} href={l.url} target="_blank" rel="noreferrer" onClick={() => t('link', l.id)}
                className="relative group pl-6 pr-5 py-4 flex items-center justify-between paper-card"
                style={{ background: '#FFFFFF', color: text, boxShadow: `0 2px 8px ${text}0E` }}>
                <div className="absolute left-0 top-0 bottom-0 w-1.5 paper-bookmark" style={{ background: color }} aria-hidden />
                <span className="font-medium text-[15px]">{l.title}</span>
                <Bookmark className="w-4 h-4 opacity-50 transition-opacity group-hover:opacity-100" style={{ color }} />
              </a>
            );
          })}

          {banners?.map((b: any) => {
            const inner = (
              <div className="overflow-hidden" style={{ background: '#FFFFFF', boxShadow: `0 2px 10px ${text}12`, height: b.size === 'sm' ? 100 : b.size === 'lg' ? 240 : 160 }}>
                {b.image_url && <img src={b.image_url} alt="" className="w-full h-full object-cover" />}
              </div>
            );
            return b.link_url ? <a key={b.id} href={b.link_url} target="_blank" rel="noreferrer" onClick={() => t('banner', b.id)}>{inner}</a> : <div key={b.id}>{inner}</div>;
          })}

          {videos.map((v: any) => (
            <div key={v.id} className="overflow-hidden" style={{ background: '#FFFFFF', boxShadow: `0 2px 10px ${text}12` }}>
              <div className="relative aspect-video bg-black">
                {v.embed_url ? <iframe src={v.embed_url} className="absolute inset-0 w-full h-full" allowFullScreen />
                  : v.thumbnail ? <img src={v.thumbnail} alt="" className="w-full h-full object-cover" /> : null}
              </div>
              {v.title && <div className="px-4 py-3 text-sm font-medium">{v.title}</div>}
            </div>
          ))}
        </div>

        {!profile.is_pro && <BioflowzyBadge bgColor={profile.bg_color} />}
      </div>

      <style jsx>{`
        :global(.paper-grain) {
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/><feColorMatrix values='0 0 0 0 0.2 0 0 0 0 0.15 0 0 0 0 0.1 0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
          mix-blend-mode: multiply;
        }
        :global(.paper-card) { transition: transform 250ms ease, box-shadow 250ms ease; }
        :global(.paper-card:hover) { transform: translateX(2px) translateY(-1px); box-shadow: 0 4px 14px ${text}14; }
        :global(.paper-bookmark) { transition: width 250ms ease; }
        :global(.paper-card:hover .paper-bookmark) { width: 8px; }
      `}</style>
    </div>
  );
}

export default PaperTheme;
