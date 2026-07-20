"use client";

import { type LucideIcon } from "lucide-react";
import Card from "@/components/Card";
import Tag from "@/components/Tag";
import Reveal from "@/components/Reveal";

type OfferNodeProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  chips: string[];
  delay?: number;
};

export default function OfferNode({
  icon: Icon,
  title,
  description,
  chips,
  delay = 0,
}: OfferNodeProps) {
  return (
    <Reveal delay={delay} as="li">
      <Card className="flex h-full flex-col p-6 sm:p-7">
        <Icon className="h-5 w-5 text-accent" aria-hidden />
        <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-textMuted">
          {description}
        </p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {chips.map((chip) => (
            <Tag key={chip} label={chip} />
          ))}
        </div>
      </Card>
    </Reveal>
  );
}
