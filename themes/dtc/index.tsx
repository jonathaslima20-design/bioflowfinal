'use client';

import { SOCIALS_BY_KEY } from '@/lib/socials';
import type { BioThemeProps, BioThemeMeta } from '@/themes/types';
import { getThemeSettings } from '@/themes/types';
import { BioflowzyBadge } from '@/components/bio/BioflowzyBadge';

export const dtcMeta: BioThemeMeta = {
  key: 'dtc',
  name: 'DTC Minimal',
  description: 'Aesop/Glossier-like: layout espacoso, serif fino, preco discreto em caixa alta.',
  available: true,
  defaults: {
    bg_color: '#EDE8DD',
    button_color: '#2C2420',
    text_color: '#2C2420',
  },
  palettes: {
    bg: ['#EDE8DD', '#F4EFE4', '#FAF5EC', '#E8DFCE', '#FFFFFF', '#DCD2BE'],
    accent: ['#2C2420', '#8B6F4E', '#6B5D4F', '#A89068', '#3A3530', '#907A58'],
    text: ['#2C2420', '#3A3530', '#1A1510', '#FFFFFF'],
  },
  controls: [
    { key: 'accentPastel', label: 'Accent pastel', type: 'color', palette: ['#2C2420', '#8B6F4E', '#C5A572', '#A89068', '#6B5D4F', '#907A58'], default: '#8B6F4E', group: 'Paleta' },
    { key: 'framePhoto', label: 'Moldura nas fotos', type: 'toggle', default: false, group: 'Cards' },
    { key: 'spacing', label: 'Espacamento vertical', type: 'slider', min: 24, max: 64, step: 4, suffix: 'px', default: 40, group: 'Layout' },
    { key: 'currency', label: 'Moeda', type: 'select', options: [
      { value: 'BRL', label: 'R$' }, { value: 'USD', label: '$' }, { value: 'EUR', label: '€' },
    ], default: 'USD', group: 'Precos' },
  ],
};

const SYM: Record<string, string> = { BRL: 'R$', USD: '$', EUR: '€' };

