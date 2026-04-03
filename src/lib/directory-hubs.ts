/** Hub centers aligned with demo lawyers — Portugal deployment. */
export const DIRECTORY_HUBS: { location: string; lat: number; lng: number }[] =
  [
    { location: "Lisboa", lat: 38.7223, lng: -9.1393 },
    { location: "Porto", lat: 41.1579, lng: -8.6291 },
    { location: "Braga", lat: 41.5454, lng: -8.4265 },
  ];

function haversineKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function nearestHubLocation(userLat: number, userLng: number): string {
  let best = DIRECTORY_HUBS[0]!;
  let bestD = Infinity;
  for (const h of DIRECTORY_HUBS) {
    const d = haversineKm(userLat, userLng, h.lat, h.lng);
    if (d < bestD) {
      bestD = d;
      best = h;
    }
  }
  return best.location;
}
