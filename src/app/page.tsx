import Link from 'next/link';
import { PortraitPrint } from '@/components/ui/PortraitPrint';
import { ScribbleUnderline } from '@/components/ui/Scribbles';
import { SITE_CONFIG } from '@/data/site';

export default function HomePage() {
  return (
    <section className="folio-cover site-width">
      <div className="cover-words">
        <p className="cover-credit">{SITE_CONFIG.name} · Software engineer</p>
        <h1>Call me <em>Viswa.<ScribbleUnderline className="title-underline" /></em></h1>
        <p className="cover-intro">I build software in Mumbai. A ledger that works offline. A storefront that follows an order to the door. A publishing tool that gives the designer the keys.</p>
        <Link className="text-link cover-contact" href="/contact">Get in touch</Link>
      </div>
      <div className="cover-print"><PortraitPrint preload /></div>
    </section>
  );
}
