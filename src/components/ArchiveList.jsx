import { useNavigate } from "react-router-dom";
import "./ArchiveList.css";

export default function ArchiveList({ items }) {
  const navigate = useNavigate();

  return (
    <div className="archive-list">
      <h2 className="archive-title">Arşiv</h2>

      {items.map(item => (
        <div
          key={item.id}
          className="archive-item"
          onClick={() => navigate(`/read/${item.id}`)}
        >
          <div className="archive-item-title">{item.title}</div>
          <div className="archive-item-tags">
            {item.tags?.join(" • ")}
          </div>
        </div>
      ))}
    </div>
  );
}
