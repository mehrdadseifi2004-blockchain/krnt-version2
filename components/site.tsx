 "use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, ChevronDown, ExternalLink, Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";

type Lang = "en" | "fa";

const copy = {
  en: {
    nav: ["Build", "Ecosystem", "Projects", "Ownership", "KRNT", "Documentation"],
    cta: "Work with us",
    kicker: "VENTURE STUDIO & INVESTMENT ECOSYSTEM",
    hero: "BUILD. INVEST. GROW.",
    sub: "We connect capital, talent and technology to build products, projects and sustainable value.",
    idea: "Bring an idea",
    invest: "Explore KRNT",
    scroll: "Scroll to explore",
    thesis: "FROM IDEAS TO VALUE",
    thesisText: "Karnet is built around one operating thesis: connect capital + talent + technology, then repeatedly turn that combination into products and operating projects.",
    pillars: [
      ["01", "BUILD", "A compact, AI-augmented production engine for software, AI systems, blockchain products, websites and digital content."],
      ["02", "INVEST", "A selective capital layer for long-term participants and structured project opportunities."],
      ["03", "GROW", "Launch products, create revenue, support selected projects and reinvest value into the portfolio."]
    ],
    ownership: "CONTRIBUTION BECOMES PARTICIPATION",
    ownershipText: "Instead of separating contribution from upside, project structures can give contributors project-level economic participation based on the value and role of their contribution.",
    example: "EXAMPLE STRUCTURE",
    exampleText: "Illustrative only — allocation varies by project, specialty and agreement.",
    process: ["DISCOVER", "ARCHITECT", "BUILD", "LAUNCH", "ITERATE", "SCALE"],
    processTitle: "BUILD ONCE. PRODUCTIZE. SELL. IMPROVE.",
    flyTitle: "THE KARNET FLYWHEEL",
    fly: ["CAPITAL", "PRODUCTS", "REVENUE", "REINVESTMENT", "PORTFOLIO GROWTH"],
    token: "KRNT",
    tokenText: "The tradable layer of the Karnet ecosystem. KRNT is not equity in Karnet and does not automatically grant project ownership or revenue rights.",
    supply: "TOTAL SUPPLY",
    circulation: "INTENDED EXTERNAL CIRCULATION",
    network: "NETWORK",
    treasury: "TREASURY",
    treasuryText: "Assets are separated across primary treasury, cold reserves, liquidity and investment structures for security, control and risk management.",
    roadmap: "2026 — 2029",
    roadmapItems: [
      ["2026", "CONSOLIDATE", "Strengthen the ecosystem, Studio execution, product commercialization preparation and treasury discipline."],
      ["2027", "PRODUCTIZE", "Launch and sell digital products, build the portfolio and structure selected founder partnerships."],
      ["2028", "CAPITALIZE", "Develop a strategic investor network, stronger due diligence and selected project investments."],
      ["2029", "SCALE", "Scale successful products, strategic partnerships, selective exits and reinvestment."]
    ],
    final: "HAVE SOMETHING WORTH BUILDING?",
    finalSub: "Let’s turn the idea into an operating project.",
    footer: "BUILD. INVEST. GROW.",
    risk: "Risk & transparency",
    address: "0xA0dcd9f952842E2e2e5E5441CC50007d169AcE5B"
  },
  fa: {
    nav: ["ساخت", "اکوسیستم", "پروژه‌ها", "مالکیت", "KRNT", "مستندات"],
    cta: "همکاری با ما",
    kicker: "استودیو سرمایه‌گذاری و تولید",
    hero: "بساز. سرمایه‌گذاری کن. رشد کن.",
    sub: "سرمایه، استعداد و فناوری را به هم متصل می‌کنیم تا محصول، پروژه و ارزش پایدار بسازیم.",
    idea: "ایده‌ات را بیاور",
    invest: "KRNT را ببین",
    scroll: "برای مشاهده اسکرول کنید",
    thesis: "از ایده تا ارزش",
    thesisText: "تز عملیاتی Karnet ساده است: سرمایه + استعداد + فناوری را به هم متصل می‌کنیم و این ترکیب را به‌صورت مداوم به محصول و پروژه عملیاتی تبدیل می‌کنیم.",
    pillars: [
      ["۰۱", "ساخت", "یک موتور تولید فشرده و مجهز به AI برای نرم‌افزار، سیستم‌های هوش مصنوعی، بلاکچین، وب و محتوای دیجیتال."],
      ["۰۲", "سرمایه‌گذاری", "یک لایه سرمایه‌گذاری انتخابی برای مشارکت‌کنندگان بلندمدت و فرصت‌های ساختاریافته پروژه‌ای."],
      ["۰۳", "رشد", "عرضه محصول، ایجاد درآمد، حمایت از پروژه‌های منتخب و سرمایه‌گذاری مجدد ارزش در پرتفولیو."]
    ],
    ownership: "مشارکت تبدیل به سهم می‌شود",
    ownershipText: "در ساختارهای پروژه‌ای، مشارکت‌کنندگان می‌توانند بر اساس نقش و ارزش مشارکت خود، از مشارکت اقتصادی در سطح پروژه برخوردار شوند.",
    example: "ساختار نمونه",
    exampleText: "صرفاً نمونه است؛ درصدها با توجه به پروژه، تخصص و توافق تغییر می‌کنند.",
    process: ["کشف", "معماری", "ساخت", "عرضه", "بهبود", "مقیاس"],
    processTitle: "یک‌بار بساز. محصول کن. بفروش. بهترش کن.",
    flyTitle: "چرخه رشد KARNET",
    fly: ["سرمایه", "محصول", "درآمد", "سرمایه‌گذاری مجدد", "رشد پرتفولیو"],
    token: "KRNT",
    tokenText: "لایه قابل معامله اکوسیستم Karnet. KRNT سهام Karnet نیست و به‌صورت خودکار مالکیت یا حق درآمد پروژه ایجاد نمی‌کند.",
    supply: "کل عرضه",
    circulation: "گردش خارجی هدف‌گذاری‌شده",
    network: "شبکه",
    treasury: "خزانه",
    treasuryText: "دارایی‌ها میان خزانه اصلی، ذخایر سرد، نقدینگی و ساختارهای سرمایه‌گذاری تفکیک می‌شوند.",
    roadmap: "۲۰۲۶ — ۲۰۲۹",
    roadmapItems: [
      ["۲۰۲۶", "تثبیت", "تقویت اکوسیستم، اجرای Studio، آماده‌سازی تجاری‌سازی محصولات و انضباط خزانه."],
      ["۲۰۲۷", "محصول‌سازی", "عرضه و فروش محصولات دیجیتال، ساخت پرتفولیو و همکاری‌های منتخب با بنیان‌گذاران."],
      ["۲۰۲۸", "تأمین سرمایه", "شبکه سرمایه‌گذاران استراتژیک، Due Diligence قوی‌تر و سرمایه‌گذاری انتخابی در پروژه‌ها."],
      ["۲۰۲۹", "مقیاس", "مقیاس‌دهی محصولات موفق، مشارکت‌های استراتژیک، خروج‌های انتخابی و سرمایه‌گذاری مجدد."]
    ],
    final: "چیزی برای ساختن داری؟",
    finalSub: "بیایید ایده را به یک پروژه عملیاتی تبدیل کنیم.",
    footer: "بساز. سرمایه‌گذاری کن. رشد کن.",
    risk: "ریسک و شفافیت",
    address: "0xA0dcd9f952842E2e2e5E5441CC50007d169AcE5B"
  }
};

