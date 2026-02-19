'use client';

import Link from "next/link";
// 1. Import the variants from Shadcn's Button component
import { buttonVariants } from "@/components/ui/button"; 
import { cn } from "@/lib/utils";
// 2. Import the type utilities
import { VariantProps } from "class-variance-authority";

export interface AtlasLinkButtonProps
  extends React.ComponentPropsWithoutRef<typeof Link>,
    VariantProps<typeof buttonVariants> {
  // You can add your own custom props here later if needed!
  // e.g., isExternal?: boolean;
  displayText?: string;
}

export function AtlasLinkButton({ 
  className, 
  displayText,
  variant, 
  size, 
  href, 
  ...props 
}: AtlasLinkButtonProps) {
  return (
    <Link 
      href={href}
      // 4. The Magic: We pass the variant and size into buttonVariants(),
      // which generates the correct Tailwind classes, and merge it with any
      // custom classes you passed in using cn().
      className={cn(buttonVariants({ variant, size, className }))} 
      {...props} 
    >
      {displayText}
    </Link>
  );
}