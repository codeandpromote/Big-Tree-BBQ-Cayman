'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Flame } from 'lucide-react';
import type { MediaAssetId } from '@/lib/menu-data';
import { MEDIA_ASSETS } from './media-assets';

interface EditorialImageProps {
  assetId: MediaAssetId;
  alt?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  fallbackTitle?: string;
}

export function EditorialImage({
  assetId,
  alt,
  sizes,
  priority = false,
  className = 'object-cover',
  fallbackTitle,
}: EditorialImageProps) {
  const [hasError, setHasError] = useState(false);
  const asset = MEDIA_ASSETS[assetId];

  if (hasError || !asset) {
    return (
      <div
        role="img"
        aria-label={alt ?? asset?.alt ?? fallbackTitle ?? 'Big Tree BBQ editorial photograph'}
        className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#1E1C1A] text-[#D2CBC0] p-6 text-center"
      >
        <Flame className="h-6 w-6 text-[#B66A3E]" aria-hidden="true" />
        <span className="font-serif text-lg tracking-wide">
          {fallbackTitle ?? 'Big Tree BBQ · East End'}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={asset.src}
      alt={alt ?? asset.alt}
      fill
      sizes={sizes}
      priority={priority}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
