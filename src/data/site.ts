export const SITE_CONFIG = {
  name: 'Viswaranjan Giri',
  shortName: 'Viswa',
  nativeName: 'विश्वरंजन',
  brand: 'TheOptivus',
  handle: 'Hey-Viswa',
  role: 'Software Engineer',
  location: 'Mumbai, India',
  email: 'viswaranjan.dev@gmail.com',
  avatar: '/viswa.jpg',
  url: 'https://theoptivus.vercel.app',
  description:
    'Viswaranjan Giri is a software engineer in Mumbai building web products, backend systems, and native Android apps.',
} as const;

export const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Skills', href: '/skills' },
  { label: 'Contact', href: '/contact' },
] as const;

export const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    href: 'https://github.com/Hey-Viswa',
    handle: '@Hey-Viswa',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/biswaranjangiri/',
    handle: 'in/biswaranjangiri',
  },
  {
    name: 'X',
    href: 'https://x.com/Hey_viswa_',
    handle: '@Hey_viswa_',
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/yoitsviswa/',
    handle: '@yoitsviswa',
  },
] as const;
