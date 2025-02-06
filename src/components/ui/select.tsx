import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const selectVariants = cva(
  "flex items-center rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "",
        outline: "border border-input",
      },
      size: {
        default: "h-10",
        sm: "h-8 px-2 text-sm",
        lg: "h-12 px-4 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size">,
    VariantProps<typeof selectVariants> {
  asChild?: boolean;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "select";
    return (
      <Comp
        ref={ref}
        className={cn(selectVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Select.displayName = "Select";

// export interface SelectItemProps extends React.OptionHTMLAttributes<HTMLOptionElement> {}

// const SelectItem: React.FC<SelectItemProps> = (props) => {
//   return <option {...props}>{props.children}</option>;
// };
const SelectItem: React.FC<React.OptionHTMLAttributes<HTMLOptionElement>> = (props) => {
  return <option {...props}>{props.children}</option>;
};


export { Select, SelectItem };
