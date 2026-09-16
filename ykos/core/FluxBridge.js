export class FluxBridge {
  constructor(db) {
    this.db = db;
  }

  async pushFluxResult(result) {
    return await this.db("ykos_flux").insert({
      data: result,
      created_at: new Date()
    });
  }

  async pushEvaluatorScore(score) {
    return await this.db("ykos_analysis").insert({
      data: score,
      created_at: new Date()
    });
  }
}
