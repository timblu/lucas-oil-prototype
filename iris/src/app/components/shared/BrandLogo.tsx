import logo from "../../../assets/logo/iris-logo.svg";

const LOGO_ASPECT = 228.85 / 86.77;

export function BrandLogo({ height = 32 }: { height?: number }) {
  const width = Math.round(height * LOGO_ASPECT);

  return (
    <img
      src={logo}
      alt="IRIS Networks"
      width={width}
      height={height}
      style={{ height, width: "auto" }}
      className="block"
    />
  );
}
