'use client';

import Image from 'next/image';
import Banner from "../../../public/asset/slider/banner2.webp"

export default function HomeBannerTwo() {
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
