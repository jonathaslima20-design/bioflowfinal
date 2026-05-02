'use client';

import { Award, Briefcase, Mic } from 'lucide-react';
import { SOCIALS_BY_KEY } from '@/lib/socials';
import type { BioThemeProps, BioThemeMeta } from '@/themes/types';
import { getThemeSettings } from '@/themes/types';
import { BioflowzyBadge } from '@/components/bio/BioflowzyBadge';

export const clevelMeta: BioThemeMeta = {
  key: 'clevel',
  name: 'C-Level',
  description: 'Dossie executivo com credenciais, listras e secoes de background.',
  available: true,
  defaults: {
    bg_color: '#0F1419',
    button_color: '#C8A25D',
    text_color: '#E5E1D8',
  },
  palettes: {
    bg: ['#0F1419', '#0A0F14', '#1A1F2B', '#F5F3EE', '#FFFFFF', '#151A20'],
    accent: ['#C8A25D', '#B5975A', '#8B7B5A', '#3B82F6', '#1A1F2B', '#A16B2F'],
    text: ['#E5E1D8', '#F5F3EE', '#FFFFFF', '#0F1419'],
  },
  controls: [
    { key: 'frameBadge', label: 'Moldura na credencial', type: 'toggle', default: true, group: 'Credencial' },
    { key: 'stripeColor', label: 'Cor da listra', type: 'color', palette: ['#C8A25D', '#B5975A', '#8B0000', '#1E3A8A', '#0F172A', '#A16B2F'], default: '#C8A25D', group: 'Detalhes' },
    { key: 'signature', label: 'Assinatura caligrafica', type: 'toggle', default: true, group: 'Credencial' },
    { key: 'title', label: 'Titulo/cargo', type: 'select', options: [
      { value: 'ceo', label: 'CEO' }, { value: 'founder', label: 'Founder' }, { value: 'cmo', label: 'CMO' }, { value: 'cto', label: 'CTO' }, { value: 'partner', label: 'Partner' },
    ], default: 'founder', group: 'Credencial' },
  ],
};

const TITLES: Record<string, string> = { ceo: 'Chief Executive Officer', founder: 'Founder & Chief Executive', cmo: 'Chief Marketing Officer', cto: 'Chief Technology Officer', partner: 'Managing Partner' };

