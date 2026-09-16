export class ClusterEngine {
  constructor() {}

  distance(a, b) {
    return Math.sqrt(
      Math.pow(a.x - b.x, 2) +
      Math.pow(a.y - b.y, 2)
    );
  }

  cluster(bubbles, threshold = 50) {
    const clusters = [];

    bubbles.forEach(bubble => {
      let added = false;

      for (const cluster of clusters) {
        const center = cluster[0];
        if (this.distance(center, bubble) < threshold) {
          cluster.push(bubble);
          added = true;
          break;
        }
      }

      if (!added) {
        clusters.push([bubble]);
      }
    });

    return clusters;
  }
}
