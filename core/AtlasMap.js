// src/core/AtlasMap.js
// YKOS Atlas motoru: kültürel-semiyotik koordinat hesaplayıcı

import { Flux } from "./Flux";
import { Evaluator } from "./Evaluator";

export class AtlasMap {
  constructor() {
    this.points = [];
    this.flux = new Flux();
    this.evaluator = new Evaluator();
  }

  // Atlas'a yeni nokta ekle
  addPoint(id, label, x, y, color = "#d4af37") {
    const weight = this.evaluator.evaluate(label);
    this.points.push({ id, label, x, y, color, weight });
  }

  // Noktaları güncelle (Flux motoru ile)
  update() {
    this.points = this.points.map((p) => {
      const fluxed = this.flux.apply(p.x, p.y, p.weight);
      return { ...p, x: fluxed.x, y: fluxed.y };
    });
  }

  // Görselleştirme için bubble verisi döndür
  getBubbles() {
    this.update();
    return this.points;
  }

  // Atlas koordinatlarını sıfırla
  reset() {
    this.points = [];
  }
}
