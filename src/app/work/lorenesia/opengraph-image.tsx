import { ogImage, ogSize } from "@/lib/og";

export const alt = "Lorenesia case study — an agent pipeline for YouTube Shorts";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ title: "Lorenesia", subtitle: "CASE STUDY · AN AGENT PIPELINE FOR YOUTUBE SHORTS", progress: 38 });
}
