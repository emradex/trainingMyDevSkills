// Content is kept separate from interactions so the prototype can grow into components.
const copy = {
  en: {
    skip:'Skip to content',navAbout:'About',navWork:'Projects',navLab:'Lab',navContact:'Contact',
    heroLabel:'DEVELOPMENT + CREATIVE EXPLORATION',logic:'Logic.',form:'Form.',character:'Character<span class="acid">.</span>',
    liveArt:'FORM STUDY / 01',artHint:'MOVE YOUR POINTER. CHANGE THE PERSPECTIVE.',motionStart:'Animate',
    intro:'I’m Mauro Radesca. I’m interested in building software that works well and digital experiences with a character of their own.',explore:'Explore the portfolio',heroFooter:'CURIOSITY AS A STARTING POINT.',
    aboutLabel:'01 / BEHIND THE CODE',aboutTitle:'A technical perspective.<br>A creative curiosity.',aboutLead:'I’m interested in the point where logic meets design.',
    aboutBody:'I want to develop applications, explore interfaces and understand the decisions that make an idea work. This site is part of that journey: a place to build, test and share what I learn.',
    interest1:'WEB DEVELOPMENT',interest2:'INTERFACES',interest3:'EXPERIMENTATION',
    principle1:'Think first.',principle1Body:'Understand the problem before choosing the tools.',principle2:'Make it personal.',principle2Body:'Seek clarity and leave room for an unexpected idea.',principle3:'Keep iterating.',principle3Body:'Test, review and learn with every version.',
    workLabel:'02 / PROJECTS',workMeta:'A FIRST STEP, IN REAL TIME',workTitle:'The site is also<br>the project<span class="acid">.</span>',workIntro:'The first case is this space.<br>The next ones, when they’re ready.',
    inDevelopment:'IN DEVELOPMENT',projectTitle:'Personal portfolio',projectDescription:'Identity, interface and visual exploration. A project that grows with me.',projectCta:'Explore the process',workNote:'NO OTHER PUBLISHED PROJECTS FOR NOW.',
    labLabel:'03 / LABORATORY',labTitle:'A little order.<br>A little noise.',labBody:'A small exploration of lines, rhythm and contrast. Move the slider and find the point between structure and chaos.',density:'DENSITY',structure:'STRUCTURE',noise:'NOISE',
    contactLabel:'04 / NEXT STEP',contactTitle:'Ideas get better<br> when you <em>share them.</em>',contactBody:'This space is just getting started.<br>Contact channels will follow in the next iteration.',contactPending:'CONTACT DETAILS COMING SOON',footerEdition:'/ PERSONAL EDITION 02',backTop:'BACK TO TOP',
    caseIntro:'A website to show my work. And an opportunity to work on how I present myself.',caseGoalTitle:'The goal',caseGoal:'Create a personal developer identity, combining clarity, visual judgment and interactions you can actually try.',
    caseDesignTitle:'The visual direction',caseDesign:'Deep black, bold typography and a combination of acid lime and violet. An editorial composition with a generative piece that responds to your pointer.',caseCurrentTitle:'What works today',caseCurrent:'Light and dark themes, Spanish and English, an interactive sculpture and an adjustable line experiment. This prototype uses HTML, CSS, JavaScript and Canvas, with no external dependencies.',
    caseNextTitle:'The next iteration',caseNext:'Refine the personal copy, add contact channels and prepare the React and TypeScript architecture. That migration is not part of this version yet.',caseFoot:'AN OPEN PROCESS. NOT A FINISHED CASE.'
  }
};
const elements = [...document.querySelectorAll('[data-i18n]')];
const spanish = Object.fromEntries(elements.map(el => [el.dataset.i18n, el.innerHTML]));
copy.es = spanish;
let language = 'es';
let moving = false;
let frameId = 0;
let turn = 0;
const root = document.documentElement;
const themeButton = document.querySelector('.theme-toggle');
const motionButton = document.getElementById('motion-toggle');
const canvas = document.getElementById('sculpture');
const context = canvas.getContext('2d');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
function readPreference(key) { try { return localStorage.getItem('mr-v2-' + key); } catch { return null; } }
function savePreference(key,value) { try { localStorage.setItem('mr-v2-' + key,value); } catch {} }
function syncLabels() {
  const light = root.dataset.theme === 'light';
  const themeLabel = language === 'es' ? (light ? 'Activar modo oscuro' : 'Activar modo claro') : (light ? 'Switch to dark mode' : 'Switch to light mode');
  themeButton.setAttribute('aria-label',themeLabel);
  themeButton.title = themeLabel;
  document.querySelector('meta[name="theme-color"]').content = light ? '#eeeee7' : '#0a0a0c';
  motionButton.setAttribute('aria-pressed',String(moving));
  motionButton.querySelector('[data-i18n]').textContent = moving ? (language === 'es' ? 'Pausar' : 'Pause') : copy[language].motionStart;
  motionButton.querySelector('.motion-icon').textContent = moving ? 'Ⅱ' : '▷';
  document.getElementById('close-project').setAttribute('aria-label',language === 'es' ? 'Cerrar proyecto' : 'Close project');
  document.querySelector('nav').setAttribute('aria-label',language === 'es' ? 'Navegación principal' : 'Main navigation');
  document.querySelector('.languages').setAttribute('aria-label',language === 'es' ? 'Idioma' : 'Language');
  document.querySelector('.header .wordmark').setAttribute('aria-label',language === 'es' ? 'Mauro Radesca, inicio' : 'Mauro Radesca, home');
  canvas.setAttribute('aria-label',language === 'es' ? 'Escultura generativa de anillos en lima y violeta, que responde al puntero' : 'Generative lime and violet ring sculpture responding to your pointer');
  document.getElementById('moire').setAttribute('aria-label',language === 'es' ? 'Trama geométrica interactiva en violeta y lima' : 'Interactive geometric line study in violet and lime');
}
function setLanguage(lang) {
  language = lang;
  root.lang = lang;
  for (const el of elements) el.innerHTML = copy[lang][el.dataset.i18n];
  document.querySelectorAll('.lang').forEach(button=>{
    button.classList.toggle('active',button.dataset.lang === lang);
    button.setAttribute('aria-pressed',String(button.dataset.lang === lang));
  });
  document.title = lang === 'es' ? 'Mauro Radesca — Desarrollo & exploración' : 'Mauro Radesca — Development & exploration';
  document.querySelector('meta[name="description"]').content = lang === 'es' ? 'Mauro Radesca — Desarrollo de software, interfaces y exploración creativa. Portfolio personal.' : 'Mauro Radesca — Software development, interfaces and creative exploration. Personal portfolio.';
  syncLabels();
  savePreference('language',lang);
}
document.querySelectorAll('.lang').forEach(button=>button.addEventListener('click',()=>setLanguage(button.dataset.lang)));
root.dataset.theme = readPreference('theme') === 'light' ? 'light' : 'dark';
themeButton.addEventListener('click',()=>{
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  savePreference('theme',root.dataset.theme);
  syncLabels();
  drawSculpture();
  drawMoire();
});
setLanguage(readPreference('language') === 'en' ? 'en' : 'es');

