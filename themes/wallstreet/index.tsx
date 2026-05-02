'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';
import { SOCIALS_BY_KEY } from '@/lib/socials';
import type { BioThemeProps, BioThemeMeta } from '@/themes/types';
import { getThemeSettings } from '@/themes/types';
import { BioflowzyBadge } from '@/components/bio/BioflowzyBadge';

export const wallstreetMeta: BioThemeMeta = {
  key: 'wallstreet',
  name: 'Wall Street',
  description: 'Financeiro serio: navy/gold, ticker animado e serif classica.',
  available: true,
  defaults: {
    bg_color: '#0A1E3F',
    button_color: '#D4AF37',
    text_color: '#F5EFD9',
  },
  palettes: {
    bg: ['#0A1E3F', '#0F2847', '#051437', '#1A1A1A', '#FDFBF3', '#E8E5DC'],
    accent: ['#D4AF37', '#C9A961', '#E3B85B', '#BC9B4F', '#0A1E3F', '#8B0000'],
    text: ['#F5EFD9', '#FFFFFF', '#0A1E3F', '#1A1A1A'],
  },
  controls: [
    { key: 'goldColor', label: 'Tonalidade do gold', type: 'color', palette: ['#D4AF37', '#C9A961', '#E3B85B', '#BC9B4F', '#B8860B', '#DAA520'], default: '#D4AF37', group: 'Paleta' },
    { key: 'ticker', label: 'Ticker no topo', type: 'toggle', default: true, group: 'Ticker' },
    { key: 'tickerSpeed', label: 'Velocidade do ticker', type: 'slider', min: 20, max: 80, step: 5, suffix: 's', default: 40, group: 'Ticker' },
    { key: 'serifStyle', label: 'Estilo do serif', type: 'select', options: [
      { value: 'classic', label: 'Classico' }, { value: 'didone', label: 'Didone' }, { value: 'slab', label: 'Slab' },
    ], default: 'classic', group: 'Tipografia' },
  ],
};

const SERIF: Record<string, string> = {
  classic: 'Georgia, "Times New Roman", serif',
  didone: 'Didot, "Bodoni MT", serif',
  slab: '"Roboto Slab", "Rockwell", serif',
};

