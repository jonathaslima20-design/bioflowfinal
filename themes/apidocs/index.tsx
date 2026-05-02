'use client';

import { useState } from 'react';
import { SOCIALS_BY_KEY } from '@/lib/socials';
import type { BioThemeProps, BioThemeMeta } from '@/themes/types';
import { getThemeSettings } from '@/themes/types';
import { BioflowzyBadge } from '@/components/bio/BioflowzyBadge';

export const apidocsMeta: BioThemeMeta = {
  key: 'apidocs',
  name: 'API Docs',
  description: 'Docs estilo Stripe/Vercel: sidebar, blocos de codigo e badges de metodo.',
  available: true,
  defaults: {
    bg_color: '#FFFFFF',
    button_color: '#635BFF',
    text_color: '#0A2540',
  },
  palettes: {
    bg: ['#FFFFFF', '#F6F9FC', '#0A2540', '#0D1117', '#FAFAFA', '#1A1B26'],
    accent: ['#635BFF', '#00D4FF', '#10B981', '#F59E0B', '#EC4899', '#0070F3'],
    text: ['#0A2540', '#1F2937', '#F5F5F5', '#FFFFFF'],
  },
  controls: [
    { key: 'codeTheme', label: 'Tema do codigo', type: 'radio', options: [
      { value: 'dark', label: 'Dark' }, { value: 'light', label: 'Light' },
    ], default: 'dark', group: 'Codigo' },
    { key: 'lang', label: 'Linguagem padrao', type: 'select', options: [
      { value: 'curl', label: 'cURL' }, { value: 'js', label: 'JavaScript' }, { value: 'py', label: 'Python' },
    ], default: 'curl', group: 'Codigo' },
    { key: 'sidebar', label: 'Sidebar com anchors', type: 'toggle', default: true, group: 'Layout' },
    { key: 'version', label: 'Numero de versao', type: 'select', options: [
      { value: 'v1.0', label: 'v1.0' }, { value: 'v2.3', label: 'v2.3' }, { value: 'v2026.5', label: 'v2026.5' },
    ], default: 'v2.3', group: 'Cabecalho' },
  ],
};

const METHOD_COLORS: Record<string, string> = { GET: '#10B981', POST: '#3B82F6', PUT: '#F59E0B', DELETE: '#EF4444' };

