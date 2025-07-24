'use client';

import Link from 'next/link';
import { useMarqueData } from "../../lib/ReactQuery/useMarqueData";
import { MarqueItem, Product } from "@/payload-types";

export default function MarqueeComponent() {
  const { data, isLoading } = useMarqueData();

  if (!data || isLoading) return <div>loading...</div>;

  const targetLength = 20;
  const repeatedData = Array.from(
    { length: Math.ceil(targetLength / data.length) },
    () => data
  ).flat();

  return (
    <div className="relative overflow-hidden whitespace-nowrap w-full bg-black text-white">
      <div className="flex animate-marquee hover:[animation-play-state:paused]">
        {repeatedData.map((item, idx) => {
          const text = item.text;

          const isProduct = item.link && typeof item.link === 'object';
          const linkTitle = isProduct ? (item.link as Product).title : null;

          return linkTitle ? (
            <Link
              key={idx}
              href={`/product/${encodeURIComponent(linkTitle)}`}
              className="mx-8 text-lg whitespace-nowrap underline hover:text-yellow-400 transition-colors"
            >
              {text}
            </Link>
          ) : (
            <span key={idx} className="mx-8 text-lg whitespace-nowrap">
              {text}
            </span>
          );
        })}
      </div>
    </div>
  );
}
