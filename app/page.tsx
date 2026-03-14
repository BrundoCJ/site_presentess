
import Hero from "@/components/Hero";
import GiftGrid from "@/components/GiftGrid";

export default function Home() {
  return (
    <main>
      <Hero />

      <section className="relative py-40">
        <div className="max-w-7xl mx-auto px-6">
          <GiftGrid />
        </div>
      </section>
    </main>
  );
}
