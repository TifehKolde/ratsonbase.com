import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 42,
          background: "#01006e",
          color: "#ffffff",
          fontSize: 112,
          fontWeight: 800,
          fontFamily: "Arial, sans-serif",
          position: "relative",
        }}
      >
        R
        <div
          style={{
            position: "absolute",
            bottom: 28,
            width: 78,
            height: 7,
            borderRadius: 8,
            background: "#b4049a",
          }}
        />
      </div>
    ),
    size,
  );
}
