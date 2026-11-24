import type { Product } from "../types";

export const PRODUCTS: Product[] = [
  {
    id: "10087",
    name: "Hi-Perf 10W-30 Motor Oil",
    caseQty: "12 qt / case",
    price: 78.5,
    inventory: "in-stock",
    inventoryCount: 124,
    description:
      "Lucas Oil Hi-Performance 10W-30 semi-synthetic engine oil. Recommended for passenger cars and light trucks. Meets API SN. Excellent high-temperature stability and wear protection.",
    category: "Motor Oil",
    colorClass: "from-[#D8D8D8] to-[#C0C0C0]",
  },
  {
    id: "10091",
    name: "Marine Gear Lube 80W-90",
    caseQty: "12 qt / case",
    price: 92.0,
    inventory: "in-stock",
    inventoryCount: 88,
    description:
      "Heavy-duty marine gear lubricant for stern drives, inboard/outboards, and differentials. Meets API GL-4 and GL-5 specifications. Resists water washout.",
    category: "Gear Oil",
    colorClass: "from-[#CACACA] to-[#AAAAAA]",
  },
  {
    id: "10112",
    name: "Fuel Treatment 32oz",
    caseQty: "24 bt / case",
    price: 134.5,
    inventory: "low",
    inventoryCount: 6,
    description:
      "Multi-purpose fuel treatment. Cleans injectors, carburetors, and combustion chambers. For gas and diesel engines. One bottle treats up to 100 gallons.",
    category: "Additives",
    colorClass: "from-[#D0D0D0] to-[#B8B8B8]",
  },
  {
    id: "10203",
    name: "Synthetic 5W-30 Motor Oil",
    caseQty: "6 gal / case",
    price: 165.0,
    inventory: "in-stock",
    inventoryCount: 42,
    description:
      "Full synthetic 5W-30 motor oil for modern engines requiring low-viscosity lubrication. Exceeds API SP requirements. Superior cold-weather starting.",
    category: "Motor Oil",
    colorClass: "from-[#D8D8D8] to-[#BBBBBB]",
  },
  {
    id: "10245",
    name: "Red-N-Tacky Grease",
    caseQty: "30 tub / case",
    price: 188.0,
    inventory: "in-stock",
    inventoryCount: 67,
    description:
      "Red lithium complex grease. Excellent water resistance and high-temperature performance. For bearings, U-joints, and chassis lubrication. NLGI #2 grade.",
    category: "Grease",
    colorClass: "from-[#C8C8C8] to-[#AAAAAA]",
  },
  {
    id: "10312",
    name: "Heavy Duty ATF",
    caseQty: "12 qt / case",
    price: 95.75,
    inventory: "out",
    description:
      "Automatic transmission fluid for heavy-duty trucks and performance applications. Meets Allison TES-295 and GM Dexron III/VI. Reduces heat and friction.",
    category: "Transmission",
    colorClass: "from-[#BEBEBE] to-[#A0A0A0]",
  },
];
