import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "~/components/ui/card";

interface IProps {
  children: React.ReactNode;
  title: string;
  tagline?: string;
}

export function AdminFormWrapper({ children, title, tagline }: IProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="rounded-t-md border-b bg-gradient-to-r from-sky-900 to-sky-800 p-4 text-lg font-semibold text-white">
        {title}
      </CardHeader>
      {tagline && <CardDescription>{tagline}</CardDescription>}
      <CardContent>{children}</CardContent>
    </Card>
  );
}
