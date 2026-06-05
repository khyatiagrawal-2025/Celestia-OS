import { useEffect, useRef } from "react";

/* ─── GLOBAL STYLES ─────────────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&family=Share+Tech+Mono&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;overflow-x:hidden}
body{
  background:#00000d;
  color:#e8f4f8;
  font-family:'Rajdhani',sans-serif;
  overflow-x:hidden;
  cursor:none;
}
:root{
  --c0:#00000d;--c1:#000820;
  --cyan:#00f5ff;--cyan2:#00b4d8;--cyan3:#0077b6;
  --teal:#00e5b0;--white:#e8f4f8;
  --muted:rgba(180,210,230,0.6);
  --glass:rgba(0,245,255,0.04);--gb:rgba(0,245,255,0.12);
  --ff-display:'Orbitron',monospace;
  --ff-body:'Rajdhani',sans-serif;
  --ff-mono:'Share Tech Mono',monospace;
}
::-webkit-scrollbar{width:4px}
::-webkit-scrollbar-track{background:#000}
::-webkit-scrollbar-thumb{background:var(--cyan3);border-radius:2px}

#cur-dot,#cur-ring{position:fixed;pointer-events:none;z-index:9999;border-radius:50%;transform:translate(-50%,-50%)}
#cur-dot{width:5px;height:5px;background:var(--cyan);box-shadow:0 0 10px var(--cyan),0 0 20px var(--cyan)}
#cur-ring{width:36px;height:36px;border:1px solid rgba(0,245,255,0.45);transition:width .2s,height .2s,border-color .2s}

#starfield{position:fixed;inset:0;z-index:0;pointer-events:none}
#nebula-canvas{position:fixed;inset:0;z-index:1;pointer-events:none;opacity:.7}

nav{
  position:fixed;top:0;left:0;right:0;z-index:200;
  display:flex;align-items:center;justify-content:space-between;
  padding:1.1rem 3.5rem;
  background:linear-gradient(180deg,rgba(0,0,13,.92) 0%,transparent 100%);
  backdrop-filter:blur(18px);
  border-bottom:1px solid rgba(0,245,255,0.07);
}
.nav-brand{
  font-family:var(--ff-display);font-size:.78rem;font-weight:800;
  letter-spacing:.4em;color:var(--cyan);
  text-shadow:0 0 25px rgba(0,245,255,.7);
  display:flex;align-items:center;gap:.7rem;
}
.nav-pip{width:8px;height:8px;border-radius:50%;background:var(--cyan);box-shadow:0 0 12px var(--cyan);animation:pip 2s ease-in-out infinite}
@keyframes pip{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.6)}}
.nav-links{display:flex;gap:2.2rem;list-style:none}
.nav-links a{font-family:var(--ff-mono);font-size:.65rem;letter-spacing:.18em;color:var(--muted);text-decoration:none;text-transform:uppercase;transition:color .3s,text-shadow .3s}
.nav-links a:hover{color:var(--cyan);text-shadow:0 0 14px rgba(0,245,255,.6)}
.nav-badge{font-family:var(--ff-mono);font-size:.62rem;letter-spacing:.12em;color:rgba(0,229,180,.7);display:flex;align-items:center;gap:.45rem}
.badge-dot{width:6px;height:6px;border-radius:50%;background:#00ff9d;box-shadow:0 0 8px #00ff9d;animation:pip 1.4s step-end infinite}

#hero{
  position:relative;z-index:10;min-height:100vh;
  display:flex;align-items:center;justify-content:space-between;
  padding:0 6rem 0 5rem;overflow:hidden;
}
.hero-left{flex:1;max-width:580px;position:relative;z-index:2}
.hero-eyebrow{
  font-family:var(--ff-mono);font-size:.68rem;letter-spacing:.42em;
  color:var(--teal);text-transform:uppercase;
  display:flex;align-items:center;gap:1rem;margin-bottom:1.6rem;
  opacity:0;animation:fup .8s .2s forwards;
}
.eyebrow-line{height:1px;width:38px;background:linear-gradient(90deg,var(--teal),transparent)}
.hero-h1{
  font-family:var(--ff-display);
  font-size:clamp(3rem,7vw,6.8rem);font-weight:900;letter-spacing:.06em;line-height:.88;
  margin-bottom:.18em;opacity:0;animation:fup 1s .45s forwards;
}
.h1-line1{
  display:block;
  background:linear-gradient(135deg,#fff 0%,#b0e0f0 35%,var(--cyan) 65%,var(--cyan3) 100%);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  filter:drop-shadow(0 0 50px rgba(0,245,255,.35));
}
.h1-line2{
  display:block;font-size:.36em;letter-spacing:.6em;
  background:linear-gradient(90deg,var(--teal),var(--cyan));
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  filter:drop-shadow(0 0 18px rgba(0,229,255,.6));margin-top:.4em;
}
.hero-sub{
  font-size:clamp(1rem,1.8vw,1.2rem);font-weight:300;
  color:var(--cyan2);letter-spacing:.14em;text-transform:uppercase;
  margin:1.8rem 0 .9rem;opacity:0;animation:fup .8s .75s forwards;
}
.hero-desc{
  font-size:clamp(.9rem,1.4vw,1.05rem);font-weight:400;color:var(--muted);
  line-height:1.85;max-width:480px;margin-bottom:2.8rem;
  opacity:0;animation:fup .8s .95s forwards;
}
.hero-ctas{display:flex;gap:1.1rem;flex-wrap:wrap;opacity:0;animation:fup .8s 1.15s forwards}

.btn-p{
  font-family:var(--ff-display);font-size:.72rem;font-weight:700;
  letter-spacing:.22em;text-transform:uppercase;color:#000;
  background:linear-gradient(135deg,var(--cyan),var(--teal));
  border:none;padding:.95rem 2.4rem;border-radius:2px;cursor:none;
  position:relative;overflow:hidden;transition:transform .3s,box-shadow .3s;
  box-shadow:0 0 35px rgba(0,245,255,.3),inset 0 1px 0 rgba(255,255,255,.25);
}
.btn-p:hover{transform:translateY(-3px) scale(1.03);box-shadow:0 0 70px rgba(0,245,255,.5),0 12px 35px rgba(0,245,255,.25)}
.btn-s{
  font-family:var(--ff-display);font-size:.72rem;font-weight:600;
  letter-spacing:.22em;text-transform:uppercase;color:var(--cyan);
  background:transparent;border:1px solid rgba(0,245,255,.3);
  padding:.95rem 2.4rem;border-radius:2px;cursor:none;transition:all .3s;
}
.btn-s:hover{border-color:var(--cyan);box-shadow:0 0 40px rgba(0,245,255,.18),inset 0 0 25px rgba(0,245,255,.06);transform:translateY(-3px)}

.hero-right{
  flex:0 0 520px;height:520px;position:relative;
  opacity:0;animation:fup 1.2s .6s forwards;
}
#planet-canvas{position:absolute;inset:0;border-radius:50%;filter:drop-shadow(0 0 60px rgba(0,245,255,.25)) drop-shadow(0 0 120px rgba(0,100,180,.3))}
.planet-ring{position:absolute;inset:-15%;border-radius:50%;border:1px solid rgba(0,245,255,.08);animation:ring-spin 18s linear infinite}
.planet-ring:nth-child(2){inset:-25%;border-color:rgba(0,245,255,.05);animation-duration:28s;animation-direction:reverse}
.planet-ring:nth-child(3){inset:-40%;border-color:rgba(0,245,255,.035);animation-duration:42s}
@keyframes ring-spin{from{transform:rotate(0) rotateX(72deg)}to{transform:rotate(360deg) rotateX(72deg)}}
.orbit-dot{
  position:absolute;top:50%;left:50%;width:8px;height:8px;margin:-4px;
  border-radius:50%;background:var(--cyan);
  box-shadow:0 0 14px var(--cyan),0 0 28px rgba(0,245,255,.4);
  animation:orbit-move 8s linear infinite;transform-origin:-200px 0;
}
.orbit-dot:nth-child(2){animation-duration:13s;animation-delay:-5s;transform-origin:-280px 0;background:var(--teal);box-shadow:0 0 14px var(--teal)}
@keyframes orbit-move{from{transform:rotate(0)}to{transform:rotate(360deg)}}
.hud-line{position:absolute;font-family:var(--ff-mono);font-size:.6rem;letter-spacing:.1em;color:rgba(0,245,255,.45);animation:hud-pulse 3s ease-in-out infinite}
@keyframes hud-pulse{0%,100%{opacity:.45}50%{opacity:.2}}
.hud-tl{top:12%;left:2%;text-align:left}.hud-tr{top:18%;right:0%;text-align:right}
.hud-bl{bottom:22%;left:2%}.hud-br{bottom:15%;right:0%}
.hud-bracket{position:absolute;width:22px;height:22px;border-color:rgba(0,245,255,.3);border-style:solid}
.hud-tl-b{top:8%;left:8%;border-width:1px 0 0 1px}.hud-tr-b{top:8%;right:8%;border-width:1px 1px 0 0}
.hud-bl-b{bottom:8%;left:8%;border-width:0 0 1px 1px}.hud-br-b{bottom:8%;right:8%;border-width:0 1px 1px 0}
.hero-grid{
  position:absolute;inset:0;z-index:0;pointer-events:none;
  background-image:linear-gradient(rgba(0,245,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,245,255,.025) 1px,transparent 1px);
  background-size:55px 55px;
  mask-image:radial-gradient(ellipse at 30% 50%,black 20%,transparent 75%);
}
.scanbar{position:absolute;bottom:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,var(--cyan),transparent);opacity:.35;animation:scanbar 5s ease-in-out infinite}
@keyframes scanbar{0%,100%{transform:scaleX(0);opacity:0}40%,60%{transform:scaleX(1);opacity:.35}}
@keyframes fup{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}

.stats-strip{
  position:relative;z-index:10;display:flex;justify-content:center;
  border-top:1px solid rgba(0,245,255,.07);border-bottom:1px solid rgba(0,245,255,.07);
  background:rgba(0,245,255,.015);backdrop-filter:blur(10px);
}
.stat{flex:1;max-width:200px;text-align:center;padding:1.8rem 1rem;position:relative}
.stat+.stat::before{content:'';position:absolute;left:0;top:15%;bottom:15%;width:1px;background:linear-gradient(180deg,transparent,rgba(0,245,255,.18),transparent)}
.stat-n{font-family:var(--ff-display);font-size:1.9rem;font-weight:700;color:var(--cyan);text-shadow:0 0 20px rgba(0,245,255,.4);display:block}
.stat-l{font-family:var(--ff-mono);font-size:.58rem;letter-spacing:.22em;color:var(--muted);text-transform:uppercase;margin-top:.2rem;display:block}

section{position:relative;z-index:10;padding:7rem 5rem}
.sec-inner{max-width:1240px;margin:0 auto}
.sec-head{text-align:center;margin-bottom:5rem}
.sec-tag{font-family:var(--ff-mono);font-size:.62rem;letter-spacing:.4em;color:var(--teal);text-transform:uppercase;display:block;margin-bottom:1rem}
.sec-title{font-family:var(--ff-display);font-size:clamp(1.5rem,3.5vw,2.6rem);font-weight:700;letter-spacing:.07em;color:var(--white);text-shadow:0 0 30px rgba(0,245,255,.18)}
.sec-line{width:55px;height:1px;margin:1.2rem auto 0;background:linear-gradient(90deg,transparent,var(--cyan),transparent)}
.sec-sub{font-size:1rem;font-weight:400;color:var(--muted);max-width:520px;margin:.8rem auto 0;line-height:1.7}

.feat-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(270px,1fr));gap:1.4rem}
.feat-card{
  background:linear-gradient(145deg,rgba(255,255,255,.04),rgba(0,245,255,.015));
  border:1px solid rgba(0,245,255,.1);border-radius:14px;padding:2.4rem 2rem;
  position:relative;overflow:hidden;transition:transform .4s,box-shadow .4s,border-color .4s;cursor:none;
}
.feat-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,var(--cyan),transparent);opacity:0;transition:opacity .4s}
.feat-card::after{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%,rgba(0,245,255,.07),transparent 65%);opacity:0;transition:opacity .4s}
.feat-card:hover{transform:translateY(-8px) scale(1.01);border-color:rgba(0,245,255,.28);box-shadow:0 25px 70px rgba(0,0,0,.6),0 0 50px rgba(0,245,255,.07)}
.feat-card:hover::before{opacity:1}.feat-card:hover::after{opacity:1}
.feat-card-glow{position:absolute;top:-40px;right:-40px;width:120px;height:120px;border-radius:50%;background:radial-gradient(circle,rgba(0,245,255,.06),transparent);pointer-events:none}
.feat-num{font-family:var(--ff-mono);font-size:.58rem;letter-spacing:.2em;color:rgba(0,245,255,.3);margin-bottom:1.4rem;display:block}
.feat-icon-wrap{width:52px;height:52px;border-radius:10px;background:rgba(0,245,255,.07);border:1px solid rgba(0,245,255,.12);display:flex;align-items:center;justify-content:center;margin-bottom:1.3rem;font-size:1.5rem;transition:box-shadow .3s}
.feat-card:hover .feat-icon-wrap{box-shadow:0 0 25px rgba(0,245,255,.2)}
.feat-name{font-family:var(--ff-display);font-size:.78rem;font-weight:600;letter-spacing:.1em;color:var(--white);text-transform:uppercase;margin-bottom:.7rem}
.feat-desc{font-size:.95rem;font-weight:400;color:var(--muted);line-height:1.75}
.feat-tag{margin-top:1.6rem;font-family:var(--ff-mono);font-size:.58rem;letter-spacing:.15em;color:var(--teal);opacity:.65}

.mission-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.2rem;margin-top:2rem}
.mission-card{
  background:rgba(0,245,255,.03);border:1px solid rgba(0,245,255,.09);border-radius:12px;
  padding:2rem 1.8rem;position:relative;overflow:hidden;transition:all .35s;cursor:none;text-align:center;
}
.mission-card:hover{border-color:rgba(0,245,255,.22);transform:translateY(-5px);box-shadow:0 20px 50px rgba(0,0,0,.5),0 0 35px rgba(0,245,255,.06)}
.mission-icon{font-size:2.4rem;margin-bottom:1rem;display:block;filter:drop-shadow(0 0 12px rgba(0,245,255,.35))}
.mission-name{font-family:var(--ff-display);font-size:.72rem;font-weight:600;letter-spacing:.1em;color:var(--white);text-transform:uppercase;margin-bottom:.5rem}
.mission-info{font-size:.85rem;color:var(--muted);line-height:1.6}
.mission-badge{display:inline-block;margin-top:.9rem;font-family:var(--ff-mono);font-size:.55rem;letter-spacing:.12em;color:var(--teal);background:rgba(0,229,180,.07);border:1px solid rgba(0,229,180,.15);padding:.22rem .7rem;border-radius:2px;text-transform:uppercase}

.timeline{position:relative;max-width:760px;margin:0 auto}
.timeline::before{content:'';position:absolute;left:50%;top:0;bottom:0;width:1px;background:linear-gradient(180deg,transparent,rgba(0,245,255,.25) 15%,rgba(0,245,255,.25) 85%,transparent);transform:translateX(-50%)}
.tl-item{display:flex;gap:3rem;margin-bottom:3.5rem;opacity:0;transform:translateX(-30px);transition:opacity .7s,transform .7s}
.tl-item.right{flex-direction:row-reverse;transform:translateX(30px)}
.tl-item.visible{opacity:1;transform:translateX(0)}
.tl-side{flex:1;text-align:right}.tl-item.right .tl-side{text-align:left}
.tl-dot{flex:0 0 auto;width:14px;height:14px;border-radius:50%;background:var(--cyan);box-shadow:0 0 18px var(--cyan),0 0 35px rgba(0,245,255,.3);margin-top:.3rem;align-self:flex-start;position:relative;z-index:1}
.tl-year{font-family:var(--ff-mono);font-size:.62rem;letter-spacing:.18em;color:var(--teal);text-transform:uppercase;margin-bottom:.4rem;display:block}
.tl-name{font-family:var(--ff-display);font-size:.9rem;font-weight:600;letter-spacing:.08em;color:var(--white);margin-bottom:.4rem}
.tl-desc{font-size:.88rem;font-weight:400;color:var(--muted);line-height:1.65}

.creator-wrap{display:flex;gap:3.5rem;align-items:center;max-width:1000px;margin:0 auto}
.creator-visual{flex:0 0 380px;height:380px;position:relative}
.creator-ring-outer{position:absolute;inset:0;border-radius:50%;border:1px solid rgba(0,245,255,.08);animation:ring-spin 20s linear infinite}
.creator-ring-mid{position:absolute;inset:12%;border-radius:50%;border:1px solid rgba(0,229,180,.06);animation:ring-spin 14s linear infinite reverse}
.creator-avatar{position:absolute;inset:25%;border-radius:50%;background:linear-gradient(135deg,rgba(0,245,255,.15),rgba(0,100,200,.25));border:1px solid rgba(0,245,255,.2);display:flex;align-items:center;justify-content:center;font-family:var(--ff-display);font-size:2.2rem;font-weight:900;color:var(--cyan);text-shadow:0 0 25px rgba(0,245,255,.7);box-shadow:0 0 40px rgba(0,245,255,.12),inset 0 0 30px rgba(0,245,255,.06),0 0 80px rgba(0,50,150,.2)}
.creator-orb{position:absolute;width:10px;height:10px;border-radius:50%;background:var(--teal);box-shadow:0 0 14px var(--teal);animation:orbit-move 7s linear infinite;transform-origin:-150px 0;top:50%;left:50%;margin:-5px}
.creator-orb:nth-child(2){background:var(--cyan);box-shadow:0 0 14px var(--cyan);animation-duration:11s;animation-delay:-3s;transform-origin:-155px 0}

.creator-card{
  flex:1;background:linear-gradient(145deg,rgba(255,255,255,.05),rgba(0,245,255,.02),rgba(0,0,20,.4));
  border:1px solid rgba(0,245,255,.14);border-radius:20px;padding:3rem;
  position:relative;overflow:hidden;backdrop-filter:blur(24px);
  box-shadow:0 0 0 1px rgba(0,245,255,.05),0 40px 80px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.07);
}
.creator-card::before{content:'';position:absolute;top:0;left:50%;transform:translateX(-50%);width:180px;height:1px;background:linear-gradient(90deg,transparent,var(--cyan),transparent)}
.creator-card::after{content:'';position:absolute;top:-80px;right:-80px;width:220px;height:220px;border-radius:50%;background:radial-gradient(circle,rgba(0,245,255,.05),transparent 70%);pointer-events:none}
.c-label{font-family:var(--ff-mono);font-size:.58rem;letter-spacing:.38em;color:var(--teal);text-transform:uppercase;margin-bottom:1.5rem;display:block;opacity:.8}
.c-name{font-family:var(--ff-display);font-size:1.7rem;font-weight:700;letter-spacing:.07em;color:var(--white);text-shadow:0 0 22px rgba(0,245,255,.2);margin-bottom:1.2rem}
.c-roles{display:flex;flex-wrap:wrap;gap:.5rem;margin-bottom:1.8rem}
.c-chip{font-family:var(--ff-mono);font-size:.58rem;letter-spacing:.12em;color:var(--teal);background:rgba(0,245,255,.06);border:1px solid rgba(0,245,255,.14);padding:.3rem .9rem;border-radius:2px;text-transform:uppercase}
.c-bio{font-size:.98rem;font-weight:400;color:var(--muted);line-height:1.8;margin-bottom:2rem}
.c-socials{display:flex;gap:.85rem}
.c-soc{width:44px;height:44px;border-radius:10px;border:1px solid rgba(0,245,255,.18);background:rgba(0,245,255,.04);display:flex;align-items:center;justify-content:center;color:var(--muted);text-decoration:none;transition:all .3s;cursor:none}
.c-soc:hover{border-color:rgba(0,245,255,.4);color:var(--cyan);background:rgba(0,245,255,.09);box-shadow:0 0 22px rgba(0,245,255,.15);transform:translateY(-3px)}

.term-wrap{max-width:720px;margin:0 auto}
.term{background:rgba(0,4,14,.92);border:1px solid rgba(0,245,255,.14);border-radius:14px;overflow:hidden;box-shadow:0 40px 90px rgba(0,0,0,.65),0 0 50px rgba(0,245,255,.05)}
.term-bar{display:flex;align-items:center;gap:.5rem;padding:.8rem 1.3rem;background:rgba(0,245,255,.035);border-bottom:1px solid rgba(0,245,255,.07)}
.tb{width:10px;height:10px;border-radius:50%}.tb.r{background:#ff5f57}.tb.y{background:#febc2e}.tb.g{background:#28c840}
.term-title{flex:1;text-align:center;font-family:var(--ff-mono);font-size:.58rem;letter-spacing:.16em;color:rgba(0,245,255,.35)}
.term-body{padding:1.8rem 2rem;font-family:var(--ff-mono);font-size:.78rem;line-height:2.1;color:rgba(0,245,255,.65)}
.t-row{display:flex;gap:.7rem}
.t-p{color:rgba(0,255,145,.55)}.t-c{color:#c8e6f0}.t-o{color:rgba(0,245,255,.45);padding-left:1.3rem}
.t-cur{display:inline-block;width:7px;height:.9em;background:var(--cyan);vertical-align:text-bottom;animation:pip 1s step-end infinite;margin-left:2px}

.cta-section{position:relative;z-index:10;text-align:center;padding:6rem 2rem;overflow:hidden}
.cta-glow{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:600px;height:300px;border-radius:50%;background:radial-gradient(ellipse,rgba(0,245,255,.07) 0%,transparent 70%);pointer-events:none}
.cta-ring-dec{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:500px;height:500px;border-radius:50%;border:1px solid rgba(0,245,255,.04);pointer-events:none;animation:ring-spin 35s linear infinite}
.cta-h{font-family:var(--ff-display);font-size:clamp(2rem,5vw,3.8rem);font-weight:800;letter-spacing:.06em;background:linear-gradient(135deg,#fff,var(--cyan),var(--teal));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;filter:drop-shadow(0 0 40px rgba(0,245,255,.3));margin-bottom:1.2rem}
.cta-p{font-size:1.05rem;font-weight:400;color:var(--muted);max-width:480px;margin:0 auto 2.5rem;line-height:1.8}

footer{position:relative;z-index:10;border-top:1px solid rgba(0,245,255,.07);padding:3.5rem 2rem 2rem}
.foot-inner{max-width:1200px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:1.5rem}
.foot-brand{font-family:var(--ff-display);font-size:1rem;font-weight:700;letter-spacing:.45em;color:var(--cyan);text-shadow:0 0 22px rgba(0,245,255,.5)}
.foot-links{display:flex;gap:2rem;list-style:none}
.foot-links a{font-family:var(--ff-mono);font-size:.6rem;letter-spacing:.15em;color:rgba(0,245,255,.3);text-decoration:none;text-transform:uppercase;transition:color .3s}
.foot-links a:hover{color:var(--cyan)}
.foot-copy{font-family:var(--ff-mono);font-size:.58rem;letter-spacing:.15em;color:rgba(0,245,255,.18);text-transform:uppercase;text-align:center}
.foot-div{display:inline-block;width:1px;height:10px;background:rgba(0,245,255,.2);vertical-align:middle;margin:0 .9rem}

.reveal{opacity:0;transform:translateY(32px);transition:opacity .85s,transform .85s}
.reveal.visible{opacity:1;transform:translateY(0)}

@media(max-width:1024px){
  #hero{padding:0 3rem;gap:2rem}
  .hero-right{flex:0 0 420px;height:420px}
  section{padding:5rem 3rem}
  .creator-wrap{flex-direction:column;text-align:center}
  .creator-visual{flex:0 0 300px;height:300px;margin:0 auto}
  .c-roles{justify-content:center}.c-socials{justify-content:center}
  .mission-grid{grid-template-columns:repeat(2,1fr)}
}
@media(max-width:768px){
  nav{padding:1rem 1.5rem}.nav-links{display:none}
  #hero{flex-direction:column;padding:8rem 1.8rem 3rem;text-align:center;align-items:center}
  .hero-left{max-width:100%}.hero-desc{max-width:100%}
  .hero-ctas{justify-content:center}
  .hero-right{flex:0 0 300px;height:300px}
  .hero-eyebrow{justify-content:center}
  section{padding:4rem 1.8rem}
  .feat-grid{grid-template-columns:1fr}
  .mission-grid{grid-template-columns:1fr}
  .stats-strip{flex-wrap:wrap}.stat+.stat::before{display:none}
  .timeline::before{left:16px}
  .tl-item,.tl-item.right{flex-direction:row;justify-content:flex-start}
  .tl-side,.tl-item.right .tl-side{text-align:left}
  .hud-tl,.hud-tr,.hud-bl,.hud-br{display:none}
}
`;

const FEATURES = [
  { num: "01", icon: "🌍", name: "Planet Explorer", desc: "Navigate a living 3D solar system. Touch planets, zoom through asteroid belts, and unlock rich scientific data pulled from real space databases.", tag: "// solar_system.exe" },
  { num: "02", icon: "🤖", name: "AI Space Guide", desc: "Powered by advanced language models trained on NASA archives. Ask anything about the cosmos — from black hole physics to Mars colonization timelines.", tag: "// ai_oracle.init()" },
  { num: "03", icon: "🛰", name: "Mission Archive", desc: "Every significant space mission catalogued — Apollo 11 through Artemis, Voyager through James Webb. Relive humanity's greatest journey.", tag: "// missions.load(all)" },
  { num: "04", icon: "🌌", name: "Deep Space Atlas", desc: "Black holes, nebulae, exoplanets, pulsars. A cinematic encyclopedia of the cosmos rendered with real astronomical data and stunning visuals.", tag: "// deep_space.connect()" },
  { num: "05", icon: "📡", name: "Live Space Feed", desc: "Real-time integration with NASA APOD, ISS position tracking, solar weather alerts, and upcoming launch schedules from agencies worldwide.", tag: "// telemetry.stream()" },
  { num: "06", icon: "🎮", name: "Explorer Mode", desc: "Gamified learning with mission challenges, cosmic achievements, and a guided path from Earth's orbit to the edge of the observable universe.", tag: "// explorer.start()" },
];

const MISSIONS = [
  { icon: "🌕", name: "Apollo 11", info: "First humans on the Moon, July 20, 1969", badge: "Historic" },
  { icon: "🔭", name: "James Webb", info: "Deepest infrared images of the universe, 2022", badge: "Active" },
  { icon: "🔴", name: "Perseverance", info: "Mars rover searching for signs of ancient life", badge: "Active" },
  { icon: "🚀", name: "Artemis Program", info: "Returning humans to the Moon by 2026", badge: "Upcoming" },
  { icon: "⭐", name: "Voyager 1", info: "Farthest human-made object in interstellar space", badge: "Ongoing" },
  { icon: "🪐", name: "Cassini-Huygens", info: "13 years orbiting Saturn, revealed its mysteries", badge: "Complete" },
];

const TL = [
  { year: "Phase 01", name: "System Boot", desc: "Cinematic OS-style boot sequence with real-time status indicators and deep space ambience.", right: false },
  { year: "Phase 02", name: "Solar System", desc: "Interactive 3D solar system with accurate orbital mechanics, planet textures, and atmospheric data.", right: true },
  { year: "Phase 03", name: "Planet Deep Dives", desc: "Detailed exploration panels for each planet — geology, atmosphere, moons, missions, and future potential.", right: false },
  { year: "Phase 04", name: "AI Integration", desc: "Conversational AI assistant trained on space science. Ask complex questions, get immersive narrative answers.", right: true },
  { year: "Phase 05", name: "Deep Space", desc: "Beyond the solar system — black holes, nebulae, exoplanets and the grand scale of the observable universe.", right: false },
];

const TERM_LINES = [
  { t: "cmd", p: "celestia@os:~$", c: "initialize --system celestia-v2 --mode=exploration" },
  { t: "out", c: "[ OK ] Connecting to Deep Space Network... done." },
  { t: "out", c: "[ OK ] Loading planetary database v4.2.1 (8 planets, 214 moons)..." },
  { t: "out", c: "[ OK ] Calibrating AI oracle — model: cosmos-llm-7b..." },
  { t: "out", c: "[ OK ] Syncing mission archive — 200+ missions catalogued..." },
  { t: "out", c: "[ OK ] Initializing 3D render engine... WebGL 2.0 ready." },
  { t: "out", c: "[ OK ] Fetching NASA APOD feed... connected." },
  { t: "cmd", p: "celestia@os:~$", c: "launch --destination=universe --explorer-mode=on" },
  { t: "out", c: "[ ONLINE ] Celestia OS v2.0 is live. The cosmos awaits." },
];

/* 3D Planet via Three.js CDN */
function Planet3D({ canvasRef }) {
  useEffect(() => {
    let mounted = true;
    let animId;

    const load = () => new Promise((res) => {
      if (window.THREE) return res(window.THREE);
      const s = document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
      s.onload = () => res(window.THREE);
      document.head.appendChild(s);
    });

    load().then((THREE) => {
      if (!mounted || !canvasRef.current) return;
      const canvas = canvasRef.current;
      const W = canvas.offsetWidth || 520;
      const H = canvas.offsetHeight || 520;

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
      camera.position.z = 2.6;

      // Procedural planet texture
      const texSize = 1024;
      const tc = document.createElement("canvas");
      tc.width = texSize; tc.height = texSize / 2;
      const ctx = tc.getContext("2d");
      const ocean = ctx.createLinearGradient(0, 0, texSize, texSize / 2);
      ocean.addColorStop(0, "#020e2e"); ocean.addColorStop(.4, "#041a40");
      ocean.addColorStop(.8, "#010d28"); ocean.addColorStop(1, "#020e2e");
      ctx.fillStyle = ocean; ctx.fillRect(0, 0, texSize, texSize / 2);

      [[200,100,90,60],[350,80,60,40],[500,110,100,55],[700,90,80,50],[150,180,110,65],
       [600,170,75,45],[850,120,90,55],[420,200,70,40],[250,150,55,35],[780,200,85,48],
       [130,80,45,28],[920,170,60,38]].forEach(([x,y,rx,ry]) => {
        const g = ctx.createRadialGradient(x,y,0,x,y,Math.max(rx,ry));
        g.addColorStop(0,"rgba(30,80,50,.95)"); g.addColorStop(.5,"rgba(20,65,40,.8)");
        g.addColorStop(.8,"rgba(15,50,30,.5)"); g.addColorStop(1,"rgba(0,0,0,0)");
        ctx.fillStyle = g; ctx.beginPath();
        ctx.ellipse(x,y,rx,ry,Math.random()*Math.PI,0,Math.PI*2); ctx.fill();
      });
      const iceCap1 = ctx.createRadialGradient(texSize/2,0,0,texSize/2,0,120);
      iceCap1.addColorStop(0,"rgba(180,220,255,.9)"); iceCap1.addColorStop(1,"rgba(0,0,0,0)");
      ctx.fillStyle = iceCap1; ctx.fillRect(0,0,texSize,80);

      const tex = new THREE.CanvasTexture(tc);
      const planet = new THREE.Mesh(
        new THREE.SphereGeometry(1, 64, 64),
        new THREE.MeshPhongMaterial({ map: tex, specular: new THREE.Color(0x225577), shininess: 40 })
      );
      scene.add(planet);

      const atm = new THREE.Mesh(
        new THREE.SphereGeometry(1.06, 64, 64),
        new THREE.MeshPhongMaterial({ color: new THREE.Color(0x0077ff), transparent: true, opacity: 0.12, side: THREE.FrontSide, blending: THREE.AdditiveBlending, depthWrite: false })
      );
      scene.add(atm);

      scene.add(new THREE.Mesh(
        new THREE.SphereGeometry(1.18, 32, 32),
        new THREE.MeshBasicMaterial({ color: new THREE.Color(0x00aaff), transparent: true, opacity: 0.04, side: THREE.FrontSide, blending: THREE.AdditiveBlending, depthWrite: false })
      ));

      const ring1 = new THREE.Mesh(
        new THREE.TorusGeometry(1.55, 0.06, 2, 120),
        new THREE.MeshBasicMaterial({ color: new THREE.Color(0x00e5ff), transparent: true, opacity: 0.18, blending: THREE.AdditiveBlending, depthWrite: false })
      );
      ring1.rotation.x = Math.PI / 2.8;
      scene.add(ring1);

      const ring2 = new THREE.Mesh(
        new THREE.TorusGeometry(1.75, 0.025, 2, 120),
        new THREE.MeshBasicMaterial({ color: new THREE.Color(0x00ffcc), transparent: true, opacity: 0.1, blending: THREE.AdditiveBlending, depthWrite: false })
      );
      ring2.rotation.x = Math.PI / 2.8;
      scene.add(ring2);

      // Cloud layer
      const cc = document.createElement("canvas");
      cc.width = 512; cc.height = 256;
      const cctx = cc.getContext("2d");
      for (let i = 0; i < 60; i++) {
        const x = Math.random()*512, y = Math.random()*256, r = Math.random()*50+20;
        const cg = cctx.createRadialGradient(x,y,0,x,y,r);
        cg.addColorStop(0,`rgba(255,255,255,${Math.random()*.3+.1})`);
        cg.addColorStop(1,"rgba(255,255,255,0)");
        cctx.fillStyle = cg; cctx.beginPath();
        cctx.ellipse(x,y,r,r*.4,Math.random()*Math.PI,0,Math.PI*2); cctx.fill();
      }
      const clouds = new THREE.Mesh(
        new THREE.SphereGeometry(1.025, 48, 48),
        new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(cc), transparent: true, blending: THREE.NormalBlending, depthWrite: false, opacity: 0.35 })
      );
      scene.add(clouds);

      const sun = new THREE.DirectionalLight(0xffffff, 1.4);
      sun.position.set(5, 3, 5); scene.add(sun);
      scene.add(new THREE.AmbientLight(0x001133, 0.6));
      const cyanL = new THREE.PointLight(0x00e5ff, 0.5, 10);
      cyanL.position.set(-3, 2, 2); scene.add(cyanL);

      let t = 0;
      const animate = () => {
        if (!mounted) return;
        animId = requestAnimationFrame(animate);
        t += 0.004;
        planet.rotation.y += 0.0025;
        clouds.rotation.y += 0.0032;
        atm.rotation.y += 0.001;
        ring1.rotation.z += 0.001;
        ring2.rotation.z -= 0.0007;
        planet.position.y = Math.sin(t) * 0.04;
        planet.rotation.x = Math.sin(t * 0.4) * 0.06;
        renderer.render(scene, camera);
      };
      animate();

      const handleResize = () => {
        if (!canvasRef.current) return;
        const W2 = canvasRef.current.offsetWidth;
        const H2 = canvasRef.current.offsetHeight;
        camera.aspect = W2 / H2;
        camera.updateProjectionMatrix();
        renderer.setSize(W2, H2);
      };
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        renderer.dispose();
      };
    });

    return () => { mounted = false; cancelAnimationFrame(animId); };
  }, []);
  return null;
}

