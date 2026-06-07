/* BCA PORTAL — subject.js */

const SYLLABUS = {
  1:{ subjects:[
    {code:"BCA-101",title:"Computer Fundamentals and Applications",credits:3,type:"Notes"},
    {code:"BCA-102",title:"Programming in C",credits:3,type:"Notes"},
    {code:"BCA-103",title:"Digital Logic",credits:3,type:"Notes"},
    {code:"BCA-104",title:"Mathematics-I",credits:3,type:"Exam Paper"},
    {code:"BCA-105",title:"Professional Communication and Ethics",credits:3,type:"Notes"},
    {code:"BCA-106",title:"Hardware Workshop",credits:1,type:"Lab Manual"},
  ]},
  2:{ subjects:[
    {code:"BCA-151",title:"Discrete Structure",credits:3,type:"Notes"},
    {code:"BCA-152",title:"Microprocessor and Computer Architecture",credits:3,type:"Notes"},
    {code:"BCA-153",title:"OOP in Java",credits:3,type:"Notes"},
    {code:"BCA-154",title:"Mathematics-II",credits:3,type:"Exam Paper"},
    {code:"BCA-155",title:"UX/UI Design",credits:3,type:"Notes"},
    {code:"BCA-156",title:"Principles of Management",credits:1,type:"Notes"},
  ]},
  3:{ subjects:[
    {code:"BCA-201",title:"Data Structure and Algorithms",credits:3,type:"Notes"},
    {code:"BCA-202",title:"Database Management System",credits:3,type:"Notes"},
    {code:"BCA-203",title:"Web Technology-I",credits:3,type:"Notes"},
    {code:"BCA-204",title:"System Analysis and Design",credits:3,type:"Notes"},
    {code:"BCA-205",title:"Probability and Statistics",credits:3,type:"Exam Paper"},
    {code:"BCA-206",title:"Applied Economics",credits:2,type:"Notes"},
  ]},
  4:{ subjects:[
    {code:"BCA-251",title:"Operating Systems",credits:3,type:"Notes"},
    {code:"BCA-252",title:"Software Engineering",credits:3,type:"Notes"},
    {code:"BCA-253",title:"Numerical Methods",credits:3,type:"Exam Paper"},
    {code:"BCA-254",title:"Python Programming",credits:3,type:"Notes"},
    {code:"BCA-255",title:"Web Technology-II",credits:3,type:"Notes"},
    {code:"BCA-256",title:"Project-I",credits:2,type:"Lab Manual"},
  ]},
  5:{ subjects:[
    {code:"BCA-301",title:"Computer Network",credits:3,type:"Notes"},
    {code:"BCA-302",title:"Artificial Intelligence",credits:3,type:"Notes"},
    {code:"BCA-303",title:"Advance Java Programming",credits:3,type:"Notes"},
    {code:"BCA-304",title:"MIS and e-Business",credits:3,type:"Notes"},
    {code:"BCA-305",title:"Society and Technology",credits:3,type:"Notes"},
    {code:"BCA-306",title:"Project-II",credits:3,type:"Lab Manual"},
  ]},
  6:{ subjects:[] }
};

function findSubject(code){
  for(const sem of Object.values(SYLLABUS)){
    const s=sem.subjects.find(s=>s.code===code);
    if(s) return s;
  }
  return null;
}

const params  = new URLSearchParams(location.search);
const subCode = params.get('code');
const subject = findSubject(subCode);

if(subject){
  document.title = subject.title+' — BCA Portal';
  document.getElementById('subject-title').textContent      = subject.title;
  document.getElementById('subject-code-badge').textContent = subject.code;
  document.getElementById('subject-type-badge').textContent = subject.type;
  document.getElementById('subject-credits').textContent    =
    subject.credits+' Credit'+(subject.credits!==1?'s':'')+' · '+subject.type;
}else{
  document.title='Subject Not Found — BCA Portal';
  document.getElementById('subject-title').textContent='Subject Not Found';
}

