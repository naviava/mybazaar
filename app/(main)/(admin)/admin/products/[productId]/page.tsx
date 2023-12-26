import { AdminPageWrapper } from "~/components/admin-page-wrapper";

interface IProps {
  params: {
    productId: string;
  };
}

export default function ProductIdPage({ params }: IProps) {
  const { productId } = params;

  return <AdminPageWrapper>page</AdminPageWrapper>;
}
