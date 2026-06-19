/*
 * Hypermodes — Formula Animations
 * Pi river + Fibonacci spiral + particle effects
 */

// === PI DIGIT RIVER (index page only) ===
(function(){
  const c=document.getElementById('piCanvas');
  if(!c)return;
  const ctx=c.getContext('2d');
  let w,h;

  const pi='3.14159265358979323846264338327950288419716939937510'+
          '58209749445923078164062862089986280348253421170679'+
          '82148086513282306647093844609550582231725359408128';

  const chars=pi.split('');
  const drops=[];

  function resize(){w=c.width=window.innerWidth;h=c.height=window.innerHeight}
  resize();
  window.addEventListener('resize',resize);

  const cols=Math.floor(w/14);
  for(let i=0;i<cols;i++){
    drops.push({x:i*14+7,y:Math.random()*-h,speed:0.6+Math.random()*2,char:chars[i%chars.length],opacity:0});
  }

  function draw(){
    ctx.fillStyle='rgba(8,13,26,0.15)';
    ctx.fillRect(0,0,w,h);

    ctx.font='13px monospace';
    drops.forEach((d,i)=>{
      d.y+=d.speed;
      if(Math.random()<0.03)d.char=chars[Math.floor(Math.random()*chars.length)];
      // Fade in near top, fade out near bottom
      d.opacity=h>0?Math.max(0,Math.min(1,(d.y/h)*4))*0.08:0.04;
      ctx.fillStyle=`rgba(139,92,246,${d.opacity})`;
      if(d.y>h*0.1&&d.y<h)ctx.fillText(d.char,d.x,d.y);

      if(d.y>h+20){d.y=-20;d.char=chars[i%chars.length]}
    });
    requestAnimationFrame(draw);
  }

  draw();
})();

// === FIBONACCI SPIRAL SVG (global) ===
(function(){
  const s=document.getElementById('spiralCanvas');
  if(!s)return;

  const w=s.width=s.clientWidth||500;
  const h=s.height=s.clientHeight||500;
  const ctx=s.getContext('2d');

  let angle=0;
  const cx=w/2,cy=h/2;

  function draw(){
    ctx.clearRect(0,0,w,h);
    ctx.strokeStyle='rgba(139,92,246,0.12)';
    ctx.lineWidth=1;

    let r=10;
    angle+=0.003;
    ctx.beginPath();
    for(let t=0;t<200;t++){
      r=8*Math.pow(1.07,t/10);
      const a=angle+t*0.15;
      const x=cx+Math.cos(a)*r;
      const y=cy+Math.sin(a)*r;
      if(t===0)ctx.moveTo(x,y);
      else ctx.lineTo(x,y);
    }
    ctx.stroke();

    requestAnimationFrame(draw);
  }

  draw();
})();

// === Active nav ===
(function(){
  const p=location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.nav-links a').forEach(a=>{
    a.classList.toggle('active',a.getAttribute('href')===p);
  });
})();
