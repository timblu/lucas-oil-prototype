export const ACCOUNT_SECTIONS = ["info", "contacts", "financial"] as const;
export type AccountSection = (typeof ACCOUNT_SECTIONS)[number];

export const ROUTES = {
  login: "/login",
  dashboard: "/dashboard",
  orders: "/orders",
  order: (id: string) => `/orders/${id}`,
  invoices: "/invoices",
  invoice: (id: string) => `/invoices/${id}`,
  catalog: "/catalog",
  product: (id: string) => `/catalog/${id}`,
  account: "/account",
  accountSection: (section: AccountSection) => `/account/${section}`,
  knowledgeHub: "/knowledge-hub",
  productVideos: "/knowledge-hub/videos",
  marketingCollateral: "/marketing-collateral",
} as const;
