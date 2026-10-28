import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Native Meals — Healthy meals in Hinjewadi.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const font = await readFile(join(process.cwd(), "app/fonts/Outfit-Bold.woff"));

  return new ImageResponse(
    (
      <div
        style={{
          background: "#FFFDF4",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "Outfit",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 2.4,
            color: "#197241",
            textTransform: "uppercase",
            fontWeight: 700,
          }}
        >
          Healthy meal plans · Hinjewadi
        </div>
        <div
          style={{
            fontSize: 84,
            color: "#0C3F25",
            marginTop: 16,
            lineHeight: 1.04,
            letterSpacing: -2,
            fontWeight: 700,
          }}
        >
          Native Meals
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#526158",
            marginTop: 24,
            lineHeight: 1.4,
            fontWeight: 700,
          }}
        >
          Healthy meals, cooked the same morning.
        </div>
        <div style={{ fontSize: 24, color: "#197241", marginTop: 48, fontWeight: 700 }}>
          Hinjewadi, Wakad and nearby Pune
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Outfit",
          data: font,
          weight: 700,
          style: "normal",
        },
      ],
    },
  );
}
