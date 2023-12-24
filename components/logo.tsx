import Image from "next/image";

interface IProps {
  height?: number;
  width?: number;
}

export function Logo({ height = 100, width = 100 }: IProps) {
  return (
    <div className="">
      <Image
        src="logo.svg"
        alt="My Bazaar Logo"
        height={height}
        width={width}
        className="mx-auto"
      />
    </div>
  );
}
