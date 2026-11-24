import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Native Meals. Everyday food. Balanced better.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const font = await readFile(join(process.cwd(), "app/fonts/DMSans-Bold.woff"));

  return new ImageResponse(
    (
      <div
        style={{
          /* Hex values match the theme in app/globals.css. next/og cannot read those variables. */
          background: "#1A2E24",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "DM Sans",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 2.4,
            color: "rgba(245, 243, 239, 0.7)",
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
            fontSize: 64,
            color: "#F5F3EF",
            marginTop: 24,
            lineHeight: 1.1,
            letterSpacing: -1.5,
            fontWeight: 700,
          }}
        >
          <span>Everyday food.</span>
          <span>Balanced better.</span>
        </div>
        <div
          style={{
            fontSize: 26,
            color: "rgba(245, 243, 239, 0.7)",
            marginTop: 28,
            lineHeight: 1.4,
            fontWeight: 700,
          }}
        >
          Complete familiar meals, cooked fresh, at the office gate or your door.
        </div>
        <div style={{ display: "flex", marginTop: 44 }}>
          <div
            style={{
              fontSize: 22,
              color: "#121A16",
              background: "#FF6A3D",
              borderRadius: 10,
              padding: "12px 24px",
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
          name: "DM Sans",
          data: font,
          weight: 700,
          style: "normal",
        },
      ],
    },
  );
}