const TAB_ICONS={notes:'menu_book',questionPapers:'assignment',labReports:'science',assignments:'edit_note'};
const LABEL_MAP={notes:'notes',questionPapers:'question papers',labReports:'lab reports',assignments:'assignments'};
const subjectFiles=(FILES&&subCode&&FILES[subCode])||{notes:[],questionPapers:[],labReports:[],assignments:[]};

function renderFileList(tabKey){
  const files=subjectFiles[tabKey]||[];
  const listEl=document.getElementById('list-'+tabKey);
  const countEl=document.getElementById('count-'+tabKey);
  if(countEl) countEl.textContent=files.length;
  if(!files.length){
    listEl.innerHTML=`<div class="empty-tab">
      <span class="material-symbols-outlined">${TAB_ICONS[tabKey]}</span>
      <h3>No files yet</h3>
      <p>No ${LABEL_MAP[tabKey]} uploaded for this subject yet.</p>
    </div>`;
    return;
  }
  listEl.innerHTML=files.map((f,i)=>`
    <div class="file-item" data-tab="${tabKey}" data-index="${i}" tabindex="0" role="button">
      <div class="file-icon"><span class="material-symbols-outlined">picture_as_pdf</span></div>
      <div class="file-info">
        <div class="file-title">${f.title}</div>
        <div class="file-date">Uploaded: ${f.date}</div>
      </div>
      <span class="material-symbols-outlined file-arrow">arrow_forward</span>
    </div>`).join('');
  listEl.querySelectorAll('.file-item').forEach(item=>{
    item.addEventListener('click',()=>openFile(item.dataset.tab,+item.dataset.index));
    item.addEventListener('keydown',e=>{if(e.key==='Enter')openFile(item.dataset.tab,+item.dataset.index);});
  });
}
['notes','questionPapers','labReports','assignments'].forEach(renderFileList);

document.querySelectorAll('.tab-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('panel-'+btn.dataset.tab).classList.add('active');
    document.getElementById('viewer-section').classList.remove('visible');
  });
});

function openFile(tabKey,index){
  const file=(subjectFiles[tabKey]||[])[index];
  if(!file) return;
  document.querySelectorAll('.file-item').forEach(i=>i.classList.remove('active-file'));
  document.querySelectorAll(`[data-tab="${tabKey}"][data-index="${index}"]`).forEach(i=>i.classList.add('active-file'));
  document.getElementById('viewer-file-title').textContent=file.title;

  const viewerSection=document.getElementById('viewer-section');
  viewerSection.classList.add('visible');
  viewerSection.scrollIntoView({behavior:'smooth',block:'start'});

  /* Small delay so the section is visible and laid out before PDF.js
     measures the container width. Prevents blurry first render on mobile. */
  setTimeout(()=>loadPDF(file.file), 80);
}

/* ── PDF.js continuous scroll viewer ── */
pdfjsLib.GlobalWorkerOptions.workerSrc=
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

let pdfDoc=null, totalPages=1, zoomScale='auto', pageCanvases=[];

const pagesContainer = document.getElementById('pdf-pages-container');
const scrollWrap     = document.getElementById('canvas-wrap');   /* scroll element */
const pageInfo       = document.getElementById('page-info');
const loadingEl      = document.getElementById('pdf-loading');
const noPdfEl        = document.getElementById('no-pdf-state');
const singleCanvas   = document.getElementById('pdf-canvas');

/* Available width — measured after layout settles */
function containerWidth(){
  if(!scrollWrap) return window.innerWidth * 0.88;
  const cs  = getComputedStyle(scrollWrap);
  const pad = parseFloat(cs.paddingLeft||0) + parseFloat(cs.paddingRight||0);
  const w   = scrollWrap.clientWidth - pad - 24;
  /* If clientWidth is 0 the element hasn't painted yet — fall back to window */
  return Math.max(w > 10 ? w : window.innerWidth * 0.88, 40);
}

function calcScale(pageViewport){
  if(zoomScale!=='auto') return zoomScale;
  const cw  = containerWidth();
  /* Multiply by devicePixelRatio so canvas pixels match screen pixels.
     This makes the PDF sharp on high-DPI / retina mobile screens.
     CSS width:100% scales it back down visually, keeping layout fluid. */
  const dpr = Math.min(window.devicePixelRatio || 1, 3);
  const fit = cw / pageViewport.width;
  return Math.min(fit * dpr, 3.0 * dpr);
}