export function CLevelTheme({ profile, links, socials, videos, banners, track }: BioThemeProps) {
  const s = getThemeSettings(profile, 'clevel', clevelMeta.controls);
  const accent = s.stripeColor || '#C8A25D';
  const bg = profile.bg_color || '#0F1419';
  const text = profile.text_color || '#E5E1D8';
  const t = (a: string, b: string | null) => track?.(a, b);

  return (
    <div className="min-h-screen" style={{ backgroundColor: bg, color: text, fontFamily: 'Georgia, "Times New Roman", serif' }}>
      <div className="max-w-md mx-auto px-6 pt-[72px] pb-24 relative">
        <div className="absolute left-0 top-[72px] bottom-0 w-1.5" style={{ background: accent }} aria-hidden />

        <div className="pl-6">
          <div className="flex items-baseline justify-between text-[10px] tracking-[0.5em] uppercase opacity-70 mb-6" style={{ fontFamily: 'var(--font-space-grotesk), monospace' }}>
            <span>Executive Dossier</span>
            <span style={{ color: accent }}>Vol. I</span>
          </div>

          <div className={s.frameBadge ? 'p-4' : ''} style={{ border: s.frameBadge ? `1px solid ${accent}55` : 'none' }}>
            <div className="flex items-start gap-4">
              <div className="rounded-none overflow-hidden shrink-0" style={{ width: 88, height: 88, border: `2px solid ${accent}` }}>
                {profile.avatar_url && <img src={profile.avatar_url} alt="" className="w-full h-full object-cover grayscale" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] tracking-[0.4em] uppercase" style={{ color: accent, fontFamily: 'var(--font-space-grotesk), monospace', fontWeight: 700 }}>
                  {TITLES[s.title] || 'Founder'}
                </div>
                <h1 className="mt-1 text-3xl tracking-tight" style={{ fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.05 }}>
                  {profile.display_name || profile.username}
                </h1>
                <div className="mt-1 text-xs" style={{ color: accent }}>@{profile.username}</div>
              </div>
            </div>
            {profile.bio && (
              <p className="mt-4 pt-3 border-t text-[14px] italic leading-relaxed" style={{ borderColor: `${accent}33`, opacity: 0.9 }}>
                &ldquo;{profile.bio}&rdquo;
              </p>
            )}
            {s.signature && (
              <div className="mt-3 text-2xl" style={{ fontFamily: '"Snell Roundhand", cursive', color: accent, lineHeight: 1 }}>
                {profile.display_name ? profile.display_name.split(/\s+/)[0] : profile.username}
              </div>
            )}
          </div>

          {socials?.length > 0 && (
            <div className="mt-5 flex gap-4 flex-wrap">
              {socials.map((soc: any) => {
                const meta = SOCIALS_BY_KEY[(soc.platform || '').toLowerCase()];
                const Icon = meta?.icon;
                return (
                  <a key={soc.id} href={soc.url} target="_blank" rel="noreferrer" onClick={() => t('social', soc.id)}
                    className="w-9 h-9 flex items-center justify-center transition-all hover:-translate-y-0.5"
                    style={{ border: `1px solid ${accent}55`, color: accent }}>
                    {Icon && <Icon className="w-4 h-4" />}
                  </a>
                );
              })}
            </div>
          )}

          <Section title="Background" icon={Briefcase} accent={accent}>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { v: '15+', l: 'Years' },
                { v: '$120M', l: 'Raised' },
                { v: '4', l: 'Exits' },
              ].map((k, i) => (
                <div key={i} className="p-3" style={{ border: `1px solid ${accent}33` }}>
                  <div className="text-2xl" style={{ color: accent, fontWeight: 700 }}>{k.v}</div>
                  <div className="text-[9px] tracking-[0.3em] uppercase opacity-70" style={{ fontFamily: 'var(--font-space-grotesk), monospace' }}>{k.l}</div>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Current Roles" icon={Award} accent={accent}>
            <div className="flex flex-col">
              {links.map((l: any, i: number) => (
                <a key={l.id} href={l.url} target="_blank" rel="noreferrer" onClick={() => t('link', l.id)}
                  className="group grid grid-cols-[auto_1fr_auto] gap-4 items-baseline py-3 border-b transition-all"
                  style={{ borderColor: `${accent}22`, color: text }}>
                  <div className="w-1 h-6" style={{ background: accent }} aria-hidden />
                  <div>
                    <div className="text-[15px]" style={{ fontWeight: 600 }}>{l.title}</div>
                    <div className="text-[10px] tracking-[0.3em] uppercase opacity-60" style={{ fontFamily: 'var(--font-space-grotesk), monospace' }}>Position &middot; Active</div>
                  </div>
                  <span className="text-[10px] tracking-[0.3em] uppercase transition-all group-hover:translate-x-1" style={{ color: accent }}>View &rarr;</span>
                </a>
              ))}
            </div>
          </Section>

          {(banners?.length > 0 || videos?.length > 0) && (
            <Section title="Speaking & Media" icon={Mic} accent={accent}>
              <div className="flex flex-col gap-3">
                {banners?.map((b: any) => {
                  const inner = (
                    <div className="overflow-hidden" style={{ border: `1px solid ${accent}55`, height: b.size === 'sm' ? 100 : b.size === 'lg' ? 240 : 160 }}>
                      {b.image_url && <img src={b.image_url} alt="" className="w-full h-full object-cover" />}
                    </div>
                  );
                  return b.link_url ? <a key={b.id} href={b.link_url} target="_blank" rel="noreferrer" onClick={() => t('banner', b.id)}>{inner}</a> : <div key={b.id}>{inner}</div>;
                })}
                {videos.map((v: any) => (
                  <figure key={v.id}>
                    <div className="relative aspect-video overflow-hidden" style={{ border: `1px solid ${accent}55` }}>
                      {v.embed_url ? <iframe src={v.embed_url} className="absolute inset-0 w-full h-full" allowFullScreen />
                        : v.thumbnail ? <img src={v.thumbnail} alt="" className="w-full h-full object-cover" /> : null}
                    </div>
                    {v.title && <figcaption className="mt-1 text-[10px] tracking-[0.3em] uppercase" style={{ color: accent }}>Talk &mdash; {v.title}</figcaption>}
                  </figure>
                ))}
              </div>
            </Section>
          )}
        </div>

        {!profile.is_pro && <div className="pl-6"><BioflowzyBadge bgColor={profile.bg_color} /></div>}
      </div>
    </div>
  );
}

function Section({ title, icon: Icon, accent, children }: any) {
  return (
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b" style={{ borderColor: `${accent}55` }}>
        <Icon className="w-3.5 h-3.5" style={{ color: accent }} />
        <span className="text-[10px] tracking-[0.4em] uppercase" style={{ color: accent, fontFamily: 'var(--font-space-grotesk), monospace', fontWeight: 700 }}>{title}</span>
      </div>
      {children}
    </div>
  );
}

export default CLevelTheme;
