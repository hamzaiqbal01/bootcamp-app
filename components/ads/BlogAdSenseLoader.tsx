import Script from "next/script";

const CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

/** Loads AdSense script only when publisher ID is configured. Mount only under /blog. */
export function BlogAdSenseLoader() {
  if (!CLIENT_ID) return null;
  return (
    <Script
      id="adsense-loader"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${CLIENT_ID}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
