// src/mega/ResultPage.jsx
import { useLocation } from "react-router-dom";
import ReadingPanel from "../components/ReadingPanel";
import AnalyzerPanel from "../components/AnalyzerPanel";
import VisualizerPanel from "../components/VisualizerPanel";
import "./ResultPage.css";

export default function ResultPage() {
  const location = useLocation();
  const state = location.state;

  const data =
    state?.result ??
    state?.data ??
    state;

  const analysis =
    data?.analysis ??
    data?.result?.analysis ??
    data?.data?.analysis ??
    data;

  const flow =
    data?.flow ??
    data?.result?.flow ??
    data?.data?.flow ??
    analysis?.flow ??
    [];

  const atlas =
    data?.atlas ??
    data?.result?.atlas ??
    data?.data?.atlas ??
    analysis?.atlas ??
    [];

  if (!data) {
    return (
      <div className="no-result">
        Veri yüklenemedi veya motor sonucu bulunamadı.
      </div>
    );
  }

  return (
    <div className="result-wrapper">
      <h1 className="result-title">
        {data?.title ??
          analysis?.title ??
          analysis?.root ??
          analysis?.rootHece ??
          "Sonuç"}
      </h1>

      <ReadingPanel content={analysis} />
      <AnalyzerPanel content={analysis} />
      <VisualizerPanel flow={flow} atlas={atlas} />
    </div>
  );
}