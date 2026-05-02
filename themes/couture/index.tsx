'use client';

import { SOCIALS_BY_KEY } from '@/lib/socials';
import type { BioThemeProps, BioThemeMeta } from '@/themes/types';
import { getThemeSettings } from '@/themes/types';
import { BioflowzyBadge } from '@/components/bio/BioflowzyBadge';

export const coutureMeta: BioThemeMeta = {
  key: 'couture',
  name: 'Couture',
  description: 'Revista de alta costura: Didone, edicao e detalhes champagne.',
  available: true,
  defaults: {
    bg_color: '#F8F5EF',
    button_color: '#C9A77B',
    text_color: '#0B0B0B',
  },
  palettes: {
    bg: ['#F8F5EF', '#EFE6D3', '#FFFFFF', '#0B0B0B', '#1A1613', '#E8DFCE'],
    accent: ['#C9A77B', '#B08968', '#0B0B0B', '#8C1C13', '#3D2C2E', '#7E7A5A'],
    text: ['#0B0B0B', '#1A1613', '#F8F5EF', '#FFFFFF'],
  },
  controls: [
    { key: 'issueNumber', label: 'Numero da edicao', type: 'select', options: [
      { value: 'I', label: 'I' }, { value: 'II', label: 'II' }, { value: 'III', label: 'III' },
      { value: 'IV', label: 'IV' }, { value: 'V', label: 'V' }, { value: 'MMXXVI', label: 'MMXXVI' },
    ], default: 'I', group: 'Capa' },
    { key: 'season', label: 'Estacao', type: 'select', options: [
      { value: 'Spring 2026', label: 'Spring 2026' },
      { value: 'Summer 2026', label: 'Summer 2026' },
      { value: 'Fall 2026', label: 'Fall 2026' },
      { value: 'Winter 2026', label: 'Winter 2026' },
      { value: 'Resort 2026', label: 'Resort 2026' },
    ], default: 'Spring 2026', group: 'Capa' },
    { key: 'diagonal', label: 'Corte diagonal nos cards', type: 'toggle', default: true, group: 'Cards' },
    { key: 'metallic', label: 'Cor metalica de detalhe', type: 'color', palette: ['#C9A77B', '#B08968', '#D4AF37', '#C0C0C0', '#B76E79', '#8C7853'], default: '#C9A77B', group: 'Detalhes' },
  ],
};

