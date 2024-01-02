interface IProps {
  title: string;
  subtitle?: string;
}

export function SectionHeading({ title, subtitle }: IProps) {
  return (
    <div className="mb-8 space-y-4">
      <h2 className="text-center text-[28px] font-medium md:text-5xl">
        {title}
      </h2>
      {!!subtitle && (
        <p className="text-center text-[18px] font-light md:text-[23px]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
