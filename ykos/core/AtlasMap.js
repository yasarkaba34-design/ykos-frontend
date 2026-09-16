export class AtlasMap {
  constructor() {}

  // BubbleMatrix koordinatlarını dünya haritasına çevirir
  toGeo(bubble) {
    return {
      lat: (bubble.y / 1000) * 180 - 90,   // 0–1000 → -90–90
      lng: (bubble.x / 1000) * 360 - 180  // 0–1000 → -180–180
    };
  }

  // Cluster merkezlerini dünya koordinatlarına çevirir
  centerToGeo(center) {
    return {
      lat: (center.y / 1000) * 180 - 90,
      lng: (center.x / 1000) * 360 - 180
    };
  }
}
