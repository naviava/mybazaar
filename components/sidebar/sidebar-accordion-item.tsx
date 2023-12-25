import { LucideIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";

interface IProps {
  children: React.ReactNode;
  label: string;
  icon?: LucideIcon;
}

export function SidebarAccordionItem({ children, label, icon: Icon }: IProps) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={label}>
        <Button asChild variant="ghost">
          <AccordionTrigger className="justify-between text-lg text-muted-foreground">
            <div className="flex items-center">
              {!!Icon && (
                <Icon className="mr-4 h-4 w-4 text-muted-foreground" />
              )}
              {label}
            </div>
          </AccordionTrigger>
        </Button>
        <AccordionContent className="relative space-y-2 border-b-transparent pb-1 pl-12 text-lg">
          <div className="absolute top-0 h-full w-1 -translate-x-6 bg-neutral-200" />
          {children}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