export default function Site() {
  const [lang, setLang] = useState<Lang>("en");
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const t = copy[lang];
  const rtl = lang === "fa";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = rtl ? "rtl" : "ltr";
  }, [lang, rtl]);

  const switchLang = () => setLang(lang === "en" ? "fa" : "en");

  const [copied, setCopied] = useState(false);

const handleCopyAddress = async () => {
  try {
    await navigator.clipboard.writeText(t.address);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  } catch (error) {
    console.error("Failed to copy contract address:", error);
  }
};

  return (
    <main className={rtl ? "rtl" : "ltr"}>
      <header className="fixed top-0 z-50 w-full border-b border-[var(--line)] bg-[color:var(--bg)]/75 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 md:px-10">
          <a href="#top" className="flex items-center gap-3 font-semibold tracking-[-.04em]">
          <div className="flex h-9 items-center">
  <Image
    src="/images/logo.jpg"
    alt="KARNET."
    width={120}
    height={36}
    priority
    className="h-9 w-auto object-contain"
  />
</div>
            <span>KARNET<span className="text-[var(--accent)]">.</span></span>
          </a>
          <nav className="hidden items-center gap-7 text-[11px] uppercase tracking-[.16em] text-[var(--muted)] lg:flex">
            {t.nav.map((item, i) => <a key={item} href={["#build","#ecosystem","#projects","#ownership","#krnt","#documentation"][i]} className="transition hover:text-[var(--fg)]">{item}</a>)}
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={switchLang} className="rounded-full border border-[var(--line)] px-3 py-2 text-[10px] uppercase tracking-[.16em]">{lang === "en" ? "FA" : "EN"}</button>
            <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="toggle theme" className="rounded-full border border-[var(--line)] p-2.5">
              {theme === "dark" ? <Sun size={15}/> : <Moon size={15}/>}
            </button>
            <a href="#contact" className="hidden rounded-full bg-[var(--fg)] px-5 py-3 text-[10px] font-semibold uppercase tracking-[.14em] text-[var(--bg)] sm:block">{t.cta}</a>
            <button className="lg:hidden p-2" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
          </div>
        </div>
        <AnimatePresence>
          {open && <motion.nav initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} className="overflow-hidden border-t border-[var(--line)] px-5 pb-5 lg:hidden">
            {t.nav.map((item,i)=><a onClick={()=>setOpen(false)} key={item} href={["#build","#ecosystem","#projects","#ownership","#krnt","#documentation"][i]} className="block border-b border-[var(--line)] py-4 text-xs uppercase tracking-widest">{item}</a>)}
          </motion.nav>}
        </AnimatePresence>
      </header>

      <section id="top" className="grid-bg relative flex min-h-screen items-end overflow-hidden px-5 pb-14 pt-28 md:px-10 md:pb-20">
        <div className="mx-auto w-full max-w-[1440px]">
          <motion.div initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} transition={{duration:.7}} className="mb-7 flex items-center gap-3 text-[10px] uppercase tracking-[.25em] text-[var(--accent)]">
            <span className="h-px w-10 bg-[var(--accent)]"/> {t.kicker}
          </motion.div>
          <motion.h1 initial={{opacity:0,y:35}} animate={{opacity:1,y:0}} transition={{duration:.8,delay:.08}} className="hero-word max-w-[1300px] uppercase">
          <span className="text-gradient vazirmatn-bold">
  {t.hero}
