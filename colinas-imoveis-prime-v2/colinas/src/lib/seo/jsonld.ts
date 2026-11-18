import type { Property } from "@/types/property";
import { site } from "@/config/site";

export function propertyJsonLd(p: Property) {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: p.title,
    url: `${site.url}/imovel/${p.slug}`,
    description: p.description.slice(0, 300),
    image: p.images.map((i) => (i.src.startsWith("http") ? i.src : `${site.url}${i.src}`)),
    datePosted: p.lastSyncedAt,
    ...(p.price != null && { offers: { "@type": "Offer", price: p.price, priceCurrency: "BRL" } }),
    about: {
      "@type": "Residence",
      address: { "@type": "PostalAddress", addressLocality: p.city, addressRegion: p.neighborhood, addressCountry: "BR" },
      ...(p.builtArea != null && { floorSize: { "@type": "QuantitativeValue", value: p.builtArea, unitCode: "MTK" } }),
      ...(p.bedrooms != null && { numberOfBedrooms: p.bedrooms }),
      ...(p.bathrooms != null && { numberOfBathroomsTotal: p.bathrooms }),
    },
  };
}

export const orgJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: site.name,
  url: site.url,
  ...(site.contact.phone && { telephone: site.contact.phone }),
  ...(site.contact.email && { email: site.contact.email }),
  ...(site.contact.address && { address: site.contact.address }),
});
