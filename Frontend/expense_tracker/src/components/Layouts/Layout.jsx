
import React, { useState, useEffect, useRef } from 'react';

export default function Landing() {
  // Theme State
  const [isDark, setIsDark] = useState(true);

  // Interactive Demo State
  const [balance, setBalance] = useState(1200.00);
  const [txnsList, setTxnsList] = useState([]);
  const [tName, setTName] = useState('');
  const [tAmt, setTAmt] = useState('');
  const [tType, setTType] = useState('expense');
  const [nameError, setNameError] = useState(false);
  const [amtError, setAmtError] = useState(false);

  // Scroll Reveal Implementation using IntersectionObserver
  const revealRefs = useRef([]);
  revealRefs.current = [];

  const addToRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
          }
        });
      },
      { threshold: 0.15 }
    );

    revealRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Update CSS Variables when theme changes
  useEffect(() => {
    const root = document.documentElement.style;
    root.setProperty('--ink', isDark ? '#0B1220' : '#F6F1E4');
    root.setProperty('--ink-2', isDark ? '#111a2e' : '#EFE9D8');
    root.setProperty('--paper', isDark ? '#F6F1E4' : '#0B1220');
    root.setProperty('--line', isDark ? 'rgba(246,241,228,0.14)' : 'rgba(11,18,32,0.12)');
    root.setProperty('--slate', isDark ? '#94A3B8' : '#5b6472');
  }, [isDark]);

  // Static ledger tape content
  const heroTxns = [
    { icon: '☕', desc: 'Coffee — Blue Bottle', amt: -6.40 },
    { icon: '🏠', desc: 'Rent', amt: -1450.00 },
    { icon: '💼', desc: 'Freelance payment', amt: 620.00 },
    { icon: '🛒', desc: 'Groceries — Trader Joe\'s', amt: -84.12 },
    { icon: '🚕', desc: 'Rideshare', amt: -18.50 },
    { icon: '📱', desc: 'Phone bill', amt: -45.00 },
    { icon: '💰', desc: 'Paycheck', amt: 2100.00 },
    { icon: '🎬', desc: 'Streaming subscription', amt: -15.99 },
    { icon: '🍽️', desc: 'Dinner with friends', amt: -62.30 },
    { icon: '⚡', desc: 'Electric bill', amt: -71.20 },
  ];

  // Double array to simulate infinite scroll loop seamlessly
  const doubledHeroTxns = [...heroTxns, ...heroTxns];

  // Handle demo transaction form submission
  const handleAddTxn = () => {
    const nameValid = tName.trim() !== '';
    const amtParsed = parseFloat(tAmt);
    const amtValid = !isNaN(amtParsed) && amtParsed > 0;

    setNameError(!nameValid);
    setAmtError(!amtValid);

    if (!nameValid || !amtValid) return;

    const signedAmt = tType === 'expense' ? -amtParsed : amtParsed;
    setBalance(prev => prev + signedAmt);
    setTxnsList(prev => [
      { name: tName.trim(), amt: amtParsed, signedAmt },
      ...prev
    ]);

    // Reset inputs
    setTName('');
    setTAmt('');
  };

  return (
    <>
      {/* Dynamic CSS Stylesheet */}
      <style dangerouslySetInnerHTML={{ __html: `
        :root{
          --ink:#0B1220;
          --ink-2:#111a2e;
          --paper:#F6F1E4;
          --paper-dim:#EAE3D0;
          --green:#3ECF8E;
          --green-dim:#2a9c6a;
          --gold:#E8B84B;
          --slate:#94A3B8;
          --line: rgba(246,241,228,0.14);
          --shadow: 0 20px 60px rgba(0,0,0,0.35);
          --radius: 14px;
        }
        * { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
        body {
          background:var(--ink);
          color:var(--paper);
          font-family:'Inter', sans-serif;
          -webkit-font-smoothing:antialiased;
          overflow-x:hidden;
        }
        .wrap{ max-width:1180px; margin:0 auto; padding:0 28px; }
        h1,h2,h3,h4{ font-family:'Fraunces', serif; font-weight:600; letter-spacing:-0.01em; }
        a{ color:inherit; text-decoration:none; }
        ::selection{ background:var(--green); color:var(--ink); }
        .mono{ font-family:'IBM Plex Mono', monospace; }

        a:focus-visible, button:focus-visible, input:focus-visible, select:focus-visible{
          outline:2px solid var(--green); outline-offset:3px;
        }

        @media (prefers-reduced-motion: reduce){
          *{ animation-duration:0.01ms !important; animation-iteration-count:1 !important; transition-duration:0.01ms !important; scroll-behavior:auto !important; }
        }

        /* NAV */
        nav{
          position:sticky; top:0; z-index:50;
          background:rgba(11,18,32,0.82);
          backdrop-filter: blur(10px);
          border-bottom:1px solid var(--line);
        }
        nav .wrap{ display:flex; align-items:center; justify-content:space-between; height:76px; }
        .brand{ display:flex; align-items:center; gap:10px; font-family:'Fraunces', serif; font-weight:700; font-size:22px; }
        .brand .dot{ width:10px; height:10px; border-radius:50%; background:var(--green); box-shadow:0 0 0 4px rgba(62,207,142,0.15); }
        .navlinks{ display:flex; align-items:center; gap:34px; }
        .navlinks a{ font-size:14.5px; color:var(--slate); font-weight:500; transition:color .2s; }
        .navlinks a:hover{ color:var(--paper); }
        .navcta{ display:flex; align-items:center; gap:14px; }
        .btn{
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          padding:11px 20px; border-radius:999px; font-weight:600; font-size:14.5px;
          border:1px solid transparent; cursor:pointer; transition:transform .18s ease, background .2s, border-color .2s;
          font-family:'Inter', sans-serif;
        }
        .btn:active{ transform:scale(0.97); }
        .btn-ghost{ color:var(--paper); border-color:var(--line); background:transparent; }
        .btn-ghost:hover{ border-color:var(--paper); }
        .btn-solid{ background:var(--green); color:#06180F; }
        .btn-solid:hover{ background:#4fe0a0; }
        .theme-toggle{
          width:38px; height:38px; border-radius:50%; border:1px solid var(--line);
          background:transparent; color:var(--paper); display:flex; align-items:center; justify-content:center; cursor:pointer;
        }
        @media (max-width:860px){ .navlinks{display:none;} }

        /* HERO */
        .hero{ padding:96px 0 60px; position:relative; }
        .hero .wrap{ display:grid; grid-template-columns:1.1fr 0.9fr; gap:64px; align-items:center; }
        .eyebrow{
          display:inline-flex; align-items:center; gap:8px;
          font-family:'IBM Plex Mono', monospace; font-size:12.5px; letter-spacing:0.06em; text-transform:uppercase;
          color:var(--gold); border:1px solid rgba(232,184,75,0.35); padding:6px 12px; border-radius:999px;
          background:rgba(232,184,75,0.06); margin-bottom:24px;
        }
        .hero h1{ font-size:clamp(38px, 5vw, 58px); line-height:1.06; margin-bottom:22px; }
        .hero h1 em{ font-style:italic; color:var(--green); }
        .hero p.sub{ font-size:18px; line-height:1.6; color:var(--slate); max-width:480px; margin-bottom:34px; }
        .hero-ctas{ display:flex; align-items:center; gap:18px; flex-wrap:wrap; }
        .hero-note{ font-size:13px; color:var(--slate); margin-top:16px; }

        .ledger-card{
          background:var(--paper); color:var(--ink); border-radius:var(--radius);
          box-shadow:var(--shadow); overflow:hidden; transform:rotate(1.2deg); border:1px solid rgba(0,0,0,0.05);
          transition:transform .35s ease;
        }
        .ledger-card:hover{ transform:rotate(0deg); }
        .ledger-head{ display:flex; justify-content:space-between; align-items:center; padding:18px 22px; border-bottom:1px dashed rgba(11,18,32,0.2); }
        .ledger-head .title{ font-family:'IBM Plex Mono', monospace; font-size:12px; letter-spacing:0.08em; text-transform:uppercase; color:#5b6472; }
        .ledger-head .balance{ font-family:'IBM Plex Mono', monospace; font-weight:600; font-size:16px; }
        .ledger-body{ height:280px; overflow:hidden; position:relative; }
        .ledger-body::after{
          content:''; position:absolute; bottom:0; left:0; right:0; height:60px;
          background:linear-gradient(to bottom, transparent, var(--paper));
        }
        .ledger-track{ display:flex; flex-direction:column; }
        .ledger-scroll{ animation:scrollTape 14s linear infinite; }
        @keyframes scrollTape{ from{transform:translateY(0);} to{transform:translateY(-50%);} }
        .ledger-row{
          display:flex; justify-content:space-between; align-items:center;
          padding:13px 22px; border-bottom:1px solid rgba(11,18,32,0.08);
          font-family:'IBM Plex Mono', monospace; font-size:13.5px;
        }
        .ledger-row .desc{ display:flex; align-items:center; gap:10px; color:#2b3241; }
        .ledger-row .desc .tag{ font-size:15px; }
        .ledger-row .amt.neg{ color:#c04b3d; }
        .ledger-row .amt.pos{ color:var(--green-dim); }
        .ledger-foot{ padding:14px 22px; display:flex; justify-content:space-between; font-family:'IBM Plex Mono', monospace; font-size:12px; color:#5b6472; border-top:1px dashed rgba(11,18,32,0.2); }

        @media (max-width:900px){
          .hero .wrap{ grid-template-columns:1fr; gap:44px; }
          .hero p.sub{ max-width:100%; }
        }

        /* SECTION SHELL */
        section{ padding:100px 0; }
        .section-head{ max-width:620px; margin-bottom:56px; }
        .kicker{ font-family:'IBM Plex Mono', monospace; font-size:12.5px; letter-spacing:0.08em; text-transform:uppercase; color:var(--green); margin-bottom:14px; display:block; }
        .section-head h2{ font-size:clamp(28px, 3.4vw, 40px); line-height:1.15; }
        .section-head p{ color:var(--slate); font-size:16.5px; margin-top:16px; line-height:1.6; }

        /* FEATURES */
        .receipt{ background:var(--ink-2); border:1px solid var(--line); border-radius:var(--radius); }
        .feat-row{ display:grid; grid-template-columns:56px 1fr auto; gap:22px; align-items:start; padding:30px 30px; border-bottom:1px solid var(--line); transition:background .2s; }
        .feat-row:last-child{ border-bottom:none; }
        .feat-row:hover{ background:rgba(62,207,142,0.04); }
        .feat-icon{
          width:44px; height:44px; border-radius:10px; background:rgba(62,207,142,0.12);
          display:flex; align-items:center; justify-content:center; font-size:20px;
          border:1px solid rgba(62,207,142,0.25);
        }
        .feat-row h4{ font-size:18px; margin-bottom:6px; font-weight:600; }
        .feat-row p{ color:var(--slate); font-size:15px; line-height:1.55; max-width:520px; }
        .feat-price{ font-family:'IBM Plex Mono', monospace; color:var(--slate); font-size:13px; align-self:center; white-space:nowrap; }

        /* HOW IT WORKS */
        .steps{ display:grid; grid-template-columns:repeat(3,1fr); gap:24px; counter-reset:step; }
        .step{ border:1px solid var(--line); border-radius:var(--radius); padding:30px 26px; background:linear-gradient(160deg, rgba(255,255,255,0.02), transparent); position:relative; }
        .step .num{
          font-family:'IBM Plex Mono', monospace; font-size:13px; color:var(--gold);
          border:1px solid rgba(232,184,75,0.35); width:34px; height:34px; border-radius:50%;
          display:flex; align-items:center; justify-content:center; margin-bottom:22px;
        }
        .step h4{ font-size:19px; margin-bottom:10px; }
        .step p{ color:var(--slate); font-size:15px; line-height:1.6; }
        @media (max-width:860px){ .steps{grid-template-columns:1fr;} }

        /* INTERACTIVE DEMO */
        .demo-panel{ display:grid; grid-template-columns:1fr 1fr; gap:0; border:1px solid var(--line); border-radius:var(--radius); overflow:hidden; }
        .demo-left{ padding:40px; background:var(--ink-2); }
        .demo-left label{ display:block; font-size:12.5px; text-transform:uppercase; letter-spacing:0.06em; color:var(--slate); margin-bottom:8px; font-family:'IBM Plex Mono', monospace;}
        .demo-left input, .demo-left select{
          width:100%; padding:12px 14px; border-radius:9px; border:1px solid var(--line);
          background:rgba(255,255,255,0.03); color:var(--paper); font-family:'Inter'; font-size:15px; margin-bottom:18px;
        }
        .demo-left input:focus, .demo-left select:focus{ border-color:var(--green); }
        .demo-left button{ width:100%; }
        .demo-right{ background:var(--paper); color:var(--ink); padding:40px; display:flex; flex-direction:column; }
        .demo-right .label{ font-family:'IBM Plex Mono', monospace; font-size:12px; text-transform:uppercase; letter-spacing:0.06em; color:#5b6472; }
        .demo-right .total{ font-family:'Fraunces', serif; font-size:44px; font-weight:600; margin:8px 0 22px; transition: color 0.2s; }
        .demo-right .total.over{ color:#c04b3d; }
        .demo-list{ flex:1; overflow-y:auto; max-height:220px; display:flex; flex-direction:column; gap:8px;}
        .demo-item{ display:flex; justify-content:space-between; font-family:'IBM Plex Mono', monospace; font-size:13.5px; padding:9px 0; border-bottom:1px dashed rgba(11,18,32,0.18); }
        .demo-empty{ color:#8a92a2; font-size:14px; font-style:italic; padding-top:12px;}
        @media (max-width:860px){ .demo-panel{grid-template-columns:1fr;} }

        /* STATS */
        .stats{ display:grid; grid-template-columns:repeat(4,1fr); gap:24px; border-top:1px solid var(--line); border-bottom:1px solid var(--line); padding:56px 0; }
        .stat h3{ font-size:clamp(30px,4vw,44px); color:var(--green); }
        .stat p{ color:var(--slate); font-size:13.5px; margin-top:8px; font-family:'IBM Plex Mono', monospace; text-transform:uppercase; letter-spacing:0.04em;}
        @media (max-width:760px){ .stats{grid-template-columns:1fr 1fr;} }

        /* TESTIMONIAL */
        .testimonial{ max-width:760px; margin:0 auto; text-align:center; }
        .testimonial blockquote{ font-family:'Fraunces', serif; font-style:italic; font-size:clamp(22px,3vw,30px); line-height:1.45; margin-bottom:26px; }
        .testimonial cite{ font-style:normal; color:var(--slate); font-size:14.5px; }
        .stars{ color:var(--gold); font-size:18px; margin-bottom:22px; letter-spacing:3px;}

        /* CTA */
        .cta-band{ background:linear-gradient(135deg, var(--green) 0%, #2fae7c 100%); color:#06180F; border-radius:20px; padding:64px 56px; display:flex; align-items:center; justify-content:space-between; gap:32px; flex-wrap:wrap; }
        .cta-band h2{ font-size:clamp(26px,3.4vw,36px); max-width:480px; }
        .cta-band .btn-solid{ background:#06180F; color:var(--paper); }
        .cta-band .btn-solid:hover{ background:#0d2417; }

        /* FOOTER */
        footer{ border-top:1px solid var(--line); padding:56px 0 34px; }
        .foot-grid{ display:flex; justify-content:space-between; gap:40px; flex-wrap:wrap; margin-bottom:40px;}
        .foot-brand p{ color:var(--slate); font-size:14px; max-width:280px; margin-top:12px; line-height:1.6;}
        .foot-cols{ display:flex; gap:64px; flex-wrap:wrap; }
        .foot-col h5{ font-family:'IBM Plex Mono', monospace; font-size:12px; text-transform:uppercase; letter-spacing:0.06em; color:var(--slate); margin-bottom:16px;}
        .foot-col a{ display:block; font-size:14.5px; color:var(--paper); opacity:0.85; margin-bottom:11px;}
        .foot-col a:hover{ opacity:1; color:var(--green);}
        .foot-bottom{ display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--line); padding-top:24px; font-size:13px; color:var(--slate); flex-wrap:wrap; gap:12px;}

        /* reveal on scroll */
        .reveal{ opacity:0; transform:translateY(24px); transition:opacity .7s ease, transform .7s ease; }
        .reveal.in{ opacity:1; transform:translateY(0); }
      ` }} />

      {/* NAVIGATION */}
      <nav>
        <div className="wrap">
          <div className="brand"><span className="dot"></span>Vellum</div>
          <div className="navlinks">
            <a href="#features">Features</a>
            <a href="#how">How it works</a>
            <a href="#demo">Try it</a>
            <a href="#reviews">Reviews</a>
          </div>
          <div className="navcta">
            <button 
              className="theme-toggle" 
              onClick={() => setIsDark(!isDark)} 
              aria-label="Toggle theme"
            >
              {isDark ? '☀' : '☾'}
            </button>
            <a href="/login" className="btn btn-ghost">Log in</a>
            <a href="/signup" className="btn btn-solid">Get started</a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="wrap">
          <div>
            <span className="eyebrow">● Every transaction, reconciled</span>
            <h1>Money has a story.<br />We keep <em>the receipts.</em></h1>
            <p className="sub">Vellum turns scattered spending into a single running ledger — categorized automatically, balanced in real time, understood at a glance.</p>
            <div className="hero-ctas">
              <a href="#demo" className="btn btn-solid">Start your ledger — free</a>
              <a href="#how" className="btn btn-ghost">See how it works</a>
            </div>
            <p className="hero-note">No card required · Balances your first month in under 2 minutes</p>
          </div>

          <div className="ledger-card">
            <div className="ledger-head">
              <span className="title">Live ledger</span>
              <span className="balance">$2,481.06</span>
            </div>
            <div className="ledger-body">
              <div className="ledger-track ledger-scroll">
                {doubledHeroTxns.map((t, idx) => {
                  const cls = t.amt < 0 ? 'neg' : 'pos';
                  const sign = t.amt < 0 ? '-' : '+';
                  return (
                    <div className="ledger-row" key={idx}>
                      <span className="desc">
                        <span className="tag">{t.icon}</span>
                        {t.desc}
                      </span>
                      <span className={`amt ${cls}`}>
                        {sign}${Math.abs(t.amt).toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="ledger-foot">
              <span>7 accounts synced</span>
              <span>Updated just now</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features">
        <div className="wrap">
          <div className="section-head reveal" ref={addToRefs}>
            <span className="kicker">Why Vellum</span>
            <h2>Built for the way money actually moves.</h2>
            <p>Not another chart-heavy dashboard. Vellum reads like a ledger because that's what it is — every line accounted for, nothing buried in a report you'll never open.</p>
          </div>

          <div className="receipt reveal" ref={addToRefs}>
            <div className="feat-row">
              <div className="feat-icon">◈</div>
              <div>
                <h4>Auto-categorized spending</h4>
                <p>Transactions sort themselves the moment they land — groceries, rent, subscriptions — no manual tagging.</p>
              </div>
              <div className="feat-price">included</div>
            </div>
            <div className="feat-row">
              <div className="feat-icon">◎</div>
              <div>
                <h4>Real-time balance</h4>
                <p>Your running total updates the second a transaction posts, across every linked account.</p>
              </div>
              <div className="feat-price">included</div>
            </div>
            <div className="feat-row">
              <div className="feat-icon">◐</div>
              <div>
                <h4>Bank-level encryption</h4>
                <p>256-bit encryption and read-only bank connections. Vellum can see your data; it can't move your money.</p>
              </div>
              <div className="feat-price">included</div>
            </div>
            <div className="feat-row">
              <div className="feat-icon">◒</div>
              <div>
                <h4>Budgets that flex</h4>
                <p>Set a monthly envelope per category and get a nudge — not a lecture — when you're close to the edge.</p>
              </div>
              <div className="feat-price">included</div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how">
        <div className="wrap">
          <div className="section-head reveal" ref={addToRefs}>
            <span className="kicker">Getting started</span>
            <h2>Three steps to a balanced ledger.</h2>
          </div>
          <div className="steps reveal" ref={addToRefs}>
            <div className="step">
              <div className="num">1</div>
              <h4>Link an account</h4>
              <p>Connect a bank, card, or wallet in under a minute. Vellum imports your last 90 days to seed your ledger.</p>
            </div>
            <div className="step">
              <div className="num">2</div>
              <h4>Set your categories</h4>
              <p>Start from Vellum's defaults or build your own. Every future transaction files itself automatically.</p>
            </div>
            <div className="step">
              <div className="num">3</div>
              <h4>Watch it balance</h4>
              <p>Your ledger updates live. Check in daily or monthly — the math is always already done.</p>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE DEMO SECTION */}
      <section id="demo">
        <div className="wrap">
          <div className="section-head reveal" ref={addToRefs}>
            <span className="kicker">Try it now</span>
            <h2>Add a transaction. Watch the ledger balance.</h2>
            <p>This is a live preview of Vellum's core view — no account needed.</p>
          </div>

          <div className="demo-panel reveal" ref={addToRefs}>
            <div className="demo-left">
              <label htmlFor="tName">Description</label>
              <input 
                type="text" 
                id="tName" 
                placeholder="e.g. Coffee, Rent, Freelance payment"
                value={tName}
                onChange={(e) => setTName(e.target.value)}
                style={{ borderColor: nameError ? '#c04b3d' : 'var(--line)' }}
              />

              <label htmlFor="tAmt">Amount</label>
              <input 
                type="number" 
                id="tAmt" 
                placeholder="0.00" 
                step="0.01"
                value={tAmt}
                onChange={(e) => setTAmt(e.target.value)}
                style={{ borderColor: amtError ? '#c04b3d' : 'var(--line)' }}
              />

              <label htmlFor="tType">Type</label>
              <select 
                id="tType"
                value={tType}
                onChange={(e) => setTType(e.target.value)}
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>

              <button className="btn btn-solid" onClick={handleAddTxn}>Add to ledger</button>
            </div>
            
            <div className="demo-right">
              <span className="label">Running balance</span>
              <div className={`total ${balance < 0 ? 'over' : ''}`}>
                {balance < 0 ? '-$' : '$'}{Math.abs(balance).toFixed(2)}
              </div>
              <div className="demo-list">
                {txnsList.length === 0 ? (
                  <p className="demo-empty">Starting balance — add a transaction above to see it move.</p>
                ) : (
                  txnsList.map((item, index) => (
                    <div className="demo-item" key={index}>
                      <span>{item.name}</span>
                      <span>{item.signedAmt < 0 ? '-' : '+'}${item.amt.toFixed(2)}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section>
        <div className="wrap">
          <div className="stats reveal" ref={addToRefs}>
            <div className="stat"><h3>412K</h3><p>Ledgers balanced</p></div>
            <div className="stat"><h3>$0</h3><p>Hidden fees</p></div>
            <div className="stat"><h3>2 min</h3><p>Avg. setup time</p></div>
            <div className="stat"><h3>4.8/5</h3><p>Average rating</p></div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL SECTION */}
      <section id="reviews">
        <div className="wrap testimonial reveal" ref={addToRefs}>
          <div className="stars">★★★★★</div>
          <blockquote>"I stopped dreading my bank app. Vellum reads like something I'd actually keep — a ledger, not a dashboard trying to sell me something."</blockquote>
          <cite>— Amara O., freelance designer</cite>
        </div>
      </section>

      {/* CTA SECTION */}
      <section>
        <div className="wrap">
          <div className="cta-band reveal" ref={addToRefs}>
            <h2>Your first ledger entry is free. So are the next thousand.</h2>
            <a href="#demo" className="btn btn-solid">Start your ledger</a>
          </div>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer>
        <div className="wrap">
          <div className="foot-grid">
            <div className="foot-brand">
              <div className="brand"><span className="dot"></span>Vellum</div>
              <p>A ledger for real life. Track spending, balance in real time, and never open a spreadsheet again.</p>
            </div>
            <div className="foot-cols">
              <div className="foot-col">
                <h5>Product</h5>
                <a href="#features">Features</a>
                <a href="#how">How it works</a>
                <a href="#demo">Try it</a>
              </div>
              <div className="foot-col">
                <h5>Company</h5>
                <a href="#">About</a>
                <a href="#">Privacy</a>
                <a href="#">Contact</a>
              </div>
            </div>
          </div>
          <div className="foot-bottom">
            <span>© 2026 Vellum. All rights reserved.</span>
            <span className="mono">Balanced to the cent.</span>
          </div>
        </div>
      </footer>
    </>
  );
}

