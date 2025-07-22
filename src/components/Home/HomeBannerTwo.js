'use client';

import Image from 'next/image';
import Banner from "../../../public/asset/Home/bottom-banner3.webp";

export default function HomeBannerTwo() {
  return (
    <div className="relative w-full h-[25vh] md:h-[80vh]">
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
