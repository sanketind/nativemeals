import { BrandMark } from "@/components/layout/Wordmark";
import { cn } from "@/lib/cn";

const radius = 46;
const circumference = 2 * Math.PI * radius;

export function Sticker({
  id,
  text,
  className,
}: {
  id: string;
  text: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={text.replaceAll("•", ",")}
      className={cn(
        "grid aspect-square place-items-center rounded-full bg-sunflower text-olive shadow-float *:col-start-1 *:row-start-1",
        className,
      )}
    >
      <svg viewBox="0 0 120 120" className="size-full motion-safe:animate-spin-slow" aria-hidden="true">
        <defs>
          <path
            id={id}
            d={`M60,60 m-${radius},0 a${radius},${radius} 0 1,1 ${radius * 2},0 a${radius},${radius} 0 1,1 -${radius * 2},0`}
          />
        </defs>
        <text
          className="fill-current font-sans uppercase"
          fontSize={10}
          fontWeight={800}
          textLength={circumference}
          lengthAdjust="spacing"
        >
          <textPath href={`#${id}`}>{text}</textPath>
        </text>
      </svg>
      <BrandMark className="size-[34%]" />
    </div>
  );
}
