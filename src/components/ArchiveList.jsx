import "./ArchiveList.css";

export default function ArchiveList({ items }) {
  if (!items || items.length === 0) {
    return (
      <div className="archive-empty">
        Arşivde görüntülenecek kayıt bulunamadı.
      </div>
    );
  }

  return (
    <div className="archive-list">
      {items.map((item) => (
        <div key={item.id} className="archive-card">
          <h3 className="archive-title">{item.title}</h3>
          <p className="archive-description">{item.description}</p>

          <div className="archive-tags">
            {item.tags.map((tag, index) => (
              <span key={index} className="archive-tag">
                {tag}
              </span>
            ))}
          </div>

          {item.link && (
            <a href={item.link} className="archive-link">
              İncele →
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
