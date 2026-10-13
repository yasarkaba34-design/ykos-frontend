// src/core/Evaluator.js
// YKOS Semantik Motoru – kök hece, zincir, rezonans, flux etkisi

export class Evaluator {
  constructor() {
    this.vowels = ["a", "e", "ı", "i", "o", "ö", "u", "ü"];
  }

  detectRoot(label) {
    const lower = label.toLowerCase();
    let root = "";
    for (let i = 0; i < lower.length; i++) {
      root += lower[i];
      if (this.vowels.includes(lower[i])) break;
    }
    return root;
  }

  detectChain(label) {
    const parts = label.toLowerCase().split(/[^a-zA-Zğüşöçı]/).filter(Boolean);
    return parts.map((p) => ({
      token: p,
      length: p.length,
      vowelCount: p.split("").filter((c) => this.vowels.includes(c)).length
    }));
  }

  detectType(label) {
    const l = label.toLowerCase();
    if (l.includes("tepe") || l.includes("höyük")) return "proto-yer";
    if (l.includes("hitit") || l.includes("luwi")) return "proto-kültür";
    if (l.includes("ana") || l.includes("ata")) return "proto-kök";
    if (l.includes("su") || l.includes("nehir")) return "proto-doğa";
    return "proto-nötr";
  }

  calculateResonance(root, chain, type) {
    let score = 0;
    score += root.length * 0.8;

    const vowelSum = chain.reduce((acc, c) => acc + c.vowelCount, 0);
    score += vowelSum * 0.5;

    const typeBonus = {
      "proto-yer": 2.0,
      "proto-kültür": 2.5,
      "proto-kök": 3.0,
      "proto-doğa": 1.5,
      "proto-nötr": 1.0
    };

    score += typeBonus[type] || 1.0;
    return score;
  }

  calculateFluxImpact(weight) {
    return Math.log(weight + 1) * 1.2;
  }

  evaluate(label) {
    const root = this.detectRoot(label);
    const chain = this.detectChain(label);
    const type = this.detectType(label);

    const resonance = this.calculateResonance(root, chain, type);
    const fluxImpact = this.calculateFluxImpact(resonance);

    return resonance + fluxImpact;
  }
}
