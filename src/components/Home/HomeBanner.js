'use client';

import Image from 'next/image';
import Banner from "../../../public/asset/Home/home-banner.png"

export default function SimpleBanner() {
  return (
    <div className="relative w-full h-[50vh] md:h-[80vh]">
      <Image
        src={Banner}
        alt="Banner image"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
    </div>
  );
}