/* Starfield */
function Starfield() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext("2d");
    let animId;
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const layers = [
      Array.from({length:320},()=>({x:Math.random(),y:Math.random(),r:Math.random()*.8+.1,spd:.015,tw:Math.random()*Math.PI*2,ts:.006+Math.random()*.01,b:Math.random()*.5+.3})),
      Array.from({length:120},()=>({x:Math.random(),y:Math.random(),r:Math.random()*1.2+.4,spd:.04,tw:Math.random()*Math.PI*2,ts:.008+Math.random()*.012,b:Math.random()*.4+.5})),
      Array.from({length:40},()=>({x:Math.random(),y:Math.random(),r:Math.random()*1.8+.8,spd:.09,tw:Math.random()*Math.PI*2,ts:.01+Math.random()*.015,b:Math.random()*.3+.6})),
    ];
    const draw = () => {
      ctx.clearRect(0,0,c.width,c.height);
      layers.forEach((layer,li)=>{
        layer.forEach(s=>{
          s.tw+=s.ts; s.y-=s.spd;
          if(s.y<0){s.y=1;s.x=Math.random();}
          const alpha=s.b*(.5+.5*Math.sin(s.tw));
          const sx=s.x*c.width,sy=s.y*c.height;
          ctx.beginPath();ctx.arc(sx,sy,s.r,0,Math.PI*2);
          ctx.fillStyle=li===2?`rgba(0,229,255,${alpha*.7})`:`rgba(200,225,255,${alpha})`;
          ctx.fill();
          if(li===2&&s.r>1){ctx.beginPath();ctx.arc(sx,sy,s.r*3,0,Math.PI*2);ctx.fillStyle=`rgba(0,229,255,${alpha*.06})`;ctx.fill();}
        });
      });
      animId=requestAnimationFrame(draw);
    };
    draw();
    return ()=>{cancelAnimationFrame(animId);window.removeEventListener("resize",resize);};
  },[]);
  return <canvas ref={ref} id="starfield"/>;
}

