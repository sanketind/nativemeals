import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Native Meals — Everyday food. Balanced better.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const font = await readFile(join(process.cwd(), "app/fonts/Outfit-Bold.woff"));

  return new ImageResponse(
    (
      <div
        style={{
          /* Hex values match the theme in app/globals.css. next/og cannot read those variables. */
          background: "#0C3F25",
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
            color: "rgba(251, 243, 224, 0.7)",
            textTransform: "uppercase",
            fontWeight: 700,
          }}
        >
          Native Meals
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 104,
            color: "#FBF3E0",
            marginTop: 20,
            lineHeight: 0.94,
            letterSpacing: -3,
            textTransform: "uppercase",
            fontWeight: 700,
          }}
        >
          <span>Everyday food.</span>
          <span>Balanced better.</span>
        </div>
        <div
          style={{
            fontSize: 30,
            color: "rgba(251, 243, 224, 0.8)",
            marginTop: 32,
            lineHeight: 1.4,
            fontWeight: 700,
          }}
        >
          Balanced, healthy food you can eat every day, cooked fresh.
        </div>
        <div style={{ display: "flex", marginTop: 44 }}>
          <div
            style={{
              fontSize: 24,
              color: "#0C3F25",
              background: "#F9D82B",
              borderRadius: 999,
              padding: "12px 28px",
              fontWeight: 700,
            }}
          >
            Hinjewadi, Wakad and Baner, Pune
          </div>
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
