export class EvaluatorBridge {
  constructor(db) {
    this.db = db;
  }

  async pushScore(score) {
    return await this.db("ykos_analysis").insert({
      data: score,
      created_at: new Date()
    });
  }
}
