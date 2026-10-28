import { ImageResponse } from "next/og";

export const alt = "Native Meals — Clean, healthy meals.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#FFF8EF",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <div
          style={{
            fontSize: 24,
            letterSpacing: 6,
            color: "#8E4328",
            textTransform: "uppercase",
          }}
        >
          Healthy meal plans
        </div>
        <div
          style={{
            fontSize: 92,
            color: "#414B35",
            marginTop: 20,
            lineHeight: 1,
          }}
        >
          Native Meals
        </div>
        <div style={{ fontSize: 36, color: "#292A26", marginTop: 20 }}>
          Clean, healthy meals.
        </div>
        <div style={{ fontSize: 24, color: "#414B35", marginTop: 48 }}>
          Wakad, Hinjewadi, Baner, Aundh, Tathwade, Punewale
        </div>
      </div>
    ),
    { ...size },
  );
}
