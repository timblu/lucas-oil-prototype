import { useNavigate } from "react-router-dom";
import { PageHeader } from "../../components/shared/PageHeader";
import { ProductInfoVideoGrid } from "../../components/ProductInfoVideoGrid";
import { ROUTES } from "../../routes";

export default function ProductVideosPage() {
  const navigate = useNavigate();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <PageHeader
        title="Product Videos"
        back="Knowledge Hub"
        onBack={() => navigate(ROUTES.knowledgeHub)}
      />
      <ProductInfoVideoGrid />
    </div>
  );
}
