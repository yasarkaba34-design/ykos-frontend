import { useLocation } from "react-router-dom";
import ReadingPanel from "../components/ReadingPanel";
import AnalyzerPanel from "../components/AnalyzerPanel";
import VisualizerPanel from "../components/VisualizerPanel";
import "./ResultPage.css";

export default function ResultPage() {
  const location = useLocation();
  const data = location.state?.result;

  if (!data) {
    return (
      <div className="no-result">
        Arama sonucu bulunamadı veya veri yüklenemedi.
      </div>
    );
  }

  return (
    <div className="result-wrapper">

      <h1 className="result-title">{data.title}</h1>

      {/* OKUMA ALANI */}
      <ReadingPanel content={data} />

      {/* ANALİZ MOTORU */}
      <AnalyzerPanel content={data} />

      {/* GÖRSEL MOTOR */}
      <VisualizerPanel content={data} />

    </div>
  );
}