/* Nebula */
function Nebula() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext("2d");
    let animId, t=0;
    const resize=()=>{c.width=window.innerWidth;c.height=window.innerHeight;};
    resize();window.addEventListener("resize",resize);
    const blobs=Array.from({length:6},(_,i)=>({
      x:.1+Math.random()*.8,y:.1+Math.random()*.8,
      rx:.12+Math.random()*.25,b:i*1.1,
      g:[.06,.04,.035,.03,.07,.05][i],
      vx:(Math.random()-.5)*.00012,vy:(Math.random()-.5)*.00008,
      col:i%2===0?[0,100,200]:[0,60,150],
    }));
    const draw=()=>{
      ctx.clearRect(0,0,c.width,c.height);t+=.003;
      blobs.forEach(b=>{
        b.x+=b.vx;b.y+=b.vy;
        if(b.x<0||b.x>1)b.vx*=-1;if(b.y<0||b.y>1)b.vy*=-1;
        const cx=b.x*c.width,cy=b.y*c.height;
        const pulse=1+.08*Math.sin(t+b.b);
        const g=ctx.createRadialGradient(cx,cy,0,cx,cy,Math.max(c.width,c.height)*b.rx*pulse);
        const[r,gv,bv]=b.col;
        g.addColorStop(0,`rgba(${r},${gv},${bv},${b.g})`);g.addColorStop(1,"rgba(0,0,0,0)");
        ctx.fillStyle=g;ctx.fillRect(0,0,c.width,c.height);
      });
      animId=requestAnimationFrame(draw);
    };
    draw();
    return()=>{cancelAnimationFrame(animId);window.removeEventListener("resize",resize);};
  },[]);
  return <canvas ref={ref} id="nebula-canvas"/>;
}

