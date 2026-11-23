import imgLucasOil from "../../../assets/logo/lucas-oil-badge.png";
import imgLucasOil2x from "../../../assets/logo/lucas-oil-badge@2x.png";

export function LucasOilLogo({ height = 32 }: { height?: number }) {
  const width = Math.round(height * (176 / 96));

  return (
    <img
      src={imgLucasOil}
      srcSet={`${imgLucasOil} 1x, ${imgLucasOil2x} 2x`}
      alt="Lucas Oil"
      width={width}
      height={height}
      style={{ height, width: "auto" }}
      className="block"
    />
  );
}
