'use client';

import Image from 'next/image';
import Banner from "../../../public/asset/slider/nutan-banner.webp";

export default function HomeBannerTwo() {
  return (
    <div className="relative w-full h-[50vh] md:h-[85vh]">
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
