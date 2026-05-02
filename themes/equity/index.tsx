'use client';

import { SOCIALS_BY_KEY } from '@/lib/socials';
import type { BioThemeProps, BioThemeMeta } from '@/themes/types';
import { getThemeSettings } from '@/themes/types';
import { BioflowzyBadge } from '@/components/bio/BioflowzyBadge';

export const equityMeta: BioThemeMeta = {
  key: 'equity',
  name: 'Private Equity',
  description: 'Luxo sofisticado com monograma central, foil stamps e separadores ornamentais.',
  available: true,
  defaults: {
    bg_color: '#F4EFE3',
    button_color: '#B38F4A',
    text_color: '#1A1510',
  },
  palettes: {
    bg: ['#F4EFE3', '#EFE7D2', '#FBF7ED', '#1A1510', '#2B2418', '#E8DDC7'],
    accent: ['#B38F4A', '#A57C3A', '#8B6B2F', '#D4B681', '#1A1510', '#7A5C2A'],
    text: ['#1A1510', '#2B2418', '#F4EFE3', '#FBF7ED'],
  },
  controls: [
    { key: 'monogramMode', label: 'Monograma', type: 'radio', options: [
      { value: 'auto', label: 'Auto (iniciais)' }, { value: 'username', label: 'Username' }, { value: 'hidden', label: 'Oculto' },
    ], default: 'auto', group: 'Monograma' },
    { key: 'foilColor', label: 'Cor do foil', type: 'color', palette: ['#B38F4A', '#A57C3A', '#D4AF37', '#8B6B2F', '#C0C0C0', '#B76E79'], default: '#B38F4A', group: 'Foil' },
    { key: 'ornament', label: 'Separadores ornamentais', type: 'select', options: [
      { value: 'diamond', label: 'Diamante' }, { value: 'leaves', label: 'Folhas' }, { value: 'dots', label: 'Pontos' }, { value: 'line', label: 'Linha fina' },
    ], default: 'diamond', group: 'Detalhes' },
  ],
};

const Ornament = ({ style, color }: { style: string; color: string }) => {
  if (style === 'diamond') {
    return (
      <div className="flex items-center gap-3" aria-hidden>
        <div className="flex-1 h-px" style={{ background: color, opacity: 0.5 }} />
        <div className="w-2 h-2 rotate-45" style={{ background: color }} />
        <div className="w-1 h-1 rotate-45" style={{ background: color }} />
        <div className="w-2 h-2 rotate-45" style={{ background: color }} />
        <div className="flex-1 h-px" style={{ background: color, opacity: 0.5 }} />
      </div>
    );
  }
  if (style === 'leaves') {
    return (
      <div className="flex items-center gap-2 text-sm" style={{ color }} aria-hidden>
        <div className="flex-1 h-px" style={{ background: color, opacity: 0.5 }} />
        <span>&#10042;</span>
        <div className="flex-1 h-px" style={{ background: color, opacity: 0.5 }} />
      </div>
    );
  }
  if (style === 'dots') {
    return (
      <div className="flex items-center gap-2" aria-hidden>
        <div className="flex-1 h-px" style={{ background: color, opacity: 0.4 }} />
        {[0, 1, 2].map(i => <div key={i} className="w-1 h-1 rounded-full" style={{ background: color }} />)}
        <div className="flex-1 h-px" style={{ background: color, opacity: 0.4 }} />
      </div>
    );
  }
  return <div className="h-px" style={{ background: color, opacity: 0.5 }} aria-hidden />;
};

