import { Helmet } from "react-helmet-async";

interface OrganizationSchemaProps {
  name: string;
  description: string;
  url: string;
  logo?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  contactPoint?: {
    telephone: string;
    contactType: string;
    email?: string;
  };
  sameAs?: string[];
}

export const OrganizationSchema = (props: OrganizationSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "GovernmentOrganization",
    name: props.name,
    description: props.description,
    url: props.url,
    logo: props.logo,
    address: props.address ? {
      "@type": "PostalAddress",
      ...props.address
    } : undefined,
    contactPoint: props.contactPoint ? {
      "@type": "ContactPoint",
      ...props.contactPoint
    } : undefined,
    sameAs: props.sameAs
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

interface TouristAttractionSchemaProps {
  name: string;
  description: string;
  image: string[];
  address: string;
  geo?: {
    latitude: number;
    longitude: number;
  };
  rating?: number;
  reviewCount?: number;
  openingHours?: string;
  priceRange?: string;
  telephone?: string;
}

export const TouristAttractionSchema = (props: TouristAttractionSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: props.name,
    description: props.description,
    image: props.image,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Quezon",
      addressRegion: "Bukidnon",
      addressCountry: "PH",
      streetAddress: props.address
    },
    geo: props.geo ? {
      "@type": "GeoCoordinates",
      latitude: props.geo.latitude,
      longitude: props.geo.longitude
    } : undefined,
    aggregateRating: props.rating ? {
      "@type": "AggregateRating",
      ratingValue: props.rating,
      reviewCount: props.reviewCount || 0,
      bestRating: 5
    } : undefined,
    openingHoursSpecification: props.openingHours ? {
      "@type": "OpeningHoursSpecification",
      opens: "06:00",
      closes: "18:00",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ]
    } : undefined,
    priceRange: props.priceRange,
    telephone: props.telephone
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

interface EventSchemaProps {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: {
    name: string;
    address: string;
  };
  image?: string;
  organizer?: string;
  eventStatus?: string;
  eventAttendanceMode?: string;
}

export const EventSchema = (props: EventSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: props.name,
    description: props.description,
    startDate: props.startDate,
    endDate: props.endDate,
    eventStatus: props.eventStatus || "https://schema.org/EventScheduled",
    eventAttendanceMode: props.eventAttendanceMode || "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: props.location.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: props.location.address,
        addressLocality: "Quezon",
        addressRegion: "Bukidnon",
        addressCountry: "PH"
      }
    },
    image: props.image,
    organizer: props.organizer ? {
      "@type": "Organization",
      name: props.organizer,
      url: window.location.origin
    } : undefined
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

interface BreadcrumbSchemaProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export const BreadcrumbSchema = ({ items }: BreadcrumbSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};