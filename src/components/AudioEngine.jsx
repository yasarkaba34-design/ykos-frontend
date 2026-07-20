import tutSound from "../audio/tut.mp3";
import kurSound from "../audio/kur.mp3";

const rootSounds = {
  TUT: "/audio/tut.mp3",
  KUR: "/audio/kur.mp3",
  BA: "/audio/ba.mp3",
  YOL: "/audio/yol.mp3",
  BİR: "/audio/bir.mp3",
  KAL: "/audio/kal.mp3"
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
