import Image from "next/image";

/**
 * EMBLEM
 * Full, uncropped portrait of Bhagavan Sri Ramana Maharshi used as the site mark,
 * shown in a small portrait frame. Set its size with a height class
 * (e.g. "h-12"); the width follows the photo's proportions automatically.
 *
 * To change it, replace /public/images/emblem-ramana-full.jpg and update
 * PHOTO_RATIO below to the new photo's width ÷ height.
 * The favicon lives in src/app/icon.png.
 */
const PHOTO_RATIO = 1270 / 1600;

export function Emblem({ className = "" }: { className?: string }) {
  return (
    <span
      className={`relative inline-flex shrink-0 rounded-[4px] border border-current p-[2px] ${className}`}
      style={{ aspectRatio: `${PHOTO_RATIO} / 1` }}
    >
      <span className="relative block h-full w-full overflow-hidden rounded-[2px]">
        <Image
          src="/images/emblem-ramana-full.jpg"
          alt=""
          fill
          sizes="48px"
          className="object-contain"
        />
      </span>
    </span>
  );
}
