'use client';

import { SOCIALS_BY_KEY } from '@/lib/socials';
import type { BioThemeProps, BioThemeMeta } from '@/themes/types';
import { getThemeSettings } from '@/themes/types';
import { BioflowzyBadge } from '@/components/bio/BioflowzyBadge';

export const monolithMeta: BioThemeMeta = {
  key: 'monolith',
  name: 'Monolith',
  description: 'Editorial serif premium com numeracao romana e coluna tipografica.',
  available: true,
  defaults: {
    bg_color: '#F5F0E8',
    button_color: '#7F1D1D',
    text_color: '#0F0F0F',
  },
  palettes: {
    bg: ['#F5F0E8', '#FBF7F0', '#0F0F0F', '#1C1917', '#E7E5E4', '#FFFFFF'],
    accent: ['#7F1D1D', '#0F0F0F', '#B45309', '#1E3A8A', '#365314', '#991B1B'],
    text: ['#0F0F0F', '#1C1917', '#F5F0E8', '#FFFFFF'],
  },
  controls: [
    { key: 'weight', label: 'Peso da serifa', type: 'slider', min: 300, max: 800, step: 100, default: 600, group: 'Tipografia' },
    { key: 'spacing', label: 'Espacamento vertical', type: 'slider', min: 12, max: 32, step: 2, suffix: 'px', default: 20, group: 'Tipografia' },
    { key: 'dropCap', label: 'Drop cap no bio', type: 'toggle', default: true, group: 'Tipografia' },
    { key: 'columnLine', label: 'Linha de coluna lateral', type: 'toggle', default: true, group: 'Layout' },
    { key: 'numbering', label: 'Numeracao', type: 'select', options: [
      { value: 'roman', label: 'Romana' },
      { value: 'arabic', label: 'Arabica' },
      { value: 'none', label: 'Nenhuma' },
    ], default: 'roman', group: 'Layout' },
  ],
};

const toRoman = (n: number): string => {
  const map: [number, string][] = [[10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
  let res = '';
  for (const [v, s] of map) while (n >= v) { res += s; n -= v; }
  return res;
};

export function MonolithTheme({ profile, links, socials, videos, banners, track }: BioThemeProps) {
  const s = getThemeSettings(profile, 'monolith', monolithMeta.controls);
  const accent = profile.button_color || '#7F1D1D';
  const bg = profile.bg_color || '#F5F0E8';
  const text = profile.text_color || '#0F0F0F';
  const t = (a: string, b: string | null) => track?.(a, b);
  const numbered = (i: number) => s.numbering === 'roman' ? toRoman(i + 1) : s.numbering === 'arabic' ? String(i + 1).padStart(2, '0') : '';

  return (
    <div className="min-h-screen pt-[72px] pb-24 relative" style={{ backgroundColor: bg, color: text, fontFamily: 'Georgia, "Times New Roman", serif' }}>
      {s.columnLine && (
        <div className="absolute top-0 bottom-0 left-8 w-px opacity-30 hidden md:block" style={{ background: text }} aria-hidden />
      )}
      <div className="max-w-md mx-auto px-6">
        <div className="text-[10px] tracking-[0.4em] uppercase opacity-60 mb-8 flex justify-between" style={{ fontFamily: 'var(--font-space-grotesk), monospace' }}>
          <span>Vol. I</span>
          <span>Est. {new Date(profile.id ? 2026 : 2026).toString().slice(-2)}</span>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="rounded-full overflow-hidden" style={{ width: profile.avatar_size ?? 100, height: profile.avatar_size ?? 100, border: `1px solid ${text}40` }}>
            {profile.avatar_url && <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />}
          </div>
          <h1 className="mt-6 text-4xl tracking-tight" style={{ fontWeight: s.weight, letterSpacing: '-0.02em', lineHeight: 1.05 }}>
            {profile.display_name || `@${profile.username}`}
          </h1>
          <div className="w-12 h-px my-4" style={{ background: accent }} />
          <p className="text-[10px] tracking-[0.4em] uppercase opacity-70" style={{ fontFamily: 'var(--font-space-grotesk), monospace' }}>@{profile.username}</p>
          {profile.bio && (
            <p className="mt-6 text-base leading-relaxed max-w-xs italic" style={{ color: text }}>
              {s.dropCap && profile.bio.length > 0 ? (
                <>
                  <span className="float-left text-5xl font-bold mr-2 mt-1 leading-none" style={{ color: accent, fontFamily: 'Georgia, serif' }}>
                    {profile.bio.charAt(0)}
                  </span>
                  {profile.bio.slice(1)}
                </>
              ) : profile.bio}
            </p>
          )}

          {socials?.length > 0 && (
            <div className="mt-6 flex gap-5 flex-wrap justify-center">
              {socials.map((soc: any) => {
                const meta = SOCIALS_BY_KEY[(soc.platform || '').toLowerCase()];
                const Icon = meta?.icon;
                return (
                  <a key={soc.id} href={soc.url} target="_blank" rel="noreferrer" onClick={() => t('social', soc.id)}
                    className="transition-opacity hover:opacity-60" style={{ color: text }} aria-label={meta?.label || soc.platform}>
                    {Icon && <Icon className="w-4 h-4" />}
                  </a>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-12 flex flex-col" style={{ gap: s.spacing }}>
          {links.map((l: any, i: number) => (
            <a key={l.id} href={l.url} target="_blank" rel="noreferrer" onClick={() => t('link', l.id)}
              className="group flex items-baseline gap-4 py-3 border-t monolith-link"
              style={{ borderColor: `${text}40`, color: text }}>
              {s.numbering !== 'none' && (
                <span className="text-xs tracking-widest opacity-50 w-8" style={{ fontFamily: 'var(--font-space-grotesk), monospace' }}>
                  {numbered(i)}
                </span>
              )}
              <span className="flex-1 text-lg tracking-tight" style={{ fontWeight: 500 }}>{l.title}</span>
              <span className="text-xs opacity-50 transition-transform group-hover:translate-x-1" aria-hidden>&rarr;</span>
            </a>
          ))}

          {banners?.map((b: any) => {
            const inner = (
              <div className="overflow-hidden" style={{ border: `1px solid ${text}30`, height: b.size === 'sm' ? 96 : b.size === 'lg' ? 240 : 160 }}>
                {b.image_url && <img src={b.image_url} alt="" className="w-full h-full object-cover" />}
              </div>
            );
            return b.link_url ? (
              <a key={b.id} href={b.link_url} target="_blank" rel="noreferrer" onClick={() => t('banner', b.id)}>{inner}</a>
            ) : <div key={b.id}>{inner}</div>;
          })}

          {videos.map((v: any) => (
            <figure key={v.id}>
              <div className="relative aspect-video overflow-hidden" style={{ border: `1px solid ${text}30` }}>
                {v.embed_url ? <iframe src={v.embed_url} className="absolute inset-0 w-full h-full" allowFullScreen />
                  : v.thumbnail ? <img src={v.thumbnail} alt="" className="w-full h-full object-cover" /> : null}
              </div>
              {v.title && <figcaption className="mt-2 text-xs italic opacity-70" style={{ color: text }}>{v.title}</figcaption>}
            </figure>
          ))}
        </div>

        {!profile.is_pro && <BioflowzyBadge bgColor={profile.bg_color} />}
      </div>
      <style jsx>{`
        :global(.monolith-link) { transition: background 300ms ease, padding 300ms ease; }
        :global(.monolith-link:hover) { background: rgba(0,0,0,0.03); padding-left: 8px; padding-right: 8px; }
      `}</style>
    </div>
  );
}

export default MonolithTheme;
