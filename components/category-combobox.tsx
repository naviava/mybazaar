"use client";

import { ElementRef, memo, useEffect, useRef, useState } from "react";

import { GiCheckMark } from "react-icons/gi";
import { ChevronsUpDown } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/components/ui/command";
import { Button } from "~/components/ui/button";

import { cn } from "~/lib/utils";
import { trpc } from "~/app/_trpc/client";
import { ProductFormSchemaType } from "~/utils/form-inputs/products/product-form-schema";

interface IProps {
  form: ProductFormSchemaType;
}

export const CategoryCombobox = memo(_CategoryCombobox);
function _CategoryCombobox({ form }: IProps) {
  const [contentWidth, setContentWidth] = useState<string>();
  const buttonRef = useRef<ElementRef<"button">>(null);
  const { data: categories } = trpc.list.getCategories.useQuery();

  useEffect(() => {
    const updateWidth = () => {
      if (!buttonRef.current) return;
      setContentWidth(`${buttonRef.current.offsetWidth}`);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <FormField
      control={form.control}
      name="categorySlug"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="text-base font-normal">Category</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  ref={buttonRef}
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full justify-between text-base",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {field.value
                    ? categories?.find(
                        (category) => category.slug === field.value,
                      )?.name
                    : "Select category"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              className="p-0"
              style={{ width: `${contentWidth}px` }}
            >
              <Command>
                <CommandInput
                  placeholder="Search categories..."
                  className="lg:text-base lg:placeholder:text-base"
                />
                <CommandEmpty>No results, try again.</CommandEmpty>
                <CommandGroup>
                  {categories?.map((category) => (
                    <CommandItem
                      key={category.slug}
                      value={category.name}
                      onSelect={() => {
                        buttonRef.current?.click();
                        form.setValue("categorySlug", category.slug);
                      }}
                      className="justify-between lg:text-base"
                    >
                      {category.name}
                      <GiCheckMark
                        className={cn(
                          "mr-2 h-3.5 w-3.5 text-sky-700",
                          category.slug === field.value
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
