import { SyncBridge } from "@/ykos/core/SyncBridge";
import { FluxBridge } from "@/ykos/core/FluxBridge";
import { EvaluatorBridge } from "@/ykos/core/EvaluatorBridge";
import { BubbleMatrixBridge } from "@/ykos/core/BubbleMatrixBridge";
import { BubbleFlux } from "@/ykos/core/BubbleFlux";
import { ClusterEngine } from "@/ykos/core/ClusterEngine";
import { AtlasMap } from "@/ykos/core/AtlasMap";

export async function bootstrapYKOS(db) {
  const sync = new SyncBridge({ db });
  await sync.autoCreateMissingTables();

  const flux = new FluxBridge(db);
  const evaluator = new EvaluatorBridge(db);
  const bubbleMatrix = new BubbleMatrixBridge(db);
  const bubbleFlux = new BubbleFlux(bubbleMatrix);
  const clusterEngine = new ClusterEngine();
  const atlasMap = new AtlasMap();

  return { sync, flux, evaluator, bubbleMatrix, bubbleFlux, clusterEngine, atlasMap };
}
