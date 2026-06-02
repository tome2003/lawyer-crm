export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD must be raw JSON string, not an object.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

