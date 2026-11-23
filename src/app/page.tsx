import Image from 'next/image';
import Link from 'next/link';
import ledgerScreen from '../../public/projects/fnet/home.webp';
import entryScreen from '../../public/projects/fnet/entry.webp';
import { FNetSaveDemo } from '@/components/ui/FNetSaveDemo';
import { PortraitPrint } from '@/components/ui/PortraitPrint';
import { ScribbleUnderline } from '@/components/ui/Scribbles';
import { getProjectBySlug } from '@/data/projects';
import { SITE_CONFIG } from '@/data/site';

export default function HomePage() {
  const fnet = getProjectBySlug('fnet');
  const freshkatta = getProjectBySlug('freshkatta');
  const harsh = getProjectBySlug('harsh-portfolio');
  const studioflow = getProjectBySlug('studioflow');
  const civiclens = getProjectBySlug('civiclens');

  return (
    <div className="site-width">
      <section className="folio-opening" aria-labelledby="home-intro-heading">
        <div className="opening-copy">
          <p className="opening-kicker">
            {SITE_CONFIG.name} · {SITE_CONFIG.role}, Mumbai
          </p>
          <h1 id="home-intro-heading">
            I’m{' '}
            <span className="ink-phrase">
              <em>Viswa.</em>
              <ScribbleUnderline className="title-underline" />
            </span>{' '}
            I build software in Mumbai.
          </h1>
          <p className="opening-note">
            I built{' '}
            <Link href="/work/fnet" className="text-link">
              FNet
            </Link>{' '}
            to save expenses and balances offline between stations, and{' '}
            <Link href="/work/freshkatta" className="text-link">
              FreshKatta
            </Link>{' '}
            from checkout to the rider’s route.
          </p>
        </div>

        <div className="opening-print">
          <PortraitPrint preload />
        </div>
      </section>

      <section id="selected-work" aria-labelledby="work-title" className="prints-section">
        <div className="prints-head">
          <h2 id="work-title">Selected work</h2>
          <Link href="/work" className="text-link">
            All five projects <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="prints-stage">
          <Link href="/work/freshkatta" className="print-card print-card-left">
            <article className="print-surface">
              <div className="print-media">
                <Image
                  src="/projects/freshkatta/storefront.png"
                  alt={
                    freshkatta?.thumbnailAlt ??
                    'FreshKatta production storefront showing categories, delivery promise, and product catalog'
                  }
                  fill
                  priority
                  sizes="(max-width: 767px) 92vw, (max-width: 1023px) 30vw, 350px"
                />
              </div>
              <div className="print-caption">
                <p className="print-meta">
                  {freshkatta ? `${freshkatta.category} · ${freshkatta.year}` : 'Live Product · 2026'}
                </p>
                <h3>{freshkatta?.shortTitle ?? freshkatta?.title ?? 'FreshKatta'}</h3>
                <p>{freshkatta?.cardSummary ?? 'From checkout to the rider’s route.'}</p>
              </div>
            </article>
          </Link>

          <Link href="/work/fnet" className="print-card print-card-lead">
            <article className="print-surface">
              <div className="print-media print-lead-media">
                <Image
                  src={ledgerScreen}
                  alt="FNet dashboard with the daily spending limit and spendable cash balance"
                  priority
                  sizes="(max-width: 767px) 40vw, (max-width: 1023px) 16vw, 175px"
                  className="print-lead-screen"
                />
                <Image
                  src={entryScreen}
                  alt="FNet offline expense entry screen"
                  priority
                  sizes="(max-width: 767px) 36vw, (max-width: 1023px) 15vw, 160px"
                  className="print-lead-screen print-lead-screen-secondary"
                />
              </div>
              <div className="print-caption">
                <p className="print-meta">
                  {fnet ? `${fnet.category} · ${fnet.year}` : 'Native Android · 2026'}
                </p>
                <h3>{fnet?.title ?? 'FNet'}</h3>
                <p>{fnet?.cardSummary ?? 'A ledger that works between stations.'}</p>
                <span className="print-cta">
                  Read the FNet case study <span aria-hidden="true">→</span>
                </span>
              </div>
            </article>
          </Link>

          <Link href="/work/harsh-portfolio" className="print-card print-card-right">
            <article className="print-surface">
              <div className="print-media">
                <Image
                  src="/projects/harsh-portfolio/case-study.png"
                  alt={
                    harsh?.thumbnailAlt ??
                    'Harsh Savale Olympic Medal Design case study page for IOC Dakar 2026 Youth Olympic Games'
                  }
                  fill
                  priority
                  sizes="(max-width: 767px) 92vw, (max-width: 1023px) 30vw, 350px"
                />
              </div>
              <div className="print-caption">
                <p className="print-meta">
                  {harsh ? `${harsh.category} · ${harsh.year}` : 'Client Work · 2026'}
                </p>
                <h3>{harsh?.shortTitle ?? harsh?.title ?? 'Harsh Savale CMS'}</h3>
                <p>
                  {harsh?.cardSummary ?? 'A designer’s portfolio, with the editor behind it.'}
                </p>
              </div>
            </article>
          </Link>
        </div>

        <div className="prints-supporting" aria-label="Additional software projects">
          <Link href="/work/studioflow" className="supporting-card">
            <article className="supporting-surface">
              <div className="supporting-media">
                <Image
                  src="/projects/studioflow/dashboard.png"
                  alt="StudioFlow project operations dashboard showing billing and active client projects"
                  fill
                  sizes="(max-width: 671px) 92vw, 520px"
                />
              </div>
              <div className="supporting-copy">
                <p className="supporting-meta">
                  {studioflow ? `${studioflow.category} · ${studioflow.year}` : 'SaaS · 2025'}
                </p>
                <h3>{studioflow?.shortTitle ?? studioflow?.title ?? 'StudioFlow'}</h3>
                <p>
                  {studioflow?.cardSummary ??
                    'Multi-role agency workspace for projects, file revisions, and invoices.'}
                </p>
              </div>
            </article>
          </Link>

          <Link href="/work/civiclens" className="supporting-card">
            <article className="supporting-surface">
              <div className="supporting-media">
                <Image
                  src="/projects/civiclens/civicstatus.png"
                  alt="CivicLens real-time complaint lifecycle and WebSocket status tracker with Mapbox location"
                  fill
                  sizes="(max-width: 671px) 92vw, 520px"
                />
              </div>
              <div className="supporting-copy">
                <p className="supporting-meta">
                  {civiclens ? `${civiclens.category} · ${civiclens.year}` : 'Hackathon AI · 2026'}
                </p>
                <h3>{civiclens?.shortTitle ?? civiclens?.title ?? 'CivicLens'}</h3>
                <p>
                  {civiclens?.cardSummary ??
                    'Hackathon AI platform for reporting municipal issues and tracking repairs.'}
                </p>
              </div>
            </article>
          </Link>
        </div>
      </section>

      <section className="home-demo-section" aria-label="Interactive FNet offline save walkthrough">
        <FNetSaveDemo heading="Watch FNet save offline" headingAs="h2" />
        <div className="home-demo-footer">
          <Link href="/work/fnet" className="text-link home-demo-link">
            Read the full FNet case study <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <footer className="cover-signoff">
        <p>Have a project in mind?</p>
        <div className="cover-signoff-actions">
          <a href={`mailto:${SITE_CONFIG.email}`} className="text-link">
            {SITE_CONFIG.email}
          </a>
          <span aria-hidden="true" className="cover-signoff-dot">
            ·
          </span>
          <Link href="/contact" className="text-link">
            Contact <span aria-hidden="true">→</span>
          </Link>
        </div>
      </footer>
    </div>
  );
}