export function WallStreetTheme({ profile, links, socials, videos, banners, track }: BioThemeProps) {
  const s = getThemeSettings(profile, 'wallstreet', wallstreetMeta.controls);
  const gold = s.goldColor || '#D4AF37';
  const bg = profile.bg_color || '#0A1E3F';
  const text = profile.text_color || '#F5EFD9';
  const font = SERIF[s.serifStyle] || SERIF.classic;
  const t = (a: string, b: string | null) => track?.(a, b);

  const tickerItems = [
    { sym: 'BIOFLOWZY', val: '482.15', chg: '+2.4%', up: true },
    { sym: 'S&P 500', val: '5,842.31', chg: '+0.8%', up: true },
    { sym: 'DOW J', val: '42,118.45', chg: '-0.3%', up: false },
    { sym: 'NASDAQ', val: '18,972.12', chg: '+1.2%', up: true },
    { sym: 'GOLD', val: '2,685.40', chg: '+0.5%', up: true },
    { sym: 'EUR/USD', val: '1.0842', chg: '-0.1%', up: false },
    { sym: 'BTC', val: '98,452.10', chg: '+3.1%', up: true },
    { sym: 'CRUDE', val: '72.84', chg: '-1.2%', up: false },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: bg, color: text, fontFamily: font }}>
      {s.ticker && (
        <div className="fixed top-[56px] left-0 right-0 z-20 overflow-hidden border-y" style={{ background: '#000', borderColor: `${gold}55` }}>
          <div className="flex gap-8 py-1.5 ws-ticker text-xs whitespace-nowrap" style={{ fontFamily: 'var(--font-space-grotesk), monospace' }}>
            {[...tickerItems, ...tickerItems].map((it, i) => (
              <span key={i} className="flex items-center gap-2 px-2">
                <span style={{ color: gold }}>{it.sym}</span>
                <span style={{ color: '#fff' }}>{it.val}</span>
                <span style={{ color: it.up ? '#4ADE80' : '#F87171' }}>{it.chg}</span>
                {it.up ? <TrendingUp className="w-3 h-3" style={{ color: '#4ADE80' }} /> : <TrendingDown className="w-3 h-3" style={{ color: '#F87171' }} />}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="max-w-md mx-auto px-6 pb-24" style={{ paddingTop: s.ticker ? 110 : 72 }}>
        <div className="text-center border-y py-6" style={{ borderColor: `${gold}55` }}>
          <div className="text-[10px] tracking-[0.5em] uppercase" style={{ color: gold, fontFamily: 'var(--font-space-grotesk), monospace' }}>Est. MMXXVI</div>
          <h1 className="mt-3 text-4xl tracking-tight" style={{ fontWeight: 700, letterSpacing: '-0.01em' }}>
            {profile.display_name || profile.username}
          </h1>
          <div className="mt-1 text-xs italic" style={{ color: gold }}>— @{profile.username} —</div>
        </div>

        <div className="mt-6 flex flex-col items-center">
          <div className="rounded-full overflow-hidden" style={{ width: profile.avatar_size ?? 108, height: profile.avatar_size ?? 108, border: `2px solid ${gold}`, boxShadow: `0 0 0 4px ${bg}, 0 0 0 5px ${gold}66` }}>
            {profile.avatar_url && <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />}
          </div>
          {profile.bio && (
            <p className="mt-5 text-center italic text-[15px] leading-relaxed max-w-sm" style={{ opacity: 0.9 }}>
              &ldquo;{profile.bio}&rdquo;
            </p>
          )}

          {socials?.length > 0 && (
            <div className="mt-5 flex gap-5 flex-wrap justify-center">
              {socials.map((soc: any) => {
                const meta = SOCIALS_BY_KEY[(soc.platform || '').toLowerCase()];
                const Icon = meta?.icon;
                return (
                  <a key={soc.id} href={soc.url} target="_blank" rel="noreferrer" onClick={() => t('social', soc.id)}
                    className="transition-colors hover:opacity-70" style={{ color: gold }}>
                    {Icon && <Icon className="w-5 h-5" />}
                  </a>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-8 flex items-center gap-3 text-[10px] tracking-[0.4em] uppercase" style={{ color: gold, fontFamily: 'var(--font-space-grotesk), monospace' }}>
          <div className="flex-1 h-px" style={{ background: gold, opacity: 0.5 }} />
          <span>Portfolio</span>
          <div className="flex-1 h-px" style={{ background: gold, opacity: 0.5 }} />
        </div>

        <div className="mt-5 flex flex-col">
          {links.map((l: any, i: number) => (
            <a key={l.id} href={l.url} target="_blank" rel="noreferrer" onClick={() => t('link', l.id)}
              className="group flex items-center gap-4 py-4 border-b transition-all hover:pl-2"
              style={{ borderColor: `${gold}33`, color: text }}>
              <div className="text-3xl" style={{ color: gold, fontWeight: 300 }}>{String(i + 1).padStart(2, '0')}</div>
              <div className="flex-1">
                <div className="text-lg" style={{ fontWeight: 500 }}>{l.title}</div>
                <div className="text-[10px] tracking-[0.3em] uppercase opacity-60" style={{ fontFamily: 'var(--font-space-grotesk), monospace' }}>Listed Asset · Class A</div>
              </div>
              <span className="text-xs opacity-60" style={{ color: gold }}>&rarr;</span>
            </a>
          ))}

          {banners?.map((b: any) => {
            const inner = (
              <div className="mt-4 overflow-hidden" style={{ border: `1px solid ${gold}55`, height: b.size === 'sm' ? 100 : b.size === 'lg' ? 240 : 160 }}>
                {b.image_url && <img src={b.image_url} alt="" className="w-full h-full object-cover" />}
              </div>
            );
            return b.link_url ? <a key={b.id} href={b.link_url} target="_blank" rel="noreferrer" onClick={() => t('banner', b.id)}>{inner}</a> : <div key={b.id}>{inner}</div>;
          })}

          {videos.map((v: any) => (
            <figure key={v.id} className="mt-4">
              <div className="relative aspect-video overflow-hidden" style={{ border: `1px solid ${gold}55` }}>
                {v.embed_url ? <iframe src={v.embed_url} className="absolute inset-0 w-full h-full" allowFullScreen />
                  : v.thumbnail ? <img src={v.thumbnail} alt="" className="w-full h-full object-cover" /> : null}
              </div>
              {v.title && <figcaption className="mt-2 text-xs italic text-center" style={{ color: gold }}>{v.title}</figcaption>}
            </figure>
          ))}
        </div>

        {!profile.is_pro && <BioflowzyBadge bgColor={profile.bg_color} />}
      </div>

      <style jsx>{`
        :global(.ws-ticker) { animation: ws-ticker ${s.tickerSpeed}s linear infinite; }
        @keyframes ws-ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) { :global(.ws-ticker) { animation: none; } }
      `}</style>
    </div>
  );
}

export default WallStreetTheme;
