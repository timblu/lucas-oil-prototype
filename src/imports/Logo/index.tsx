import imgLucasOilLogo from "./lucas-oil-badge.png";
import imgLucasOilLogo2x from "./lucas-oil-badge@2x.png";

export default function Logo() {
  return (
    <div className="relative size-full" data-name="logo">
      <div
        className="-translate-x-1/2 -translate-y-1/2 absolute h-[80px] left-1/2 top-1/2 w-[147px]"
        data-name="lucas-oil-logo"
      >
        <img
          alt="Lucas Oil"
          className="absolute inset-0 max-w-none object-contain pointer-events-none size-full"
          src={imgLucasOilLogo}
          srcSet={`${imgLucasOilLogo} 1x, ${imgLucasOilLogo2x} 2x`}
        />
      </div>
    </div>
  );
}
