import { ProductsGrid } from "~/components/products-grid";
import { SectionHeading } from "~/components/section-heading";

export function TopSellingProducts() {
  return (
    <div className="mx-auto max-w-7xl px-3">
      <SectionHeading
        title="Top Selling"
        subtitle="Cum doctus civibus efficiantur in imperdiet deterruisset"
      />
      <ProductsGrid />
    </div>
  );
}
