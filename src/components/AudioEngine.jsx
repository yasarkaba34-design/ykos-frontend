import React, { useEffect } from "react";
import tutSound from "../audio/tut.mp3";

import kurSound from "../audio/kur.mp3";
import baSound from "../audio/ba.mp3";
import yolSound from "../audio/yol.mp3";
import birSound from "../audio/bir.mp3";
import kalSound from "../audio/kal.mp3";

const rootSounds = {
  TUT: tutSound,
  KUR: kurSound,
  BA: baSound,
  YOL: yolSound,
  BİR: birSound,
  KAL: kalSound
};

export default function AudioEngine({ selectedRoot }) {
  useEffect(() => {
    if (selectedRoot && rootSounds[selectedRoot]) {
      const audio = new Audio(rootSounds[selectedRoot]);
      audio.play();
    }
  }, [selectedRoot]);

  return null;
}
