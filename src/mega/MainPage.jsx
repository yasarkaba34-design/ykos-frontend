import { useState } from "react";
import QueryResponse from "./QueryResponse";
import BubbleMatrix from "./BubbleMatrix";

export default function MainPage() {
  const [rmv, setRMV] = useState([]);

  return (
    <div>
      <QueryResponse onRMV={setRMV} />
      <BubbleMatrix rmv={rmv} />
    </div>
  );
}
