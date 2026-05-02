'use client';

import { Sparkles, ArrowRight } from 'lucide-react';
import { SOCIALS_BY_KEY } from '@/lib/socials';
import type { BioThemeProps, BioThemeMeta } from '@/themes/types';
import { getThemeSettings } from '@/themes/types';
import { BioflowzyBadge } from '@/components/bio/BioflowzyBadge';

export const aiMeta: BioThemeMeta = {
  key: 'ai',
  name: 'AI Gradient',
  description: 'Inspirado em Anthropic/OpenAI: mesh gradient suave, serif humanista e thinking-dots.',
  available: true,
  defaults: {
    bg_color: '#F5F1EB',
    button_color: '#CC785C',
    text_color: '#1B1A16',
  },
  palettes: {
    bg: ['#F5F1EB', '#EFE8DA', '#FBF7F0', '#1B1A16', '#0F172A', '#F7E8D4'],
    accent: ['#CC785C', '#D4845B', '#A04E3C', '#5B7FB4', '#7B8F6B', '#C48F5C'],
    text: ['#1B1A16', '#2A2825', '#F5F1EB', '#FFFFFF'],
  },
  controls: [
    { key: 'gradientStyle', label: 'Estilo do mesh', type: 'select', options: [
      { value: 'peach', label: 'Pessego' }, { value: 'lavender', label: 'Lavanda' }, { value: 'sunset', label: 'Sunset' }, { value: 'sage', label: 'Sage' },
    ], default: 'peach', group: 'Gradiente' },
    { key: 'speed', label: 'Velocidade do mesh', type: 'slider', min: 10, max: 60, step: 5, suffix: 's', default: 30, group: 'Movimento' },
    { key: 'thinkingDots', label: 'Thinking dots', type: 'toggle', default: true, group: 'Detalhes' },
    { key: 'serif', label: 'Tipografia serif', type: 'toggle', default: true, group: 'Tipografia' },
  ],
};

const MESH: Record<string, string[]> = {
  peach: ['#F5D9C2', '#E8B79F', '#CC785C', '#F0E1D0'],
  lavender: ['#E0D4F0', '#C5B3E8', '#8B7AA8', '#F0E8F5'],
  sunset: ['#FFD6A5', '#FFADAD', '#FDAB9F', '#FEF3D6'],
  sage: ['#D4E0C8', '#A8BB96', '#7B8F6B', '#E8EDDE'],
};

