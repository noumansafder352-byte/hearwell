import { BlogIndex } from "@/components/blog/BlogIndex";
import { PageHero } from "@/components/ui/PageHero";
import { blogHero } from "@/data/blog";
import { images } from "@/data/images";
import { pageMetadata } from "@/lib/seo";

export const metadata = {
  ...pageMetadata({
    title: "Our Blog",
    description:
      "Hearing care guidance from HearWell Audiology Clinic in Rawalpindi — hearing tests, hearing aids, tinnitus and ear care.",
    path: "/blog",
  }),
  // TODO(owner): remove once the article pages are published (cards link to them).
  robots: { index: false, follow: true },
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        title={blogHero.title}
        description={blogHero.description}
        crumbs={[{ label: "Our Blog" }]}
        image={images.consultationClinic}
        imagePosition="70% center"
        variant="background"
      />

      <BlogIndex />

    </>
  );
}
