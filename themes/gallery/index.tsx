'use client';

import { SOCIALS_BY_KEY } from '@/lib/socials';
import type { BioThemeProps, BioThemeMeta } from '@/themes/types';
import { getThemeSettings } from '@/themes/types';
import { BioflowzyBadge } from '@/components/bio/BioflowzyBadge';

export const galleryMeta: BioThemeMeta = {
  key: 'gallery',
  name: 'Gallery',
  description: 'Museu contemporaneo: placas tipograficas, letterbox e grotesk fino.',
  available: true,
  defaults: {
    bg_color: '#F4F1EB',
    button_color: '#0A0A0A',
    text_color: '#111111',
  },
  palettes: {
    bg: ['#F4F1EB', '#ECE8DF', '#FFFFFF', '#1A1A1A', '#D6D0C4', '#0A0A0A'],
    accent: ['#0A0A0A', '#8A5A2C', '#4B4B4B', '#7A1B1B', '#244B3B', '#1D3C6D'],
    text: ['#111111', '#0A0A0A', '#F4F1EB', '#FFFFFF'],
  },
  controls: [
    { key: 'font', label: 'Estilo tipografico', type: 'select', options: [
      { value: 'grotesk', label: 'Grotesk fino' },
      { value: 'didone', label: 'Didone' },
      { value: 'serif', label: 'Serif classica' },
    ], default: 'grotesk', group: 'Tipografia' },
    { key: 'labelSize', label: 'Tamanho do label', type: 'slider', min: 9, max: 14, step: 1, suffix: 'px', default: 10, group: 'Layout' },
    { key: 'signature', label: 'Assinatura caligrafica', type: 'toggle', default: true, group: 'Cabecalho' },
    { key: 'plateStyle', label: 'Estilo da placa', type: 'select', options: [
      { value: 'line', label: 'Linha fina' },
      { value: 'box', label: 'Caixa emoldurada' },
      { value: 'minimal', label: 'Minimal' },
    ], default: 'line', group: 'Layout' },
  ],
};

const FONT_MAP: Record<string, string> = {
  grotesk: 'var(--font-space-grotesk), "Helvetica Neue", sans-serif',
  didone: 'Didot, "Bodoni MT", Didone, serif',
  serif: 'Georgia, "Times New Roman", serif',
};

export function GalleryTheme({ profile, links, socials, videos, banners, track }: BioThemeProps) {
  const s = getThemeSettings(profile, 'gallery', galleryMeta.controls);
  const accent = profile.button_color || '#0A0A0A';
  const bg = profile.bg_color || '#F4F1EB';
  const text = profile.text_color || '#111111';
  const t = (a: string, b: string | null) => track?.(a, b);
  const family = FONT_MAP[s.font] || FONT_MAP.grotesk;

  return (
    <div className="min-h-screen pt-[72px] pb-24 px-6" style={{ backgroundColor: bg, color: text, fontFamily: family }}>
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between text-[10px] tracking-[0.4em] uppercase opacity-60 mb-10">
          <span>Room 01</span>
          <span>—</span>
          <span>{new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase()}</span>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="overflow-hidden" style={{ width: profile.avatar_size ?? 120, height: profile.avatar_size ?? 120, border: `1px solid ${text}40` }}>
            {profile.avatar_url && <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />}
          </div>
          {s.signature && (
            <div className="mt-5 italic opacity-70 text-lg" style={{ fontFamily: 'Snell Roundhand, cursive' }}>— {profile.username}</div>
          )}
          <h1 className="mt-2 text-3xl tracking-tight" style={{ fontWeight: 300, letterSpacing: '-0.01em' }}>
            {profile.display_name || `@${profile.username}`}
          </h1>
          <div className="mt-3 text-[10px] tracking-[0.35em] uppercase opacity-70">Portfolio &middot; Links &middot; Works</div>
          {profile.bio && <p className="mt-5 text-sm leading-relaxed opacity-85 max-w-xs">{profile.bio}</p>}

          {socials?.length > 0 && (
            <div className="mt-6 flex gap-4 flex-wrap justify-center">
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

        <div className="mt-12 flex flex-col gap-6">
          {links.map((l: any, i: number) => (
            <a key={l.id} href={l.url} target="_blank" rel="noreferrer" onClick={() => t('link', l.id)} className="group block">
              <div className="aspect-[4/3] overflow-hidden relative" style={{ background: `${text}08`, border: s.plateStyle === 'box' ? `1px solid ${text}30` : 'none' }}>
                <div className="absolute inset-0 flex items-center justify-center opacity-20 transition-opacity group-hover:opacity-40" style={{ fontSize: 80, fontWeight: 200, color: text }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className={s.plateStyle === 'minimal' ? 'mt-2' : 'mt-3 pt-2 border-t'} style={{ borderColor: `${text}40` }}>
                <div className="flex items-baseline justify-between gap-4">
                  <div className="text-xs tracking-[0.3em] uppercase opacity-60" style={{ fontSize: s.labelSize }}>Fig. {String(i + 1).padStart(2, '0')}</div>
                  <div className="text-xs tracking-[0.3em] uppercase opacity-60" style={{ fontSize: s.labelSize }}>Link</div>
                </div>
                <div className="mt-1 text-lg" style={{ fontWeight: 400 }}>{l.title}</div>
                <div className="text-xs opacity-50 mt-0.5">Medium: Digital &middot; Open</div>
              </div>
            </a>
          ))}

          {banners?.map((b: any, i: number) => {
            const inner = (
              <div className="overflow-hidden" style={{ height: b.size === 'sm' ? 120 : b.size === 'lg' ? 260 : 180, border: `1px solid ${text}30` }}>
                {b.image_url && <img src={b.image_url} alt="" className="w-full h-full object-cover" />}
              </div>
            );
            return b.link_url ? (
              <a key={b.id} href={b.link_url} target="_blank" rel="noreferrer" onClick={() => t('banner', b.id)}>
                {inner}
                <div className="mt-2 text-[10px] tracking-[0.3em] uppercase opacity-60">Exhibit {String(i + 1).padStart(2, '0')}</div>
              </a>
            ) : <div key={b.id}>{inner}</div>;
          })}

          {videos.map((v: any) => (
            <figure key={v.id}>
              <div className="relative overflow-hidden" style={{ border: `1px solid ${text}30`, aspectRatio: '16/9' }}>
                {v.embed_url ? <iframe src={v.embed_url} className="absolute inset-0 w-full h-full" allowFullScreen />
                  : v.thumbnail ? <img src={v.thumbnail} alt="" className="w-full h-full object-cover" /> : null}
              </div>
              {v.title && (
                <figcaption className="mt-2 pt-2 border-t text-xs opacity-70" style={{ borderColor: `${text}30` }}>
                  <span className="tracking-[0.3em] uppercase opacity-60 mr-2">Screening</span>{v.title}
                </figcaption>
              )}
            </figure>
          ))}
        </div>

        {!profile.is_pro && <BioflowzyBadge bgColor={profile.bg_color} />}
      </div>
    </div>
  );
}

export default GalleryTheme;