// A toroidal wire sculpture rendered locally, with no image or 3D dependency.
let pointer = {x:0,y:0};
let canvasWidth = 0;
let canvasHeight = 0;
const TAU = Math.PI * 2;
function projectPoint(x,y,z) {
  const ax = .85 + pointer.y * .4;
  const ay = -.2 + pointer.x * .55 + turn;
  const az = -.48;
  let y1 = y*Math.cos(ax)-z*Math.sin(ax), z1 = y*Math.sin(ax)+z*Math.cos(ax);
  let x1 = x*Math.cos(ay)+z1*Math.sin(ay), z2 = -x*Math.sin(ay)+z1*Math.cos(ay);
  const x2 = x1*Math.cos(az)-y1*Math.sin(az), y2 = x1*Math.sin(az)+y1*Math.cos(az);
  const perspective = 4.8/(4.8-z2);
  const scale = Math.min(canvasWidth*.265,canvasHeight*.30);
  return {x:canvasWidth*.5+x2*scale*perspective,y:canvasHeight*.49+y2*scale*perspective,z:z2};
}
function surface(u,v) {
  const radius = .40 + .055*Math.sin(u*3);
  return projectPoint((1.05+radius*Math.cos(v))*Math.cos(u),(1.05+radius*Math.cos(v))*Math.sin(u),radius*Math.sin(v));
}
function drawSculpture() {
  if (!context || !canvasWidth) return;
  const styles = getComputedStyle(root);
  const lime = styles.getPropertyValue('--acid').trim(), violet = styles.getPropertyValue('--violet').trim();
  const fg = styles.getPropertyValue('--fg').trim();
  context.clearRect(0,0,canvasWidth,canvasHeight);
  const paths = [];
  for (let ring=0;ring<48;ring++) {
    const u=ring/48*TAU, points=[];
    for (let step=0;step<=64;step++) points.push(surface(u,step/64*TAU));
    paths.push({points,color:ring>26&&ring<44?violet:lime,z:points.reduce((sum,p)=>sum+p.z,0)/points.length});
  }
  for (let ring=0;ring<9;ring++) {
    const v=ring/9*TAU, points=[];
    for(let step=0;step<=112;step++) points.push(surface(step/112*TAU,v));
    paths.push({points,color:ring%3===0?violet:lime,z:points.reduce((sum,p)=>sum+p.z,0)/points.length,thin:true});
  }
  paths.sort((a,b)=>a.z-b.z);
  for(const path of paths) {
    context.beginPath();
    path.points.forEach((point,index)=>index===0?context.moveTo(point.x,point.y):context.lineTo(point.x,point.y));
    context.strokeStyle=path.color;
    context.globalAlpha=path.thin?.3:Math.max(.2,Math.min(.9,.5+path.z*.28));
    context.lineWidth=path.thin?.65:.9;
    context.stroke();
  }
  context.globalAlpha=.9;
  context.fillStyle=fg;
  for(const u of [0,Math.PI*.65,Math.PI*1.3]) {
    const point=surface(u,0);
    context.fillRect(point.x-2,point.y-2,4,4);
  }
  context.globalAlpha=1;
}
function sizeCanvas() {
  const bounds=canvas.getBoundingClientRect();
  canvasWidth=bounds.width; canvasHeight=bounds.height;
  const ratio=Math.min(devicePixelRatio||1,2);
  canvas.width=Math.round(canvasWidth*ratio); canvas.height=Math.round(canvasHeight*ratio);
  context?.setTransform(ratio,0,0,ratio,0,0);
  drawSculpture();
}
new ResizeObserver(sizeCanvas).observe(canvas);
canvas.addEventListener('pointermove',event=>{
  const rect=canvas.getBoundingClientRect();
  pointer={x:((event.clientX-rect.left)/rect.width-.5)*2,y:((event.clientY-rect.top)/rect.height-.5)*2};
  document.getElementById('coord-x').textContent=pointer.x.toFixed(2);
  document.getElementById('coord-y').textContent=pointer.y.toFixed(2);
  if(!moving) drawSculpture();
});
canvas.addEventListener('pointerleave',()=>{
  pointer={x:0,y:0};
  document.getElementById('coord-x').textContent='0.00';
  document.getElementById('coord-y').textContent='0.00';
  if(!moving) drawSculpture();
});
let lastTime=0;
function animate(time) {
  if(!moving) return;
  if(lastTime) turn+=Math.min(time-lastTime,60)*.00015;
  lastTime=time;
  drawSculpture();
  frameId=requestAnimationFrame(animate);
}
function stopMotion() { moving=false; cancelAnimationFrame(frameId); lastTime=0; syncLabels(); }
motionButton.addEventListener('click',()=>{
  if(moving) stopMotion();
  else {moving=true;lastTime=0;syncLabels();frameId=requestAnimationFrame(animate);}
});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&moving)stopMotion();});
reducedMotion.addEventListener('change',()=>{if(reducedMotion.matches)stopMotion();});

