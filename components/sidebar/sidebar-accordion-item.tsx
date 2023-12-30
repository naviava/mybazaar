"use client";

import { memo, useMemo } from "react";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";

import { cn } from "~/lib/utils";

interface IProps {
  children: React.ReactNode;
  label: string;
  icon?: LucideIcon;
  groupHref?: string;
}

export const SidebarAccordionItem = memo(_SidebarAccordionItem);
function _SidebarAccordionItem({
  children,
  label,
  icon: Icon,
  groupHref,
}: IProps) {
  const pathname = usePathname();
  const isActive = useMemo(
    () => pathname.startsWith(groupHref ?? ""),
    [pathname, groupHref],
  );

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={label} className="">
        <Button asChild variant="ghost">
          <AccordionTrigger
            className={cn(
              "justify-between text-base text-muted-foreground md:text-lg",
              isActive && "bg-neutral-100",
            )}
          >
            <div className="flex items-center">
              {!!Icon && (
                <Icon
                  className={cn(
                    "mr-4 h-4 w-4 text-muted-foreground",
                    isActive && "text-sky-500",
                  )}
                />
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
