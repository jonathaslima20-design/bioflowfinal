'use client';

import { SOCIALS_BY_KEY } from '@/lib/socials';
import type { BioThemeProps, BioThemeMeta } from '@/themes/types';
import { getThemeSettings } from '@/themes/types';
import { BioflowzyBadge } from '@/components/bio/BioflowzyBadge';

export const kineticMeta: BioThemeMeta = {
  key: 'kinetic',
  name: 'Kinetic',
  description: 'Tipografia gigante como protagonista: split-text, fill e assimetria.',
  available: true,
  defaults: {
    bg_color: '#0A0A0A',
    button_color: '#FACC15',
    text_color: '#FAFAFA',
  },
  palettes: {
    bg: ['#0A0A0A', '#000000', '#18181B', '#FAFAFA', '#F5F5F5', '#1C1917'],
    accent: ['#FACC15', '#FF2D55', '#00FFA3', '#22D3EE', '#F97316', '#0A0A0A', '#FAFAFA'],
    text: ['#FAFAFA', '#FFFFFF', '#0A0A0A', '#E5E5E5'],
  },
  controls: [
    { key: 'weight', label: 'Peso base', type: 'slider', min: 500, max: 900, step: 100, default: 800, group: 'Tipografia' },
    { key: 'spacing', label: 'Espacamento vertical', type: 'slider', min: 16, max: 48, step: 4, suffix: 'px', default: 28, group: 'Layout' },
    { key: 'splitText', label: 'Efeito split-text no hover', type: 'toggle', default: true, group: 'Interacao' },
    { key: 'align', label: 'Alinhamento', type: 'radio', options: [
      { value: 'left', label: 'Esquerda' },
      { value: 'right', label: 'Direita' },
      { value: 'alternate', label: 'Alternado' },
    ], default: 'alternate', group: 'Layout' },
    { key: 'fill', label: 'Estilo de fill no hover', type: 'select', options: [
      { value: 'accent', label: 'Cor de destaque' },
      { value: 'outline', label: 'Outline para solido' },
      { value: 'underline', label: 'Sublinhar' },
    ], default: 'accent', group: 'Interacao' },
  ],
};

