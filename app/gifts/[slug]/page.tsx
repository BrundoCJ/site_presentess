import { gifts } from "@/data/gifts";
import GiftDetail from "@/components/GiftDetail";
import TopBackButton from "@/components/TopBackButton";
import { notFound } from "next/navigation";

export default function GiftPage({ params }: any) {
  const gift = gifts.find((g) => g.slug === params.slug);
  if (!gift) return notFound();

  return (
    <>
      <TopBackButton />
      <GiftDetail gift={gift} />
    </>
  );
}