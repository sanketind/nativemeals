import { cacheLife } from "next/cache";

export async function copyrightYear() {
  "use cache";
  cacheLife("weeks");
  return new Date().getFullYear();
}
