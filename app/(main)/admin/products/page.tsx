import Link from "next/link";
import { AdminPageWrapper } from "~/components/admin-page-wrapper";
import { Button } from "~/components/ui/button";
import { db } from "~/lib/db";

interface IProps {}

export default async function ProductsPage({}: IProps) {
  const products = await db.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <AdminPageWrapper>
      <div className="flex w-1/2 flex-col gap-y-4">
        {products.map((product) => (
          <Button key={product.id} asChild variant="outline">
            <Link href={`/admin/products/${product.id}`}>{product.name}</Link>
          </Button>
        ))}
      </div>
    </AdminPageWrapper>
  );
}