/* Cursor */
function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({x:0,y:0});
  const ring = useRef({x:0,y:0});
  useEffect(()=>{
    let rafId;
    const onMove=e=>{
      pos.current={x:e.clientX,y:e.clientY};
      if(dotRef.current){dotRef.current.style.left=e.clientX+"px";dotRef.current.style.top=e.clientY+"px";}
    };
    const animate=()=>{
      ring.current.x+=(pos.current.x-ring.current.x)*.1;
      ring.current.y+=(pos.current.y-ring.current.y)*.1;
      if(ringRef.current){ringRef.current.style.left=ring.current.x+"px";ringRef.current.style.top=ring.current.y+"px";}
      rafId=requestAnimationFrame(animate);
    };
    window.addEventListener("mousemove",onMove);
    rafId=requestAnimationFrame(animate);
    return()=>{window.removeEventListener("mousemove",onMove);cancelAnimationFrame(rafId);};
  },[]);
  return(<><div id="cur-dot" ref={dotRef}/><div id="cur-ring" ref={ringRef}/></>);
}

/* Scroll Reveal Hook */
function useReveal(){
  useEffect(()=>{
    const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible");}),{threshold:.1});
    document.querySelectorAll(".reveal,.tl-item").forEach(el=>obs.observe(el));
    return()=>obs.disconnect();
  },[]);
}

