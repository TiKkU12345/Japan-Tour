import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({ component: JapanHome });

const regions = [
  { name: "Hokkaido", jp: "北海道", note: "Wild north, wide skies", img: "photo-1536098561742-ca998e48cbcc", tag: "01 / NORTH" },
  { name: "Tohoku", jp: "東北", note: "Quiet forests and hot springs", img: "photo-1493976040374-85c8e12f0c0e", tag: "02 / NORTH EAST" },
  { name: "Kanto", jp: "関東", note: "Tokyo energy, coastal escapes", img: "photo-1540959733332-eab4deabeeaf", tag: "03 / EAST" },
  { name: "Chubu", jp: "中部", note: "Alpine trails and Fuji views", img: "photo-1464822759023-fed622ff2c3b", tag: "04 / CENTRAL" },
  { name: "Kansai", jp: "関西", note: "Old streets, living traditions", img: "photo-1478436127897-769e1b3f0f36", tag: "05 / WEST" },
  { name: "Chugoku", jp: "中国", note: "Island shrines and sea roads", img: "photo-1490806843957-31f4c9a91c65", tag: "06 / WEST" },
  { name: "Shikoku", jp: "四国", note: "Pilgrim paths, slower days", img: "photo-1510414842594-a61c69b5ae57", tag: "07 / ISLAND" },
  { name: "Kyushu", jp: "九州", note: "Volcanic landscapes, warm tables", img: "photo-1528360983277-13d401cdc186", tag: "08 / SOUTH WEST" },
  { name: "Okinawa", jp: "沖縄", note: "Blue water, island time", img: "photo-1510414842594-a61c69b5ae57", tag: "09 / FAR SOUTH" },
];
const packages = [
  { n: "01", title: "Tokyo in layers", days: "4 DAYS / 3 NIGHTS", price: "From ¥68,000", copy: "Neighbourhood cafés, late-night ramen, design stores and a day trip beyond the skyline.", img: "photo-1540959733332-eab4deabeeaf" },
  { n: "02", title: "The golden route", days: "8 DAYS / 7 NIGHTS", price: "From ¥168,000", copy: "Tokyo to Kyoto via Hakone and Osaka, with room for temples, trains and unplanned turns.", img: "photo-1493976040374-85c8e12f0c0e" },
  { n: "03", title: "Beyond the familiar", days: "10 DAYS / 9 NIGHTS", price: "From ¥228,000", copy: "A slower journey through mountain towns, craft studios and quieter coastlines.", img: "photo-1464822759023-fed622ff2c3b" },
];
function photo(id: string, width = 1200) { return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`; }

function JapanHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [season, setSeason] = useState("Spring");
  useEffect(() => {
    const root = document.querySelector(".jp-site");
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const targets = root.querySelectorAll(".jp-intro, .jp-section-heading, .jp-region-card, .jp-feature-image, .jp-feature-panel, .jp-film, .jp-package, .jp-season-photo, .jp-season-content, .jp-enquire-heading, .jp-form");
    const film = root.querySelector<HTMLVideoElement>(".jp-film-video");
    const filmSource = film?.querySelector<HTMLSourceElement>("source[data-src]");
    const filmObserver = film ? new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (filmSource && !filmSource.src) { filmSource.src = filmSource.dataset.src || ""; film.load(); }
          void film.play().catch(() => {});
        } else {
          film.pause();
        }
      });
    }, { threshold: 0.1 }) : null;
    if (film) filmObserver?.observe(film);
    targets.forEach((el, i) => { el.classList.add("jp-reveal"); el.setAttribute("data-reveal-index", String(i % 5)); });
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add("jp-in-view"); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -5% 0px" });
    targets.forEach(el => observer.observe(el));
    let frame = 0;
    const parallax = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const vh = window.innerHeight || 1;
        root.querySelectorAll(".jp-region-card img, .jp-feature-image, .jp-season-photo").forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.bottom < -100 || rect.top > vh + 100) return;
          const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
          (el as HTMLElement).style.setProperty("--jp-parallax-y", `${Math.max(-18, Math.min(18, progress * -22))}px`);
        });
      });
    };
    window.addEventListener("scroll", parallax, { passive: true });
    parallax();
    return () => { observer.disconnect(); filmObserver?.disconnect(); window.removeEventListener("scroll", parallax); if (frame) window.cancelAnimationFrame(frame); };
  }, []);
  return <main className="jp-site">
    <header className="jp-nav">
      <a className="jp-brand" href="#home" aria-label="Discover Japan home"><span className="jp-mark">日</span><span>DISCOVER<br/>JAPAN</span></a>
      <button className="jp-menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen}>{menuOpen ? "CLOSE −" : "MENU +"}</button>
      <nav className={menuOpen ? "jp-links is-open" : "jp-links"}>
        <a href="#regions" onClick={() => setMenuOpen(false)}>Destinations</a><a href="#journeys" onClick={() => setMenuOpen(false)}>Journeys</a><a href="#experiences" onClick={() => setMenuOpen(false)}>Experiences</a><a href="#guides" onClick={() => setMenuOpen(false)}>Travel notes</a>
        <a className="jp-nav-cta" href="#enquire" onClick={() => setMenuOpen(false)}>Plan your trip <span>↗</span></a>
      </nav>
    </header>
    <section className="jp-hero" id="home">
      <div className="jp-hero-image" role="img" aria-label="Traditional Japanese streets beneath Mount Fuji" />
      <div className="jp-hero-wash" />
      <div className="jp-hero-content"><p className="jp-kicker"><span /> A COUNTRY OF MANY WORLDS</p><h1>Japan,<br/><em>unfolding.</em></h1><p className="jp-hero-copy">Find your own rhythm across islands, old paths and cities that never stand still.</p><div className="jp-hero-actions"><a className="jp-button jp-button-red" href="#regions">Explore Japan <span>↗</span></a><a className="jp-text-link" href="#journeys">Find your journey <span>↓</span></a></div></div>
      <div className="jp-hero-side">日本を旅する <span>TRAVEL THROUGH JAPAN</span></div><div className="jp-hero-bottom"><span>35° 41′ N / 139° 41′ E</span><span>01 / 09 REGIONS</span></div>
    </section>
    <section className="jp-intro jp-pad"><div className="jp-intro-kanji">旅</div><div><p className="jp-overline">NOT JUST A PLACE. A FEELING.</p><h2>Take the long way.<br/><em>That is the point.</em></h2></div><div className="jp-intro-copy"><p>Follow the smell of freshly grilled street food. Stay for one more cup of tea. Catch the train that takes you somewhere unexpected.</p><p>Japan rewards curiosity. Start with a place, then let the details lead.</p><a className="jp-underlink" href="#experiences">Ways to experience Japan <span>↗</span></a></div></section>
    <section className="jp-regions jp-pad" id="regions"><div className="jp-section-heading"><div><p className="jp-overline">NINE REGIONS, COUNTLESS STORIES</p><h2>Where will you <em>wander?</em></h2></div><p>From the snow country of the north to coral-blue islands in the south, every region has its own pace.</p></div>
      <div className="jp-region-grid">{regions.map((r, i) => <a className={`jp-region-card jp-region-${i+1}`} href="#enquire" key={r.name}><img src={photo(r.img, 900)} alt={`${r.name}, Japan`} loading={i < 3 ? "eager" : "lazy"}/><div className="jp-region-shade"/><span className="jp-region-tag">{r.tag}</span><span className="jp-region-jp">{r.jp}</span><div className="jp-region-info"><span>{r.name}</span><h3>{r.note}</h3></div><span className="jp-region-arrow">↗</span></a>)}</div>
    </section>
    <section className="jp-feature" id="experiences"><div className="jp-feature-image"/><div className="jp-feature-panel"><p className="jp-overline">GO BEYOND THE CHECKLIST</p><h2>Small moments.<br/><em>Deep memories.</em></h2><p>Learn the ritual behind a bowl of matcha. Cycle beside rice fields. Slip into an onsen after a mountain walk. Meet the makers keeping local crafts alive.</p><div className="jp-experience-list"><a href="#enquire"><span>01</span> Food and everyday rituals <b>↗</b></a><a href="#enquire"><span>02</span> Nature, trails and onsen <b>↗</b></a><a href="#enquire"><span>03</span> Art, craft and culture <b>↗</b></a><a href="#enquire"><span>04</span> Islands and the open sea <b>↗</b></a></div></div></section>
    <section className="jp-film" aria-label="Moving view of Kyoto">
      <video className="jp-film-video" autoPlay muted loop playsInline preload="none" poster={photo("photo-1493976040374-85c8e12f0c0e", 1000)} aria-label="A moving view of the Kamo River in Kyoto">
        <source data-src="/videos/kyoto-kamo-river-optimized.mp4" type="video/mp4" />
      </video>
      <div className="jp-film-shade" />
      <div className="jp-film-copy"><p className="jp-overline">A MOMENT IN KYOTO · 京都</p><h2>Let the world<br/><em>slow down.</em></h2><p>Follow the river. Lose the rush. Find your own pace in Japan.</p><a className="jp-text-link" href="#journeys">Find your journey <span>↓</span></a></div>
      <p className="jp-film-credit">Footage: Kamigata0 · CC BY-SA 4.0 · <a href="https://commons.wikimedia.org/wiki/File:Kamo_River_in_Kyoto,_Japan_2013.12.07.ogv" target="_blank" rel="noreferrer">Wikimedia Commons</a></p>
    </section>
    <section className="jp-journeys jp-pad" id="journeys"><div className="jp-section-heading"><div><p className="jp-overline">THOUGHTFUL WAYS TO GO</p><h2>Choose a path.<br/><em>Make it yours.</em></h2></div><a className="jp-underlink" href="#enquire">Build a custom trip <span>↗</span></a></div><div className="jp-package-list">{packages.map(p => <article className="jp-package" key={p.n}><div className="jp-package-number">{p.n}</div><img src={photo(p.img, 1000)} alt={p.title} loading="lazy"/><div className="jp-package-body"><p className="jp-overline">{p.days}</p><h3>{p.title}</h3><p>{p.copy}</p><span className="jp-price">{p.price} <small>per person, indicative</small></span></div><a className="jp-package-arrow" href="#enquire" aria-label={`Enquire about ${p.title}`}>↗</a></article>)}</div><p className="jp-disclaimer">Indicative planning prices only. Final costs depend on dates, accommodation, transport and availability.</p></section>
    <section className="jp-season" id="guides"><div className="jp-season-photo"/><div className="jp-season-content"><p className="jp-overline">A LITTLE HELP WITH WHEN</p><h2>Every season<br/>has a <em>different Japan.</em></h2><div className="jp-season-tabs" role="group" aria-label="Choose a season">{["Spring","Summer","Autumn","Winter"].map(s => <button key={s} className={season === s ? "active" : ""} onClick={() => setSeason(s)}>{s}</button>)}</div><p className="jp-season-note">{({Spring:"Cherry blossoms, mild days and parks full of life. Book popular stays early.",Summer:"Festival nights, green mountain escapes and island days in the sun.",Autumn:"Maple leaves, crisp walking weather and glowing temple gardens.",Winter:"Snow-country onsens, ski slopes and clear views of Mount Fuji."} as Record<string,string>)[season]}</p><a className="jp-underlink" href="#enquire">Plan around {season.toLowerCase()} <span>↗</span></a></div></section>
    <section className="jp-enquire jp-pad" id="enquire"><div className="jp-enquire-heading"><p className="jp-overline">YOUR STORY STARTS HERE</p><h2>Tell us what<br/><em>you dream of.</em></h2><p>A first idea is enough. Tell us when you hope to travel and what you want to feel, see or taste.</p><div className="jp-enquire-stamp">旅<br/><small>YOUR JOURNEY</small></div></div><form className="jp-form" onSubmit={e => { e.preventDefault(); setSent(true); }}><label>Your name<input required name="name" placeholder="How should we call you?"/></label><label>Email address<input required type="email" name="email" placeholder="you@example.com"/></label><div className="jp-form-row"><label>When would you like to go?<select name="timing" defaultValue="Flexible"><option>Flexible</option><option>Next 3 months</option><option>3 to 6 months</option><option>6+ months</option></select></label><label>Travellers<select name="travellers" defaultValue="2 people"><option>1 person</option><option>2 people</option><option>3 to 4 people</option><option>5+ people</option></select></label></div><label>What kind of Japan are you dreaming of?<textarea name="dream" rows={3} placeholder="Food, design, nature, hidden towns..."/></label><button className="jp-button jp-button-red jp-submit" type="submit">Send trip enquiry <span>↗</span></button>{sent && <p className="jp-form-note" role="status">Thanks for sharing your idea. This preview form is not connected to an enquiry inbox yet, so your details have not been sent. Please connect a booking email or form service before accepting real enquiries.</p>}<p className="jp-form-foot">No fixed itinerary needed. We can start with a feeling.</p></form></section>
    <footer className="jp-footer"><a className="jp-brand jp-brand-footer" href="#home"><span className="jp-mark">日</span><span>DISCOVER<br/>JAPAN</span></a><p>Take the long way.<br/>See what you find.</p><div className="jp-footer-links"><a href="#regions">Destinations</a><a href="#journeys">Journeys</a><a href="#guides">Travel notes</a><a href="#enquire">Plan your trip ↗</a></div><span className="jp-copyright">© 2026 DISCOVER JAPAN</span></footer>
  </main>;
}
