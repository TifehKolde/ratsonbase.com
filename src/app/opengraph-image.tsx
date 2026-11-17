import { ImageResponse } from "next/og";

export const alt = "Ratsonbase Construction Limited — Building with purpose";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "76px 88px",
          color: "#ffffff",
          background:
            "radial-gradient(circle at 86% 16%, rgba(180,4,154,.42), transparent 28%), linear-gradient(128deg, #050526 0%, #09094d 58%, #01006e 100%)",
          fontFamily: "Arial, sans-serif",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 12,
              height: 54,
              borderRadius: 8,
              background: "#B4049A",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 25, fontWeight: 800, letterSpacing: 1.2 }}>
              RATSONBASE
            </span>
            <span style={{ fontSize: 13, letterSpacing: 4, color: "#d7d7ef" }}>
              CONSTRUCTION LIMITED
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 930 }}>
          <span
            style={{
              color: "#ef9be3",
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: 5,
              textTransform: "uppercase",
            }}
          >
            Building with purpose
          </span>
          <span
            style={{
              marginTop: 20,
              fontSize: 72,
              lineHeight: 1.04,
              fontWeight: 800,
              letterSpacing: -3,
            }}
          >
            Thoughtful construction.
          </span>
          <span
            style={{
              marginTop: 8,
              fontSize: 42,
              lineHeight: 1.15,
              color: "#d9d9ef",
              fontWeight: 500,
            }}
          >
            Dependable delivery. Lasting value.
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,.25)",
            paddingTop: 22,
            color: "#d7d7ef",
            fontSize: 19,
          }}
        >
          <span>Construction · Engineering · Property Solutions</span>
          <span style={{ color: "#ffffff", fontWeight: 700 }}>ratsonbase.com</span>
        </div>
        <div
          style={{
            position: "absolute",
            right: -100,
            top: 120,
            width: 390,
            height: 390,
            border: "1px solid rgba(255,255,255,.12)",
            borderRadius: 999,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
