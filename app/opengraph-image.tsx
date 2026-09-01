import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/seo";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = siteConfig.name;

export default function Image() {
  const logoPath = path.join(
    process.cwd(),
    "public",
    "images",
    "supercleanlogo.PNG",
  );
  const logoData = fs.readFileSync(logoPath).toString("base64");
  const logoSrc = `data:image/png;base64,${logoData}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={900} height={600} />
      </div>
    ),
    { ...size },
  );
}