export default function LandingPage() {
  const planetCanvasRef = useRef(null);
  useReveal();

  return (
    <>
      <style>{CSS}</style>
      <Cursor/>
      <Starfield/>
      <Nebula/>

      <nav>
        <div className="nav-brand"><div className="nav-pip"/>CELESTIA OS</div>
        <ul className="nav-links">
          <li><a href="#features">Systems</a></li>
          <li><a href="#missions">Missions</a></li>
          <li><a href="#journey">Roadmap</a></li>
          <li><a href="#creator">Origin</a></li>
        </ul>
        <div className="nav-badge"><div className="badge-dot"/>SYSTEM ONLINE</div>
      </nav>

      <section id="hero">
        <div className="hero-grid"/>
        <div className="hero-left">
          <p className="hero-eyebrow">
            <span className="eyebrow-line"/>Deep Space Exploration Interface<span className="eyebrow-line"/>
          </p>
          <h1 className="hero-h1">
            <span className="h1-line1">CELESTIA</span>
            <span className="h1-line2">OPERATING SYSTEM</span>
          </h1>
          <p className="hero-sub">The OS for Exploring the Universe</p>
          <p className="hero-desc">
            Step into a futuristic spacecraft interface. Explore planets, relive space missions,
            query an AI trained on the cosmos, and journey from Earth's orbit to the edge of the
            observable universe — all in one immersive experience.
          </p>
          <div className="hero-ctas">
            <button className="btn-p">🚀 Launch Mission</button>
            <button className="btn-s">Explore Systems</button>
          </div>
        </div>
        <div className="hero-right">
          <canvas ref={planetCanvasRef} id="planet-canvas" style={{width:"100%",height:"100%"}}/>
          <Planet3D canvasRef={planetCanvasRef}/>
          <div className="planet-ring"/>
          <div className="planet-ring"/>
          <div className="planet-ring"/>
          <div className="orbit-dot"/>
          <div className="orbit-dot"/>
          <div className="hud-bracket hud-tl-b"/>
          <div className="hud-bracket hud-tr-b"/>
          <div className="hud-bracket hud-bl-b"/>
          <div className="hud-bracket hud-br-b"/>
          <div className="hud-line hud-tl">MASS: 5.972 × 10²⁴ kg<br/>RADIUS: 6,371 km</div>
          <div className="hud-line hud-tr">ORBIT: 149.6M km<br/>PERIOD: 365.25 days</div>
          <div className="hud-line hud-bl">MOONS: 1 · LUNA<br/>AXIAL TILT: 23.44°</div>
          <div className="hud-line hud-br">STATUS: HABITABLE<br/>LIFE: CONFIRMED</div>
        </div>
        <div className="scanbar"/>
      </section>

      <div className="stats-strip">
        {[{n:"8+",l:"Planets Mapped"},{n:"214",l:"Moons Catalogued"},{n:"200+",l:"Space Missions"},{n:"∞",l:"Stars Indexed"},{n:"AI",l:"Powered Core"}].map((s,i)=>(
          <div className="stat reveal" key={i} style={{transitionDelay:`${i*.08}s`}}>
            <span className="stat-n">{s.n}</span><span className="stat-l">{s.l}</span>
          </div>
        ))}
      </div>

      <section id="features">
        <div className="sec-inner">
          <div className="sec-head reveal">
            <span className="sec-tag">// core_systems.list()</span>
            <h2 className="sec-title">Mission Capabilities</h2>
            <div className="sec-line"/>
            <p className="sec-sub">Six integrated systems that transform space education into an interactive journey through the cosmos.</p>
          </div>
          <div className="feat-grid">
            {FEATURES.map((f,i)=>(
              <div className="feat-card reveal" key={i} style={{transitionDelay:`${i*.1}s`}}>
                <div className="feat-card-glow"/>
                <span className="feat-num">{f.num}</span>
                <div className="feat-icon-wrap">{f.icon}</div>
                <div className="feat-name">{f.name}</div>
                <p className="feat-desc">{f.desc}</p>
                <div className="feat-tag">{f.tag}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="missions" style={{background:"linear-gradient(180deg,transparent,rgba(0,30,80,.05),transparent)"}}>
        <div className="sec-inner">
          <div className="sec-head reveal">
            <span className="sec-tag">// mission_archive.query(all)</span>
            <h2 className="sec-title">Humanity's Greatest Missions</h2>
            <div className="sec-line"/>
            <p className="sec-sub">From the first steps on the Moon to the deepest infrared images ever captured.</p>
          </div>
          <div className="mission-grid">
            {MISSIONS.map((m,i)=>(
              <div className="mission-card reveal" key={i} style={{transitionDelay:`${i*.08}s`}}>
                <span className="mission-icon">{m.icon}</span>
                <div className="mission-name">{m.name}</div>
                <div className="mission-info">{m.info}</div>
                <span className="mission-badge">{m.badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="journey">
        <div className="sec-inner">
          <div className="sec-head reveal">
            <span className="sec-tag">// roadmap.render()</span>
            <h2 className="sec-title">Exploration Roadmap</h2>
            <div className="sec-line"/>
            <p className="sec-sub">A structured journey from Earth's surface to the edge of the observable universe.</p>
          </div>
          <div className="timeline">
            {TL.map((item,i)=>(
              <div className={`tl-item${item.right?" right":""}`} key={i} style={{transitionDelay:`${i*.12}s`}}>
                <div className="tl-side">
                  <span className="tl-year">{item.year}</span>
                  <div className="tl-name">{item.name}</div>
                  <p className="tl-desc">{item.desc}</p>
                </div>
                <div className="tl-dot"/>
                {!item.right && <div style={{flex:1}}/>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="creator" style={{background:"linear-gradient(180deg,transparent,rgba(0,20,60,.06),transparent)"}}>
        <div className="sec-inner">
          <div className="sec-head reveal">
            <span className="sec-tag">// origin.manifest</span>
            <h2 className="sec-title">Mission Architect</h2>
            <div className="sec-line"/>
          </div>
          <div className="creator-wrap">
            <div className="creator-visual reveal">
              <div className="creator-ring-outer"/>
              <div className="creator-ring-mid"/>
              <div className="creator-avatar">KA</div>
              <div className="creator-orb"/>
              <div className="creator-orb"/>
            </div>
            <div className="creator-card reveal">
              <span className="c-label">Built By</span>
              <div className="c-name">Khyati Agrawal</div>
              <div className="c-roles">
                {["Open Source","Full Stack Dev","Generative AI","B.Tech CS"].map(r=>(
                  <span className="c-chip" key={r}>{r}</span>
                ))}
              </div>
              <p className="c-bio">
                A B.Tech Computer Science student passionate about the intersection of AI,
                immersive design, and space technology. Celestia OS is built to make the cosmos
                accessible to every curious mind. Fueled by the belief that technology should inspire wonder.
              </p>
              <div className="c-socials">
                <a href="https://github.com" target="_blank" rel="noreferrer" className="c-soc" title="GitHub">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="c-soc" title="LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="#" className="c-soc" title="Portfolio">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="sec-inner">
          <div className="sec-head reveal">
            <span className="sec-tag">// system_console</span>
            <h2 className="sec-title">Boot Sequence</h2>
            <div className="sec-line"/>
          </div>
          <div className="term-wrap reveal">
            <div className="term">
              <div className="term-bar">
                <div className="tb r"/><div className="tb y"/><div className="tb g"/>
                <div className="term-title">celestia-os — mission-control@v2.0.0</div>
              </div>
              <div className="term-body">
                {TERM_LINES.map((l,i)=>(
                  <div className="t-row" key={i}>
                    {l.t==="cmd"?(<><span className="t-p">{l.p}</span><span className="t-c">{l.c}</span></>):<span className="t-o">{l.c}</span>}
                  </div>
                ))}
                <div className="t-row"><span className="t-p">celestia@os:~$</span><span className="t-cur"/></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-glow"/>
        <div className="cta-ring-dec"/>
        <div style={{position:"relative",zIndex:2}}>
          <p className="sec-tag reveal" style={{display:"block",textAlign:"center"}}>// ready_to_launch</p>
          <h2 className="cta-h reveal">Begin Your Mission</h2>
          <p className="cta-p reveal">The universe is vast, beautiful, and waiting. Celestia OS is your portal — from a student's first curiosity to a scientist's deepest question.</p>
          <div className="hero-ctas reveal" style={{justifyContent:"center"}}>
            <button className="btn-p">🚀 Launch Celestia OS</button>
            <button className="btn-s">View on GitHub</button>
          </div>
        </div>
      </section>

      <footer>
        <div className="foot-inner">
          <div className="foot-brand">CELESTIA OS</div>
          <ul className="foot-links">
            <li><a href="#features">Systems</a></li>
            <li><a href="#missions">Missions</a></li>
            <li><a href="#creator">Origin</a></li>
            <li><a href="#">GitHub</a></li>
          </ul>
          <p className="foot-copy">
            Designed &amp; Built by Khyati Agrawal
            <span className="foot-div"/>Open Source
            <span className="foot-div"/>Celestia OS v2.0.0
            <span className="foot-div"/>Mission Status: Active
          </p>
        </div>
      </footer>
    </>
  );
}