"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { startTransition, useOptimistic } from "react";

export type OnDeleteReturn = {
  success: boolean;
  message: string;
  errors?: string[];
};

export type CardLinkData = {
  id: string;
  linkText: string;
  linkUrl: string;
  onDelete: () => Promise<OnDeleteReturn>;
};

interface AtlasLinkCardProps {
  cardHeader: string;
  onHeaderItemDelete?: () => Promise<OnDeleteReturn>;
  cardDescription: string;
  cardLinkData: CardLinkData[];
  className: string;
}

export default function AtlasLinkCard({
  cardHeader,
  onHeaderItemDelete,
  cardDescription,
  cardLinkData,
  className,
}: AtlasLinkCardProps) {
  const [optimisticItems, removeOptimisticItem] = useOptimistic(
    cardLinkData,
    (currentLinks, idToRemove: string) => {
      return currentLinks.filter((link) => link.id !== idToRemove);
    }
  );

  return (
    <Card className={cn("", className)}>
      <CardHeader className="flex flex-col w-full">
        <CardTitle>{cardHeader}</CardTitle>
        <CardDescription>{cardDescription}</CardDescription>
        {onHeaderItemDelete && (
          <CardAction>
            <Button size="xs" onClick={onHeaderItemDelete}>
              X
            </Button>
          </CardAction>
        )}
      </CardHeader>

      <CardContent
        className={cn("rounded-none", "flex flex-col overflow-y-scroll")}
      >
        {cardLinkData && cardLinkData.length > 0 ? (
          <ul>
            {optimisticItems.map((cardLink) => (
              <li key={cardLink.id} className="flex flex-row">
                <Link href={cardLink.linkUrl} className="flex-1">
                  {cardLink.linkText}
                </Link>
                <Button
                  size="xs"
                  onClick={() => {
                    startTransition(() => {
                      removeOptimisticItem(cardLink.id);

                      cardLink.onDelete();
                    });
                  }}
                >
                  X
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No Projects</p>
        )}
      </CardContent>
    </Card>
  );
}
