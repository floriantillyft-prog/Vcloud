/* ========== Thème & base ========== */
:root{
  --bg: #0b0e12;
  --ink: #e8eef6;
  --muted: #9fb0c7;
  --primary: #2a63ff;
  --primary-2: #3b6bff;
  --panel: #0f1420;
  --panel-2:#111726;
  --panel-3:#0c1220;
  --ring: #78a2ff;
}

*{box-sizing:border-box}
html,body{height:100%}
html{scroll-behavior:smooth}
body{
  margin:0;
  color:var(--ink);
  background: var(--bg);
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter, Helvetica, Arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* ========== Topbar ========== */
.topbar{
  position:sticky; top:0; z-index:50;
  display:flex; align-items:center; gap:16px;
  height:64px; padding:0 18px;
  backdrop-filter: blur(8px);
  background: linear-gradient(to bottom, rgba(9,12,18,.72), rgba(9,12,18,.35), transparent);
  border-bottom:1px solid rgba(255,255,255,.04);
}
.brand{display:flex; align-items:center; gap:10px; font-weight:700}
.logo{width:22px; height:22px; border-radius:6px; background: linear-gradient(135deg,#4c6fff,#1b46ff)}
.top-links{margin-left:auto; display:flex; gap:16px}
.top-links a{color:var(--muted); text-decoration:none; font-size:14px}
.top-links a:hover{color:#fff}

.icon-btn{all:unset; cursor:pointer; width:36px; height:36px; display:grid; place-items:center}
.icon-btn span, .icon-btn span::before, .icon-btn span::after{
  content:""; display:block; width:18px; height:2px; background:#cde0ff; border-radius:2px; position:relative;
}
.icon-btn span::before{position:absolute; top:-6px}
.icon-btn span::after{position:absolute; top:6px}

.btn{display:inline-flex; align-items:center; justify-content:center; gap:8px;
  padding:12px 18px; border-radius:12px; border:1px solid rgba(255,255,255,.08);
  background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.01));
  color:#e9f1ff; text-decoration:none; font-weight:600; transition:.2s ease;
  box-shadow: 0 8px 24px rgba(0,0,0,.25);
}
.btn:hover{transform: translateY(-1px); box-shadow:0 10px 28px rgba(0,0,0,.35)}
.btn.primary{background: linear-gradient(180deg, #2a63ff, #1f4cff); border-color:#335cff}
.btn.ghost{background:transparent}
.btn.small{padding:10px 14px; border-radius:10px; font-size:14px}
.btn.slim{padding:10px 14px}

/* ========== Drawer ========== */
.drawer{position:fixed; inset:0; pointer-events:none}
.drawer-content{
  position:absolute; top:0; left:-300px; width:280px; height:100%;
  background: var(--panel-2); border-right:1px solid rgba(255,255,255,.06);
  padding:18px; display:flex; flex-direction:column; gap:10px; transition:.25s ease;
}
.drawer[aria-hidden="false"]{pointer-events:auto}
.drawer[aria-hidden="false"] .drawer-content{left:0}
.drawer-scrim{
  position:absolute; inset:0; background: rgba(1,8,20,.45); backdrop-filter: blur(1px);
  opacity:0; transition:.2s ease; pointer-events:none;
}
.drawer[aria-hidden="false"] .drawer-scrim{opacity:1; pointer-events:auto}
.drawer-content h3{margin:4px 0 12px; color:#cfe0ff}
.drawer-link{display:block; color:#b8c8e6; text-decoration:none; padding:10px 8px; border-radius:8px}
.drawer-link:hover{background: rgba(255,255,255,.06); color:#fff}

/* ========== Track / panels ========== */
.track{position:relative; min-height:100vh}
.panel{min-height:100vh; display:grid; align-items:center; padding:20vh clamp(16px, 8vw, 80px) 18vh}

/* hero */
.hero{position:relative; overflow:hidden}
.hero-bg{position:absolute; inset:0; background:
 radial-gradient(1000px 600px at 15% 10%, rgba(42,99,255,.20), transparent 60%),
 radial-gradient(800px 420px at 80% 15%, rgba(84,117,255,.20), transparent 60%);
}
.hero-bg::after{
  content:""; position:absolute; inset:-40% -20% -30% -20%;
  background-image:
    radial-gradient(2px 2px at 20% 10%, #b9d1ff 60%, transparent 61%),
    radial-gradient(2px 2px at 60% 30%, #9fb9ff 60%, transparent 61%),
    radial-gradient(2px 2px at 80% 70%, #d4e3ff 60%, transparent 61%);
  animation: stars 12s linear infinite;
}
@keyframes stars{to{transform: translateY(60px)}}
.hero-inner{position:relative; z-index:2; text-align:center}
.hero h1{font-size: clamp(36px, 6vw, 64px); line-height:1.08; margin:0 0 24px}
.hero-ctas{display:flex; gap:12px; justify-content:center}
.scroll-hint{opacity:.75; font-size:24px; margin-top:42px}

/* features */
.features{position:relative; overflow:hidden}
.features-bg{position:absolute; inset:0; pointer-events:none}
.features-bg .stars{
  position:absolute; inset:-40% -20% -30% -20%;
  background-image:
    radial-gradient(1.8px 1.8px at 14% 18%, #a7c1ff 60%, transparent 61%),
    radial-gradient(1.6px 1.6px at 37% 28%, #c9dcff 60%, transparent 61%),
    radial-gradient(2px 2px at 84% 70%, #aec7ff 60%, transparent 61%);
  animation: stars 18s linear infinite;
  opacity:.7;
}
.features-bg .nebula{
  position:absolute; width:60vw; height:60vw; max-width:900px; max-height:900px;
  left:-15vw; top:-10vw;
  background: radial-gradient(40% 40% at 50% 50%, rgba(42,99,255,.25), transparent 70%);
  filter: blur(20px);
  animation: breathe 8s ease-in-out infinite;
}
@keyframes breathe{50%{transform: translateY(-10px) scale(1.02)}}
.features-bg .rocket{
  position:absolute; right:8%; top:18%;
  width:42px; height:42px; border-radius:50%;
  background: conic-gradient(from 20deg, #ff7c6b, #ffd6c7);
  box-shadow: 0 0 18px rgba(255,140,120,.4);
  animation: rocket 9s ease-in-out infinite;
}
@keyframes rocket{
  0%{transform: translate(0,0) rotate(-18deg)}
  50%{transform: translate(-12px, -18px) rotate(-12deg)}
  100%{transform: translate(0,0) rotate(-18deg)}
}

.features-grid{position:relative; display:grid; grid-template-columns:1.1fr 1fr; gap:6vw; align-items:center}
.eyebrow{letter-spacing:.25em; color:#9fb0c7; font-size:12px}
.features h2{font-size: clamp(28px,4.2vw,52px); margin:.3em 0 .4em}
.features p{max-width: 58ch; color:var(--muted)}
.actions-row{display:flex; gap:12px; align-items:center; margin-top:16px}
.devices{position:relative; min-height:340px}
.device{position:absolute; border-radius:22px; background:linear-gradient(135deg,#111a2b,#0a1224); border:1px solid rgba(255,255,255,.06); box-shadow:0 10px 40px rgba(0,0,0,.45)}
.device-tablet{width:380px; height:520px; left:0; top:20px}
.device-laptop{width:460px; height:300px; right:-40px; bottom:18px}
.device-phone{width:140px; height:240px; right:48px; top:80px}

/* pricing (slide) */
.pricing{position:relative}
.section-head h2{font-size: clamp(28px,4vw,44px); margin:0 0 22px}
.cards{display:grid; grid-template-columns:repeat(2, minmax(260px, 1fr)); gap:22px}
.card{
  background: linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,.01));
  border:1px solid rgba(255,255,255,.07);
  border-radius:18px; padding:18px; display:flex; flex-direction:column; gap:12px;
  box-shadow: 0 10px 40px rgba(0,0,0,.35);
  transform: translateY(0) scale(1); transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease;
}
.card:hover{
  transform: translateY(-4px) scale(1.01);
  box-shadow: 0 16px 50px rgba(0,0,0,.45);
  border-color: rgba(88,120,255,.35);
}
.card .badge{color:#cfe0ff}
.card .meta{color:#9fb0c7}
.card .price{font-size: clamp(22px, 3.4vw, 28px)}

.legal{display:flex; align-items:center; justify-content:space-between; gap:14px; margin-top:18px}
.pill{display:inline-flex; align-items:center; padding:6px 10px; border-radius:999px; background:#0d1629; border:1px solid rgba(255,255,255,.06); color:#bdccf0; font-size:12px}
.foot-links{display:flex; gap:16px}
.foot-links a{color:#94a7c9; text-decoration:none}

/* Slides logic */
body.show-pricing .track{transform: translateX(-100vw)}
.track{transition: transform .35s ease}
@media (max-width:1000px){
  .features-grid{grid-template-columns:1fr}
  .device-tablet{transform: scale(.85); left:-20px}
  .device-laptop{transform: scale(.85); right:-50px}
}

/* a11y focus */
:focus-visible{outline:2px solid var(--ring); outline-offset:2px}
