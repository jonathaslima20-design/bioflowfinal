'use client';

import { ShoppingBag, Star } from 'lucide-react';
import { SOCIALS_BY_KEY } from '@/lib/socials';
import type { BioThemeProps, BioThemeMeta } from '@/themes/types';
import { getThemeSettings } from '@/themes/types';
import { BioflowzyBadge } from '@/components/bio/BioflowzyBadge';

export const storefrontMeta: BioThemeMeta = {
  key: 'storefront',
  name: 'Storefront',
  description: 'Grid de produtos com preco, badges e botao Add to cart.',
  available: true,
  defaults: {
    bg_color: '#FFFFFF',
    button_color: '#111827',
    text_color: '#111827',
  },
  palettes: {
    bg: ['#FFFFFF', '#F9FAFB', '#FAFAFA', '#111827', '#0F172A', '#FEF3C7'],
    accent: ['#111827', '#DC2626', '#16A34A', '#2563EB', '#EA580C', '#F59E0B'],
    text: ['#111827', '#1F2937', '#FFFFFF', '#F9FAFB'],
  },
  controls: [
    { key: 'currency', label: 'Moeda', type: 'select', options: [
      { value: 'BRL', label: 'R$' }, { value: 'USD', label: '$' }, { value: 'EUR', label: '€' }, { value: 'GBP', label: '£' },
    ], default: 'USD', group: 'Precos' },
    { key: 'badges', label: 'Mostrar badges', type: 'toggle', default: true, group: 'Cards' },
    { key: 'cardStyle', label: 'Estilo do card', type: 'radio', options: [
      { value: 'square', label: 'Quadrado 1:1' }, { value: 'portrait', label: 'Retrato 3:4' },
    ], default: 'portrait', group: 'Cards' },
    { key: 'ctaColor', label: 'Cor do CTA', type: 'color', palette: ['#111827', '#DC2626', '#16A34A', '#2563EB', '#EA580C', '#F59E0B'], default: '#111827', group: 'CTA' },
  ],
};

const SYM: Record<string, string> = { BRL: 'R$', USD: '$', EUR: '€', GBP: '£' };

