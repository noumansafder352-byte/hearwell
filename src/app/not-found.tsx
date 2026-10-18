import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Equalizer } from "@/components/ui/SoundWave";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="bg-mist pt-[calc(var(--topbar-h)+var(--header-h)+6rem)] pb-24 sm:pt-[calc(var(--topbar-h)+var(--header-h)+8rem)] sm:pb-32">
      <div className="container-site max-w-2xl text-center">
        <Equalizer className="mx-auto h-12 w-fit text-sky" animated={false} />
        <p className="eyebrow mt-8 justify-center">Page not found</p>
        <h1 className="mt-4 text-4xl font-bold sm:text-5xl">We couldn&apos;t find that page</h1>
        <p className="mt-5 text-base leading-relaxed text-navy/70">The link may be outdated, or the page may have moved.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button href="/" trailingIcon={<ArrowRight className="size-4" aria-hidden />}>
            Back to Home
          </Button>
          <Button href="/contact" variant="secondary">
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
}
