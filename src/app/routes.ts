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
  knowledgeHub: "/knowledge-hub",
  productVideos: "/knowledge-hub/videos",
  marketingCollateral: "/marketing-collateral",
} as const;