// Adjustable vector line study: the user's control directly changes the geometry.
const density=document.getElementById('density');
function drawMoire() {
  const count=Number(density.value), group=document.getElementById('moire-lines');
  const styles=getComputedStyle(root), colors=[styles.getPropertyValue('--violet').trim(),styles.getPropertyValue('--acid').trim()];
  const fragment=document.createDocumentFragment();
  for(let family=0;family<2;family++) {
    const angle=(family?-.66:.66), cx=family?270:230;
    for(let line=0;line<count;line++) {
      const radius=18+(line/count)*172;
      const points=[];
      for(let step=0;step<=80;step++) {
        const t=step/80*TAU;
        const x=radius*Math.cos(t), y=(52+radius*.45)*Math.sin(t)+Math.sin(t*3)*((count-12)/60)*14;
        points.push([cx+x*Math.cos(angle)-y*Math.sin(angle),200+x*Math.sin(angle)+y*Math.cos(angle)]);
      }
      const path=document.createElementNS('http://www.w3.org/2000/svg','path');
      path.setAttribute('d',points.map((p,i)=>(i?'L':'M')+p[0].toFixed(2)+','+p[1].toFixed(2)).join(' ')+'Z');
      path.setAttribute('stroke',colors[family]);path.setAttribute('stroke-width','.8');path.setAttribute('fill','none');path.setAttribute('opacity',family?'.75':'.85');
      fragment.append(path);
    }
  }
  group.replaceChildren(fragment);
  document.getElementById('density-value').value=String(count);
  document.getElementById('signal-value').textContent=(1-count/100).toFixed(2);
}
density.addEventListener('input',drawMoire);
drawMoire();

const dialog=document.getElementById('project-dialog');
document.getElementById('open-project').addEventListener('click',()=>dialog.showModal());
document.getElementById('close-project').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{
  if(event.target!==dialog)return;
  const bounds=dialog.getBoundingClientRect();
  if(event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom) dialog.close();
});
const progress=document.querySelector('.reading-progress');
let scrollQueued=false;
function updateProgress() {
  const total=document.documentElement.scrollHeight-innerHeight;
  progress.style.width=(total>0?Math.min(100,scrollY/total*100):0)+'%';
  scrollQueued=false;
}
window.addEventListener('scroll',()=>{if(!scrollQueued){scrollQueued=true;requestAnimationFrame(updateProgress);}},{passive:true});
window.addEventListener('resize',updateProgress);
const navLinks=[...document.querySelectorAll('nav a')];
const observer=new IntersectionObserver(entries=>{
  for(const entry of entries) if(entry.isIntersecting) {
    navLinks.forEach(link=>{
      if(link.getAttribute('href')==='#'+entry.target.id)link.setAttribute('aria-current','location');
      else link.removeAttribute('aria-current');
    });
  }
},{rootMargin:'-15% 0px -50% 0px',threshold:0});
document.querySelectorAll('main>section[id],main>section>div.section').forEach(section=>observer.observe(section.id?section:section.parentElement));
updateProgress();
