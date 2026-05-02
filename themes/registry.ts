import { BrutalistTheme } from './brutalist';
import { AuroraTheme, auroraMeta } from './aurora';
import { CyberTheme, cyberMeta } from './cyber';
import { RetrowaveTheme, retrowaveMeta } from './retrowave';
import { ClayTheme, clayMeta } from './clay';
import { ExecutiveTheme, executiveMeta } from './executive';
import { BoardroomTheme, boardroomMeta } from './boardroom';
import { AtlasTheme, atlasMeta } from './atlas';
import { ConversionTheme, conversionMeta } from './conversion';
import { CreatorTheme, creatorMeta } from './creator';
import { AgencyTheme, agencyMeta } from './agency';
import { MonolithTheme, monolithMeta } from './monolith';
import { GalleryTheme, galleryMeta } from './gallery';
import { CoutureTheme, coutureMeta } from './couture';
import { PrismTheme, prismMeta } from './prism';
import { LiquidTheme, liquidMeta } from './liquid';
import { NeonLabTheme, neonlabMeta } from './neonlab';
import { PaperTheme, paperMeta } from './paper';
import { ChromeTheme, chromeMeta } from './chrome';
import { BotanicalTheme, botanicalMeta } from './botanical';
import { KineticTheme, kineticMeta } from './kinetic';
import { TerminalTheme, terminalMeta } from './terminal';
import { SaasTheme, saasMeta } from './saas';
import { ApiDocsTheme, apidocsMeta } from './apidocs';
import { AiTheme, aiMeta } from './ai';
import { MatrixTheme, matrixMeta } from './matrix';
import { WallStreetTheme, wallstreetMeta } from './wallstreet';
import { ConsultancyTheme, consultancyMeta } from './consultancy';
import { EquityTheme, equityMeta } from './equity';
import { CLevelTheme, clevelMeta } from './clevel';
import { KeynoteTheme, keynoteMeta } from './keynote';
import { StorefrontTheme, storefrontMeta } from './storefront';
import { BoutiqueTheme, boutiqueMeta } from './boutique';
import { FlashTheme, flashMeta } from './flash';
import { MarketplaceTheme, marketplaceMeta } from './marketplace';
import { DtcTheme, dtcMeta } from './dtc';
import type { BioThemeDefaults, BioThemeDefinition, BioThemeMeta } from './types';

const brutalistMeta: BioThemeMeta = {
  key: 'brutalist',
  name: 'Brutalist',
  description: 'Bordas pretas, sombras duras e cores vibrantes. O visual assinatura do BioFlowzy.',
  available: true,
  defaults: {
    bg_color: '#FFFFFF',
    button_color: '#FACC15',
    text_color: '#000000',
    border_width: 2,
    shadow_offset: 4,
  },
  palettes: {
    bg: ['#FFFFFF', '#F1F5F9', '#FACC15', '#BEF264', '#FDA4AF', '#000000'],
    accent: ['#FACC15', '#BEF264', '#2563EB', '#EF4444', '#F97316', '#000000', '#FFFFFF'],
    text: ['#000000', '#111827', '#FFFFFF', '#1E293B'],
  },
};

export const THEMES: Record<string, BioThemeDefinition> = {
  brutalist: { meta: brutalistMeta, component: BrutalistTheme },
  aurora: { meta: auroraMeta, component: AuroraTheme },
  cyber: { meta: cyberMeta, component: CyberTheme },
  retrowave: { meta: retrowaveMeta, component: RetrowaveTheme },
  clay: { meta: clayMeta, component: ClayTheme },
  executive: { meta: executiveMeta, component: ExecutiveTheme },
  boardroom: { meta: boardroomMeta, component: BoardroomTheme },
  atlas: { meta: atlasMeta, component: AtlasTheme },
  conversion: { meta: conversionMeta, component: ConversionTheme },
  creator: { meta: creatorMeta, component: CreatorTheme },
  agency: { meta: agencyMeta, component: AgencyTheme },
  monolith: { meta: monolithMeta, component: MonolithTheme },
  gallery: { meta: galleryMeta, component: GalleryTheme },
  couture: { meta: coutureMeta, component: CoutureTheme },
  prism: { meta: prismMeta, component: PrismTheme },
  liquid: { meta: liquidMeta, component: LiquidTheme },
  neonlab: { meta: neonlabMeta, component: NeonLabTheme },
  paper: { meta: paperMeta, component: PaperTheme },
  chrome: { meta: chromeMeta, component: ChromeTheme },
  botanical: { meta: botanicalMeta, component: BotanicalTheme },
  kinetic: { meta: kineticMeta, component: KineticTheme },
  terminal: { meta: terminalMeta, component: TerminalTheme },
  saas: { meta: saasMeta, component: SaasTheme },
  apidocs: { meta: apidocsMeta, component: ApiDocsTheme },
  ai: { meta: aiMeta, component: AiTheme },
  matrix: { meta: matrixMeta, component: MatrixTheme },
  wallstreet: { meta: wallstreetMeta, component: WallStreetTheme },
  consultancy: { meta: consultancyMeta, component: ConsultancyTheme },
  equity: { meta: equityMeta, component: EquityTheme },
  clevel: { meta: clevelMeta, component: CLevelTheme },
  keynote: { meta: keynoteMeta, component: KeynoteTheme },
  storefront: { meta: storefrontMeta, component: StorefrontTheme },
  boutique: { meta: boutiqueMeta, component: BoutiqueTheme },
  flash: { meta: flashMeta, component: FlashTheme },
  marketplace: { meta: marketplaceMeta, component: MarketplaceTheme },
  dtc: { meta: dtcMeta, component: DtcTheme },
};

export function getTheme(key: string | undefined | null): BioThemeDefinition {
  if (key && THEMES[key]) return THEMES[key];
  return THEMES.brutalist;
}

export function getThemeDefaults(key: string | undefined | null): BioThemeDefaults {
  return getTheme(key).meta.defaults;
}
