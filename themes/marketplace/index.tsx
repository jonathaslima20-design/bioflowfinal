'use client';

import { Star, Truck } from 'lucide-react';
import { SOCIALS_BY_KEY } from '@/lib/socials';
import type { BioThemeProps, BioThemeMeta } from '@/themes/types';
import { getThemeSettings } from '@/themes/types';
import { BioflowzyBadge } from '@/components/bio/BioflowzyBadge';

export const marketplaceMeta: BioThemeMeta = {
  key: 'marketplace',
  name: 'Marketplace Grid',
  description: 'Masonry com avaliacoes, preco e tag frete gratis com chips de categoria.',
  available: true,
  defaults: {
    bg_color: '#F5F5F5',
    button_color: '#2563EB',
    text_color: '#0F172A',
  },
  palettes: {
    bg: ['#F5F5F5', '#FAFAFA', '#FFFFFF', '#0F172A', '#111827', '#F1F5F9'],
    accent: ['#2563EB', '#10B981', '#F59E0B', '#DC2626', '#7C3AED', '#0EA5E9'],
    text: ['#0F172A', '#1F2937', '#F5F5F5', '#FFFFFF'],
  },
  controls: [
    { key: 'density', label: 'Densidade', type: 'radio', options: [
      { value: 'tight', label: 'Compacto' }, { value: 'normal', label: 'Normal' }, { value: 'airy', label: 'Espacoso' },
    ], default: 'normal', group: 'Layout' },
    { key: 'stars', label: 'Mostrar avaliacoes', type: 'toggle', default: true, group: 'Cards' },
    { key: 'freeShipColor', label: 'Cor do frete gratis', type: 'color', palette: ['#10B981', '#16A34A', '#22C55E', '#0EA5E9', '#2563EB', '#7C3AED'], default: '#10B981', group: 'Cards' },
    { key: 'currency', label: 'Moeda', type: 'select', options: [
      { value: 'BRL', label: 'R$' }, { value: 'USD', label: '$' }, { value: 'EUR', label: '€' }, { value: 'GBP', label: '£' },
    ], default: 'USD', group: 'Precos' },
  ],
};

const SYM: Record<string, string> = { BRL: 'R$', USD: '$', EUR: '€', GBP: '£' };
const CATEGORIES = ['All', 'Trending', 'New', 'Top Rated', 'Free Ship'];

