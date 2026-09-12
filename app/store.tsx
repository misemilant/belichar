 "use client";

import { useMemo, useState } from "react";
import { ChevronDown, Gamepad2, Menu, MessageCircle, Search, ShieldCheck, ShoppingCart, Sparkles, Star, X, Zap } from "lucide-react";

const WA_NUMBER = "6282249246366"; // Ganti jika nomor WhatsApp admin berbeda
const DANA_NUMBER = "082249246366"; // Ganti jika nomor DANA berbeda

type Product = {
  id: string;
  name: string;
  category: "character" | "cash";
  price: number;
  image: string;
  description: string;
  details?: string[];
  badge?: string;
};

const characters: Product[] = [
  {
    id: "major",
    name: "MAJOR",
    category: "character",
    price: 23000,
    image: "/character-placeholder.svg",
    description: "Character Point Blank dengan item dan inventory sesuai detail.",
    details: ["QC 10–15 hari", "Saber 3 hari", "Kar 2 hari", "Medkit 3–4 hari", "Wig 3–6 hari", "Inventory 167/600"],
    badge: "TERSEDIA"
  },
  {
    id: "letcol",
    name: "LETCOL",
    category: "character",
    price: 0,
    image: "/character-placeholder.svg",
    description: "Detail character dapat ditambahkan melalui konfigurasi produk.",
    details: ["QC 50 hari", "T77 6 hari", "Saber 8 hari", "Kar 15 hari", "Medkit 42 hari", "Idol 34 hari", "Wig 26 hari", "Rappel Tarantula permanent", "Inventory 539/600"],
    badge: "SEGERA"
  }
];

const cash: Product[] = [
  ["1.200", 9150], ["2.400", 18300], ["6.000", 45750], ["12.000", 91500],
  ["24.000", 182500], ["36.000", 273000], ["60.000", 454000]
].map(([amount, price]) => ({
  id: `cash-${amount}`,
  name: `${amount} PB Cash`,
  category: "cash",
  price: price as number,
  image: "/cash-placeholder.svg",
  description: `Top Up ${amount} PB Cash Point Blank.`,
  badge: "TERSEDIA"
}));

function rupiah(n: number) {
  return n ? new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n) : "Harga segera";
}

function waLink(product: Product) {
  const text = `Halo Admin BELICHAR, saya ingin order.%0A%0AProduk: ${product.name}%0AHarga: ${rupiah(product.price)}%0A%0AMohon info proses selanjutnya.`;
  return `https://wa.me/${WA_NUMBER}?text=${text}`;
}

