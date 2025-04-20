/* ======================================================================= *
 *  js/scripts.js – Markiva master enhancements                            *
 *  2025‑04‑19  (KONAMI mini‑game v4.2 – no auto‑close, 640×420 canvas,    *
 *               extra power‑ups, starfield, mobile‑friendly)              *
 * ======================================================================= */
(() => {

  /* ────────────────────────────── DOM READY ────────────────────────────── */
  document.addEventListener("DOMContentLoaded", () => {
    console.log("Markiva enhanced script loaded.");
  
    typeHeroTitle();
    setupSmoothScroll();
    setupScrollToTop();
    showRandomMarkivaTip();
    setupFeatureLikes();
    setupMarkivaShortcut();       // “markiva”
    setupKonamiEasterEgg();       // ↑↑↓↓←→←→BA
    setupReadingProgressBar();
    setupLazyLoadingImages();
    setupSectionHighlight();
    addCopyButtonsToCode();
    scheduleReadTimeBadge();      // docs only
  
    detectOSAndHighlight();
    restoreRatings();
    animateInstallCounters();
  });
  
  /* ══════════════════════════ GENERAL UTILS ═════════════════════════════ */
  const qs   = sel => document.querySelector(sel);
  const qsa  = sel => [...document.querySelectorAll(sel)];
  const clamp= (v,min,max)=>Math.max(min,Math.min(max,v));
  const rnd  = (a,b)=>Math.random()*(b-a)+a;
  
  /* ═════════════════════════ 1. HERO TYPEWRITER ═════════════════════════ */
  function typeHeroTitle(){
    const el=qs("#heroTitle"); if(!el)return;
    const txt="Welcome to Markiva"; let i=0;
    (function tick(){ if(i<txt.length){el.textContent+=txt[i++];setTimeout(tick,100);} })();
  }
  
  /* ═════════════════════════ 2. SMOOTH SCROLL ═══════════════════════════ */
  function setupSmoothScroll(){
    qsa('a[href*="#"]').forEach(a=>{
      a.addEventListener("click",e=>{
        const href=a.getAttribute("href")||""; if(!href.includes("#"))return;
        const id=href.split("#")[1]; const tgt=qs("#"+id);
        if(tgt){ e.preventDefault(); window.scrollTo({top:tgt.offsetTop-70,behavior:"smooth"}); }
      });
    });
  }
  
  /* ═══════════════════════ 3. SCROLL‑TO‑TOP BTN ════════════════════════ */
  function setupScrollToTop(){
    const btn=document.createElement("button");
    btn.innerHTML='<i class="bi bi-arrow-up"></i>'; btn.className="btn btn-success";
    btn.style.cssText="position:fixed;bottom:20px;right:20px;display:none;z-index:1050;";
    document.body.appendChild(btn);
    window.addEventListener("scroll",()=>btn.style.display=pageYOffset>300?"flex":"none");
    btn.onclick=()=>window.scrollTo({top:0,behavior:"smooth"});
  }
  
  /* ═══════════════════════ 4. RANDOM CONSOLE TIP ═══════════════════════ */
  function showRandomMarkivaTip(){
    const tips=[
      "Tip: Explore Markiva's plugin system to expand capabilities!",
      "Tip: Keep your markdown well‑structured for collaboration.",
      "Tip: Use Markiva's dark theme for late‑night sessions.",
      "Tip: Advanced formatting: code blocks & syntax highlighting.",
      "Tip: Contribute on GitHub—your ideas are welcome!"
    ];
    console.log("\n‣ "+tips[(Math.random()*tips.length)|0]+"\n");
  }
  
  /* ═══════════════════════ 5. FEATURE‑CARD LIKES ═══════════════════════ */
  function setupFeatureLikes(){
    qsa(".like-btn").forEach((btn,i)=>{
      const key=`featureLiked-${i}`; update(btn,localStorage.getItem(key)==="true");
      btn.onclick=()=>{
        const val=!(localStorage.getItem(key)==="true");
        localStorage.setItem(key,val); update(btn,val);
      };
    });
    function update(b,liked){
      b.innerHTML=liked?'Liked <i class="bi bi-heart-fill"></i>':'Like <i class="bi bi-heart"></i>';
      b.classList.toggle("btn-success",liked);
      b.classList.toggle("btn-outline-success",!liked);
    }
  }
  
  /* ═══════════════════════ 6. “markiva” CONFETTI ═══════════════════════ */
  function setupMarkivaShortcut(){
    const seq="markiva"; let buf="";
    document.addEventListener("keydown",e=>{
      buf+=e.key.toLowerCase();
      if(!seq.startsWith(buf))buf="";
      if(buf===seq){buf=""; confettiBurst();}
    });
  }
  const confettiBurst=()=>window.confetti&&window.confetti({particleCount:120,spread:70,origin:{y:0.6}});
  
  /* ═══════════════════════ 7. KONAMI & MINIGAME ═══════════════════════ */
  function setupKonamiEasterEgg(){
    const code=["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
    let buf=[];
    document.addEventListener("keydown",e=>{
      buf.push(e.key.length===1?e.key.toLowerCase():e.key);
      if(buf.length>code.length)buf.shift();
      if(code.every((v,i)=>v.toLowerCase()===(buf[i]||"").toLowerCase())){buf=[];openKonamiPortal();}
    });
  }
  
  /* ─── overlay + buttons ────────────────────────────────────────────── */
  function openKonamiPortal(){
    injectRetroCSS(); beep(880);
  
    let overlayTimeout=null, gameRunning=false;
  
    const ov=document.createElement("div");
    ov.className="pixel‑rainbow";
    ov.style.cssText="position:fixed;inset:0;display:flex;flex-direction:column;align-items:center;"+
                     "justify-content:center;font-family:'Press Start 2P',monospace;color:#fff;"+
                     "text-shadow:2px 2px #000;z-index:1200;padding:2rem;text-align:center;";
    ov.innerHTML=`
      <h1 style="font-size:2rem;">🚀 DEV PORTAL UNLOCKED 🚀</h1>
      <div class="d-flex flex-wrap gap-3 my-3 justify-content-center">
        <button id="kFire" class="btn btn-warning btn-lg">Fireworks <i class="bi bi-stars"></i></button>
        <button id="kRoad" class="btn btn-success btn-lg">Open Roadmap <i class="bi bi-github"></i></button>
        <button id="kGame" class="btn btn-info btn-lg">Play Mini‑Game 🎮</button>
      </div>
      <p style="font-size:0.7rem;">(Click backdrop / ESC to close)</p>`;
    document.body.appendChild(ov);
  
    const close=()=>{
      if(gameRunning) return;            // keep overlay while game active
      overlayTimeout&&clearTimeout(overlayTimeout);
      ov.remove();
    };
    ov.addEventListener("click",e=>{ if(e.target===ov)close();});
    document.addEventListener("keydown",e=>{ if(e.key==="Escape")close();},{once:true});
  
    /* auto‑close after 20 s of inactivity */
    overlayTimeout=setTimeout(close,20000);
  
    qs("#kFire").onclick=fireworks;
    qs("#kRoad").onclick=()=>window.open("https://github.com/skillerious/markiva#roadmap","_blank");
    qs("#kGame").onclick=e=>{
      e.stopPropagation();
      clearTimeout(overlayTimeout);      // pause the auto‑close
      gameRunning=true;
      startBrickBreaker(ov,()=>{         // callback when game exits
        gameRunning=false;
        overlayTimeout=setTimeout(close,15000);  // restart timer
      });
    };
  }
  
  /* ─── Brick Breaker v4.2 ──────────────────────────────────────────── */
  function startBrickBreaker(container,onGameExit){
  
    /* Canvas setup – 640×420 px, DPR‑aware, responsive */
    const BASE_W=640, BASE_H=420;
    const cvs=document.createElement("canvas");
    cvs.style.cssText="max-width:90vw;background:#000;border:3px solid #fff;border-radius:6px;";
    container.innerHTML="";
    container.appendChild(cvs);
    container.insertAdjacentHTML("beforeend",
      `<div class="mt-2 d-flex gap-2 flex-wrap justify-content-center">
         <button id="gPause" class="btn btn-sm btn-outline-light">Pause (P)</button>
         <button id="gMute"  class="btn btn-sm btn-outline-light">Mute (M)</button>
         <button id="gExit"  class="btn btn-sm btn-outline-danger">Exit</button>
       </div>
       <p style="font-size:0.6rem;margin-top:0.3rem;">Move: ← → / A D / Mouse / Touch</p>
       <h2 id="gHead" style="font-size:0.8rem;margin-top:0.4rem;"></h2>`);
  
    const DPR=window.devicePixelRatio||1;
    let CW=BASE_W, CH=BASE_H;            // logical size
    function resizeCanvas(){
      CW = BASE_W; CH = BASE_H;
      if(window.innerWidth<650){
        const scale=window.innerWidth/(BASE_W/0.9);
        CW = Math.round(BASE_W*scale);
        CH = Math.round(BASE_H*scale);
      }
      cvs.width  = CW*DPR; cvs.height = CH*DPR;
      cvs.style.width = CW+"px"; cvs.style.height = CH+"px";
      ctx.scale(DPR,DPR);
    }
    const ctx=cvs.getContext("2d");
    resizeCanvas(); window.addEventListener("resize",()=>location.reload());
  
    const btnPause=qs("#gPause"), btnMute=qs("#gMute"), btnExit=qs("#gExit"), head=qs("#gHead");
  
    /* Game consts */
    const P={w:100,h:12,x:(CW-100)/2,y:CH-24,speed:9,glow:0};
    const BALLS=[makeBall()];
    const GRID={rows:7,cols:12,w:48,h:18,pad:5,offTop:50};
    let bricks, level=1, score=0,lives=3,best=+sessionStorage.getItem("mkBest")||0;
    let paused=false, muted=false, over=false, fps=0, starfield=[];
  
    resetBricks(); makeStarfield(); updateHUD();
  
    /* control state */
    const keys={};
    document.addEventListener("keydown",kDown);
    document.addEventListener("keyup",kUp);
    window.addEventListener("mousemove",mouseMove);
    window.addEventListener("touchmove",touchMove,{passive:false});
    cvs.addEventListener("click",()=>{togglePause();});
  
    btnPause.onclick=()=>togglePause();
    btnMute.onclick =()=>{ muted=!muted; btnMute.classList.toggle("btn-warning",muted); };
    btnExit.onclick =quit;
  
    /* fps calc */
    let lastTime=performance.now(),frameCount=0, lastFpsUpdate=lastTime;
    requestAnimationFrame(loop);
  
    /* ――――――――― Loop ――――――――― */
    function loop(ts){
      if(over) return;
      if(!paused) update();
      draw(ts);
      requestAnimationFrame(loop);
    }
  
    /* ―――――――― Update ――――――― */
    function update(){
      P.glow=Math.max(0,P.glow-0.02);
  
      /* keyboard paddle */
      if(keys["arrowleft"]||keys["a"])P.x-=P.speed;
      if(keys["arrowright"]||keys["d"])P.x+=P.speed;
      P.x=clamp(P.x,0,CW-P.w);
  
      /* update balls */
      BALLS.forEach(b=>{
        b.prevX=b.x; b.prevY=b.y;
        b.x+=b.dx; b.y+=b.dy;
        b.dx=clamp(b.dx,-10,10); b.dy=clamp(b.dy,-10,10);
  
        /* wall bounce */
        if(b.x<b.r||b.x>CW-b.r) b.dx*=-1;
        if(b.y<b.r)             b.dy*=-1;
  
        /* paddle collision – robust */
        const goingDown=b.dy>0;
        const wasAbove=b.prevY<=P.y-b.r;
        const isBelowOrTouching=b.y+b.r>=P.y;
        const withinX=b.x>P.x && b.x<P.x+P.w;
        if(goingDown&&wasAbove&&isBelowOrTouching&&withinX){
          b.dy*=-1;
          b.y=P.y-b.r;
          const hit=(b.x-(P.x+P.w/2))/(P.w/2);
          b.dx+=hit*0.9;
          beep(1040);
        }
  
        /* brick collision */
        const row=Math.floor((b.y-GRID.offTop)/(GRID.h+GRID.pad));
        const col=Math.floor((b.x)/(GRID.w+GRID.pad));
        if(row>=0&&row<GRID.rows&&col>=0&&col<GRID.cols&&bricks[row][col]){
          const brick=bricks[row][col];
          if(!b.super){                                // super‑ball passes through
            b.dy*=-1;
          }
          brick.hp--;
          if(brick.hp===0){
            bricks[row][col]=0;
            score+=brick.score;
            maybePowerEffect(brick.x+GRID.w/2,brick.y+GRID.h/2);
          }
          beep(1320);
          if(score>best){best=score;sessionStorage.setItem("mkBest",best);}
          updateHUD();
          if(allBricksGone()) nextLevel();
        }
  
        /* lose ball */
        if(b.y-b.r>CH){
          BALLS.splice(BALLS.indexOf(b),1);
          if(!BALLS.length){ lives--; beep(180); if(lives<=0){gameOver();}else{BALLS.push(makeBall());}}
          updateHUD();
        }
      });
  
      /* update power‑ups */
      powerEffs.forEach(pu=>{
        pu.y+=pu.v;
        if(pu.y>CH-20 && pu.x>P.x && pu.x<P.x+P.w){
          applyEffect(pu.type); powerEffs.splice(powerEffs.indexOf(pu),1); beep(980);
        }else if(pu.y>CH){ powerEffs.splice(powerEffs.indexOf(pu),1);}
      });
  
      /* starfield */
      starfield.forEach(s=>{
        s.y+=s.v;
        if(s.y>CH) { s.y= -2; s.x=rnd(0,CW);}
      });
    }
  
    /* ―――――――― Draw ――――――― */
    function draw(ts){
      ctx.fillStyle = "#000"; ctx.fillRect(0,0,CW,CH);
  
      /* starfield */
      ctx.fillStyle="#222";
      starfield.forEach(s=>ctx.fillRect(s.x,s.y,2,2));
  
      /* bricks */
      bricks.flat().forEach(br=>{
        if(!br) return;
        ctx.fillStyle=br.color;
        ctx.fillRect(br.x,br.y,GRID.w,GRID.h);
      });
  
      /* paddle */
      ctx.fillStyle="#fff";
      if(P.glow>0){
        ctx.shadowColor="#0f0"; ctx.shadowBlur=20*P.glow;
      }
      ctx.fillRect(P.x,P.y,P.w,P.h);
      ctx.shadowBlur=0;
  
      /* balls */
      BALLS.forEach(b=>{
        ctx.fillStyle=b.super?"#0f0":"#fff";
        ctx.beginPath(); ctx.arc(b.x,b.y,b.r,0,Math.PI*2); ctx.fill();
      });
  
      /* power‑ups icons */
      ctx.font="22px serif";
      powerEffs.forEach(pu=>ctx.fillText(pu.emoji,pu.x-10,pu.y+8));
  
      /* fps */
      frameCount++; if(ts-lastFpsUpdate>500){
        fps=Math.round(frameCount/((ts-lastFpsUpdate)/1000));
        frameCount=0; lastFpsUpdate=ts;
      }
      ctx.font="10px monospace"; ctx.fillStyle="#0f0"; ctx.fillText(`FPS ${fps}`,4,12);
    }
  
    /* ――――――― Utility functions ―――――― */
    function makeBall(){
      const dir=rnd(-1,1); return{r:6,x:CW/2,y:CH/2,dx:2*(dir||1),dy:-2,prevX:0,prevY:0,super:false};
    }
    function resetBricks(){
      bricks=[];
      const palette=["#ff7777","#ffc74d","#48c6ff","#7aff7a"];
      for(let r=0;r<GRID.rows;r++){
        bricks[r]=[];
        for(let c=0;c<GRID.cols;c++){
          const hp=r===0&&level>1?2:1;
          bricks[r][c]={
            hp,
            x:c*(GRID.w+GRID.pad),
            y:GRID.offTop+r*(GRID.h+GRID.pad),
            color:hp===2?"#999":palette[(r+c)%palette.length],
            score:hp===2?20:10
          };
        }
      }
    }
    function allBricksGone(){return bricks.flat().every(b=>!b);}
    function nextLevel(){
      level++; resetBricks(); BALLS.length=0; BALLS.push(makeBall());
      BALLS.forEach(b=>{b.dx*=1.15;b.dy*=1.15;});
      beep(660); beep(880);
      updateHUD();
    }
  
    const powerEffs=[];
    function maybePowerEffect(x,y){
      const n=Math.random();
      if(n<0.10)spawnEff("expand",x,y,"🟢");
      else if(n<0.18)spawnEff("multiball",x,y,"🔴");
      else if(n<0.26)spawnEff("slow",x,y,"🟣");
      else if(n<0.32)spawnEff("super",x,y,"⭐");
      else if(n<0.38)spawnEff("extra",x,y,"💜");
      else if(n<0.44)spawnEff("shrink",x,y,"🟡"); // negative effect
    }
    function spawnEff(type,x,y,emoji){ powerEffs.push({type,x,y,v:2,emoji}); }
    function applyEffect(type){
      if(type==="expand"){P.w=Math.min(P.w+30,150);P.glow=1;}
      if(type==="shrink"){P.w=Math.max(P.w-20,60);P.glow=0.5;}
      if(type==="multiball" && BALLS.length<4){BALLS.push(makeBall(),makeBall());}
      if(type==="slow")BALLS.forEach(b=>{b.dx*=0.8;b.dy*=0.8;});
      if(type==="super"){BALLS.forEach(b=>{b.super=true;});
        setTimeout(()=>BALLS.forEach(b=>b.super=false),5000);}
      if(type==="extra"){lives=Math.min(lives+1,5);}
      updateHUD();
    }
  
    function makeStarfield(){
      starfield=[]; for(let i=0;i<60;i++){
        starfield.push({x:rnd(0,CW),y:rnd(0,CH),v:rnd(0.4,1.2)});
      }
    }
  
    function updateHUD(){
      head.textContent=`Lvl ${level} | Score ${score} | Lives ${"💙".repeat(lives)} | Best ${best}`+
                       (paused?" | Paused":"");
    }
    function togglePause(){paused=!paused;updateHUD();}
    function gameOver(){ over=true; head.textContent=`GAME OVER – Score ${score}`; beep(120); }
    function quit(){
      over=true; cleanup(); onGameExit();
    }
    function cleanup(){
      document.removeEventListener("keydown",kDown);
      document.removeEventListener("keyup",kUp);
      window.removeEventListener("mousemove",mouseMove);
      window.removeEventListener("touchmove",touchMove);
    }
  
    /* Keyboard / mouse */
    function kDown(e){
      const k=e.key.toLowerCase();
      if(k==="p"){togglePause();return;}
      if(k==="m"){muted=!muted;btnMute.classList.toggle("btn-warning",muted);return;}
      keys[k]=true;
    }
    function kUp(e){ keys[e.key.toLowerCase()]=false; }
    function mouseMove(e){
      const rect=cvs.getBoundingClientRect();
      P.x=clamp(e.clientX-rect.left-P.w/2,0,CW-P.w);
    }
    function touchMove(e){ e.preventDefault(); mouseMove(e.touches[0]); }
  }
  
  /* ─── Konami helpers ───────────────────────────────────────────────── */
  function injectRetroCSS(){
    if(qs("#kon-css"))return;
    const s=document.createElement("style"); s.id="kon-css";
    s.textContent=`@import url('https://fonts.googleapis.com/css2?family=Press Start 2P&display=swap');
    @keyframes pixelRainbow{0%{background-position:0 0}100%{background-position:400% 0}}
    .pixel‑rainbow{background:linear-gradient(270deg,#ff0000,#ffa500,#ffff00,#00ff00,#00bfff,#8a2be2,#ff1493,#ff0000);
                   background-size:400% 100%;animation:pixelRainbow 8s linear infinite}`;
    document.head.appendChild(s);
  }
  function beep(freq){
    try{
      const ctx=new (AudioContext||webkitAudioContext)();
      const osc=ctx.createOscillator(), g=ctx.createGain();
      if(window.__mutedKonami)return;
      osc.type="square"; osc.frequency.setValueAtTime(freq,ctx.currentTime);
      g.gain.setValueAtTime(0.05,ctx.currentTime);
      osc.connect(g).connect(ctx.destination); osc.start(); osc.stop(ctx.currentTime+0.18);
    }catch{}
  }
  function fireworks(){
    if(!window.confetti)return;
    const end=Date.now()+1500;
    (function frame(){
      window.confetti({particleCount:25,startVelocity:25,spread:360,
                       origin:{x:Math.random(),y:Math.random()-0.2}});
      if(Date.now()<end)requestAnimationFrame(frame);
    })();
  }
  
  /* ═══════════════════════ 8. PROGRESS BAR ═══════════════════════════ */
  function setupReadingProgressBar(){
    const bar=qs("#readingProgressBar"); if(!bar)return;
    window.addEventListener("scroll",()=>{
      const max=document.body.scrollHeight-innerHeight;
      bar.style.width=`${(document.documentElement.scrollTop/max)*100}%`;
    });
  }
  
  /* ═══════════════════════ 9. LAZY‑IMAGES ═══════════════════════════ */
  function setupLazyLoadingImages(){
    const imgs=qsa(".lazy-image"); if(!imgs.length)return;
    const io=new IntersectionObserver((ents,obs)=>{
      ents.forEach(e=>{
        if(e.isIntersecting){
          const img=e.target,src=img.getAttribute("data-src");
          if(src){img.src=src;img.removeAttribute("data-src");}
          obs.unobserve(img);
        }
      });
    },{threshold:0.1});
    imgs.forEach(i=>io.observe(i));
  }
  
  /* ═══════════════════════ 10. SECTION HIGHLIGHT ════════════════════ */
  function setupSectionHighlight(){
    const secs=qsa("section[id]"); const links=qsa('.navbar-nav a[href*="#"]'); if(!secs.length)return;
    const io=new IntersectionObserver(ents=>{
      ents.forEach(ent=>{
        if(ent.isIntersecting){
          const id=ent.target.id;
          links.forEach(l=>l.classList.toggle("active",l.hash.slice(1)===id));
        }
      });
    },{threshold:0.3});
    secs.forEach(s=>io.observe(s));
  }
  
  /* ═══════════════════════ 11. COPY‑CODE BUTTONS ════════════════════ */
  function addCopyButtonsToCode(){
    qsa("pre>code").forEach(code=>{
      if(code.parentElement.querySelector(".copy-btn"))return;
      const b=document.createElement("button");
      b.className="btn btn-sm btn-outline-success copy-btn";
      b.style.cssText="position:absolute;top:8px;right:8px;z-index:1;";
      b.innerHTML='<i class="bi bi-clipboard"></i>';
      b.onclick=()=>{
        navigator.clipboard.writeText(code.innerText)
          .then(()=>b.innerHTML='<i class="bi bi-clipboard-check"></i>')
          .catch(()=>alert("Copy failed"));
        setTimeout(()=>b.innerHTML='<i class="bi bi-clipboard"></i>',2000);
      };
      code.parentElement.style.position="relative";
      code.parentElement.appendChild(b);
    });
  }
  
  /* ═══════════════════════ 12. READ‑TIME BADGE ══════════════════════ */
  function scheduleReadTimeBadge(){
    if(!location.pathname.toLowerCase().endsWith("documentation.html"))return;
    window.addEventListener("load",()=>{
      const root=qs("#docsContent")||document.body;
      const build=()=>{
        const words=root.innerText.trim().split(/\s+/).filter(Boolean).length;
        const mins=Math.max(1,Math.round(words/200));
        const badge=document.createElement("div");
        badge.className="badge bg-success shadow position-fixed top-0 end-0 m-3";
        badge.style.zIndex="1060"; badge.textContent=`~${mins} min read`;
        document.body.appendChild(badge); setTimeout(()=>badge.remove(),7000);
      };
      new MutationObserver((_,o)=>{o.disconnect();build();})
        .observe(root,{childList:true,subtree:true});
      setTimeout(build,2000);
    });
  }
  
  /* ═══════════════════════ 13. DOWNLOAD PAGE EXTRAS ═════════════════ */
  function detectOSAndHighlight(){
    const ua=navigator.userAgent.toLowerCase();
    const id=ua.includes("win")?"winCard":ua.includes("mac")?"macCard":
             (ua.includes("linux")||ua.includes("ubuntu"))?"linuxCard":null;
    id&&qs("#"+id)?.classList.add("os-highlight");
  }
  
  function restoreRatings(){
    qsa(".stars").forEach(c=>{
      const os=c.dataset.os; const saved=localStorage.getItem(`rating-${os}`);
      if(saved) paint(os,+saved);
    });
    qsa(".star").forEach(s=>{
      s.onclick=function(){
        const r=+this.dataset.star, os=this.parentNode.dataset.os;
        localStorage.setItem(`rating-${os}`,r); paint(os,r);
      };
    });
    function paint(os,r){
      qsa(`.stars[data-os="${os}"] .star`).forEach(st=>{
        const v=+st.dataset.star;
        st.classList.toggle("text-warning",v<=r);
        st.classList.toggle("text-secondary",v>r);
      });
    }
  }
  
  window.copyCommand=cmd=>navigator.clipboard.writeText(cmd).then(()=>alert(`Copied: ${cmd}`));
  window.simulateInstall=os=>{
    if(!["win","mac","linux"].includes(os))return;
    const k=`${os}Count`,n=(+localStorage.getItem(k)||0)+1;
    localStorage.setItem(k,n); updateInstallDisplay(os,n);
    window.confetti&&window.confetti({particleCount:60,spread:55,origin:{y:0.6}});
  };
  function updateInstallDisplay(os,n){
    const id={win:"winInstalls",mac:"macInstalls",linux:"linuxInstalls"}[os];
    qs("#"+id)&&(qs("#"+id).textContent=n);
  }
  function animateInstallCounters(){
    ["win","mac","linux"].forEach(os=>{
      const cnt=+localStorage.getItem(`${os}Count`)||0;
      animateCounter({win:"winInstalls",mac:"macInstalls",linux:"linuxInstalls"}[os],0,cnt,800);
    });
  }
  function animateCounter(id,start,end,dur){
    const el=qs("#"+id); if(!el)return;
    let st=null;
    const step=ts=>{
      if(!st)st=ts;
      const p=Math.min((ts-st)/dur,1);
      el.textContent=Math.floor(start+p*(end-start));
      if(p<1)requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  
  /* ═══════════════════════ 14. NAVBAR HIGHLIGHT ═════════════════════ */
  window.highlightCurrentPageNav=()=>{
    const parts=location.pathname.split("/"); let page=parts.pop()||"index.html";
    const hash=location.hash;
    if(page.toLowerCase()==="index.html"){
      mark(hash?hash.slice(1):"hero");
    }else mark(page);
    function mark(id){
      qsa(".navbar-nav a").forEach(a=>{
        const href=a.getAttribute("href")||"";
        const file=href.split("/").pop().toLowerCase();
        a.classList.toggle("active",file===id.toLowerCase()||href.endsWith("#"+id));
      });
    }
  };
  
  // expose navbar helper
  window.highlightCurrentPageNav = highlightCurrentPageNav;
  // expose the Konami overlay launcher globally
  window.launchKonamiOverlay = openKonamiPortal;
  
})();  /* END IIFE */
