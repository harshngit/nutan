'use client';

import Image from 'next/image';
import Banner from "../../../public/asset/slider/nutan-banner.webp"

export default function SimpleBanner() {
  return (
    <div className="relative h-[800px] w-full">
      <Image
        src={Banner}
        alt="Browse"
    fill
    className="object-cover"
      />
    </div>
  );
}
