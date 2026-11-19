import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { ROUTES } from "./routes";
import { RootLayout } from "./layouts/RootLayout";
import { AppLayout } from "./layouts/AppLayout";
import { ProtectedRoute } from "./layouts/ProtectedRoute";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const OrdersListPage = lazy(() => import("./pages/orders/OrdersListPage"));
const OrderDetailPage = lazy(() => import("./pages/orders/OrderDetailPage"));
const CatalogPage = lazy(() => import("./pages/catalog/CatalogPage"));
const ProductDetailPage = lazy(
  () => import("./pages/catalog/ProductDetailPage"),
);
const InvoicesListPage = lazy(
  () => import("./pages/invoices/InvoicesListPage"),
);
const InvoiceDetailPage = lazy(
  () => import("./pages/invoices/InvoiceDetailPage"),
);
const AccountPage = lazy(() => import("./pages/AccountPage"));
const KnowledgeHubPage = lazy(
  () => import("./pages/knowledge/KnowledgeHubPage"),
);
const ProductVideosPage = lazy(
  () => import("./pages/knowledge/ProductVideosPage"),
);
const MarketingCollateralPage = lazy(
  () => import("./pages/MarketingCollateralPage"),
);
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <Navigate to={ROUTES.dashboard} replace /> },
      { path: ROUTES.login, element: <LoginPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <AppLayout />,
            children: [
              { path: ROUTES.dashboard, element: <DashboardPage /> },
              { path: ROUTES.orders, element: <OrdersListPage /> },
              { path: "/orders/:orderId", element: <OrderDetailPage /> },
              { path: ROUTES.catalog, element: <CatalogPage /> },
              { path: "/catalog/:productId", element: <ProductDetailPage /> },
              { path: ROUTES.invoices, element: <InvoicesListPage /> },
              { path: "/invoices/:invoiceId", element: <InvoiceDetailPage /> },
              { path: ROUTES.account, element: <AccountPage /> },
              { path: ROUTES.knowledgeHub, element: <KnowledgeHubPage /> },
              { path: ROUTES.productVideos, element: <ProductVideosPage /> },
              {
                path: ROUTES.marketingCollateral,
                element: <MarketingCollateralPage />,
              },
            ],
          },
        ],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
