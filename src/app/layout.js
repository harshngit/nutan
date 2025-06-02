import { Inter } from "next/font/google";
import "./globals.css";
import Hotjar from "@hotjar/browser";
import Script from "next/script";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nutan",
  // description: "Experience the best coliving spaces in Mumbai, Pune and Navi Mumbai. Fully furnished PG rooms with top-notch amenities for boys, girls and couples (students and professionals).",
  // keywords: ['Union Living','Union Living Mumbai','Community Living in Mumbai', 'Community Living in Pune', 'Community Living in Thane','Community Living in Navi Mumbai', "Premium Co-living",'Best Community'],
  // verification: {
  //   google: 'd2t3dmGtRE5YMyQqUbiHFM-lWvnz9mpRbS7Wwmb8uS0',
  // },
  // openGraph: {
  //   title: 'Luxury Coliving Spaces in Mumbai, Pune & Navi Mumbai | Best PG -  Union Living',
  //   description: 'Experience the best coliving spaces in Mumbai, Pune and Navi Mumbai. Fully furnished PG rooms with top-notch amenities for boys, girls and couples (students and professionals).',
  //   url: 'https://unionliving.in',
  //   siteName: 'Union Living',
  //   images: [
  //     {
  //       url: 'https://firebasestorage.googleapis.com/v0/b/union-living.appspot.com/o/files%2Ffavicon.png?alt=media&token=63384a08-8830-4c2b-82b0-0355cf50bbff', // Must be an absolute URL
  //       width: 800,
  //       height: 600,
  //     },
  //     {
  //       url: 'https://firebasestorage.googleapis.com/v0/b/union-living.appspot.com/o/files%2Ffavicon.png?alt=media&token=63384a08-8830-4c2b-82b0-0355cf50bbff', // Must be an absolute URL
  //       width: 1800,
  //       height: 1600,
  //       alt: 'Luxury Coliving Spaces in Mumbai, Pune & Navi Mumbai | Best PG -  Union Living',
  //     },
  //   ],

  // },
  // alternates: {
  //   canonical: 'https://unionliving.in/',
  // },

  // icons: {
  //   icon: 'https://firebasestorage.googleapis.com/v0/b/union-living.appspot.com/o/files%2Ffavicon.png?alt=media&token=63384a08-8830-4c2b-82b0-0355cf50bbff',
  //   shortcut: 'https://firebasestorage.googleapis.com/v0/b/union-living.appspot.com/o/files%2Ffavicon.png?alt=media&token=63384a08-8830-4c2b-82b0-0355cf50bbff',
  //   apple: 'https://firebasestorage.googleapis.com/v0/b/union-living.appspot.com/o/files%2Ffavicon.png?alt=media&token=63384a08-8830-4c2b-82b0-0355cf50bbff',
  //   other: {
  //     rel: 'apple-touch-icon-precomposed',
  //     url: 'https://firebasestorage.googleapis.com/v0/b/union-living.appspot.com/o/files%2Ffavicon.png?alt=media&token=63384a08-8830-4c2b-82b0-0355cf50bbff',
  //   },
  // },
}

export default function RootLayout({ children }) {


  return (
    <html lang="en">
      {/* <Script id="HotJarAnalytics" >
      {
        `(function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:5292476,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=')`}
      
     </Script>
    

      <link rel="icon" href="./favicon.png" sizes="any" />
      <link
  rel="apple-touch-icon"
  href="./favicon.png"
  type="image/png"
  sizes="any"
    /> */}
      <body className={inter.className}>{children}</body>

    </html>
  );
}
