import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  BRAND_STORAGE_KEY,
  BRANDS,
  isBrandId,
  type Brand,
  type BrandId,
} from "./brands";

type BrandContextValue = {
  brand: Brand;
  setBrandId: (id: BrandId) => void;
};

const BrandContext = createContext<BrandContextValue | undefined>(undefined);

function readInitialBrand(): BrandId {
  const fromQuery = new URLSearchParams(window.location.search).get("brand");
  if (isBrandId(fromQuery)) return fromQuery;
  const stored = window.localStorage.getItem(BRAND_STORAGE_KEY);
  if (isBrandId(stored)) return stored;
  return "iris";
}

export function BrandProvider({ children }: { children: ReactNode }) {
  const [brandId, setBrandId] = useState<BrandId>(readInitialBrand);

  useEffect(() => {
    document.documentElement.dataset.brand = brandId;
    window.localStorage.setItem(BRAND_STORAGE_KEY, brandId);
    document.title = `${BRANDS[brandId].name} | Distributor Portal`;
  }, [brandId]);

  const value = useMemo<BrandContextValue>(
    () => ({ brand: BRANDS[brandId], setBrandId }),
    [brandId],
  );

  return (
    <BrandContext.Provider value={value}>{children}</BrandContext.Provider>
  );
}

export function useBrand() {
  const ctx = useContext(BrandContext);
  if (!ctx) throw new Error("useBrand must be used within BrandProvider");
  return ctx;
}
