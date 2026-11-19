import irisLogo from "../../../assets/logo/iris-logo.svg";
import irisLogoWhite from "../../../assets/logo/iris-logo-white.svg";

const LOGO_ASPECT = 228.85 / 86.77;

export function IrisLogo({
  height = 32,
  variant = "color",
}: {
  height?: number;
  variant?: "color" | "white";
}) {
  const width = Math.round(height * LOGO_ASPECT);

  return (
    <img
      src={variant === "white" ? irisLogoWhite : irisLogo}
      alt="IRIS Networks"
      width={width}
      height={height}
      style={{ height, width: "auto" }}
      className="block"
    />
  );
}
