import { GoToHomepage } from "~/components/go-to-homepage";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export function CredentialsLoginCard() {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-3xl">Sign in</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <GoToHomepage />
      </CardFooter>
    </Card>
  );
}