export function ApiDocsTheme({ profile, links, socials, videos, banners, track }: BioThemeProps) {
  const s = getThemeSettings(profile, 'apidocs', apidocsMeta.controls);
  const [tab, setTab] = useState<string>(s.lang);
  const accent = profile.button_color || '#635BFF';
  const bg = profile.bg_color || '#FFFFFF';
  const text = profile.text_color || '#0A2540';
  const isDark = bg === '#0A2540' || bg === '#0D1117' || bg === '#1A1B26';
  const codeBg = s.codeTheme === 'dark' ? '#0D1117' : '#F6F8FA';
  const codeFg = s.codeTheme === 'dark' ? '#E6EDF3' : '#24292F';
  const border = isDark ? '#1F2D3D' : '#E6EBF1';
  const muted = isDark ? '#94A3B8' : '#64748B';
  const t = (a: string, b: string | null) => track?.(a, b);

  const buildCode = (url: string, title: string) => {
    if (tab === 'js') return `fetch("${url}", {\n  method: "GET",\n  headers: {\n    "User-Agent": "@${profile.username}/bio"\n  }\n})\n.then(r => r.json());`;
    if (tab === 'py') return `import requests\n\nr = requests.get(\n  "${url}",\n  headers={"User-Agent": "@${profile.username}/bio"}\n)\nprint(r.status_code)`;
    return `curl -X GET "${url}" \\\n  -H "User-Agent: @${profile.username}/bio" \\\n  -H "Accept: application/json"`;
  };

  return (
    <div className="min-h-screen pt-[72px] pb-24 px-4" style={{ backgroundColor: bg, color: text, fontFamily: 'var(--font-inter), system-ui' }}>
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between text-xs mb-4" style={{ color: muted }}>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md flex items-center justify-center text-white text-[10px] font-bold" style={{ background: accent }}>/</div>
            <span className="font-mono">{profile.username}/api</span>
          </div>
          <span className="px-2 py-0.5 rounded font-mono text-[10px]" style={{ background: `${accent}15`, color: accent }}>{s.version}</span>
        </div>

        <div className="mb-6">
          <div className="flex items-start gap-3">
            <div className="rounded-lg overflow-hidden shrink-0" style={{ width: 56, height: 56 }}>
              {profile.avatar_url && <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold tracking-tight" style={{ letterSpacing: '-0.02em' }}>{profile.display_name || profile.username}</h1>
              <div className="text-sm font-mono" style={{ color: muted }}>@{profile.username}</div>
            </div>
          </div>
          {profile.bio && <p className="mt-3 text-sm leading-relaxed" style={{ color: muted }}>{profile.bio}</p>}
        </div>

        {s.sidebar && (
          <div className="mb-6 rounded-lg p-3" style={{ background: `${accent}08`, border: `1px solid ${accent}20` }}>
            <div className="text-[10px] tracking-[0.25em] uppercase mb-2" style={{ color: muted }}>On this page</div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-mono">
              {links.slice(0, 6).map((l: any, i: number) => (
                <a key={l.id} href={`#ep-${i}`} className="hover:underline" style={{ color: accent }}>#endpoint-{i + 1}</a>
              ))}
            </div>
          </div>
        )}

        {socials?.length > 0 && (
          <div className="mb-6 flex gap-2 flex-wrap">
            {socials.map((soc: any) => {
              const meta = SOCIALS_BY_KEY[(soc.platform || '').toLowerCase()];
              const Icon = meta?.icon;
              return (
                <a key={soc.id} href={soc.url} target="_blank" rel="noreferrer" onClick={() => t('social', soc.id)}
                  className="w-9 h-9 rounded-md flex items-center justify-center transition-colors"
                  style={{ border: `1px solid ${border}`, color: text }}>
                  {Icon && <Icon className="w-4 h-4" />}
                </a>
              );
            })}
          </div>
        )}

        <div className="flex flex-col gap-5">
          {links.map((l: any, i: number) => {
            const methods = ['GET', 'POST', 'PUT', 'GET'];
            const method = methods[i % methods.length];
            return (
              <div key={l.id} id={`ep-${i}`} className="rounded-lg overflow-hidden" style={{ border: `1px solid ${border}` }}>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold text-white" style={{ background: METHOD_COLORS[method] }}>{method}</span>
                    <span className="font-mono text-xs truncate flex-1" style={{ color: text }}>/{(l.title || 'endpoint').toLowerCase().replace(/\s+/g, '-').slice(0, 40)}</span>
                  </div>
                  <div className="text-sm font-semibold">{l.title}</div>
                </div>
                <div className="rounded-b-lg" style={{ background: codeBg, color: codeFg }}>
                  <div className="flex items-center gap-1 px-3 pt-2">
                    {['curl', 'js', 'py'].map((k) => (
                      <button key={k} onClick={() => setTab(k)}
                        className="px-2.5 py-1 text-[10px] font-mono rounded-t transition-colors"
                        style={{ background: tab === k ? (s.codeTheme === 'dark' ? '#ffffff12' : '#00000008') : 'transparent', color: tab === k ? accent : codeFg, opacity: tab === k ? 1 : 0.6 }}>
                        {k === 'curl' ? 'cURL' : k === 'js' ? 'Node' : 'Python'}
                      </button>
                    ))}
                    <a href={l.url} target="_blank" rel="noreferrer" onClick={() => t('link', l.id)}
                      className="ml-auto mr-1 px-2.5 py-1 text-[10px] font-mono rounded transition-colors hover:opacity-80"
                      style={{ background: accent, color: '#fff' }}>Try it &rarr;</a>
                  </div>
                  <pre className="px-4 pb-4 pt-2 text-[11px] leading-relaxed overflow-x-auto font-mono">{buildCode(l.url, l.title)}</pre>
                </div>
              </div>
            );
          })}

          {banners?.map((b: any) => {
            const inner = (
              <div className="rounded-lg overflow-hidden" style={{ border: `1px solid ${border}`, height: b.size === 'sm' ? 100 : b.size === 'lg' ? 240 : 160 }}>
                {b.image_url && <img src={b.image_url} alt="" className="w-full h-full object-cover" />}
              </div>
            );
            return b.link_url ? <a key={b.id} href={b.link_url} target="_blank" rel="noreferrer" onClick={() => t('banner', b.id)}>{inner}</a> : <div key={b.id}>{inner}</div>;
          })}

          {videos.map((v: any) => (
            <div key={v.id} className="rounded-lg overflow-hidden" style={{ border: `1px solid ${border}` }}>
              <div className="relative aspect-video bg-black">
                {v.embed_url ? <iframe src={v.embed_url} className="absolute inset-0 w-full h-full" allowFullScreen />
                  : v.thumbnail ? <img src={v.thumbnail} alt="" className="w-full h-full object-cover" /> : null}
              </div>
              {v.title && <div className="p-3 text-sm font-medium">{v.title}</div>}
            </div>
          ))}
        </div>

        {!profile.is_pro && <BioflowzyBadge bgColor={profile.bg_color} />}
      </div>
    </div>
  );
}

export default ApiDocsTheme;
