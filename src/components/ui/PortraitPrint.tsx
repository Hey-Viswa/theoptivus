import Image from 'next/image';
import { SITE_CONFIG } from '@/data/site';
import { SignatureMark } from '@/components/ui/Scribbles';

export interface PortraitPrintProps {
  preload?: boolean;
  className?: string;
}

export function PortraitPrint({ preload = false, className }: PortraitPrintProps) {
  return (
    <figure className={className ? `portrait-print-frame ${className}` : 'portrait-print-frame'}>
      <div className="portrait-exposure">
        <Image
          src={SITE_CONFIG.avatar}
          alt="Portrait of Viswaranjan Giri"
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