</span>
          </motion.h1>
          <div className="mt-12 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <p className="max-w-2xl text-xl leading-relaxed text-[var(--muted)] md:text-2xl">{t.sub}</p>
            <div className="flex flex-wrap gap-3">
              <a href="#contact" className="group rounded-full border border-[var(--accent)] px-6 py-4 text-xs font-semibold uppercase tracking-widest hover:bg-[var(--accent)] hover:text-[#07100d]">{t.idea} <ArrowDownRight className="inline transition group-hover:rotate-[-45deg]" size={15}/></a>
              <a href="#krnt" className="rounded-full border border-[var(--line)] px-6 py-4 text-xs uppercase tracking-widest">{t.invest}</a>
            </div>
          </div>
          <div className="mt-20 flex items-center justify-between text-[10px] uppercase tracking-[.22em] text-[var(--muted)]">
            <span>BNB SMART CHAIN</span><span>{t.scroll} ↓</span>
          </div>
        </div>
      </section>

      <section id="build" className="mx-auto max-w-[1440px] px-5 py-28 md:px-10 md:py-40">
        <div className="grid gap-12 md:grid-cols-[.75fr_1.25fr]">
          <div><p className="text-[10px] uppercase tracking-[.25em] text-[var(--accent)]">{t.thesis}</p></div>
          <div>
            <h2 className="max-w-5xl text-4xl font-medium tracking-[-.045em] md:text-6xl">{t.thesisText}</h2>
            <div className="mt-16 grid gap-px overflow-hidden border border-[var(--line)] bg-[var(--line)] md:grid-cols-3">
              {t.pillars.map(([num,title,body])=><motion.article whileHover={{y:-5}} key={num} className="bg-[var(--bg)] p-7 md:p-9">
                <div className="mb-16 flex justify-between text-[10px] tracking-widest text-[var(--muted)]"><span>{num}</span><ArrowUpRight size={15}/></div>
                <h3 className="text-2xl font-semibold uppercase">{title}</h3><p className="mt-5 text-sm leading-7 text-[var(--muted)]">{body}</p>
              </motion.article>)}
            </div>
          </div>
        </div>
      </section>

      <section id="ecosystem" className="border-y border-[var(--line)]">
        <div className="mx-auto max-w-[1440px] px-5 py-28 md:px-10 md:py-36">
          <div className="mb-16 flex items-end justify-between gap-8"><div><p className="text-[10px] uppercase tracking-[.25em] text-[var(--accent)]">KARNET SYSTEM</p><h2 className="mt-4 text-5xl font-medium tracking-[-.05em] md:text-8xl">BUILD / INVEST / GROW</h2></div></div>
          <div className="grid gap-3 md:grid-cols-3">
            {["STUDIO","PORTFOLIO","TREASURY"].map((x,i)=><div key={x} className="glass min-h-72 p-7 md:p-10"><span className="text-[10px] tracking-widest text-[var(--muted)]">0{i+1}</span><h3 className="mt-20 text-3xl">{x}</h3><div className="mt-4 h-px w-24 bg-[var(--accent)]"/></div>)}
          </div>
        </div>
      </section>

      <section id="ownership" className="mx-auto max-w-[1440px] px-5 py-28 md:px-10 md:py-40">
        <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
          <div><p className="text-[10px] uppercase tracking-[.25em] text-[var(--accent)]">{t.ownership}</p><h2 className="mt-5 text-5xl font-medium tracking-[-.05em] md:text-7xl">{t.ownership}</h2></div>
          <div>
            <p className="max-w-3xl text-xl leading-8 text-[var(--muted)] md:text-2xl">{t.ownershipText}</p>
            <div className="mt-12 overflow-hidden border border-[var(--line)]">
              <div className="border-b border-[var(--line)] p-5 text-[10px] uppercase tracking-[.2em] text-[var(--muted)]">{t.example} — 5 × 15% + 25% KARNET</div>
              <div className="grid grid-cols-5">
                {[15,15,15,15,25].map((v,i)=><div key={i} className="group border-r border-[var(--line)] p-4 last:border-r-0 md:p-7"><div className="flex h-52 items-end"><motion.div initial={{height:0}} whileInView={{height:`${v*5.8}px`}} viewport={{once:true}} className="w-full bg-[var(--accent)]/70"/></div><div className="mt-5 text-2xl font-semibold">{v}%</div><div className="mt-1 text-[9px] uppercase tracking-widest text-[var(--muted)]">{i===4?"KARNET":"CONTRIBUTOR"}</div></div>)}
              </div>
              <div className="border-t border-[var(--line)] p-5 text-xs text-[var(--muted)]">{t.exampleText}</div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="border-y border-[var(--line)]">
        <div className="mx-auto max-w-[1440px] px-5 py-28 md:px-10 md:py-36">
          <p className="text-[10px] uppercase tracking-[.25em] text-[var(--accent)]">PRODUCT ENGINE</p>
          <h2 className="mt-4 max-w-4xl text-5xl font-medium tracking-[-.055em] md:text-8xl">{t.processTitle}</h2>
          <div className="mt-16 grid grid-cols-2 border-l border-t border-[var(--line)] md:grid-cols-6">
            {t.process.map((p,i)=><div key={p} className="border-b border-r border-[var(--line)] p-6 md:p-7"><span className="text-[10px] text-[var(--muted)]">0{i+1}</span><div className="mt-14 text-lg uppercase">{p}</div></div>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-28 md:px-10 md:py-36">
        <p className="text-[10px] uppercase tracking-[.25em] text-[var(--accent)]">{t.flyTitle}</p>
        <div className="mt-14 flex flex-wrap items-center gap-3 md:gap-0">
          {t.fly.map((x,i)=><div key={x} className="flex items-center"><div className={`rounded-full border px-5 py-4 text-xs uppercase tracking-widest ${i===4?"border-[var(--accent)] text-[var(--accent)]":"border-[var(--line)]"}`}>{x}</div>{i<t.fly.length-1&&<div className="mx-2 hidden h-px w-12 bg-[var(--line)] md:block"/>}</div>)}
        </div>
      </section>

      <section id="krnt" className="border-y border-[var(--line)]">
        <div className="mx-auto grid max-w-[1440px] gap-14 px-5 py-28 md:px-10 md:py-36 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-[10px] uppercase tracking-[.25em] text-[var(--accent)]">THE TRADABLE LAYER</p>
            <h2 className="mt-5 text-7xl font-semibold tracking-[-.07em] md:text-[11rem]">{t.token}</h2>
            <p className="mt-8 max-w-xl text-lg leading-8 text-[var(--muted)]">{t.tokenText}</p>
            <a href="https://dex.coinmarketcap.com/token/bsc/0xa0dcd9f952842e2e2e5e5441cc50007d169ace5b/" target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 border-b border-[var(--accent)] pb-2 text-xs uppercase tracking-widest">Market access <ExternalLink size={14}/>
            </a>
            </div>
          <div className="grid gap-3 sm:grid-cols-2">
  <Stat label={t.supply} value="333,333,333,333" />

  <Stat label={t.circulation} value="≈ 33%" />

  <Stat label={t.network} value="BNB Smart Chain" />

  <div className="flex min-h-44 flex-col border border-white/10 bg-[#111B17A3] p-5">
  <div className="text-[10px] uppercase tracking-[0.2em] text-white/50">
    CONTRACT
  </div>
<div className="toptobottom">

</div>
  <div className="mt-auto">
    <button
      type="button"
      onClick={handleCopyAddress}
      className="block text-left text-[10px] uppercase tracking-[0.15em] text-[#7fffd4] transition-all duration-300 hover:opacity-70"
    >
      {copied ? "✓ COPIED" : "COPY TO"}
    </button>

    <div className="mt-2 font-mono text-base text-white/90">
      {t.address.slice(0, 10) + "…" + t.address.slice(-8)}
    </div>
  </div>
</div>
</div>
        </div>
      </section>

      <section id="documentation" className="mx-auto max-w-[1440px] px-5 py-28 md:px-10 md:py-36">
        <div className="grid gap-14 lg:grid-cols-[.6fr_1.4fr]">
          <div><p className="text-[10px] uppercase tracking-[.25em] text-[var(--accent)]">{t.roadmap}</p><h2 className="mt-4 text-5xl tracking-[-.05em] md:text-7xl">EXECUTION<br/>FIRST.</h2>
          <a href="/whitepaper.pdf" target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 border-b border-[var(--accent)] pb-2 text-xs uppercase tracking-widest">white paper <ExternalLink size={14}/></a>
          </div>
          <div className="border-t border-[var(--line)]">{t.roadmapItems.map(([year,title,body])=><div key={year} className="grid gap-4 border-b border-[var(--line)] py-8 md:grid-cols-[120px_220px_1fr]"><span className="text-[var(--accent)]">{year}</span><strong className="font-medium">{title}</strong><p className="text-sm leading-7 text-[var(--muted)]">{body}</p></div>)}</div>
        </div>
      </section>

      <section id="contact" className="grid-bg border-t border-[var(--line)] px-5 py-32 md:px-10 md:py-48">
        <div className="mx-auto max-w-[1440px]">
          <p className="text-[10px] uppercase tracking-[.25em] text-[var(--accent)]">KARNET</p>
          <h2 className="mt-6 max-w-6xl text-6xl font-medium tracking-[-.065em] md:text-[9rem]">{t.final}</h2>
          <p className="mt-8 text-xl text-[var(--muted)]">{t.finalSub}</p>
          <a href="mailto:support@krnt.in" className="mt-10 inline-flex rounded-full bg-[var(--fg)] px-7 py-4 text-xs font-semibold uppercase tracking-widest text-[var(--bg)]">{t.cta}</a>
        </div>
      </section>

      <footer className="border-t border-[var(--line)]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-10">
          <div><div className="font-semibold">{t.footer}</div><div className="mt-2 text-xs text-[var(--muted)]">© 2026 KARNET</div></div>
          <div className="flex flex-wrap gap-5 text-[10px] uppercase tracking-widest text-[var(--muted)]"><a href="#documentation">{t.risk}</a><a href="mailto:support@krnt.in">support@krnt.in</a><span>Mashhad · PERSIA</span></div>
        </div>
      </footer>
    </main>
  );
}

function Stat({label,value,mono=false}:{label:string,value:string,mono?:boolean}) {
  return <div className="glass flex min-h-44 flex-col justify-between p-6"><span className="text-[9px] uppercase tracking-[.2em] text-[var(--muted)]">{label}</span><strong className={`text-xl font-medium ${mono?"break-all font-mono text-sm":""}`}>{value}</strong></div>
}