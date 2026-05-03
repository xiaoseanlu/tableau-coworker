/**
 * UI icons — Lucide (ISC license, free commercial use: https://lucide.dev/license).
 * Stroke 1.6 keeps weight aligned with the prior inline set and plan/03 chrome.
 *
 * Other solid OSS options with similar 24×24 outline language (pick one family and stay on it):
 * - Heroicons (MIT) — https://heroicons.com
 * - Phosphor Icons (MIT) — https://phosphoricons.com
 * - Tabler Icons (MIT) — https://tabler.io/icons
 */
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import {
  ArrowDown as ArrowDownIcon,
  ArrowRight as ArrowRightIcon,
  ArrowUp as ArrowUpIcon,
  Atom as AtomIcon,
  Bolt as BoltIcon,
  Briefcase as BriefcaseIcon,
  Calendar as CalendarIcon,
  Check as CheckIcon,
  ChevronDown as ChevronDownIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Clock as ClockIcon,
  Component as ComponentIcon,
  Contrast as ContrastIcon,
  ExternalLink as ExternalLinkIcon,
  Gauge as GaugeIcon,
  Hand as HandIcon,
  Inbox as InboxIcon,
  Layers as LayersIcon,
  LayoutTemplate as LayoutTemplateIcon,
  Mail as MailIcon,
  MessageSquareText as MessageSquareTextIcon,
  Mic as MicIcon,
  PanelRight as PanelRightIcon,
  Phone as PhoneIcon,
  Search as SearchIcon,
  Send as SendIcon,
  Settings as SettingsIcon,
  Smartphone as SmartphoneIcon,
  Sparkle as SparkleIcon,
  SquareMousePointer as SquareMousePointerIcon,
  StickyNote as StickyNoteIcon,
  Table as TableIcon,
  Tags as TagsIcon,
  TrendingDown as TrendingDownIcon,
  TrendingUp as TrendingUpIcon,
  User as UserIcon,
  Users as UsersIcon,
  X as XIcon,
  Quote as QuoteIcon,
} from 'lucide-react'

export interface IconProps {
  className?: string
  size?: number
}

/** Match legacy inline SVG — Lucide defaults to 2; we keep 1.6 for density parity */
const STROKE = 1.6

function lucide(Icon: LucideIcon) {
  return function LucideWrapped({ size = 16, className }: IconProps) {
    return <Icon size={size} className={className} strokeWidth={STROKE} />
  }
}

export const ArrowRight = lucide(ArrowRightIcon)
export const ArrowUp = lucide(ArrowUpIcon)
export const ArrowDown = lucide(ArrowDownIcon)
export const Sparkle = lucide(SparkleIcon)
export const Bolt = lucide(BoltIcon)
export const Calendar = lucide(CalendarIcon)
export const User = lucide(UserIcon)
export const Users = lucide(UsersIcon)
export const Check = lucide(CheckIcon)
export const X = lucide(XIcon)
export const Clock = lucide(ClockIcon)
export const Search = lucide(SearchIcon)
export const Send = lucide(SendIcon)
export const ChevronRight = lucide(ChevronRightIcon)
export const ChevronDown = lucide(ChevronDownIcon)
export const ChevronLeft = lucide(ChevronLeftIcon)
export const Trend = lucide(TrendingUpIcon)
export const TrendDown = lucide(TrendingDownIcon)
export const Quote = lucide(QuoteIcon)
export const Layers = lucide(LayersIcon)
export const Inbox = lucide(InboxIcon)
export const Phone = lucide(PhoneIcon)
/** Smartphone outline — mobile product surface (not the classic handset glyph) */
export const MobileDevice = lucide(SmartphoneIcon)
export const Mail = lucide(MailIcon)
export const Settings = lucide(SettingsIcon)
export const Briefcase = lucide(BriefcaseIcon)
export const Open = lucide(ExternalLinkIcon)
export const Mic = lucide(MicIcon)
export const Note = lucide(StickyNoteIcon)

/** Focus-visible / hit target — Lucide square + pointer */
export const FocusCorners = lucide(SquareMousePointerIcon)
/** Contrast / color intent */
export const ContrastSplit = lucide(ContrastIcon)
/** Touch — open hand (same glyph family as the rest) */
export const HandPointerUp = lucide(HandIcon)
/** Motion / duration tiers — gauge reads as graduated levels (Lucide) */
export const EasingMotion = lucide(GaugeIcon)
/** Atomic design “atoms” — nucleus glyph */
export const AtomicPrimitives = lucide(AtomIcon)
/** Molecules — composite UI blocks (dock, chips, tiles) */
export const MoleculeBond = lucide(ComponentIcon)
/** Organisms — full templates / shells */
export const OrganismLayout = lucide(LayoutTemplateIcon)
/** Suggested chips / drills */
export const SuggestionChips = lucide(TagsIcon)
export const PanelRight = lucide(PanelRightIcon)
export const TooltipBubble = lucide(MessageSquareTextIcon)
export const TableRows = lucide(TableIcon)

/** Brand mark — not provided by Lucide; Feather-style path retained. */
const I = ({ children, className, size = 16 }: IconProps & { children: ReactNode }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={STROKE}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {children}
  </svg>
)

export const Slack = (p: IconProps) => (
  <I {...p}>
    <path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5S16 2.67 16 3.5v5c0 .83-.67 1.5-1.5 1.5zM20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5S22 7.67 22 8.5 21.33 10 20.5 10zM9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5zM3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14zM10 9.5C10 8.67 10.67 8 11.5 8H13v1.5c0 .83-.67 1.5-1.5 1.5h-2zM14 14.5c0-.83.67-1.5 1.5-1.5H17v1.5c0 .83-.67 1.5-1.5 1.5h-2v-1.5zM3.5 8H8v1.5c0 .83-.67 1.5-1.5 1.5h-3C2.67 11 2 10.33 2 9.5S2.67 8 3.5 8zM16 13h4.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v.5c0-.83-.67-1.5-1.5-1.5z" />
  </I>
)
