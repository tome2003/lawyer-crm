import { LawyerLanding } from "@/components/lawyer-landing";
import { JsonLd } from "@/components/jsonld";
import { getTranslations } from "next-intl/server";
import { absoluteUrl } from "@/lib/site-url";

export default async function HomePage() {
  const t = await getTranslations("landing");
  const tFooter = await getTranslations("lawyerFooter");

  const canonicalPath = "/";
  const url = absoluteUrl(canonicalPath);

  const services = [
    {
      slug: "civil",
      title: t("service1Title"),
      description: t("service1Body"),
    },
    {
      slug: "criminal",
      title: t("service2Title"),
      description: t("service2Body"),
    },
    {
      slug: "commercial",
      title: t("service3Title"),
      description: t("service3Body"),
    },
    {
      slug: "international",
      title: t("service4Title"),
      description: t("service4Body"),
    },
    {
      slug: "real-estate",
      title: t("service5Title"),
      description: t("service5Body"),
    },
    {
      slug: "adr",
      title: t("service6Title"),
      description: t("service6Body"),
    },
  ] as const;

  const legalService = {
    "@context": "https://schema.org",
    "@type": ["LegalService", "Attorney"],
    name: t("heroName"),
    description: t("heroDescription"),
    url,
    "@id": `${url}#manuel-gg`,
    image: absoluteUrl("/manuel-gg.png"),
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Madeira",
    },
    email: t("contactEmail"),
    telephone: t("contactPhone"),
    address: {
      "@type": "PostalAddress",
      streetAddress: t("contactAddress"),
      addressLocality: "Ponta do Sol",
      addressRegion: "Madeira",
      addressCountry: "PT",
    },
    knowsLanguage: ["pt-PT", "en"],
    serviceType: [
      t("service1Title"),
      t("service2Title"),
      t("service3Title"),
      t("service4Title"),
      t("service5Title"),
      t("service6Title"),
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Legal services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        name: s.title,
        description: s.description,
        url: `${url}#services`,
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Madeira",
        },
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.description,
          provider: { "@id": `${url}#manuel-gg` },
        },
      })),
    },
    sameAs: [
      tFooter("linkedinUrl"),
      tFooter("instagramUrl"),
      tFooter("facebookUrl"),
      tFooter("whatsappUrl"),
    ],
  };

  return (
    <>
      <JsonLd data={legalService} />
      <LawyerLanding />
    </>
  );
}
