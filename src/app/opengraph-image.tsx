import { ogImage, ogSize } from "@/lib/og";

export const alt = "Arya Mulya — agent pipelines";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ title: "Arya Mulya", subtitle: "AGENT PIPELINES THAT DO THE BORING WORK", progress: 62 });
}
