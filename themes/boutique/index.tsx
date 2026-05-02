'use client';

import { useState } from 'react';
import { SOCIALS_BY_KEY } from '@/lib/socials';
import type { BioThemeProps, BioThemeMeta } from '@/themes/types';
import { getThemeSettings } from '@/themes/types';
import { BioflowzyBadge } from '@/components/bio/BioflowzyBadge';

export const boutiqueMeta: BioThemeMeta = {
  key: 'boutique',
  name: 'Boutique',
  description: 'Fashion e-com premium: serif refinada, lookbook no topo e paleta nude.',
  available: true,
  defaults: {
    bg_color: '#F4EDE4',
    button_color: '#1A1612',
    text_color: '#1A1612',
  },
  palettes: {
    bg: ['#F4EDE4', '#EFE6D7', '#FAF5EB', '#FFFFFF', '#1A1612', '#E8DCC9'],
    accent: ['#1A1612', '#8B6F4E', '#A98467', '#D4A373', '#6B4F3A', '#C9A77B'],
    text: ['#1A1612', '#3D2F23', '#F4EDE4', '#FFFFFF'],
  },
  controls: [
    { key: 'nudeTone', label: 'Tonalidade nude', type: 'color', palette: ['#F4EDE4', '#EFE6D7', '#E8DCC9', '#F2E3CF', '#F5E7D3', '#ECD9BE'], default: '#F4EDE4', group: 'Paleta' },
    { key: 'lookbook', label: 'Lookbook carousel', type: 'toggle', default: true, group: 'Topo' },
    { key: 'filter', label: 'Filtro padrao', type: 'select', options: [
      { value: 'all', label: 'All' }, { value: 'new', label: 'New In' }, { value: 'bestsellers', label: 'Bestsellers' }, { value: 'sale', label: 'Sale' },
    ], default: 'all', group: 'Filtros' },
  ],
};

export function BoutiqueTheme({ profile, links, socials, videos, banners, track }: BioThemeProps) {
  const s = getThemeSettings(profile, 'boutique', boutiqueMeta.controls);
  const [filter, setFilter] = useState(s.filter);
  const accent = profile.button_color || '#1A1612';
  const bg = profile.bg_color || '#F4EDE4';
  const text = profile.text_color || '#1A1612';
  const t = (a: string, b: string | null) => track?.(a, b);

  const filters = ['all', 'new', 'bestsellers', 'sale'];
  const visibleLinks = filter === 'all' ? links : filter === 'new' ? links.slice(0, 4) : filter === 'bestsellers' ? links.slice(0, 6) : links.filter((_: any, i: number) => i % 3 === 0);

  return (
    <div className="min-h-screen" style={{ backgroundColor: bg, color: text, fontFamily: 'Georgia, "Times New Roman", serif' }}>
      <div className="max-w-md mx-auto px-6 pt-[72px] pb-24">
        <div className="text-center mb-8">
          <div className="text-[10px] tracking-[0.5em] uppercase opacity-70" style={{ fontFamily: 'var(--font-space-grotesk), monospace' }}>Maison</div>
          <h1 className="mt-2 text-5xl tracking-tight" style={{ fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1 }}>
            {profile.display_name || profile.username}
          </h1>
          <div className="mt-2 text-xs italic opacity-70">— @{profile.username} —</div>
        </div>

        {s.lookbook && banners?.length > 0 && (
          <div className="mb-8">
            <div className="text-[10px] tracking-[0.4em] uppercase mb-2 opacity-70" style={{ fontFamily: 'var(--font-space-grotesk), monospace' }}>Lookbook</div>
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6 snap-x">
              {banners.map((b: any) => {
                const inner = (
                  <div className="shrink-0 snap-start overflow-hidden" style={{ width: 180, aspectRatio: '3/4', border: `1px solid ${text}22` }}>
                    {b.image_url && <img src={b.image_url} alt="" className="w-full h-full object-cover" />}
                  </div>
                );
                return b.link_url ? <a key={b.id} href={b.link_url} target="_blank" rel="noreferrer" onClick={() => t('banner', b.id)}>{inner}</a> : <div key={b.id}>{inner}</div>;
              })}
            </div>
          </div>
        )}

        <div className="flex items-center gap-4 mb-6 flex-wrap">
          <div className="rounded-full overflow-hidden shrink-0" style={{ width: 56, height: 56, border: `1px solid ${text}33` }}>
            {profile.avatar_url && <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />}
          </div>
          <div className="flex-1 min-w-0">
            {profile.bio && <p className="text-sm italic leading-relaxed opacity-85">&ldquo;{profile.bio}&rdquo;</p>}
          </div>
        </div>

        {socials?.length > 0 && (
          <div className="mb-8 flex gap-4 justify-center">
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

        <div className="flex gap-1 mb-6 overflow-x-auto pb-1 text-[10px] tracking-[0.3em] uppercase" style={{ fontFamily: 'var(--font-space-grotesk), monospace' }}>
          {filters.map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className="px-3 py-2 whitespace-nowrap transition-colors"
              style={{ background: filter === f ? accent : 'transparent', color: filter === f ? bg : text, border: filter === f ? 'none' : `1px solid ${text}33` }}>
              {f === 'all' ? 'All' : f === 'new' ? 'New In' : f === 'bestsellers' ? 'Bestsellers' : 'Sale'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {visibleLinks.map((l: any, i: number) => (
            <a key={l.id} href={l.url} target="_blank" rel="noreferrer" onClick={() => t('link', l.id)}
              className="group block boutique-card">
              <div className="overflow-hidden" style={{ aspectRatio: '4/5', background: `${text}08` }}>
                <div className="w-full h-full flex items-center justify-center text-5xl transition-transform duration-700 group-hover:scale-105" style={{ fontFamily: 'Didot, serif', color: `${text}30`, fontWeight: 300 }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
              </div>
              <div className="mt-3">
                <div className="text-[10px] tracking-[0.3em] uppercase opacity-60" style={{ fontFamily: 'var(--font-space-grotesk), monospace' }}>Ready to wear</div>
                <div className="mt-1 text-[15px] leading-tight" style={{ fontWeight: 400 }}>{l.title}</div>
                <div className="mt-1 text-xs opacity-70">Explore &rarr;</div>
              </div>
            </a>
          ))}
        </div>

        {videos.map((v: any) => (
          <figure key={v.id} className="mt-8">
            <div className="relative aspect-video overflow-hidden" style={{ border: `1px solid ${text}33` }}>
              {v.embed_url ? <iframe src={v.embed_url} className="absolute inset-0 w-full h-full" allowFullScreen />
                : v.thumbnail ? <img src={v.thumbnail} alt="" className="w-full h-full object-cover" /> : null}
            </div>
            {v.title && <figcaption className="mt-2 text-xs italic text-center opacity-70">{v.title}</figcaption>}
          </figure>
        ))}

        <div className="mt-10 text-center text-[10px] tracking-[0.5em] uppercase opacity-60" style={{ fontFamily: 'var(--font-space-grotesk), monospace' }}>
          Worldwide Shipping &middot; Made with Care
        </div>

        {!profile.is_pro && <BioflowzyBadge bgColor={profile.bg_color} />}
      </div>

      <style jsx>{`
        :global(.boutique-card) { transition: opacity 300ms ease; }
        :global(.boutique-card:hover) { opacity: 0.88; }
      `}</style>
    </div>
  );
}

export default BoutiqueTheme;
