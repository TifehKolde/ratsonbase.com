import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: "512px", height: "512px", display: "flex", position: "relative", overflow: "hidden", background: "#ffffff" }}>
        <img src="https://www.ratsonbase.com/logos/ratsonbase-logo.png" width="3012" height="1807" style={{ position: "absolute", left: "-301px", top: "-632px" }} />
      </div>
    ),
    size,
  );
}
