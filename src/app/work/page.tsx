import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import ledgerScreen from '../../../public/projects/fnet/home.webp';
import entryScreen from '../../../public/projects/fnet/entry.webp';
import { WorkDirectory } from '@/components/work/WorkDirectory';
import { getAllProjects, getProjectBySlug } from '@/data/projects';
import { SITE_CONFIG } from '@/data/site';

export const metadata: Metadata = {
  title: 'Selected work',
  description: `Software engineering case studies and shipped products by ${SITE_CONFIG.name}.`,
};

export default function WorkPage() {
  const projects = getAllProjects();
  const fnet = getProjectBySlug('fnet');

  return (
    <div className="site-width editorial-page">
      <header className="editorial-page-head">
        <p className="editorial-label">
          {SITE_CONFIG.name} · Software Engineering
        </p>
        <h1 className="editorial-title">Selected work</h1>
        <p className="editorial-intro">
          Five software projects across native Android, production D2C commerce, headless CMS
          architecture, multi-role SaaS, and hackathon AI — led by FNet.
        </p>
      </header>

      {fnet && (
        <Link
          href="/work/fnet"
          className="ledger-feature group transition-colors hover:border-[var(--accent)]"
        >
          <div className="ledger-copy">
            <p className="cover-credit">
              {fnet.category} · {fnet.year} · Featured case study
            </p>
            <h2>{fnet.title}</h2>
            <p>
              Offline-first personal finance on Android. One Room transaction saves both entry and
              balance in exact integer paise before any signal returns.
            </p>
            <span className="text-link">
              Read case study <span aria-hidden="true">→</span>
            </span>
          </div>
          <div className="ledger-screens">
            <Image
              src={ledgerScreen}
              alt="FNet dashboard with the daily spending limit and spendable cash balance"
              sizes="(max-width: 720px) 38vw, 184px"
              preload
            />
            <Image
              src={entryScreen}
              alt="FNet offline expense entry screen"
              sizes="(max-width: 720px) 38vw, 184px"
              preload
            />
          </div>
        </Link>
      )}

      <div className="mt-8 sm:mt-12">
        <WorkDirectory projects={projects} />
      </div>
    </div>
  );
}