/* Render one page into its canvas */
function renderOnePage(pageNum){
  if(!pdfDoc) return Promise.resolve();
  return pdfDoc.getPage(pageNum).then(page=>{
    const baseVp = page.getViewport({scale:1});
    const sc     = calcScale(baseVp);
    const vp     = page.getViewport({scale:sc});
    const canvas = pageCanvases[pageNum-1];
    if(!canvas) return;
    canvas.width  = vp.width;
    canvas.height = vp.height;
    /* CSS makes it fluid — JS only sets pixel dimensions for sharpness */
    canvas.style.width  = '100%';
    canvas.style.height = 'auto';
    return page.render({canvasContext:canvas.getContext('2d'),viewport:vp}).promise;
  });
}

/* Build all page wrappers and render */
function renderAllPages(){
  if(!pdfDoc) return;

  /* Clear old pages but keep special state elements */
  const oldWraps = pagesContainer.querySelectorAll('.pdf-page-wrap');
  oldWraps.forEach(w=>w.remove());
  pageCanvases=[];

  for(let i=1;i<=totalPages;i++){
    const wrap   = document.createElement('div');
    wrap.className    = 'pdf-page-wrap';
    wrap.dataset.page = i;

    const lbl = document.createElement('div');
    lbl.className   = 'pdf-page-label';
    lbl.textContent = 'Page '+i+' of '+totalPages;

    const canvas = document.createElement('canvas');
    canvas.className='pdf-page-canvas';

    wrap.appendChild(lbl);
    wrap.appendChild(canvas);
    pagesContainer.appendChild(wrap);
    pageCanvases.push(canvas);
  }

  /* Render first 3 pages eagerly, rest lazily */
  const eager=Math.min(3,totalPages);
  const queue=[];
  for(let i=1;i<=eager;i++) queue.push(renderOnePage(i));
  Promise.all(queue).then(()=>{
    for(let i=eager+1;i<=totalPages;i++) renderOnePage(i);
  });
}

function loadPDF(url){
  pdfDoc=null; pageCanvases=[];
  const oldWraps=pagesContainer.querySelectorAll('.pdf-page-wrap');
  oldWraps.forEach(w=>w.remove());
  singleCanvas.style.display='none';
  loadingEl.style.display='flex';
  noPdfEl.style.display='none';

  pdfjsLib.getDocument(url).promise
    .then(pdf=>{
      pdfDoc=pdf; totalPages=pdf.numPages; zoomScale='auto';
      loadingEl.style.display='none';
      pageInfo.textContent='Page 1 of '+totalPages;
      const ji=document.getElementById('page-jump-input');
      if(ji){ji.max=totalPages;ji.value=1;}

      /* Wait two animation frames so the viewer section fully paints and
         scrollWrap.clientWidth returns the real layout width before we
         calculate scale. Without this, mobile gets width=0 → blurry PDF. */
      requestAnimationFrame(()=>{
        requestAnimationFrame(()=>{
          renderAllPages();
        });
      });
    })
    .catch(()=>{
      loadingEl.style.display='none';
      noPdfEl.style.display='flex';
    });
}

/* Scroll → update page indicator */
scrollWrap && scrollWrap.addEventListener('scroll',()=>{
  if(!pdfDoc) return;
  const mid=scrollWrap.scrollTop+scrollWrap.clientHeight*0.4;
  let cur=1;
  pagesContainer.querySelectorAll('.pdf-page-wrap').forEach(wrap=>{
    if(wrap.offsetTop<=mid) cur=parseInt(wrap.dataset.page);
  });
  pageInfo.textContent='Page '+cur+' of '+totalPages;
  const ji=document.getElementById('page-jump-input');
  if(ji) ji.value=cur;
});

