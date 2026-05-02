// Icon set used across the prototype. Inline SVGs keep the bundle tiny
// and let us style with currentColor + Tailwind size classes.

interface IconProps { className?: string; size?: number }
const I = ({ children, className, size = 16 }: IconProps & { children: React.ReactNode }) => (
  <svg
    width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth={1.6}
    strokeLinecap="round" strokeLinejoin="round"
    className={className}
  >{children}</svg>
)

export const ArrowRight = (p: IconProps) => <I {...p}><path d="M5 12h14M13 5l7 7-7 7"/></I>
export const ArrowUp    = (p: IconProps) => <I {...p}><path d="M12 19V5M5 12l7-7 7 7"/></I>
export const ArrowDown  = (p: IconProps) => <I {...p}><path d="M12 5v14M19 12l-7 7-7-7"/></I>
export const Sparkle    = (p: IconProps) => <I {...p}><path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5z"/></I>
export const Bolt       = (p: IconProps) => <I {...p}><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/></I>
export const Calendar   = (p: IconProps) => <I {...p}><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></I>
export const User       = (p: IconProps) => <I {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></I>
export const Users      = (p: IconProps) => <I {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></I>
export const Check      = (p: IconProps) => <I {...p}><path d="M20 6L9 17l-5-5"/></I>
export const X          = (p: IconProps) => <I {...p}><path d="M18 6L6 18M6 6l12 12"/></I>
export const Clock      = (p: IconProps) => <I {...p}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></I>
export const Search     = (p: IconProps) => <I {...p}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></I>
export const Send       = (p: IconProps) => <I {...p}><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></I>
export const Slack      = (p: IconProps) => <I {...p}><path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5S16 2.67 16 3.5v5c0 .83-.67 1.5-1.5 1.5zM20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5S22 7.67 22 8.5 21.33 10 20.5 10zM9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5zM3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14zM10 9.5C10 8.67 10.67 8 11.5 8H13v1.5c0 .83-.67 1.5-1.5 1.5h-2zM14 14.5c0-.83.67-1.5 1.5-1.5H17v1.5c0 .83-.67 1.5-1.5 1.5h-2v-1.5zM3.5 8H8v1.5c0 .83-.67 1.5-1.5 1.5h-3C2.67 11 2 10.33 2 9.5S2.67 8 3.5 8zM16 13h4.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v.5c0-.83-.67-1.5-1.5-1.5z"/></I>
export const ChevronRight = (p: IconProps) => <I {...p}><path d="M9 18l6-6-6-6"/></I>
export const ChevronDown  = (p: IconProps) => <I {...p}><path d="M6 9l6 6 6-6"/></I>
export const ChevronLeft  = (p: IconProps) => <I {...p}><path d="M15 18l-6-6 6-6"/></I>
export const Trend        = (p: IconProps) => <I {...p}><path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/></I>
export const TrendDown    = (p: IconProps) => <I {...p}><path d="M3 7l6 6 4-4 8 8"/><path d="M14 17h7v-7"/></I>
export const Quote        = (p: IconProps) => <I {...p}><path d="M3 21c3 0 7-1 7-8V5H3v8c0 4 4 6 4 6M21 21c3 0 7-1 7-8V5h-7v8c0 4 4 6 4 6"/></I>
export const Layers       = (p: IconProps) => <I {...p}><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></I>
export const Inbox        = (p: IconProps) => <I {...p}><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></I>
export const Phone        = (p: IconProps) => <I {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></I>
export const Mail         = (p: IconProps) => <I {...p}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></I>
export const Settings     = (p: IconProps) => <I {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></I>
export const Briefcase    = (p: IconProps) => <I {...p}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></I>
export const Open         = (p: IconProps) => <I {...p}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6M10 14L21 3"/></I>
export const Mic          = (p: IconProps) => <I {...p}><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3"/></I>
export const Note         = (p: IconProps) => <I {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h6"/></I>
