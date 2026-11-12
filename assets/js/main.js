(function(){
  if(!('IntersectionObserver' in window))return;
  var links=[].slice.call(document.querySelectorAll('nav a'));
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(e.isIntersecting){links.forEach(function(a){var on=a.getAttribute('href')==='#'+e.target.id;a.classList.toggle('on',on);if(on)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')})}
    });
  },{rootMargin:'-30% 0px -60% 0px'});
  links.forEach(function(a){var s=document.querySelector(a.getAttribute('href'));if(s)io.observe(s)});
})();
(function(){
  var d=document,de=d.documentElement,bar=d.querySelector('.progress');
  function p(){var h=de.scrollHeight-innerHeight;bar.style.transform='scaleX('+(h>0?Math.min(scrollY/h,1):0)+')'}
  addEventListener('scroll',p,{passive:true});p();
  d.querySelectorAll('.proj').forEach(function(c){c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px')})});
  if('IntersectionObserver' in window){
    var els=d.querySelectorAll('main section');de.classList.add('js');
    var o=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');o.unobserve(e.target)}})},{threshold:.06});
    els.forEach(function(s){s.classList.add('reveal');o.observe(s)});
  }
})();
(function(){
  var d=document,de=d.documentElement;
  addEventListener('pointermove',function(e){de.style.setProperty('--gx',e.clientX+'px');de.style.setProperty('--gy',e.clientY+'px')},{passive:true});
  d.querySelectorAll('dd').forEach(function(n){var tokens=n.textContent.split(', '),frag=d.createDocumentFragment();tokens.forEach(function(t){var chip=d.createElement('span');chip.className='chip';chip.textContent=t;frag.appendChild(chip)});n.replaceChildren(frag)});
  var mq=d.querySelector('.marquee div');if(mq)mq.innerHTML+=mq.innerHTML;
  var c=d.getElementById('net');if(!c)return;
  var x=c.getContext('2d'),W,H,P=[],m={x:-999,y:-999},rm=matchMedia('(prefers-reduced-motion:reduce)').matches,dpr=Math.min(devicePixelRatio||1,2);
  function rs(){W=innerWidth;H=innerHeight;c.width=W*dpr;c.height=H*dpr;x.setTransform(dpr,0,0,dpr,0,0);var n=Math.min(90,Math.floor(W*H/18000));P=[];for(var i=0;i<n;i++)P.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.25})}
  function f(){x.clearRect(0,0,W,H);
    for(var i=0;i<P.length;i++){var a=P[i];
      if(!rm){a.x+=a.vx;a.y+=a.vy;if(a.x<0||a.x>W)a.vx*=-1;if(a.y<0||a.y>H)a.vy*=-1}
      x.fillStyle='rgba(255,255,255,.55)';x.beginPath();x.arc(a.x,a.y,1.1,0,6.283);x.fill();
      for(var j=i+1;j<P.length;j++){var b=P[j],dx=a.x-b.x,dy=a.y-b.y,q=dx*dx+dy*dy;if(q<14400){x.strokeStyle='rgba(255,255,255,'+(.16*(1-q/14400))+')';x.beginPath();x.moveTo(a.x,a.y);x.lineTo(b.x,b.y);x.stroke()}}
      var mx=a.x-m.x,my=a.y-m.y,md=mx*mx+my*my;if(md<32400){x.strokeStyle='rgba(255,255,255,'+(.35*(1-md/32400))+')';x.beginPath();x.moveTo(a.x,a.y);x.lineTo(m.x,m.y);x.stroke()}
    }
    if(!rm)requestAnimationFrame(f)}
  addEventListener('resize',function(){rs();if(rm)f()});
  addEventListener('pointermove',function(e){m.x=e.clientX;m.y=e.clientY},{passive:true});
  rs();f();
})();
(function(){
  var d=document,rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
  var ck=d.getElementById('clock');
  if(ck){var f=new Intl.DateTimeFormat('en-GB',{hour:'2-digit',minute:'2-digit',timeZone:'Asia/Tehran'});var tick=function(){ck.textContent='Local time '+f.format(new Date())+' IRST'};tick();setInterval(tick,30000)}
  if(!rm){
    d.querySelectorAll('.proj').forEach(function(c){
      c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect(),px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;c.style.setProperty('--rx',(-py*2.4)+'deg');c.style.setProperty('--ry',(px*2.4)+'deg')});
      c.addEventListener('pointerleave',function(){c.style.setProperty('--rx','0deg');c.style.setProperty('--ry','0deg')});
    });
    d.querySelectorAll('.btn').forEach(function(b){
      b.addEventListener('pointermove',function(e){var r=b.getBoundingClientRect();b.style.transform='translate('+((e.clientX-r.left-r.width/2)*.18)+'px,'+((e.clientY-r.top-r.height/2)*.3)+'px)'});
      b.addEventListener('pointerleave',function(){b.style.transform=''});
    });
  }
  var pal=d.createElement('div');pal.className='pal';pal.id='quick-menu';pal.setAttribute('role','dialog');pal.setAttribute('aria-modal','true');pal.setAttribute('aria-label','Quick menu');
  pal.innerHTML='<div><button class="pal-close" type="button" aria-label="Close quick menu">×</button><input placeholder="Jump to a section or link…" aria-label="Search sections and links" role="combobox" aria-controls="quick-results" aria-expanded="true" aria-autocomplete="list"><ul id="quick-results" role="listbox"></ul></div>';
  d.body.appendChild(pal);
  var inp=pal.querySelector('input'),ul=pal.querySelector('ul'),closeBtn=pal.querySelector('.pal-close'),sel=0,vis=[],lastFocus=null;
  var items=[['Selected work','#work','Section'],['Experience','#experience','Section'],['Research','#research','Section'],['Skills','#skills','Section'],['Education','#education','Section'],['Email','mailto:mahmmooudian@gmail.com','Link'],['LinkedIn','https://linkedin.com/in/amirmohmmadmahmoudian','Link'],['GitHub','https://github.com/mahmmooudian','Link'],['Hugging Face','https://huggingface.co/Mahmmooudian','Link']];
  function draw(){var q=inp.value.toLowerCase();vis=items.filter(function(i){return i[0].toLowerCase().indexOf(q)>-1});sel=Math.min(sel,Math.max(vis.length-1,0));ul.replaceChildren();vis.forEach(function(item,k){var li=d.createElement('li'),span=d.createElement('span');li.id='quick-option-'+k;li.dataset.k=k;li.setAttribute('role','option');li.setAttribute('aria-selected',String(k===sel));if(k===sel)li.className='sel';li.appendChild(d.createTextNode(item[0]));span.textContent=item[2];li.appendChild(span);ul.appendChild(li)});if(vis.length){inp.setAttribute('aria-activedescendant','quick-option-'+sel)}else{inp.removeAttribute('aria-activedescendant');var none=d.createElement('li');none.textContent='No results';none.setAttribute('role','presentation');ul.appendChild(none)}}
  function expanded(v){[d.getElementById('kbd'),d.getElementById('menu')].forEach(function(b){if(b)b.setAttribute('aria-expanded',String(v))})}
  function opn(){lastFocus=d.activeElement;pal.classList.add('open');expanded(true);inp.value='';sel=0;draw();inp.focus()}
  function cls(){if(!pal.classList.contains('open'))return;pal.classList.remove('open');expanded(false);if(lastFocus&&lastFocus.isConnected)lastFocus.focus()}
  function go(i){cls();if(!i)return;if(i[1].charAt(0)==='#'){var t=d.querySelector(i[1]);if(t)t.scrollIntoView({behavior:rm?'auto':'smooth'})}else{var a=d.createElement('a');a.href=i[1];if(i[1].indexOf('http')===0){a.target='_blank';a.rel='noopener'}a.click()}}
  addEventListener('keydown',function(e){
    if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();pal.classList.contains('open')?cls():opn();return}
    if(!pal.classList.contains('open'))return;
    if(e.key==='Escape'){e.preventDefault();cls()}
    else if(e.key==='Tab'){if(d.activeElement===inp){e.preventDefault();closeBtn.focus()}else if(d.activeElement===closeBtn){e.preventDefault();inp.focus()}}
    else if(e.key==='ArrowDown'){e.preventDefault();sel=Math.min(sel+1,vis.length-1);draw()}
    else if(e.key==='ArrowUp'){e.preventDefault();sel=Math.max(sel-1,0);draw()}
    else if(e.key==='Enter'){e.preventDefault();go(vis[sel])}
  });
  inp.addEventListener('input',function(){sel=0;draw()});
  closeBtn.addEventListener('click',cls);
  pal.addEventListener('click',function(e){var li=e.target.closest('li');if(li&&li.dataset.k!==undefined)go(vis[+li.dataset.k]);else if(e.target===pal)cls()});
  var kb=d.getElementById('kbd');
  if(kb){kb.addEventListener('click',opn);kb.querySelector('b').textContent=/Mac|iPhone|iPad/.test(navigator.platform)?'⌘ K':'Ctrl K'}
})();
(function(){
  var d=document;
  var tg={'Adaptive Document Intelligence RAG':['Sentence Transformers','BM25','Cross-encoder','Groq'],'Controlled Order Agent':['Tool calling','Human approval','Audit trail'],'Med-AGCNet':['PyTorch','Grad-CAM','PneumoniaMNIST'],'Water Network AI Analyzer':['XGBoost','PSO','WNTR','EPANET'],'AI Model Performance Dashboard':['Power BI','Power Query','DAX']};
  d.querySelectorAll('#work .proj').forEach(function(a){var h=a.querySelector('h3'),p=a.querySelector('p'),t=h&&tg[h.textContent];if(t&&p)p.insertAdjacentHTML('afterend','<ul class="tags">'+t.map(function(x){return '<li>'+x+'</li>'}).join('')+'</ul>')});
  d.querySelectorAll('.focus>div,.proj,.job').forEach(function(el){var i=[].indexOf.call(el.parentNode.children,el);el.style.animationDelay=Math.min(i,6)*70+'ms'});
  var tb=d.getElementById('topbar'),mn=d.getElementById('menu'),kb=d.getElementById('kbd');
  if(tb){addEventListener('scroll',function(){tb.classList.toggle('show',scrollY>260)},{passive:true})}
  if(mn)mn.addEventListener('click',function(){var k=d.getElementById('kbd');if(k)k.click()});
  var zoomFocus=null;
  function closeLb(){var l=d.querySelector('.lb');if(l){l.remove();if(zoomFocus&&zoomFocus.isConnected)zoomFocus.focus()}}
  d.querySelectorAll('.dg svg').forEach(function(s){
    var description=s.getAttribute('aria-label')||'Architecture diagram';
    s.setAttribute('role','button');s.setAttribute('tabindex','0');s.setAttribute('aria-label','Enlarge: '+description);
    function openZoom(){
      closeLb();zoomFocus=s;var l=d.createElement('div');l.className='lb';l.setAttribute('role','dialog');l.setAttribute('aria-modal','true');l.setAttribute('aria-label','Expanded architecture diagram');
      var btn=d.createElement('button');btn.className='lb-close';btn.type='button';btn.textContent='Close ×';btn.setAttribute('aria-label','Close expanded diagram');
      var c=s.cloneNode(true);c.removeAttribute('style');c.removeAttribute('tabindex');c.setAttribute('role','img');c.setAttribute('aria-label',description);
      c.querySelectorAll('[id]').forEach(function(el){var id=el.id;el.id=id+'-zoom';c.querySelectorAll('[marker-end],[marker-start],[marker-mid]').forEach(function(n){['marker-end','marker-start','marker-mid'].forEach(function(a){var v=n.getAttribute(a);if(v)n.setAttribute(a,v.replace('url(#'+id+')','url(#'+el.id+')'))})})});
      var f=d.createElement('div');f.className='dg';f.appendChild(c);l.appendChild(f);l.appendChild(btn);
      l.addEventListener('click',function(e){if(e.target===l)closeLb()});btn.addEventListener('click',closeLb);
      d.body.appendChild(l);btn.focus();
    }
    s.addEventListener('click',openZoom);
    s.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();openZoom()}});
  });
  addEventListener('keydown',function(e){if(e.key==='Escape')closeLb();var l=d.querySelector('.lb');if(l&&e.key==='Tab'){e.preventDefault();l.querySelector('.lb-close').focus()}});
})();
