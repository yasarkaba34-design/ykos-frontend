import { SyncBridge } from "@/ykos/core/SyncBridge";

export async function bootstrapYKOS(db) {
  const sync = new SyncBridge({ db });
  await sync.autoCreateMissingTables();
}

await sync.autoCreateMissingTables();
sync.syncAdminToCore(record);
sync.syncTestResult(result);
sync.syncCoreAnalysis(analysis);

const sync = new SyncBridge({ db });
export class SyncBridge {
  constructor(config) {
    this.db = config.db; // Tek DB bağlantısı
    this.tables = [
      "ykos_records",
      "ykos_tests",
      "ykos_analysis",
      "ykos_flux",
      "ykos_atlas"
    ];
  }

  async verifySchema() {
    const missing = [];

    for (const table of this.tables) {
      const exists = await this.db.schema.hasTable(table);
      if (!exists) missing.push(table);
    }

    return { ok: missing.length === 0, missing };
  }

  async autoCreateMissingTables() {
    const schema = await this.verifySchema();

    for (const table of schema.missing) {
      await this.db.schema.createTable(table, (t) => {
        t.increments("id").primary();
        t.json("data");
        t.timestamp("created_at").defaultTo(this.db.fn.now());
      });
    }

    return schema.missing;
  }

  async syncAdminToCore(record) {
    return await this.db("ykos_records").insert({
      data: record,
      created_at: new Date()
    });
  }

  async syncTestResult(result) {
    return await this.db("ykos_tests").insert({
      data: result,
      created_at: new Date()
    });
  }

  async syncCoreAnalysis(analysis) {
    return await this.db("ykos_analysis").insert({
      data: analysis,
      created_at: new Date()
    });
  }
}
await db.schema.hasTable("ykos_bubbles").then(exists => {
  if (!exists) {
    return db.schema.createTable("ykos_bubbles", table => {
      table.increments("id").primary();
      table.json("bubble");
      table.timestamp("created_at");
    });
  }
});
