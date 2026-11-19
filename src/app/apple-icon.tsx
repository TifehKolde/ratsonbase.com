import { ImageResponse } from "next/og";
import logo from "../../public/logos/ratsonbase-logo.png";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "180px", height: "180px", display: "flex", position: "relative", overflow: "hidden", borderRadius: 36, background: "#ffffff" }}>
        <img src={logo.src} width="1060" height="636" style={{ position: "absolute", left: "-106px", top: "-223px" }} />
      </div>
    ),
    size,
  );
}
