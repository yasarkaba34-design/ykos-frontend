import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../style/SistemAlgoritmaTransition.css";

export default function SistemAlgoritmaTransition() {
  const [stage, setStage] = useState("sistem");

  return (
    <div className="ykos-transition-container">
      <AnimatePresence mode="wait">

        {stage === "sistem" && (
          <motion.div
            key="sistem"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
            className="ykos-stage"
          >
            <h1 className="ykos-title">SİSTEM</h1>
            <button
              className="ykos-button"
              onClick={() => setStage("algoritma")}
            >
              Algoritmaya Geç
            </button>
          </motion.div>
        )}

        {stage === "algoritma" && (
          <motion.div
            key="algoritma"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6 }}
            className="ykos-stage"
          >
            <h1 className="ykos-title">ALGORİTMA</h1>
            <button
              className="ykos-button"
              onClick={() => setStage("sistem")}
            >
              Sisteme Dön
            </button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
