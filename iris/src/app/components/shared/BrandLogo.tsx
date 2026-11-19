import { useBrand } from "../../brand/BrandContext";
import { IrisLogo } from "./IrisLogo";
import { LucasOilLogo } from "./LucasOilLogo";

export function BrandLogo({ height = 32 }: { height?: number }) {
  const { brand } = useBrand();
  if (brand.id === "lucas") return <LucasOilLogo height={height} />;
  return <IrisLogo height={height} />;
}
