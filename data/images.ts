export type BrandImage = {
  src: string;
  alt: string;
  credit: string;
  sourceUrl: string;
  /** True until the file is replaced with Native Meals photography. */
  placeholder: true;
};

/**
 * Swap a photo by replacing the file in /public/images and, if the subject
 * changes, the alt text here. Components only refer to these keys.
 * Every photo below is stock and must be replaced before launch.
 */
export const images = {
  heroMain: {
    src: "/images/rice-curry.jpg",
    alt: "Vegetable curry with peas and cauliflower in a steel bowl, served with steamed rice in daylight",
    credit: "Unsplash",
    sourceUrl: "https://unsplash.com/photos/1585937421612-70a008356fbe",
    placeholder: true,
  },
  heroInset: {
    src: "/images/idli.jpg",
    alt: "Idli, a vada, sambar and chutneys on a white plate",
    credit: "Unsplash",
    sourceUrl: "https://unsplash.com/photos/1630383249896-424e482df921",
    placeholder: true,
  },
  breakfast: {
    src: "/images/idli.jpg",
    alt: "Idli, a vada, sambar and chutneys on a white plate",
    credit: "Unsplash",
    sourceUrl: "https://unsplash.com/photos/1630383249896-424e482df921",
    placeholder: true,
  },
  vegetarian: {
    src: "/images/thali.jpg",
    alt: "A steel plate with rotis, vegetable sabzi, dal and a glass of buttermilk",
    credit: "Unsplash",
    sourceUrl: "https://unsplash.com/photos/1546833999-b9f581a1996d",
    placeholder: true,
  },
  nonVegetarian: {
    src: "/images/chicken-naan.jpg",
    alt: "Chicken curry with naan on a white plate",
    credit: "Unsplash",
    sourceUrl: "https://unsplash.com/photos/1565557623262-b51c2513a641",
    placeholder: true,
  },
  riceCurry: {
    src: "/images/rice-curry.jpg",
    alt: "Vegetable curry and steamed rice served in steel bowls",
    credit: "Unsplash",
    sourceUrl: "https://unsplash.com/photos/1585937421612-70a008356fbe",
    placeholder: true,
  },
  everyday: {
    src: "/images/pav-bhaji.jpg",
    alt: "Pav bhaji with a side of lemon and onions",
    credit: "Unsplash",
    sourceUrl: "https://unsplash.com/photos/1606491956689-2ea866880c84",
    placeholder: true,
  },
  riceBowl: {
    src: "/images/seasoned-rice.jpg",
    alt: "Yellow seasoned rice with herbs, served in brass bowls",
    credit: "Unsplash",
    sourceUrl: "https://unsplash.com/photos/1563379091339-03b21ab4a4f8",
    placeholder: true,
  },
  planLunch: {
    src: "/images/thali.jpg",
    alt: "A midday plate of rotis, sabzi and dal",
    credit: "Unsplash",
    sourceUrl: "https://unsplash.com/photos/1546833999-b9f581a1996d",
    placeholder: true,
  },
  planDinner: {
    src: "/images/chicken-naan.jpg",
    alt: "Chicken curry with naan",
    credit: "Unsplash",
    sourceUrl: "https://unsplash.com/photos/1565557623262-b51c2513a641",
    placeholder: true,
  },
  planEveryday: {
    src: "/images/rice-curry.jpg",
    alt: "Vegetable curry and rice",
    credit: "Unsplash",
    sourceUrl: "https://unsplash.com/photos/1585937421612-70a008356fbe",
    placeholder: true,
  },
  about: {
    src: "/images/rice-curry.jpg",
    alt: "Freshly served vegetable curry and rice in daylight",
    credit: "Unsplash",
    sourceUrl: "https://unsplash.com/photos/1585937421612-70a008356fbe",
    placeholder: true,
  },
  dayBreakfast: {
    src: "/images/idli.jpg",
    alt: "Idli with sambar and chutney",
    credit: "Unsplash",
    sourceUrl: "https://unsplash.com/photos/1630383249896-424e482df921",
    placeholder: true,
  },
  dayLunch: {
    src: "/images/thali.jpg",
    alt: "Rotis, sabzi and dal on a steel plate",
    credit: "Unsplash",
    sourceUrl: "https://unsplash.com/photos/1546833999-b9f581a1996d",
    placeholder: true,
  },
  dayDinner: {
    src: "/images/chicken-naan.jpg",
    alt: "Chicken curry with naan for dinner",
    credit: "Unsplash",
    sourceUrl: "https://unsplash.com/photos/1565557623262-b51c2513a641",
    placeholder: true,
  },
} satisfies Record<string, BrandImage>;

export type ImageId = keyof typeof images;

export function getImage(id: string): BrandImage | undefined {
  if (id in images) return images[id as ImageId];
  return undefined;
}
