import Image from 'next/image';
import { SITE_CONFIG } from '@/data/site';
import { SignatureMark } from '@/components/ui/Scribbles';

export function PortraitPrint({ preload = false }: { preload?: boolean }) {
  return (
    <figure className="portrait-print-frame">
      <div className="portrait-exposure">
        <Image
          src={SITE_CONFIG.avatar}
          alt="Portrait of Viswa Giri"
          width={450}
          height={450}
          sizes="(max-width: 560px) 154px, (max-width: 900px) 210px, 258px"
          preload={preload}
        />
      </div>
      <figcaption>
        <span>{SITE_CONFIG.location}</span>
        <SignatureMark className="photo-signature" />
      </figcaption>
    </figure>
  );
}
