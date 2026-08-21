<div className="bubble-matrix">
  {nodes.map((node) => (
    <button
      key={node.id}
      type="button"
      className="bubble"
      style={{
        left: `${node.x}px`,
        top: `${node.y}px`
      }}
      onClick={() => handleBubbleClick(node)}
      aria-label={`${node.label} düğümünü incele`}
    >
      <span className="bubble-label">{node.label}</span>

      {node.evaluator_result && (
        <span className="bubble-evaluator-result">
          {node.evaluator_result.meaning || "Analiz tamamlandı"}
        </span>
      )}
    </button>
  ))}
</div>
