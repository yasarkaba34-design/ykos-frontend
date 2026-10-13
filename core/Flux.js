// src/core/Flux.js
// YKOS Flux Motoru – Perlin Noise + Sinüs hibrit

import { perlin2 } from "./noise"; // küçük bir perlin fonksiyonu ekleyeceğiz

export class Flux {
  constructor() {
    this.t = 0;
  }

  apply(x, y, weight) {
    this.t += 0.01;

    const n = perlin2(x * 0.01, y * 0.01); // perlin noise
    const dx = Math.sin(this.t + weight) * (weight * 0.1) + n * 2;
    const dy = Math.cos(this.t + weight) * (weight * 0.1) + n * 2;

    return {
      x: x + dx,
      y: y + dy
    };
  }
}