export function KineticTheme({ profile, links, socials, videos, banners, track }: BioThemeProps) {
  const s = getThemeSettings(profile, 'kinetic', kineticMeta.controls);
  const accent = profile.button_color || '#FACC15';
  const bg = profile.bg_color || '#0A0A0A';
  const text = profile.text_color || '#FAFAFA';
  const t = (a: string, b: string | null) => track?.(a, b);

  const getAlign = (i: number) => {
    if (s.align === 'left') return 'text-left';
    if (s.align === 'right') return 'text-right';
    return i % 2 === 0 ? 'text-left' : 'text-right';
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: bg, color: text, fontFamily: 'var(--font-space-grotesk), "Helvetica Neue", sans-serif' }}>
      <div className="max-w-md mx-auto px-6 pt-[72px] pb-24">
        <div className="flex items-baseline justify-between text-[10px] tracking-[0.4em] uppercase opacity-60 mb-12">
          <span>Index</span>
          <span>—</span>
          <span>{new Date().getFullYear()}</span>
        </div>

        <div className="mb-16">
          <div className="flex items-center gap-4">
            <div className="rounded-full overflow-hidden shrink-0" style={{ width: 56, height: 56, border: `2px solid ${accent}` }}>
              {profile.avatar_url && <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />}
            </div>
            <div className="text-[10px] tracking-[0.4em] uppercase opacity-70">@{profile.username}</div>
          </div>
          <h1 className="mt-6 uppercase kinetic-headline" style={{
            fontWeight: s.weight,
            fontSize: 'clamp(3rem, 14vw, 5.5rem)',
            lineHeight: 0.85,
            letterSpacing: '-0.04em',
            color: text,
          }}>
            {profile.display_name || profile.username}
          </h1>
          {profile.bio && (
            <p className="mt-6 text-lg leading-snug max-w-xs" style={{ color: text, opacity: 0.85 }}>
              {profile.bio}
            </p>
          )}

          {socials?.length > 0 && (
            <div className="mt-8 flex gap-5 flex-wrap">
              {socials.map((soc: any) => {
                const meta = SOCIALS_BY_KEY[(soc.platform || '').toLowerCase()];
                const Icon = meta?.icon;
                return (
                  <a key={soc.id} href={soc.url} target="_blank" rel="noreferrer" onClick={() => t('social', soc.id)}
                    className="transition-opacity hover:opacity-60" style={{ color: text }}>
                    {Icon && <Icon className="w-5 h-5" />}
                  </a>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex flex-col" style={{ gap: s.spacing }}>
          {links.map((l: any, i: number) => (
            <a key={l.id} href={l.url} target="_blank" rel="noreferrer" onClick={() => t('link', l.id)}
              className={`group relative block ${getAlign(i)} kinetic-item`}>
              <div className="flex items-baseline gap-3" style={{ justifyContent: getAlign(i) === 'text-right' ? 'flex-end' : 'flex-start' }}>
                <span className="text-[10px] tracking-[0.4em] uppercase opacity-50">{String(i + 1).padStart(2, '0')}</span>
                <span
                  className={`uppercase kinetic-word ${s.fill === 'outline' ? 'kinetic-outline' : s.fill === 'underline' ? 'kinetic-underline' : 'kinetic-fill'}`}
                  style={{
                    fontWeight: s.weight,
                    fontSize: 'clamp(1.75rem, 7.5vw, 2.75rem)',
                    lineHeight: 0.95,
                    letterSpacing: '-0.03em',
                    ['--kin-accent' as any]: accent,
                    ['--kin-text' as any]: text,
                  }}>
                  {l.title}
                </span>
              </div>
              <span className="inline-block text-[10px] tracking-[0.4em] uppercase opacity-50 mt-2 transition-transform group-hover:translate-x-1">
                {getAlign(i) === 'text-right' ? <>&larr; open</> : <>open &rarr;</>}
              </span>
            </a>
          ))}

          {banners?.map((b: any) => {
            const inner = (
              <div className="overflow-hidden" style={{ height: b.size === 'sm' ? 100 : b.size === 'lg' ? 280 : 180, border: `2px solid ${text}` }}>
                {b.image_url && <img src={b.image_url} alt="" className="w-full h-full object-cover" />}
              </div>
            );
            return b.link_url ? <a key={b.id} href={b.link_url} target="_blank" rel="noreferrer" onClick={() => t('banner', b.id)}>{inner}</a> : <div key={b.id}>{inner}</div>;
          })}

          {videos.map((v: any, i: number) => (
            <figure key={v.id} className={getAlign(i)}>
              <div className="relative aspect-video overflow-hidden" style={{ border: `2px solid ${text}` }}>
                {v.embed_url ? <iframe src={v.embed_url} className="absolute inset-0 w-full h-full" allowFullScreen />
                  : v.thumbnail ? <img src={v.thumbnail} alt="" className="w-full h-full object-cover" /> : null}
              </div>
              {v.title && <figcaption className="mt-2 text-xs tracking-[0.3em] uppercase opacity-70">// {v.title}</figcaption>}
            </figure>
          ))}
        </div>

        {!profile.is_pro && <BioflowzyBadge bgColor={profile.bg_color} />}
      </div>

      <style jsx>{`
        :global(.kinetic-headline) { animation: kin-slide 700ms cubic-bezier(0.2,0.8,0.2,1) both; }
        :global(.kinetic-word) {
          display: inline-block;
          transition: transform 300ms ease, color 300ms ease, letter-spacing 300ms ease;
        }
        :global(.kinetic-fill) { color: var(--kin-text); }
        :global(.kinetic-fill:hover), :global(.group:hover .kinetic-fill) { color: var(--kin-accent); letter-spacing: -0.01em; }
        :global(.kinetic-outline) {
          -webkit-text-stroke: 1.5px var(--kin-text);
          color: transparent;
        }
        :global(.group:hover .kinetic-outline) { color: var(--kin-accent); -webkit-text-stroke-color: var(--kin-accent); }
        :global(.kinetic-underline) { position: relative; background-image: linear-gradient(var(--kin-accent), var(--kin-accent)); background-repeat: no-repeat; background-size: 0% 4px; background-position: 0 100%; transition: background-size 400ms ease; }
        :global(.group:hover .kinetic-underline) { background-size: 100% 4px; }
        :global(.kinetic-item) { transition: transform 300ms ease; }
        :global(.kinetic-item:hover) { transform: translateX(${s.align === 'right' ? '-6px' : '6px'}); }
        @keyframes kin-slide { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @media (prefers-reduced-motion: reduce) { :global(.kinetic-headline), :global(.kinetic-word), :global(.kinetic-item) { animation: none !important; transition: none !important; } }
      `}</style>
    </div>
  );
}

export default KineticTheme;