/* Scroll to page */
function scrollToPage(num){
  if(!pdfDoc||num<1||num>totalPages) return;
  const wrap=pagesContainer.querySelector(`[data-page="${num}"]`);
  if(wrap&&scrollWrap){
    scrollWrap.scrollTo({top:wrap.offsetTop-8,behavior:'smooth'});
  }
}

/* Toolbar */
document.getElementById('prev-page').addEventListener('click',()=>{
  const ji=document.getElementById('page-jump-input');
  const cur=parseInt(ji?ji.value:1)||1;
  if(cur>1) scrollToPage(cur-1);
});
document.getElementById('next-page').addEventListener('click',()=>{
  const ji=document.getElementById('page-jump-input');
  const cur=parseInt(ji?ji.value:1)||1;
  if(cur<totalPages) scrollToPage(cur+1);
});

/* Page jump */
const pageJumpInput=document.getElementById('page-jump-input');
function jumpToPage(){
  const val=parseInt(pageJumpInput.value);
  if(!isNaN(val)&&val>=1&&val<=totalPages) scrollToPage(val);
  else pageJumpInput.value=parseInt(pageInfo.textContent)||1;
}
pageJumpInput.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();jumpToPage();}});
pageJumpInput.addEventListener('blur',jumpToPage);

/* Zoom */
document.getElementById('zoom-in').addEventListener('click',()=>{
  if(!pdfDoc) return;
  pdfDoc.getPage(1).then(p=>{
    const b=p.getViewport({scale:1});
    const c=zoomScale==='auto'?calcScale(b):zoomScale;
    zoomScale=Math.min(+(c+0.25).toFixed(2),3.0);
    renderAllPages();
  });
});
document.getElementById('zoom-out').addEventListener('click',()=>{
  if(!pdfDoc) return;
  pdfDoc.getPage(1).then(p=>{
    const b=p.getViewport({scale:1});
    const c=zoomScale==='auto'?calcScale(b):zoomScale;
    zoomScale=Math.max(+(c-0.25).toFixed(2),0.4);
    renderAllPages();
  });
});

/* Re-render on resize */
let resizeTimer;
window.addEventListener('resize',()=>{
  clearTimeout(resizeTimer);
  resizeTimer=setTimeout(()=>{if(pdfDoc){zoomScale='auto';renderAllPages();}},300);
});

/* Protection */
document.addEventListener('contextmenu',e=>e.preventDefault());
document.addEventListener('keydown',e=>{
  const blocked=[
    e.ctrlKey&&e.key==='s',e.ctrlKey&&e.key==='p',
    e.ctrlKey&&e.shiftKey&&e.key==='S',
    e.metaKey&&e.key==='s',e.metaKey&&e.key==='p',
    e.key==='PrintScreen',
    e.metaKey&&e.shiftKey&&(e.key==='3'||e.key==='4'),
  ];
  if(blocked.some(Boolean)){e.preventDefault();showToast();}
});
document.addEventListener('keyup',e=>{
  if(e.key==='PrintScreen'){navigator.clipboard.writeText('').catch(()=>{});showToast();}
});
function showToast(){
  const t=document.getElementById('screenshot-toast');
  t.classList.add('visible');
  setTimeout(()=>t.classList.remove('visible'),3000);
}
const canvasWrap=document.getElementById('canvas-wrap');
const blurNotice=document.getElementById('blur-notice');
window.addEventListener('blur', ()=>{canvasWrap?.classList.add('is-blurred');   blurNotice?.classList.add('visible');});
window.addEventListener('focus',()=>{canvasWrap?.classList.remove('is-blurred');blurNotice?.classList.remove('visible');});

/* Sidebar */
const sidebar=document.getElementById('sidebar');
const sidebarOverlay=document.getElementById('sidebar-overlay');
const sidebarToggle=document.getElementById('sidebar-toggle');
if(sidebarToggle)  sidebarToggle.addEventListener('click',()=>{sidebar.classList.toggle('is-open');sidebarOverlay.classList.toggle('is-open');});
if(sidebarOverlay) sidebarOverlay.addEventListener('click',()=>{sidebar.classList.remove('is-open');sidebarOverlay.classList.remove('is-open');});