export default function Store() {
  const [menu, setMenu] = useState(false);
  const [tab, setTab] = useState<"all" | "character" | "cash">("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);
  const [copied, setCopied] = useState(false);

  const products = useMemo(() => {
    const all = [...characters, ...cash];
    return all.filter(p => (tab === "all" || p.category === tab) && p.name.toLowerCase().includes(search.toLowerCase()));
  }, [tab, search]);

  function copyDana() {
    navigator.clipboard?.writeText(DANA_NUMBER);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <main>
      <header className="header">
        <div className="container nav">
          <a href="#" className="logo"><span>BELI</span><b>CHAR</b></a>
          <button className="mobile-menu" onClick={() => setMenu(!menu)} aria-label="Menu">{menu ? <X/> : <Menu/>}</button>
          <nav className={menu ? "navlinks open" : "navlinks"}>
            <a href="#home" onClick={() => setMenu(false)}>Home</a>
            <a href="#produk" onClick={() => {setTab("character"); setMenu(false)}}>Character</a>
            <a href="#produk" onClick={() => {setTab("cash"); setMenu(false)}}>PB Cash</a>
            <a href="#cara-order" onClick={() => setMenu(false)}>Cara Order</a>
            <a href="#kontak" onClick={() => setMenu(false)}>Kontak</a>
          </nav>
          <a className="nav-wa" href={`https://wa.me/${WA_NUMBER}`} target="_blank"><MessageCircle size={18}/> WhatsApp</a>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="hero-glow"></div>
        <div className="container hero-content">
          <div className="eyebrow"><Sparkles size={16}/> MARKETPLACE POINT BLANK</div>
          <h1>Jual Char Point Blank<br/><em>& Top Up PB Cash</em></h1>
          <p>Temukan character Point Blank dan lakukan top up PB Cash dengan mudah, cepat, dan praktis.</p>
          <div className="hero-actions">
            <a href="#produk" className="btn gold">Lihat Character</a>
            <button className="btn ghost" onClick={() => {setTab("cash"); document.getElementById("produk")?.scrollIntoView({behavior:"smooth"})}}>Top Up PB Cash</button>
          </div>
          <div className="trust"><span><ShieldCheck size={17}/> Pembayaran DANA & QRIS</span><span><Zap size={17}/> Proses via WhatsApp</span></div>
        </div>
      </section>

      <section className="benefits">
        <div className="container benefit-grid">
          {[
            [Zap, "Proses Cepat", "Pesanan diproses setelah pembayaran diverifikasi."],
            [ShieldCheck, "Pembayaran Mudah", "Gunakan DANA atau QRIS sesuai pilihanmu."],
            [Gamepad2, "Produk PB", "Character dan nominal PB Cash tersedia."],
            [MessageCircle, "Order via WhatsApp", "Konfirmasi pembayaran langsung ke admin."]
          ].map(([Icon, title, desc]: any) => <div className="benefit" key={title}><Icon size={26}/><div><h3>{title}</h3><p>{desc}</p></div></div>)}
        </div>
      </section>

      <section className="products-section" id="produk">
        <div className="container">
          <div className="section-head">
            <div><div className="eyebrow dark">PRODUK BELICHAR</div><h2>Belanja <span>Point Blank</span></h2><p>Pilih Character atau Top Up PB Cash yang kamu butuhkan.</p></div>
            <div className="search"><Search size={18}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari produk..." /></div>
          </div>
          <div className="tabs">
            <button className={tab==="all"?"active":""} onClick={()=>setTab("all")}>Semua</button>
            <button className={tab==="character"?"active":""} onClick={()=>setTab("character")}>Character</button>
            <button className={tab==="cash"?"active":""} onClick={()=>setTab("cash")}>PB Cash</button>
          </div>
          <div className="product-grid">
            {products.map(p => <article className="product-card" key={p.id}>
              <div className="product-image"><img src={p.image} alt={p.name}/><span>{p.badge}</span></div>
              <div className="product-body"><div className="category">{p.category === "character" ? "CHARACTER" : "PB CASH"}</div><h3>{p.name}</h3><p>{p.description}</p>{p.details && <div className="mini-details">{p.details.slice(0,3).map(x=><span key={x}>• {x}</span>)}</div>}<div className="price-row"><strong>{rupiah(p.price)}</strong><button onClick={()=>setSelected(p)} disabled={!p.price}>{p.price ? "Beli Sekarang" : "Detail"}</button></div></div>
            </article>)}
          </div>
        </div>
      </section>

      <section className="payment">
        <div className="container payment-grid">
          <div><div className="eyebrow">PEMBAYARAN</div><h2>Pilih metode pembayaran yang <em>praktis.</em></h2><p>Setelah pembayaran, kirim bukti transfer kepada admin melalui WhatsApp agar pesanan dapat diproses.</p><div className="payment-card"><div><small>DANA</small><strong>{DANA_NUMBER}</strong></div><button onClick={copyDana}>{copied ? "Tersalin ✓" : "Salin Nomor"}</button></div></div>
          <div className="qris-card"><div className="qris-placeholder"><img src="/qris.png" ... /><h3>Bayar dengan QRIS</h3><p>Scan QRIS menggunakan aplikasi pembayaran yang mendukung QRIS.</p></div>
        </div>
      </section>

      <section className="steps" id="cara-order">
        <div className="container"><div className="center"><div className="eyebrow dark">CARA ORDER</div><h2>Order gampang, <span>nggak ribet.</span></h2></div><div className="step-grid">{["Pilih Produk","Isi Data","Lakukan Pembayaran","Kirim Bukti","Pesanan Diproses"].map((x,i)=><div className="step" key={x}><b>0{i+1}</b><h3>{x}</h3><p>{["Pilih Character atau nominal PB Cash.","Siapkan nickname PB dan nomor WhatsApp.","Bayar menggunakan DANA atau QRIS.","Kirim bukti pembayaran ke admin.","Admin memverifikasi dan memproses pesanan."][i]}</p></div>)}</div></div>
      </section>

      <section className="faq">
        <div className="container"><div className="center"><div className="eyebrow dark">FAQ</div><h2>Pertanyaan <span>umum</span></h2></div><div className="faq-grid">{["Apakah pembayaran bisa menggunakan DANA?","Apakah tersedia QRIS?","Bagaimana cara konfirmasi pembayaran?","Berapa lama pesanan diproses?"].map(q=><details key={q}><summary>{q}<ChevronDown size={18}/></summary><p>{q.includes("DANA") ? "Ya, pembayaran DANA tersedia." : q.includes("QRIS") ? "Ya, pembayaran QRIS tersedia." : "Setelah membayar, kirim bukti pembayaran melalui WhatsApp admin. Pesanan diproses setelah pembayaran diverifikasi."}</p></details>)}</div></div>
      </section>

      <section className="contact" id="kontak"><div className="container contact-box"><div><div className="eyebrow">BUTUH BANTUAN?</div><h2>Chat admin <em>BELICHAR.</em></h2><p>Ada pertanyaan tentang Character atau PB Cash? Hubungi admin melalui WhatsApp.</p></div><a className="btn gold" href={`https://wa.me/${WA_NUMBER}`} target="_blank"><MessageCircle size={20}/> Chat WhatsApp</a></div></section>

      <footer><div className="container footer"><div><a className="logo"><span>BELI</span><b>CHAR</b></a><p>Jual Character Point Blank & Top Up PB Cash.</p></div><div className="footer-links"><a href="#home">Home</a><a href="#produk">Produk</a><a href="#cara-order">Cara Order</a><a href="#kontak">Kontak</a></div><small>© 2026 BELICHAR. All Rights Reserved.</small></div></footer>

      <a className="floating-wa" href={`https://wa.me/${WA_NUMBER}`} target="_blank"><MessageCircle size={25}/></a>

      {selected && <div className="modal-bg" onClick={()=>setSelected(null)}><div className="modal" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setSelected(null)}><X/></button><div className="modal-image"><img src={selected.image} alt={selected.name}/></div><div className="category">{selected.category==="character"?"CHARACTER":"PB CASH"}</div><h2>{selected.name}</h2><strong className="modal-price">{rupiah(selected.price)}</strong><p>{selected.description}</p>{selected.details && <ul>{selected.details.map(x=><li key={x}>{x}</li>)}</ul>}{selected.price > 0 && <a className="btn gold full" href={waLink(selected)} target="_blank"><ShoppingCart size={18}/> Pesan via WhatsApp</a>}</div></div>}
    </main>
  );
}
