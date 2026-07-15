import { Route, Routes, Link } from "react-router-dom";
import M8 from "./matrices/m8";
import M11 from "./matrices/m11";
import M12 from "./matrices/m12";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/matrix/m8" element={<M8 />} />
        <Route path="/matrix/m11" element={<M11 />} />
        <Route path="/matrix/m12" element={<M12 />} />
      </Routes>

      <div style={{ marginTop: "20px", padding: "10px", background: "#f5f5f5" }}>
        <Link to="/matrix/m8">m8 Matrisi</Link> |{" "}
        <Link to="/matrix/m11">m11 Matrisi</Link> |{" "}
        <Link to="/matrix/m12">m12 Matrisi</Link>
      </div>
    </>
  );
}
