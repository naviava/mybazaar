interface IProps {
  params: {
    categorySlug: string;
  };
}

export default function CategorySlugPage({ params }: IProps) {
  return (
    <div>
      <p>{params.categorySlug}</p>
    </div>
  );
}
