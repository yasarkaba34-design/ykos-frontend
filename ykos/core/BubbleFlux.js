export class BubbleFlux {
  constructor(bubbleMatrix) {
    this.bubbleMatrix = bubbleMatrix;
  }

  applyFlux(bubble, flux) {
    return {
      ...bubble,
      x: bubble.x + flux.dx,
      y: bubble.y + flux.dy,
      color: flux.intensity > 0.5 ? "red" : "blue",
      weight: bubble.weight + flux.intensity
    };
  }
}