export function AiTheme({ profile, links, socials, videos, banners, track }: BioThemeProps) {
  const s = getThemeSettings(profile, 'ai', aiMeta.controls);
  const accent = profile.button_color || '#CC785C';
  const bg = profile.bg_color || '#F5F1EB';
  const text = profile.text_color || '#1B1A16';
  const colors = MESH[s.gradientStyle] || MESH.peach;
  const font = s.serif ? 'Georgia, "Times New Roman", serif' : 'var(--font-inter), system-ui';
  const t = (a: string, b: string | null) => track?.(a, b);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: bg, color: text, fontFamily: font }}>
      <div className="absolute inset-0 pointer-events-none ai-mesh" aria-hidden style={{
        background: `radial-gradient(at 20% 20%, ${colors[0]} 0px, transparent 50%), radial-gradient(at 80% 10%, ${colors[1]} 0px, transparent 50%), radial-gradient(at 30% 80%, ${colors[2]} 0px, transparent 50%), radial-gradient(at 80% 80%, ${colors[3]} 0px, transparent 50%)`,
        opacity: 0.8,
      }} />

      <div className="relative max-w-md mx-auto px-6 pt-[72px] pb-24">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-6" style={{ background: `${accent}20`, color: accent }}>
            <Sparkles className="w-3 h-3" />
            <span className="text-[10px] tracking-[0.25em] uppercase font-medium">Intelligence</span>
          </div>

          <div className="relative">
            <div className="absolute inset-[-8px] rounded-full ai-halo" style={{ background: `conic-gradient(from 0deg, ${colors[0]}, ${colors[1]}, ${colors[2]}, ${colors[0]})`, filter: 'blur(14px)', opacity: 0.5 }} aria-hidden />
            <div className="relative rounded-full overflow-hidden" style={{ width: profile.avatar_size ?? 104, height: profile.avatar_size ?? 104, border: '3px solid rgba(255,255,255,0.6)' }}>
              {profile.avatar_url && <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />}
            </div>
          </div>

          <h1 className="mt-6 text-4xl tracking-tight" style={{ fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.05 }}>
            {profile.display_name || `@${profile.username}`}
          </h1>
          <div className="mt-1 text-sm opacity-70">@{profile.username}</div>

          {profile.bio && (
            <p className="mt-4 text-base leading-relaxed max-w-sm" style={{ opacity: 0.85 }}>
              {profile.bio}
              {s.thinkingDots && (
                <span className="inline-flex gap-0.5 ml-1 align-middle">
                  <span className="ai-dot" style={{ background: accent }} />
                  <span className="ai-dot" style={{ background: accent, animationDelay: '0.2s' }} />
                  <span className="ai-dot" style={{ background: accent, animationDelay: '0.4s' }} />
                </span>
              )}
            </p>
          )}

          {socials?.length > 0 && (
            <div className="mt-6 flex gap-2 flex-wrap justify-center">
              {socials.map((soc: any) => {
                const meta = SOCIALS_BY_KEY[(soc.platform || '').toLowerCase()];
                const Icon = meta?.icon;
                return (
                  <a key={soc.id} href={soc.url} target="_blank" rel="noreferrer" onClick={() => t('social', soc.id)}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-105"
                    style={{ background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.6)', color: text }}>
                    {Icon && <Icon className="w-4 h-4" />}
                  </a>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-10 flex flex-col gap-3">
          {links.map((l: any) => (
            <a key={l.id} href={l.url} target="_blank" rel="noreferrer" onClick={() => t('link', l.id)}
              className="group relative rounded-2xl px-5 py-4 flex items-center justify-between overflow-hidden ai-card"
              style={{ background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(18px) saturate(160%)', WebkitBackdropFilter: 'blur(18px) saturate(160%)', border: '1px solid rgba(255,255,255,0.6)', color: text }}>
              <span className="relative font-medium text-[15px]">{l.title}</span>
              <div className="relative w-8 h-8 rounded-full flex items-center justify-center transition-all group-hover:translate-x-0.5" style={{ background: accent, color: '#fff' }}>
                <ArrowRight className="w-4 h-4" />
              </div>
            </a>
          ))}

          {banners?.map((b: any) => {
            const inner = (
              <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.6)', height: b.size === 'sm' ? 100 : b.size === 'lg' ? 240 : 160 }}>
                {b.image_url && <img src={b.image_url} alt="" className="w-full h-full object-cover" />}
              </div>
            );
            return b.link_url ? <a key={b.id} href={b.link_url} target="_blank" rel="noreferrer" onClick={() => t('banner', b.id)}>{inner}</a> : <div key={b.id}>{inner}</div>;
          })}

          {videos.map((v: any) => (
            <div key={v.id} className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.6)', backdropFilter: 'blur(18px)' }}>
              <div className="relative aspect-video bg-black">
                {v.embed_url ? <iframe src={v.embed_url} className="absolute inset-0 w-full h-full" allowFullScreen />
                  : v.thumbnail ? <img src={v.thumbnail} alt="" className="w-full h-full object-cover" /> : null}
              </div>
              {v.title && <div className="p-3 text-sm">{v.title}</div>}
            </div>
          ))}
        </div>

        {!profile.is_pro && <BioflowzyBadge bgColor={profile.bg_color} />}
      </div>

      <style jsx>{`
        :global(.ai-mesh) { animation: ai-drift ${s.speed}s ease-in-out infinite alternate; }
        :global(.ai-halo) { animation: ai-rot ${s.speed * 0.4}s linear infinite; }
        :global(.ai-card) { transition: transform 400ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 400ms; }
        :global(.ai-card:hover) { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(0,0,0,0.08); }
        :global(.ai-dot) { display: inline-block; width: 6px; height: 6px; border-radius: 50%; animation: ai-blink 1.4s ease-in-out infinite; }
        @keyframes ai-drift { from { transform: scale(1) translate(0,0); } to { transform: scale(1.08) translate(-2%, 1%); } }
        @keyframes ai-rot { to { transform: rotate(360deg); } }
        @keyframes ai-blink { 0%,80%,100% { opacity: 0.3; transform: scale(0.8); } 40% { opacity: 1; transform: scale(1); } }
        @media (prefers-reduced-motion: reduce) {
          :global(.ai-mesh), :global(.ai-halo), :global(.ai-dot) { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

export default AiTheme;