export function StorefrontTheme({ profile, links, socials, videos, banners, track }: BioThemeProps) {
  const s = getThemeSettings(profile, 'storefront', storefrontMeta.controls);
  const accent = s.ctaColor || '#111827';
  const bg = profile.bg_color || '#FFFFFF';
  const text = profile.text_color || '#111827';
  const isDark = bg === '#111827' || bg === '#0F172A';
  const card = isDark ? '#1F2937' : '#FFFFFF';
  const muted = isDark ? '#94A3B8' : '#6B7280';
  const border = isDark ? '#374151' : '#E5E7EB';
  const t = (a: string, b: string | null) => track?.(a, b);

  const priceFor = (l: any, i: number) => {
    const stored = profile.theme_settings?.storefront?.prices?.[l.id];
    if (stored) return stored;
    const base = ((l.id?.charCodeAt?.(0) || 65) * 3) % 280 + 19;
    return base + 0.99;
  };

  return (
    <div className="min-h-screen pt-[72px] pb-24 px-4" style={{ backgroundColor: bg, color: text, fontFamily: 'var(--font-inter), system-ui' }}>
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4" style={{ color: accent }} />
            <div className="font-bold tracking-tight text-lg">{profile.display_name || profile.username}</div>
          </div>
          <div className="flex items-center gap-2 text-xs" style={{ color: muted }}>
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span>In Stock</span>
          </div>
        </div>

        <div className="rounded-2xl p-5 mb-6" style={{ background: card, border: `1px solid ${border}` }}>
          <div className="flex items-center gap-4">
            <div className="rounded-full overflow-hidden shrink-0" style={{ width: 64, height: 64, border: `2px solid ${accent}` }}>
              {profile.avatar_url && <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold tracking-tight truncate">{profile.display_name || profile.username}</h1>
              <div className="text-xs" style={{ color: muted }}>@{profile.username} · Official Store</div>
              <div className="mt-1 flex items-center gap-1">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-current" style={{ color: '#F59E0B' }} />)}
                <span className="text-[10px] ml-1" style={{ color: muted }}>4.9 (2.4k reviews)</span>
              </div>
            </div>
          </div>
          {profile.bio && <p className="mt-3 text-sm leading-relaxed" style={{ color: muted }}>{profile.bio}</p>}
        </div>

        {socials?.length > 0 && (
          <div className="flex gap-2 mb-6 flex-wrap">
            {socials.map((soc: any) => {
              const meta = SOCIALS_BY_KEY[(soc.platform || '').toLowerCase()];
              const Icon = meta?.icon;
              return (
                <a key={soc.id} href={soc.url} target="_blank" rel="noreferrer" onClick={() => t('social', soc.id)}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                  style={{ border: `1px solid ${border}`, color: text }}>
                  {Icon && <Icon className="w-4 h-4" />}
                </a>
              );
            })}
          </div>
        )}

        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-bold uppercase tracking-wider">Products</div>
          <div className="text-xs" style={{ color: muted }}>{links.length} items</div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {links.map((l: any, i: number) => {
            const price = priceFor(l, i);
            const isNew = i === 0;
            const isSale = i % 3 === 1;
            const oldPrice = isSale ? (price * 1.4).toFixed(2) : null;
            return (
              <a key={l.id} href={l.url} target="_blank" rel="noreferrer" onClick={() => t('link', l.id)}
                className="group rounded-xl overflow-hidden storefront-card" style={{ background: card, border: `1px solid ${border}` }}>
                <div className="relative overflow-hidden" style={{ aspectRatio: s.cardStyle === 'portrait' ? '3/4' : '1/1' }}>
                  <div className="absolute inset-0 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${accent}15, ${accent}05)`, color: accent, fontSize: 44, fontWeight: 900 }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  {s.badges && isNew && (
                    <div className="absolute top-2 left-2 px-2 py-0.5 text-[9px] tracking-[0.2em] uppercase rounded-full font-bold text-white" style={{ background: '#16A34A' }}>New</div>
                  )}
                  {s.badges && isSale && (
                    <div className="absolute top-2 left-2 px-2 py-0.5 text-[9px] tracking-[0.2em] uppercase rounded-full font-bold text-white" style={{ background: '#DC2626' }}>Sale</div>
                  )}
                </div>
                <div className="p-3">
                  <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: muted }}>Collection</div>
                  <div className="text-sm font-semibold leading-tight line-clamp-2 min-h-[2.5em]">{l.title}</div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <div className="text-base font-bold" style={{ color: accent }}>{SYM[s.currency]}{price.toFixed(2)}</div>
                    {oldPrice && <div className="text-xs line-through" style={{ color: muted }}>{SYM[s.currency]}{oldPrice}</div>}
                  </div>
                  <button className="mt-2 w-full py-2 rounded-lg text-xs font-semibold transition-all group-hover:opacity-90" style={{ background: accent, color: isDark ? bg : '#fff' }}>
                    Add to cart
                  </button>
                </div>
              </a>
            );
          })}
        </div>

        {banners?.map((b: any) => {
          const inner = (
            <div className="rounded-xl overflow-hidden mt-4" style={{ border: `1px solid ${border}`, height: b.size === 'sm' ? 100 : b.size === 'lg' ? 240 : 160 }}>
              {b.image_url && <img src={b.image_url} alt="" className="w-full h-full object-cover" />}
            </div>
          );
          return b.link_url ? <a key={b.id} href={b.link_url} target="_blank" rel="noreferrer" onClick={() => t('banner', b.id)}>{inner}</a> : <div key={b.id}>{inner}</div>;
        })}

        {videos.map((v: any) => (
          <div key={v.id} className="rounded-xl overflow-hidden mt-4" style={{ background: card, border: `1px solid ${border}` }}>
            <div className="relative aspect-video bg-black">
              {v.embed_url ? <iframe src={v.embed_url} className="absolute inset-0 w-full h-full" allowFullScreen />
                : v.thumbnail ? <img src={v.thumbnail} alt="" className="w-full h-full object-cover" /> : null}
            </div>
            {v.title && <div className="p-3 text-sm font-semibold">{v.title}</div>}
          </div>
        ))}

        {!profile.is_pro && <BioflowzyBadge bgColor={profile.bg_color} />}
      </div>

      <style jsx>{`
        :global(.storefront-card) { transition: transform 250ms ease, box-shadow 250ms ease; }
        :global(.storefront-card:hover) { transform: translateY(-3px); box-shadow: 0 10px 24px rgba(0,0,0,0.08); }
      `}</style>
    </div>
  );
}

export default StorefrontTheme;
