import React from "react";
import { Link } from "react-router-dom";
import { usePublishedRecords } from "../data/usePublishedRecords";
import { defaultArchiveArticles } from "../data/ykosDataService";

export default function PublishedArchive({ videosOnly = false }) {
  const { records, loading, error } = usePublishedRecords();
  const ids = new Set(records.map(record => String(record.id)));
  const all = [...records, ...defaultArchiveArticles.filter(record => !ids.has(String(record.id)))];
  const items = videosOnly ? all.filter(record => record.videoUrl) : all;
  return <main style={{maxWidth:1900, margin:"0 auto", padding:20, color:"#fff", boxSizing:"border-box"}}>
    <Link to="/" style={{color:"#ffd700"}}>← Ana sayfaya dön</Link>
    <h1>{videosOnly ? "YKOS Video Arşivi" : "YKOS Arşiv Portalı"}</h1>
    {loading && <p role="status">Kayıtlar yükleniyor…</p>}
    {error && <p role="alert" style={{color:"#f87171"}}>{error}</p>}
    {!loading && !error && !items.length && <p>Henüz yayımlanmış kayıt bulunmuyor.</p>}
    <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap:16}}>
      {items.map(record => <Link key={record.id} to={`/read/${encodeURIComponent(record.id)}`} style={{color:"#fff", textDecoration:"none", padding:16, border:"1px solid #b8860b", borderRadius:10, minWidth:0, overflowWrap:"anywhere"}}>
        {record.image && <img src={record.image} alt="" loading="lazy" style={{width:"100%", height:180, objectFit:"contain"}}/>}
        <h2 style={{fontSize:20,color:"#ffd700"}}>{record.title}</h2>
        <p>{record.summary}</p><small>{record.date}</small>
      </Link>)}
    </div>
  </main>;
}