export function CoutureTheme({ profile, links, socials, videos, banners, track }: BioThemeProps) {
  const s = getThemeSettings(profile, 'couture', coutureMeta.controls);
  const accent = profile.button_color || '#C9A77B';
  const bg = profile.bg_color || '#F8F5EF';
  const text = profile.text_color || '#0B0B0B';
  const metallic = s.metallic || '#C9A77B';
  const t = (a: string, b: string | null) => track?.(a, b);

  return (
    <div className="min-h-screen pt-[72px] pb-24 px-6" style={{ backgroundColor: bg, color: text }}>
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between text-[10px] tracking-[0.4em] uppercase" style={{ fontFamily: 'var(--font-space-grotesk), monospace', color: text }}>
          <span>Issue N° {s.issueNumber}</span>
          <div className="flex-1 mx-3 h-px" style={{ background: text, opacity: 0.3 }} />
          <span style={{ color: metallic }}>{s.season}</span>
        </div>

        <div className="mt-8 text-center">
          <div className="text-[10px] tracking-[0.5em] uppercase opacity-60 mb-4" style={{ fontFamily: 'var(--font-space-grotesk), monospace' }}>Le Magazine</div>
          <h1 className="text-6xl leading-[0.9] tracking-tight" style={{ fontFamily: 'Didot, "Bodoni MT", serif', fontWeight: 400, letterSpacing: '-0.02em' }}>
            {profile.display_name || profile.username}
          </h1>
          <div className="mt-3 text-[10px] tracking-[0.4em] uppercase" style={{ color: metallic }}>@{profile.username}</div>

          <div className="mt-6 relative mx-auto" style={{ width: profile.avatar_size ? profile.avatar_size + 40 : 160, height: profile.avatar_size ? profile.avatar_size + 40 : 160 }}>
            <div className="absolute inset-0 couture-frame" style={{ border: `1px solid ${metallic}` }} />
            <div className="absolute inset-4 overflow-hidden">
              {profile.avatar_url && <img src={profile.avatar_url} alt="" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />}
            </div>
          </div>

          {profile.bio && (
            <p className="mt-6 text-base italic leading-relaxed max-w-xs mx-auto" style={{ fontFamily: 'Didot, "Bodoni MT", serif' }}>
              &ldquo;{profile.bio}&rdquo;
            </p>
          )}

          {socials?.length > 0 && (
            <div className="mt-6 flex gap-5 flex-wrap justify-center">
              {socials.map((soc: any) => {
                const meta = SOCIALS_BY_KEY[(soc.platform || '').toLowerCase()];
                const Icon = meta?.icon;
                return (
                  <a key={soc.id} href={soc.url} target="_blank" rel="noreferrer" onClick={() => t('social', soc.id)}
                    className="transition-colors hover:opacity-60" style={{ color: text }}>
                    {Icon && <Icon className="w-4 h-4" />}
                  </a>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-12 flex items-center gap-4 text-[10px] tracking-[0.4em] uppercase" style={{ fontFamily: 'var(--font-space-grotesk), monospace', color: metallic }}>
          <div className="flex-1 h-px" style={{ background: metallic, opacity: 0.5 }} />
          <span>Le Sommaire</span>
          <div className="flex-1 h-px" style={{ background: metallic, opacity: 0.5 }} />
        </div>

        <div className="mt-6 flex flex-col gap-4">
          {links.map((l: any, i: number) => (
            <a key={l.id} href={l.url} target="_blank" rel="noreferrer" onClick={() => t('link', l.id)}
              className="group relative overflow-hidden px-5 py-5 couture-card"
              style={{
                background: '#FFFFFF',
                border: `1px solid ${text}15`,
                clipPath: s.diagonal ? 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)' : 'none',
              }}>
              <div className="flex items-baseline gap-4">
                <div className="text-xs tracking-[0.3em] uppercase" style={{ color: metallic, fontFamily: 'var(--font-space-grotesk), monospace' }}>
                  p.{String(i + 1).padStart(3, '0')}
                </div>
                <div className="flex-1 text-lg" style={{ fontFamily: 'Didot, "Bodoni MT", serif', color: text }}>{l.title}</div>
                <div className="text-xs opacity-40 transition-transform group-hover:translate-x-1">&rarr;</div>
              </div>
              <div className="absolute bottom-0 left-0 h-px couture-underline" style={{ background: metallic, width: '0%' }} />
            </a>
          ))}

          {banners?.map((b: any) => {
            const inner = (
              <div className="overflow-hidden relative" style={{ border: `1px solid ${text}15`, height: b.size === 'sm' ? 100 : b.size === 'lg' ? 260 : 180 }}>
                {b.image_url && <img src={b.image_url} alt="" className="w-full h-full object-cover" />}
                <div className="absolute bottom-2 left-3 text-[10px] tracking-[0.4em] uppercase text-white mix-blend-difference">Editorial</div>
              </div>
            );
            return b.link_url ? <a key={b.id} href={b.link_url} target="_blank" rel="noreferrer" onClick={() => t('banner', b.id)}>{inner}</a> : <div key={b.id}>{inner}</div>;
          })}

          {videos.map((v: any) => (
            <figure key={v.id} className="relative">
              <div className="relative aspect-video overflow-hidden" style={{ border: `1px solid ${metallic}` }}>
                {v.embed_url ? <iframe src={v.embed_url} className="absolute inset-0 w-full h-full" allowFullScreen />
                  : v.thumbnail ? <img src={v.thumbnail} alt="" className="w-full h-full object-cover" /> : null}
              </div>
              {v.title && (
                <figcaption className="mt-2 text-xs italic opacity-80" style={{ fontFamily: 'Didot, serif', color: text }}>
                  <span style={{ color: metallic }}>Film —</span> {v.title}
                </figcaption>
              )}
            </figure>
          ))}
        </div>

        {!profile.is_pro && <BioflowzyBadge bgColor={profile.bg_color} />}
      </div>

      <style jsx>{`
        :global(.couture-card:hover .couture-underline) { width: 100%; transition: width 500ms ease; }
        :global(.couture-frame::before), :global(.couture-frame::after) {
          content: ''; position: absolute; width: 12px; height: 12px; background: ${metallic};
        }
        :global(.couture-frame::before) { top: -1px; left: -1px; }
        :global(.couture-frame::after) { bottom: -1px; right: -1px; }
      `}</style>
    </div>
  );
}

export default CoutureTheme;
