'use client';

import Link from 'next/link';
import { useMarqueData } from '../../lib/ReactQuery/useMarqueData';
import { Product } from '@/payload-types';

export default function MarqueeComponent() {
  const { data, isLoading } = useMarqueData();

  if (isLoading) {
    const placeholderItems = Array.from({ length: 20 }, (_, i) => (
      <div key={i} className="my-2">
        <div
          className="flex-shrink-0 rounded-xl px-4 py-2.5 text-lg font-medium whitespace-nowrap transition-all duration-200 bg-gradient-to-r from-amber-50 to-orange-50 text-gray-800 border hover:from-amber-100 hover:to-orange-100 border-amber-200/50 animate-pulse opacity-60"
        >
          Ładowanie…
        </div>
      </div>
    ));

    return (
      <div className="my-14 relative py-3 my-8 overflow-hidden border-y border-gray-200/50 mx-8 md:mx-12 lg:mx-24 group [mask:linear-gradient(90deg,transparent,white_5%,white_95%,transparent)]">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none group-hover:via-white/10 transition-all duration-300" />
        <div className="flex gap-6 animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
          {placeholderItems}
        </div>
      </div>
    );
  }
  
  if (!data || data.length === 0) return null;

  const targetLength = 20;
  const repeatedData = Array.from({ length: Math.ceil(targetLength / data.length) }, () => data).flat();

  return (
    <div className="my-14 relative py-3 my-8 overflow-hidden border-y border-gray-200/50 mx-8 md:mx-12 lg:mx-24 group [mask:linear-gradient(90deg,transparent,white_5%,white_95%,transparent)]">
      <div className="flex gap-6 animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
        {repeatedData.map((item, idx) => {
          const text = item.text;
          const product = item.link as Product;
          const linkTitle = product?.title;
          const baseClasses = `flex-shrink-0 rounded-xl px-4 py-2.5 text-lg font-medium whitespace-nowrap transition-all duration-200`;

          const finalClass = linkTitle
            ? `${baseClasses} bg-gradient-to-r from-amber-50 to-orange-50 text-gray-800 cursor-pointer hover:from-amber-100 hover:to-orange-100`
            : `${baseClasses} bg-gradient-to-r from-slate-50 to-slate-100 text-gray-800 border hover:from-slate-100 hover:to-slate-200 border-amber-200/50`;

          return linkTitle ? (
            <Link
              key={idx}
              href={`/product/${encodeURIComponent(linkTitle)}`}
              className="focus:outline-none my-2 focus:ring-1 focus:ring-orange-500 focus:ring-offset-2 rounded-xl"
              tabIndex={-1}
            >
              <div className={finalClass}>{text}</div>
            </Link>
          ) : (
            <div key={idx} className="my-2">
              <div className={finalClass}>{text}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