export function DtcTheme({ profile, links, socials, videos, banners, track }: BioThemeProps) {
  const s = getThemeSettings(profile, 'dtc', dtcMeta.controls);
  const accent = s.accentPastel || '#8B6F4E';
  const bg = profile.bg_color || '#EDE8DD';
  const text = profile.text_color || '#2C2420';
  const t = (a: string, b: string | null) => track?.(a, b);

  return (
    <div className="min-h-screen" style={{ backgroundColor: bg, color: text, fontFamily: 'Georgia, "Times New Roman", serif' }}>
      <div className="max-w-md mx-auto px-8 pt-[72px] pb-24">
        <div className="text-center mb-10">
          <div className="inline-block rounded-full overflow-hidden mb-6" style={{ width: profile.avatar_size ?? 84, height: profile.avatar_size ?? 84 }}>
            {profile.avatar_url && <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />}
          </div>
          <h1 className="text-3xl tracking-tight" style={{ fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            {profile.display_name || profile.username}
          </h1>
          <div className="mt-3 text-[10px] tracking-[0.5em] uppercase opacity-70" style={{ fontFamily: 'var(--font-space-grotesk), monospace' }}>
            — @{profile.username} —
          </div>
          {profile.bio && (
            <p className="mt-5 text-[15px] leading-relaxed max-w-xs mx-auto opacity-85" style={{ fontWeight: 300 }}>
              {profile.bio}
            </p>
          )}

          {socials?.length > 0 && (
            <div className="mt-6 flex gap-5 justify-center">
              {socials.map((soc: any) => {
                const meta = SOCIALS_BY_KEY[(soc.platform || '').toLowerCase()];
                const Icon = meta?.icon;
                return (
                  <a key={soc.id} href={soc.url} target="_blank" rel="noreferrer" onClick={() => t('social', soc.id)}
                    className="transition-opacity hover:opacity-60" style={{ color: text }}>
                    {Icon && <Icon className="w-4 h-4" />}
                  </a>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 my-10 text-[10px] tracking-[0.5em] uppercase" style={{ color: accent, fontFamily: 'var(--font-space-grotesk), monospace' }}>
          <div className="flex-1 h-px" style={{ background: accent, opacity: 0.4 }} />
          <span>Collection</span>
          <div className="flex-1 h-px" style={{ background: accent, opacity: 0.4 }} />
        </div>

        <div className="flex flex-col" style={{ gap: s.spacing }}>
          {links.map((l: any, i: number) => {
            const price = ((l.id?.charCodeAt?.(0) || 65) * 4) % 180 + 24;
            return (
              <a key={l.id} href={l.url} target="_blank" rel="noreferrer" onClick={() => t('link', l.id)}
                className="group block dtc-item">
                <div className={`overflow-hidden mb-4 ${s.framePhoto ? 'p-3' : ''}`} style={{ aspectRatio: '4/5', background: `${text}08`, border: s.framePhoto ? `1px solid ${accent}55` : 'none' }}>
                  <div className="w-full h-full flex items-center justify-center text-6xl transition-transform duration-700 group-hover:scale-[1.03]" style={{ color: `${accent}44`, fontFamily: 'Didot, serif', fontWeight: 300, letterSpacing: '-0.05em' }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <div className="flex-1">
                    <div className="text-[9px] tracking-[0.4em] uppercase opacity-60 mb-1" style={{ fontFamily: 'var(--font-space-grotesk), monospace' }}>Edition {String(i + 1).padStart(2, '0')}</div>
                    <div className="text-xl leading-tight" style={{ fontWeight: 400, letterSpacing: '-0.01em' }}>{l.title}</div>
                  </div>
                  <div className="text-[10px] tracking-[0.3em] uppercase whitespace-nowrap" style={{ color: accent, fontFamily: 'var(--font-space-grotesk), monospace', fontWeight: 600 }}>
                    {SYM[s.currency]} {price.toFixed(0)}.00
                  </div>
                </div>
                <div className="mt-4 text-center py-3 text-[10px] tracking-[0.4em] uppercase border-t border-b transition-all group-hover:bg-black/5" style={{ borderColor: `${accent}33`, color: accent, fontFamily: 'var(--font-space-grotesk), monospace' }}>
                  Shop Now &nbsp;&rarr;
                </div>
              </a>
            );
          })}

          {banners?.map((b: any) => {
            const inner = (
              <div className="overflow-hidden" style={{ aspectRatio: '16/10', border: s.framePhoto ? `1px solid ${accent}55` : 'none', padding: s.framePhoto ? 12 : 0 }}>
                <div className="w-full h-full overflow-hidden">
                  {b.image_url && <img src={b.image_url} alt="" className="w-full h-full object-cover" />}
                </div>
              </div>
            );
            return b.link_url ? <a key={b.id} href={b.link_url} target="_blank" rel="noreferrer" onClick={() => t('banner', b.id)}>{inner}</a> : <div key={b.id}>{inner}</div>;
          })}

          {videos.map((v: any) => (
            <figure key={v.id}>
              <div className="relative aspect-video overflow-hidden" style={{ border: `1px solid ${accent}33` }}>
                {v.embed_url ? <iframe src={v.embed_url} className="absolute inset-0 w-full h-full" allowFullScreen />
                  : v.thumbnail ? <img src={v.thumbnail} alt="" className="w-full h-full object-cover" /> : null}
              </div>
              {v.title && <figcaption className="mt-3 text-[10px] tracking-[0.4em] uppercase text-center" style={{ color: accent, fontFamily: 'var(--font-space-grotesk), monospace' }}>{v.title}</figcaption>}
            </figure>
          ))}
        </div>

        <div className="mt-16 text-center text-[9px] tracking-[0.5em] uppercase opacity-60" style={{ fontFamily: 'var(--font-space-grotesk), monospace' }}>
          Made with intention &middot; Shipped worldwide
        </div>

        {!profile.is_pro && <BioflowzyBadge bgColor={profile.bg_color} />}
      </div>

      <style jsx>{`
        :global(.dtc-item) { transition: opacity 300ms ease; }
        :global(.dtc-item:hover) { opacity: 0.9; }
      `}</style>
    </div>
  );
}

export default DtcTheme;
