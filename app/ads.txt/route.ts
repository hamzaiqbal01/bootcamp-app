import { NextResponse } from "next/server";

/**
 * Serves ads.txt for AdSense.
 * Set ADSENSE_PUB_ID=pub-xxxxxxxx in Vercel after approval.
 */
export function GET() {
  const pubId = process.env.ADSENSE_PUB_ID || process.env.NEXT_PUBLIC_ADSENSE_PUB_ID;

  if (!pubId) {
    return new NextResponse(
      "# Add ADSENSE_PUB_ID=pub-xxxxxxxx in environment variables after AdSense approval\n",
      {
        status: 200,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "public, max-age=3600",
        },
      },
    );
  }

  const id = pubId.startsWith("pub-") ? pubId : `pub-${pubId}`;
  const body = `google.com, ${id}, DIRECT, f08c47fec0942fa0\n`;

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
