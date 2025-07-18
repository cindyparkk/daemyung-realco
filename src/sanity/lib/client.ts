import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "ppszzxgj",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}