export function MarketplaceTheme({ profile, links, socials, videos, banners, track }: BioThemeProps) {
  const s = getThemeSettings(profile, 'marketplace', marketplaceMeta.controls);
  const accent = profile.button_color || '#2563EB';
  const bg = profile.bg_color || '#F5F5F5';
  const text = profile.text_color || '#0F172A';
  const isDark = bg === '#0F172A' || bg === '#111827';
  const card = isDark ? '#1F2937' : '#FFFFFF';
  const muted = isDark ? '#94A3B8' : '#64748B';
  const border = isDark ? '#334155' : '#E5E7EB';
  const gap = s.density === 'tight' ? 'gap-2' : s.density === 'airy' ? 'gap-4' : 'gap-3';
  const t = (a: string, b: string | null) => track?.(a, b);

  return (
    <div className="min-h-screen pt-[72px] pb-24 px-3" style={{ backgroundColor: bg, color: text, fontFamily: 'var(--font-inter), system-ui' }}>
      <div className="max-w-md mx-auto">
        <div className="rounded-xl p-4 mb-4" style={{ background: card, border: `1px solid ${border}` }}>
          <div className="flex items-center gap-3">
            <div className="rounded-lg overflow-hidden shrink-0" style={{ width: 56, height: 56 }}>
              {profile.avatar_url && <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold truncate">{profile.display_name || profile.username}</h1>
                <div className="px-1.5 py-0.5 text-[9px] font-bold rounded" style={{ background: `${accent}15`, color: accent }}>VERIFIED</div>
              </div>
              <div className="flex items-center gap-1 text-xs mt-0.5" style={{ color: muted }}>
                <Star className="w-3 h-3 fill-current" style={{ color: '#F59E0B' }} />
                <span className="font-semibold">4.9</span>
                <span>·</span>
                <span>12k followers</span>
              </div>
            </div>
            <button className="px-4 py-2 rounded-lg text-xs font-semibold text-white" style={{ background: accent }}>Follow</button>
          </div>
          {profile.bio && <p className="mt-3 text-xs" style={{ color: muted }}>{profile.bio}</p>}
        </div>

        {socials?.length > 0 && (
          <div className="flex gap-2 mb-4 flex-wrap">
            {socials.map((soc: any) => {
              const meta = SOCIALS_BY_KEY[(soc.platform || '').toLowerCase()];
              const Icon = meta?.icon;
              return (
                <a key={soc.id} href={soc.url} target="_blank" rel="noreferrer" onClick={() => t('social', soc.id)}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
                  style={{ background: card, border: `1px solid ${border}`, color: text }}>
                  {Icon && <Icon className="w-4 h-4" />}
                </a>
              );
            })}
          </div>
        )}

        <div className="flex gap-1.5 mb-3 overflow-x-auto pb-1">
          {CATEGORIES.map((c, i) => (
            <button key={c}
              className="px-3 py-1.5 text-xs font-semibold whitespace-nowrap rounded-full transition-colors"
              style={{ background: i === 0 ? accent : card, color: i === 0 ? '#fff' : text, border: i === 0 ? 'none' : `1px solid ${border}` }}>
              {c}
            </button>
          ))}
        </div>

        <div className={`grid grid-cols-2 ${gap}`} style={{ alignItems: 'start' }}>
          {links.map((l: any, i: number) => {
            const height = s.density === 'tight' ? (i % 2 === 0 ? 180 : 220) : (i % 3 === 0 ? 200 : i % 3 === 1 ? 260 : 220);
            const price = ((l.id?.charCodeAt?.(0) || 65) * 7) % 500 + 29;
            const rating = (4 + (i % 10) / 10).toFixed(1);
            const reviews = 50 + (i * 37) % 900;
            const freeShip = i % 2 === 0;
            return (
              <a key={l.id} href={l.url} target="_blank" rel="noreferrer" onClick={() => t('link', l.id)}
                className="group rounded-xl overflow-hidden block marketplace-card" style={{ background: card, border: `1px solid ${border}` }}>
                <div className="relative overflow-hidden" style={{ height }}>
                  <div className="absolute inset-0 flex items-center justify-center font-black" style={{
                    background: `linear-gradient(135deg, ${accent}20, ${accent}05)`,
                    color: accent, fontSize: 48, letterSpacing: '-0.05em',
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  {freeShip && (
                    <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded text-[9px] font-bold flex items-center gap-1 text-white" style={{ background: s.freeShipColor }}>
                      <Truck className="w-2.5 h-2.5" /> FREE
                    </div>
                  )}
                </div>
                <div className="p-2.5">
                  <div className="text-xs font-medium leading-snug line-clamp-2 min-h-[2.4em]">{l.title}</div>
                  <div className="mt-1 text-base font-bold" style={{ color: text }}>{SYM[s.currency]}{price.toFixed(2)}</div>
                  {s.stars && (
                    <div className="mt-1 flex items-center gap-1 text-[10px]" style={{ color: muted }}>
                      <Star className="w-2.5 h-2.5 fill-current" style={{ color: '#F59E0B' }} />
                      <span className="font-semibold" style={{ color: text }}>{rating}</span>
                      <span>({reviews})</span>
                    </div>
                  )}
                </div>
              </a>
            );
          })}
        </div>

        {banners?.map((b: any) => {
          const inner = (
            <div className="rounded-xl overflow-hidden mt-3" style={{ border: `1px solid ${border}`, height: b.size === 'sm' ? 100 : b.size === 'lg' ? 240 : 160 }}>
              {b.image_url && <img src={b.image_url} alt="" className="w-full h-full object-cover" />}
            </div>
          );
          return b.link_url ? <a key={b.id} href={b.link_url} target="_blank" rel="noreferrer" onClick={() => t('banner', b.id)}>{inner}</a> : <div key={b.id}>{inner}</div>;
        })}

        {videos.map((v: any) => (
          <div key={v.id} className="rounded-xl overflow-hidden mt-3" style={{ background: card, border: `1px solid ${border}` }}>
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
        :global(.marketplace-card) { transition: transform 200ms ease, box-shadow 200ms ease; }
        :global(.marketplace-card:hover) { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,0.08); }
      `}</style>
    </div>
  );
}

export default MarketplaceTheme;