export function EquityTheme({ profile, links, socials, videos, banners, track }: BioThemeProps) {
  const s = getThemeSettings(profile, 'equity', equityMeta.controls);
  const foil = s.foilColor || '#B38F4A';
  const bg = profile.bg_color || '#F4EFE3';
  const text = profile.text_color || '#1A1510';
  const t = (a: string, b: string | null) => track?.(a, b);
  const name = profile.display_name || profile.username;
  const initials = s.monogramMode === 'auto' ? name.split(/\s+/).slice(0, 2).map((n: string) => n.charAt(0).toUpperCase()).join('') : profile.username.slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen" style={{ backgroundColor: bg, color: text, fontFamily: 'Georgia, "Times New Roman", serif' }}>
      <div className="max-w-md mx-auto px-6 pt-[72px] pb-24">
        <div className="flex items-center justify-between text-[9px] tracking-[0.5em] uppercase opacity-60" style={{ fontFamily: 'var(--font-space-grotesk), monospace' }}>
          <span>Est. MMXXVI</span>
          <div className="w-1 h-1 rounded-full" style={{ background: foil }} />
          <span>N° {String(profile.id || 'X').slice(0, 4).toUpperCase()}</span>
        </div>

        {s.monogramMode !== 'hidden' && (
          <div className="mt-10 flex flex-col items-center">
            <div className="relative">
              <div className="absolute inset-[-8px] rounded-full" style={{ border: `1px solid ${foil}`, opacity: 0.6 }} aria-hidden />
              <div className="absolute inset-[-16px] rounded-full" style={{ border: `1px solid ${foil}`, opacity: 0.25 }} aria-hidden />
              <div className="w-28 h-28 rounded-full flex items-center justify-center" style={{ background: foil, color: bg }}>
                <div className="text-4xl tracking-tight" style={{ fontFamily: 'Didot, serif', fontWeight: 400, letterSpacing: '-0.02em' }}>{initials}</div>
              </div>
            </div>
            <div className="mt-4 text-[9px] tracking-[0.5em] uppercase" style={{ color: foil, fontFamily: 'var(--font-space-grotesk), monospace' }}>Monograph</div>
          </div>
        )}

        <div className="mt-8 text-center">
          <div className="rounded-full overflow-hidden mx-auto" style={{ width: profile.avatar_size ?? 92, height: profile.avatar_size ?? 92, border: `1px solid ${foil}`, padding: 3 }}>
            <div className="w-full h-full rounded-full overflow-hidden">
              {profile.avatar_url && <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />}
            </div>
          </div>
          <h1 className="mt-5 text-4xl tracking-tight" style={{ fontFamily: 'Didot, serif', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1 }}>
            {profile.display_name || profile.username}
          </h1>
          <div className="mt-2 text-[10px] tracking-[0.4em] uppercase" style={{ color: foil, fontFamily: 'var(--font-space-grotesk), monospace' }}>@{profile.username}</div>
          {profile.bio && (
            <p className="mt-5 italic text-[15px] leading-relaxed max-w-sm mx-auto opacity-85">&ldquo;{profile.bio}&rdquo;</p>
          )}

          {socials?.length > 0 && (
            <div className="mt-6 flex gap-5 flex-wrap justify-center">
              {socials.map((soc: any) => {
                const meta = SOCIALS_BY_KEY[(soc.platform || '').toLowerCase()];
                const Icon = meta?.icon;
                return (
                  <a key={soc.id} href={soc.url} target="_blank" rel="noreferrer" onClick={() => t('social', soc.id)}
                    className="transition-all hover:-translate-y-0.5" style={{ color: foil }}>
                    {Icon && <Icon className="w-4 h-4" />}
                  </a>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-10"><Ornament style={s.ornament} color={foil} /></div>
        <div className="mt-6 text-center text-[10px] tracking-[0.5em] uppercase" style={{ color: foil, fontFamily: 'var(--font-space-grotesk), monospace' }}>Holdings</div>
        <div className="mt-2"><Ornament style={s.ornament} color={foil} /></div>

        <div className="mt-6 flex flex-col">
          {links.map((l: any, i: number) => (
            <a key={l.id} href={l.url} target="_blank" rel="noreferrer" onClick={() => t('link', l.id)}
              className="group flex items-center gap-4 py-5 border-b transition-all"
              style={{ borderColor: `${foil}33`, color: text }}>
              <div className="text-xs tracking-[0.3em] opacity-70" style={{ fontFamily: 'var(--font-space-grotesk), monospace' }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="flex-1">
                <div className="text-[18px] tracking-tight" style={{ fontWeight: 500, fontFamily: 'Didot, serif' }}>{l.title}</div>
                <div className="text-[10px] tracking-[0.3em] uppercase opacity-60" style={{ color: foil, fontFamily: 'var(--font-space-grotesk), monospace' }}>Asset &middot; Open</div>
              </div>
              <div className="w-6 h-6 rounded-full flex items-center justify-center transition-all group-hover:scale-110" style={{ border: `1px solid ${foil}`, color: foil }}>
                <span className="text-[10px]">&rarr;</span>
              </div>
            </a>
          ))}

          {banners?.map((b: any) => {
            const inner = (
              <div className="mt-4 overflow-hidden" style={{ border: `1px solid ${foil}`, padding: 4, background: bg }}>
                <div style={{ height: b.size === 'sm' ? 90 : b.size === 'lg' ? 220 : 150 }}>
                  {b.image_url && <img src={b.image_url} alt="" className="w-full h-full object-cover" />}
                </div>
              </div>
            );
            return b.link_url ? <a key={b.id} href={b.link_url} target="_blank" rel="noreferrer" onClick={() => t('banner', b.id)}>{inner}</a> : <div key={b.id}>{inner}</div>;
          })}

          {videos.map((v: any) => (
            <figure key={v.id} className="mt-4">
              <div className="relative aspect-video overflow-hidden" style={{ border: `1px solid ${foil}`, padding: 4 }}>
                <div className="relative w-full h-full">
                  {v.embed_url ? <iframe src={v.embed_url} className="absolute inset-0 w-full h-full" allowFullScreen />
                    : v.thumbnail ? <img src={v.thumbnail} alt="" className="w-full h-full object-cover" /> : null}
                </div>
              </div>
              {v.title && <figcaption className="mt-2 text-xs italic text-center" style={{ color: foil }}>{v.title}</figcaption>}
            </figure>
          ))}
        </div>

        <div className="mt-10"><Ornament style={s.ornament} color={foil} /></div>

        {!profile.is_pro && <BioflowzyBadge bgColor={profile.bg_color} />}
      </div>
    </div>
  );
}

export default EquityTheme;
