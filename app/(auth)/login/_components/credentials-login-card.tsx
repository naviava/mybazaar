import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { GoToHomepage } from "~/components/go-to-homepage";
import { LoginForm } from "./login-form";

export function CredentialsLoginCard() {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-3xl">Sign in</CardTitle>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter>
        <GoToHomepage />
      </CardFooter>
    </Card>
  );
}
