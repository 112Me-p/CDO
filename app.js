(() => {
  'use strict';

  const $ = (q, root=document) => root.querySelector(q);
  const $$ = (q, root=document) => [...root.querySelectorAll(q)];
  const clamp = (n,min,max) => Math.min(max, Math.max(min,n));
  const uid = () => 'CDO-' + Math.random().toString(36).slice(2,6).toUpperCase() + Math.floor(10+Math.random()*89);
  const deep = obj => JSON.parse(JSON.stringify(obj));

  const INGREDIENTS = [
    {id:'sparkling',name:'Sparkling Water',short:'Soda',cat:'base',color:'#d8efff',color2:'#eef9ff',price:8,flavor:{sweet:0,sour:2,fresh:9,creamy:0,strong:2}},
    {id:'green-tea',name:'Jasmine Green Tea',short:'Green Tea',cat:'base',color:'#bfdc8b',color2:'#e8f4bf',price:10,flavor:{sweet:1,sour:0,fresh:7,creamy:0,strong:5}},
    {id:'black-tea',name:'Black Tea',short:'Black Tea',cat:'base',color:'#9a633d',color2:'#c48858',price:10,flavor:{sweet:0,sour:0,fresh:3,creamy:0,strong:8}},
    {id:'milk',name:'Fresh Milk',short:'Milk',cat:'base',color:'#f2ecdf',color2:'#fffaf3',price:14,flavor:{sweet:2,sour:0,fresh:1,creamy:10,strong:2}},
    {id:'coconut',name:'Coconut Water',short:'Coconut',cat:'base',color:'#ebf1d1',color2:'#fbfde9',price:16,flavor:{sweet:4,sour:0,fresh:8,creamy:1,strong:2}},
    {id:'coldbrew',name:'Cold Brew Coffee',short:'Cold Brew',cat:'base',color:'#594033',color2:'#76513f',price:18,flavor:{sweet:0,sour:1,fresh:2,creamy:0,strong:10}},
    {id:'matcha',name:'Ceremonial Matcha',short:'Matcha',cat:'base',color:'#729449',color2:'#b9cf77',price:18,flavor:{sweet:1,sour:0,fresh:6,creamy:2,strong:8}},

    {id:'mango',name:'Mango Purée',short:'Mango',cat:'fruit',color:'#ffb72f',color2:'#ffd85b',price:18,flavor:{sweet:9,sour:2,fresh:7,creamy:2,strong:5}},
    {id:'passion',name:'Passion Fruit',short:'Passion',cat:'fruit',color:'#ff8c38',color2:'#ffbd48',price:20,flavor:{sweet:5,sour:9,fresh:9,creamy:0,strong:7}},
    {id:'strawberry',name:'Strawberry',short:'Strawberry',cat:'fruit',color:'#ef4f67',color2:'#ff889a',price:18,flavor:{sweet:7,sour:5,fresh:7,creamy:1,strong:5}},
    {id:'lychee',name:'Lychee',short:'Lychee',cat:'fruit',color:'#f4b3c3',color2:'#ffe0e8',price:18,flavor:{sweet:8,sour:2,fresh:8,creamy:1,strong:4}},
    {id:'lime',name:'Fresh Lime',short:'Lime',cat:'fruit',color:'#b8e24f',color2:'#dcff76',price:8,flavor:{sweet:0,sour:10,fresh:10,creamy:0,strong:6}},
    {id:'peach',name:'White Peach',short:'Peach',cat:'fruit',color:'#f7ad87',color2:'#ffd2ba',price:18,flavor:{sweet:7,sour:3,fresh:7,creamy:1,strong:4}},
    {id:'yuzu',name:'Yuzu Citrus',short:'Yuzu',cat:'fruit',color:'#f9d337',color2:'#fff27c',price:22,flavor:{sweet:2,sour:9,fresh:10,creamy:0,strong:7}},
    {id:'blueberry',name:'Blueberry',short:'Blueberry',cat:'fruit',color:'#6264a9',color2:'#918bd3',price:20,flavor:{sweet:6,sour:4,fresh:7,creamy:1,strong:5}},

    {id:'vanilla',name:'Vanilla Syrup',short:'Vanilla',cat:'syrup',color:'#d8ad79',color2:'#f2d6ac',price:10,flavor:{sweet:10,sour:0,fresh:0,creamy:5,strong:4}},
    {id:'honey',name:'Wild Honey',short:'Honey',cat:'syrup',color:'#d99524',color2:'#ffc850',price:12,flavor:{sweet:10,sour:0,fresh:1,creamy:2,strong:5}},
    {id:'rose',name:'Rose Syrup',short:'Rose',cat:'syrup',color:'#d65c85',color2:'#ff8eb4',price:12,flavor:{sweet:8,sour:1,fresh:4,creamy:0,strong:5}},
    {id:'brown-sugar',name:'Brown Sugar',short:'Brown Sugar',cat:'syrup',color:'#875536',color2:'#bd7a49',price:10,flavor:{sweet:10,sour:0,fresh:0,creamy:3,strong:7}},

    {id:'jelly',name:'Crystal Jelly',short:'Jelly',cat:'topping',color:'#dceff1',color2:'#f5ffff',price:12,flavor:{sweet:3,sour:0,fresh:3,creamy:0,strong:1},topping:true},
    {id:'boba',name:'Popping Boba',short:'Popping Boba',cat:'topping',color:'#ff7aa5',color2:'#ffb1c9',price:15,flavor:{sweet:5,sour:2,fresh:3,creamy:0,strong:2},topping:true},
    {id:'foam',name:'Cream Foam',short:'Cream Foam',cat:'topping',color:'#f7eee2',color2:'#fffaf1',price:15,flavor:{sweet:4,sour:0,fresh:0,creamy:10,strong:2},topping:true},
    {id:'mint',name:'Fresh Mint',short:'Mint',cat:'topping',color:'#5fb77b',color2:'#8fe2a9',price:8,flavor:{sweet:0,sour:0,fresh:10,creamy:0,strong:4},topping:true}
  ];
  const byId = id => INGREDIENTS.find(x=>x.id===id);

  const SIZES = [
    {id:'S',ml:350,mult:0.88,label:'S'},
    {id:'M',ml:500,mult:1,label:'M'},
    {id:'L',ml:700,mult:1.24,label:'L'}
  ];

  const seedRecipes = [
    {id:'CDO-A1842',name:'Strawberry Cloud',creator:'CDO Lover',size:'M',ice:50,mixStyle:'Shake',public:true,image:'assets/top-1.jpg',orders:{today:428,week:1320,all:8124},remixes:97,trend:'HOT',move:'↑ 2',items:[['milk',55],['strawberry',25],['lychee',10],['rose',10]]},
    {id:'CDO-K9031',name:'Matcha Berry',creator:'Mint',size:'M',ice:25,mixStyle:'Layer',public:true,image:'assets/top-2.jpg',orders:{today:362,week:1188,all:6030},remixes:144,trend:'MOST REMIXED',move:'↑ 1',items:[['matcha',45],['milk',30],['strawberry',15],['foam',10]]},
    {id:'CDO-Q4418',name:'Mango Sunshine',creator:'Chompu',size:'L',ice:50,mixStyle:'Stir',public:true,image:'assets/top-3.jpg',orders:{today:318,week:1015,all:5582},remixes:82,trend:'FRESH',move:'↑ 1',items:[['sparkling',40],['mango',35],['passion',15],['lime',10]]},
    {id:'CDO-M6620',name:'Blue Citrus',creator:'Blue Sky',size:'M',ice:50,mixStyle:'Stir',public:true,image:'assets/top-4.jpg',orders:{today:274,week:892,all:4707},remixes:71,trend:'TRENDING',move:'↑ 3',items:[['sparkling',50],['blueberry',25],['yuzu',15],['lime',10]]},
    {id:'CDO-L2245',name:'Caramel Latte',creator:'Coffeeholic',size:'M',ice:25,mixStyle:'Layer',public:true,image:'assets/top-5.jpg',orders:{today:251,week:803,all:4318},remixes:59,trend:'BOLD',move:'NEW',items:[['coldbrew',55],['milk',30],['brown-sugar',10],['vanilla',5]]},
    {id:'CDO-R1134',name:'Peach Frequency',creator:'A.',size:'M',ice:50,mixStyle:'Shake',public:true,orders:{today:121,week:655,all:3620},remixes:44,trend:'',move:'↑ 1',items:[['black-tea',50],['peach',25],['lime',10],['honey',15]]}
  ].map(normalizeRecipe);

  function normalizeRecipe(r){
    const items = (r.items||[]).map(it=>Array.isArray(it)?{id:it[0],pct:it[1]}:it);
    return {...r,items};
  }

  let app = {
    page:'home', step:1, category:'fruit', period:'today', sound:false,
    mode:'NEW RECIPE', selectedRecipe:null,
    draft: newDraft(), undo:[], redo:[]
  };

  function newDraft(){
    return {id:uid(),name:'',creator:'',size:'M',ice:50,mixStyle:'Stir',public:true,items:[{id:'sparkling',pct:100}]};
  }

  function savedRecipes(){
    try { return JSON.parse(localStorage.getItem('cdo_saved_recipes')||'[]').map(normalizeRecipe); }
    catch { return []; }
  }
  function writeSaved(list){ localStorage.setItem('cdo_saved_recipes', JSON.stringify(list)); updateSavedCount(); }
  function publicRecipes(){ return [...seedRecipes, ...savedRecipes().filter(r=>r.public)]; }
  function updateSavedCount(){ $('#savedCount').textContent = savedRecipes().length; }

  function pushHistory(){
    app.undo.push(deep(app.draft));
    if(app.undo.length>30) app.undo.shift();
    app.redo=[];
  }
  function undo(){ if(!app.undo.length)return; app.redo.push(deep(app.draft)); app.draft=app.undo.pop(); renderBuilder(); }
  function redo(){ if(!app.redo.length)return; app.undo.push(deep(app.draft)); app.draft=app.redo.pop(); renderBuilder(); }

  function navigate(page){
    app.page=page;
    $$('.page').forEach(p=>p.classList.toggle('is-active',p.dataset.page===page));
    $$('.nav-tab').forEach(b=>b.classList.toggle('is-active',b.dataset.nav===page));
    window.scrollTo({top:0,behavior:'smooth'});
    if(page==='recipes') renderSaved();
    if(page==='builder') renderBuilder();
    clickSound(340,.025);
  }

  function setupNavigation(){
    $$('[data-nav]').forEach(el=>el.addEventListener('click',()=>navigate(el.dataset.nav)));
    $('#openMyRecipes').addEventListener('click',()=>navigate('recipes'));
    $('#scrollTopFive').addEventListener('click',()=>$('#top-five').scrollIntoView({behavior:'smooth'}));
    $$('.rank-switch button').forEach(btn=>btn.addEventListener('click',()=>{
      app.period=btn.dataset.period;
      $$('.rank-switch button').forEach(x=>x.classList.toggle('is-active',x===btn));
      renderLeaderboard();
    }));
  }

  function renderSizes(){
    $('#sizeOptions').innerHTML=SIZES.map(s=>`<button class="size-option ${app.draft.size===s.id?'is-active':''}" data-size="${s.id}"><strong>${s.id}</strong><small>${s.ml} ml</small></button>`).join('');
    $$('#sizeOptions [data-size]').forEach(b=>b.addEventListener('click',()=>{pushHistory();app.draft.size=b.dataset.size;renderBuilder();}));
  }

  function ingredientCard(i,isBase=false){
    const active=app.draft.items.some(x=>x.id===i.id);
    return `<button class="ingredient-card ${active?'is-active':''}" data-ingredient="${i.id}" data-base="${isBase?1:0}">
      <div class="ingredient-swatch" style="background:linear-gradient(135deg,${i.color2},${i.color})"></div>
      <strong>${i.name}</strong><small>${i.cat==='base'?'Base':'+'+i.price+' THB'}</small><span class="ingredient-add">${active?'✓':'+'}</span>
    </button>`;
  }

  function renderIngredientSelectors(){
    $('#baseGrid').innerHTML=INGREDIENTS.filter(i=>i.cat==='base').map(i=>ingredientCard(i,true)).join('');
    $$('#baseGrid [data-ingredient]').forEach(card=>card.addEventListener('click',()=>selectBase(card.dataset.ingredient)));
    const cats=[['fruit','Fruit'],['syrup','Syrup'],['topping','Topping']];
    $('#ingredientTabs').innerHTML=cats.map(([id,n])=>`<button class="${app.category===id?'is-active':''}" data-cat="${id}">${n}</button>`).join('');
    $$('#ingredientTabs [data-cat]').forEach(b=>b.addEventListener('click',()=>{app.category=b.dataset.cat;renderIngredientSelectors();}));
    $('#ingredientGrid').innerHTML=INGREDIENTS.filter(i=>i.cat===app.category).map(i=>ingredientCard(i)).join('');
    $$('#ingredientGrid [data-ingredient]').forEach(card=>card.addEventListener('click',()=>toggleIngredient(card.dataset.ingredient)));
  }

  function recipeTotal(recipe=app.draft){
    return recipe.items.reduce((a,x)=>a+Number(x.pct||0),0);
  }

  function selectBase(id){
    pushHistory();
    const baseIdx=app.draft.items.findIndex(x=>byId(x.id)?.cat==='base');
    if(baseIdx>=0) app.draft.items[baseIdx].id=id;
    else app.draft.items.unshift({id,pct:0});
    renderBuilder();
  }

  function toggleIngredient(id){
    pushHistory();
    const idx=app.draft.items.findIndex(x=>x.id===id);
    if(idx>=0){ app.draft.items.splice(idx,1); }
    else { app.draft.items.push({id,pct:10}); }
    renderBuilder();
  }

  function setPct(id,value){
    const item=app.draft.items.find(x=>x.id===id); if(!item)return;
    pushHistory(); item.pct=clamp(Math.round(Number(value)||0),0,100); renderBuilder();
  }

  function adjustPct(id,delta){
    const item=app.draft.items.find(x=>x.id===id); if(!item)return;
    setPct(id,(Number(item.pct)||0)+delta);
  }

  function moveItem(id,dir){
    pushHistory(); const idx=app.draft.items.findIndex(x=>x.id===id); const j=idx+dir;
    if(idx<0||j<0||j>=app.draft.items.length)return;
    [app.draft.items[idx],app.draft.items[j]]=[app.draft.items[j],app.draft.items[idx]];
    renderBuilder();
  }

  function renderMixList(){
    $('#mixList').innerHTML=app.draft.items.map((x,index)=>{
      const i=byId(x.id); return `<div class="mix-item mix-item-v3" draggable="true" data-drag="${x.id}">
        <div class="mix-item-head"><span class="drag-grip" title="Drag to reorder">≡</span><i class="mix-dot" style="background:${i.color}"></i><strong>${index+1}. ${i.name}</strong><div class="mix-order"><button data-move="-1" data-id="${i.id}">↑</button><button data-move="1" data-id="${i.id}">↓</button></div>${i.cat!=='base'?`<button class="remove-ingredient" data-remove="${i.id}">×</button>`:''}</div>
        <div class="amount-row">
          <button class="amount-btn" data-adjust="-5" data-id="${i.id}" aria-label="Decrease ${i.name}">−</button>
          <label class="amount-input"><input type="number" min="0" max="100" step="5" value="${x.pct}" data-number="${i.id}" /><span>%</span></label>
          <button class="amount-btn" data-adjust="5" data-id="${i.id}" aria-label="Increase ${i.name}">+</button>
        </div>
        <div class="amount-track"><i style="width:${clamp(x.pct,0,100)}%;background:linear-gradient(90deg,${i.color2},${i.color})"></i></div>
      </div>`;
    }).join('');
    $$('[data-number]').forEach(r=>r.addEventListener('change',()=>setPct(r.dataset.number,r.value)));
    $$('[data-adjust]').forEach(b=>b.addEventListener('click',()=>adjustPct(b.dataset.id,Number(b.dataset.adjust))));
    $$('[data-move]').forEach(b=>b.addEventListener('click',()=>moveItem(b.dataset.id,Number(b.dataset.move))));
    $$('[data-remove]').forEach(b=>b.addEventListener('click',()=>toggleIngredient(b.dataset.remove)));
    setupDragReorder();
  }

  function setupDragReorder(){
    let dragging=null;
    $$('[data-drag]').forEach(el=>{
      el.addEventListener('dragstart',()=>{dragging=el.dataset.drag;el.style.opacity='.45'});
      el.addEventListener('dragend',()=>{el.style.opacity='';dragging=null});
      el.addEventListener('dragover',e=>e.preventDefault());
      el.addEventListener('drop',e=>{e.preventDefault(); const target=el.dataset.drag;if(!dragging||dragging===target)return;pushHistory();const a=app.draft.items.findIndex(x=>x.id===dragging),b=app.draft.items.findIndex(x=>x.id===target);const [item]=app.draft.items.splice(a,1);app.draft.items.splice(b,0,item);renderBuilder();});
    });
  }

  function recipePrice(recipe=app.draft){
    const size=SIZES.find(s=>s.id===recipe.size)||SIZES[1];
    let p=42*size.mult;
    recipe.items.forEach(x=>{const i=byId(x.id); p+=(i?.price||0)*(x.pct/25)*size.mult;});
    return Math.round(p/5)*5;
  }

  function profile(recipe=app.draft){
    const keys=['sweet','sour','fresh','creamy','strong']; const out={};
    keys.forEach(k=>out[k]=0);
    recipe.items.forEach(x=>{const i=byId(x.id);if(!i)return;keys.forEach(k=>out[k]+=i.flavor[k]*(x.pct/100));});
    keys.forEach(k=>out[k]=Math.round(clamp(out[k]*10,0,100)));
    return out;
  }

  function balanceScore(recipe=app.draft){
    const p=profile(recipe), vals=Object.values(p); const avg=vals.reduce((a,b)=>a+b,0)/vals.length;
    const variance=vals.reduce((a,b)=>a+Math.abs(b-avg),0)/vals.length;
    const diversity=Math.min(recipe.items.length,5)*3;
    return Math.round(clamp(88-variance*.42+diversity,45,98));
  }

  function flavorName(recipe=app.draft){
    const p=profile(recipe); const sorted=Object.entries(p).sort((a,b)=>b[1]-a[1]).slice(0,2).map(x=>x[0]);
    const map={sweet:'Sweet',sour:'Tart',fresh:'Fresh',creamy:'Creamy',strong:'Bold'};
    return `${map[sorted[0]]} & ${map[sorted[1]]}`;
  }

  function visualPalette(recipe=app.draft){
    const colors = recipe.items.map(x=>byId(x.id)?.color).filter(Boolean);
    const a = colors[1] || colors[0] || '#ffb85c';
    const b = colors[2] || colors[colors.length-1] || '#ff6f91';
    return { a, b, glow: `radial-gradient(circle at 50% 40%, ${a}33, transparent 60%)`, grad: `linear-gradient(180deg, ${colors.join(',') || '#ffb85c,#ff6f91'})` };
  }

  function renderGlass(container='#glassFill',recipe=app.draft){
    const root=typeof container==='string'?$(container):container; if(!root)return;
    let bottom=0;
    root.innerHTML=recipe.items.map(x=>{const i=byId(x.id);const html=`<i class="liquid-layer" style="height:${x.pct}%;bottom:${bottom}%;--layer-color:linear-gradient(180deg,${i.color2},${i.color});opacity:${i.topping?.55:1}"></i>`;bottom+=x.pct;return html;}).join('');
  }

  function renderIce(){
    const n=Math.round(app.draft.ice/15); $('#iceVisual').innerHTML=Array.from({length:n},(_,k)=>`<i class="ice-cube" style="left:${25+(k*37)%150}px;top:${50+(k*43)%210}px;transform:rotate(${(k*19)%28-14}deg)"></i>`).join('');
    const toppings=app.draft.items.filter(x=>byId(x.id)?.topping); $('#toppingVisual').innerHTML=toppings.flatMap((x,idx)=>Array.from({length:Math.max(1,Math.round(x.pct/4))},(_,k)=>`<i class="topping-piece" style="background:${byId(x.id).color};transform:translateY(${(k+idx)%3*8}px)"></i>`)).join('');
  }

  function renderTaste(){
    const p=profile(), labels={sweet:'Sweet',sour:'Sour',fresh:'Fresh',creamy:'Creamy',strong:'Strong'};
    $('#tasteBars').innerHTML=Object.entries(p).map(([k,v])=>`<div class="taste-item"><span>${labels[k]}</span><b>${v}</b><div class="taste-track"><i style="width:${v}%"></i></div></div>`).join('');
    $('#balanceScore').textContent=balanceScore();
    $('#ringValue').style.strokeDashoffset = 302-(302*balanceScore()/100);
    $('#dominantFlavor').textContent=flavorName();
  }

  function renderRecipeStack(){
    $('#recipeEmpty').style.display=app.draft.items.length?'none':'block';
    $('#recipeStack').innerHTML=app.draft.items.map((x,k)=>{const i=byId(x.id);return `<div class="recipe-line"><i style="background:linear-gradient(135deg,${i.color2},${i.color})"></i><span><strong>${k+1}. ${i.short}</strong><small>${Math.round((SIZES.find(s=>s.id===app.draft.size).ml*(1-app.draft.ice/180))*x.pct/100)} ml est.</small></span><b>${x.pct}%</b></div>`}).join('');
    $('#summarySize').textContent=app.draft.size; $('#summaryIce').textContent=app.draft.ice+'%'; $('#summaryMix').textContent=app.draft.mixStyle;
  }

  function formulaText(recipe=app.draft){
    const size=SIZES.find(s=>s.id===recipe.size); const usable=Math.round(size.ml*(1-recipe.ice/180));
    const lines=recipe.items.map((x,k)=>`${k+1}. ${byId(x.id).name} — ${x.pct}% (~${Math.round(usable*x.pct/100)} ml)`);
    return `${recipe.name||'Untitled Drink'} [${recipe.id}]\nSize ${size.id} · ${size.ml} ml | Ice ${recipe.ice}% | ${recipe.mixStyle}\n${lines.join('\n')}\nEstimated ฿${recipePrice(recipe)}`;
  }

  function renderFormulaPreview(){
    const el=$('#formulaPreview');if(!el)return;
    const total=recipeTotal(); const status=total===100?'✓ READY':total<100?`เหลือ ${100-total}%`:`เกิน ${total-100}%`; el.innerHTML=`<strong>${app.draft.id}</strong><br>${app.draft.items.map((x,k)=>`${k+1}. ${byId(x.id).short} ${x.pct}%`).join('<br>')}<br><b class="formula-status ${total===100?'ok':'warn'}">TOTAL ${total}% · ${status}</b><br>ICE ${app.draft.ice}% · ${app.draft.mixStyle.toUpperCase()} · ฿${recipePrice()}`;
  }

  function renderStep(){
    const data=[null,['Choose your base','เริ่มจากฐานเครื่องดื่ม แล้วค่อยสร้างรสชาติในแบบของคุณ'],['Add your character','เลือกผลไม้ ไซรัป และท็อปปิ้งเพื่อสร้างคาแรกเตอร์ของสูตร'],['Build the formula','กำหนดแต่ละส่วนได้อิสระ แต่สูตรต้องรวมกันพอดี 100% ก่อนจึงไปต่อได้'],['Name your creation','ตั้งชื่อสูตรและเลือกว่าจะเปิดให้ชุมชน CDO สั่งตามหรือ Remix หรือไม่']][app.step];
    $('#currentStep').textContent=String(app.step).padStart(2,'0'); $('#stepTitle').textContent=data[0]; $('#stepSubtitle').textContent=data[1];
    $$('.step-content').forEach(x=>x.classList.toggle('is-active',Number(x.dataset.step)===app.step));
    $('#stepDots').innerHTML=[1,2,3,4].map(x=>`<i class="${x===app.step?'is-active':''}"></i>`).join('');
    $('#stepBack').style.visibility=app.step===1?'hidden':'visible';
    $('#stepNext').innerHTML=app.step===4?'Preview <span>✦</span>':'Next <span>→</span>';
  }

  function renderCompositionStatus(){
    const total=recipeTotal(); const delta=100-total;
    const root=$('#compositionStatus'); if(!root)return;
    root.classList.remove('is-ready','is-under','is-over');
    $('#compositionTotal').textContent=total+'%';
    $('#compositionBar').style.width=Math.min(total,100)+'%';
    if(total===100){
      root.classList.add('is-ready'); $('#compositionMessage').textContent='ครบ 100% พร้อมไปต่อ'; $('#compositionDelta').textContent='READY';
    } else if(total<100){
      root.classList.add('is-under'); $('#compositionMessage').textContent=`ยังไม่ครบ — เหลืออีก ${delta}%`; $('#compositionDelta').textContent=`+${delta}%`; 
    } else {
      root.classList.add('is-over'); $('#compositionMessage').textContent=`เกิน 100% — ลดออก ${Math.abs(delta)}%`; $('#compositionDelta').textContent=`${Math.abs(delta)}% OVER`;
    }
    const next=$('#stepNext'), finish=$('#finishButton');
    if(next && app.step===3){ next.disabled=total!==100; next.title=total===100?'':'สัดส่วนรวมต้องเท่ากับ 100%'; }
    if(finish){ finish.disabled=total!==100; finish.title=total===100?'':'สัดส่วนรวมต้องเท่ากับ 100%'; }
  }

  function renderBuilder(){
    renderStep(); renderSizes(); renderIngredientSelectors(); renderMixList(); renderGlass(); renderIce(); renderTaste(); renderRecipeStack(); renderFormulaPreview(); renderCompositionStatus();
    $('#totalPercent').textContent=recipeTotal(); $('#glassSizeLabel').textContent=`${app.draft.size} · ${SIZES.find(s=>s.id===app.draft.size).ml} ml`; $('#estimatedPrice').textContent='฿'+recipePrice();
    $('#recipeId').textContent=app.draft.id; $('#iceLevel').value=String(app.draft.ice); $('#mixStyle').value=app.draft.mixStyle; $('#drinkName').value=app.draft.name||''; $('#creatorName').value=app.draft.creator||''; $('#publicToggle').checked=!!app.draft.public; $('#builderModeChip').textContent=app.mode;
  }

  function stepNext(){
    if(app.step===3 && recipeTotal()!==100){ showToast(recipeTotal()<100?`ยังขาดอีก ${100-recipeTotal()}%`:`เกินมา ${recipeTotal()-100}% — ลดให้เหลือ 100%`); const s=$('#compositionStatus');s?.classList.add('shake');setTimeout(()=>s?.classList.remove('shake'),420);return; }
    if(app.step<4){app.step++;renderBuilder();clickSound(520,.03)} else openFinish();
  }
  function stepBack(){if(app.step>1){app.step--;renderBuilder();}}

  function surprise(){
    pushHistory();
    const bases=INGREDIENTS.filter(i=>i.cat==='base'), fruits=INGREDIENTS.filter(i=>i.cat==='fruit'), extras=INGREDIENTS.filter(i=>i.cat==='syrup');
    const pick=a=>a[Math.floor(Math.random()*a.length)]; const b=pick(bases), f1=pick(fruits), f2=pick(fruits.filter(x=>x!==f1)), s=pick(extras);
    app.draft.items=[{id:b.id,pct:50},{id:f1.id,pct:25},{id:f2.id,pct:15},{id:s.id,pct:10}]; app.draft.mixStyle=['Stir','Shake','Layer'][Math.floor(Math.random()*3)]; app.draft.ice=[25,50,75][Math.floor(Math.random()*3)]; renderBuilder(); clickSound(680,.05);
  }

  function resetDraft(){
    if(!confirm('Reset this recipe?'))return; app.draft=newDraft();app.step=1;app.mode='NEW RECIPE';app.undo=[];app.redo=[];renderBuilder();
  }

  function openFinish(){
    if(recipeTotal()!==100){showToast(recipeTotal()<100?`สูตรยังไม่ครบ 100% — ขาด ${100-recipeTotal()}%`:`สูตรเกิน 100% — เกิน ${recipeTotal()-100}%`);return;}
    if(!app.draft.name.trim()) app.draft.name = autoName();
    $('#finishTitle').textContent=app.draft.name; $('#finishCode').textContent=app.draft.id;
    const visual=$('#finishVisual'); visual.innerHTML='<div class="modal-big-glass" id="finishGlass"></div>'; renderGlass($('#finishGlass'),app.draft);
    $('#finishTicket').innerHTML=formulaText(app.draft).split('\n').map((x,i)=>i===0?`<strong>${x}</strong>`:x).join('<br>');
    openModal('#finishModal'); clickSound(740,.08);
  }

  function autoName(){
    const top=app.draft.items.filter(x=>byId(x.id).cat!=='base').sort((a,b)=>b.pct-a.pct)[0]; const words=['Current','Signal','Bloom','Static','Cloud','Noir','Glow','Pulse'];
    return `${top?byId(top.id).short:'Custom'} ${words[Math.floor(Math.random()*words.length)]}`;
  }

  function saveCurrent(){
    app.draft.name=app.draft.name.trim()||autoName(); app.draft.creator=app.draft.creator.trim()||'Anonymous';
    const list=savedRecipes(); const idx=list.findIndex(r=>r.id===app.draft.id);
    const save={...deep(app.draft),orders:idx>=0?list[idx].orders:{today:1,week:1,all:1},remixes:idx>=0?list[idx].remixes:0,trend:'NEW',move:'NEW',savedAt:Date.now()};
    if(idx>=0)list[idx]=save; else list.unshift(save); writeSaved(list); renderLeaderboard(); showToast(app.draft.public?'Saved & published to CDO community':'Saved privately on this device');
  }

  function shareCurrent(){
    const payload=btoa(unescape(encodeURIComponent(JSON.stringify({...app.draft,orders:undefined,remixes:undefined}))));
    const url=`${location.origin}${location.pathname}?recipe=${encodeURIComponent(payload)}`;
    navigator.clipboard?.writeText(url).then(()=>showToast('Share link copied')).catch(()=>prompt('Copy this link',url));
  }

  function parseShared(){
    const p=new URLSearchParams(location.search).get('recipe'); if(!p)return;
    try{const r=JSON.parse(decodeURIComponent(escape(atob(decodeURIComponent(p)))));app.draft=normalizeRecipe({...newDraft(),...r,id:uid()});app.mode='SHARED RECIPE';app.step=3;navigate('builder');showToast('Shared formula loaded');}catch(e){console.warn('Invalid shared recipe',e)}
  }

  function renderLeaderboard(){
    const list=publicRecipes().sort((a,b)=>(b.orders?.[app.period]||0)-(a.orders?.[app.period]||0)).slice(0,5); const root=$('#leaderboard');root.innerHTML='';
    list.forEach((r,idx)=>{
      const frag=$('#leaderCardTemplate').content.cloneNode(true), card=$('.leader-card',frag); card.dataset.recipe=r.id;
      const palette=visualPalette(r);
      card.style.setProperty('--drink-a', palette.a);
      card.style.setProperty('--drink-b', palette.b);
      card.style.setProperty('--drink-grad', palette.grad);
      $('.rank-badge',frag).textContent='#'+(idx+1); $('.rank-move',frag).textContent=r.move||''; $('.leader-title-row h3',frag).textContent=r.name; $('.trend-badge',frag).textContent=r.trend||''; $('.trend-badge',frag).style.display=r.trend?'inline-block':'none';
      $('.recipe-desc',frag).textContent=`by ${r.creator||'Anonymous'} · ${flavorName(r)}`; $('.recipe-tags',frag).innerHTML=r.items.slice(0,4).map(x=>`<span>${byId(x.id)?.short||x.id} ${x.pct}%</span>`).join(''); $('.order-count',frag).textContent=`${r.orders?.[app.period]||0} orders`; $('.remix-count',frag).textContent=`${r.remixes||0} remixes`;
      const photo=$('.leader-photo',frag); photo.src=r.image||'assets/hero-summer.jpg'; photo.alt=r.name;
      $('.view-recipe',frag).addEventListener('click',()=>openRecipeModal(r,idx)); $('.order-btn',frag).addEventListener('click',()=>loadRecipe(r,'ORDER ORIGINAL',false)); $('.remix-card-btn',frag).addEventListener('click',()=>loadRecipe(r,'REMIX MODE',true)); root.appendChild(frag);
    });
  }

  function openRecipeModal(r,idx=0){
    app.selectedRecipe=r; $('#modalRank').textContent=`#${idx+1} ${r.trend||'Community recipe'}`; $('#modalTitle').textContent=r.name; $('#modalCreator').textContent=`Created by ${r.creator||'Anonymous'} · ${r.id}`;
    $('#modalStats').innerHTML=`<div class="modal-stat"><span>ORDERS TODAY</span><strong>${r.orders?.today||0}</strong></div><div class="modal-stat"><span>REMIXES</span><strong>${r.remixes||0}</strong></div><div class="modal-stat"><span>PRICE</span><strong>฿${recipePrice(r)}</strong></div>`;
    $('#modalFormula').innerHTML=r.items.map(x=>`<div class="modal-formula-line"><i style="background:${byId(x.id).color}"></i><span>${byId(x.id).name}</span><b>${x.pct}%</b></div>`).join('')+`<div class="modal-formula-line"><i></i><span>${r.size} · Ice ${r.ice}% · ${r.mixStyle}</span><b>${flavorName(r)}</b></div>`;
    const preview=$('#modalDrinkPreview');const palette=visualPalette(r);preview.style.setProperty('--modal-glow',palette.a); if(r.image){preview.innerHTML=`<img class="modal-recipe-photo" src="${r.image}" alt="${escapeHtml(r.name)}" />`;}else{preview.innerHTML='<div class="modal-big-glass" id="modalBigGlass"></div>';renderGlass($('#modalBigGlass'),r);}
    openModal('#recipeModal');
  }

  function bumpOrder(r){
    const saved=savedRecipes(), idx=saved.findIndex(x=>x.id===r.id); if(idx>=0){['today','week','all'].forEach(k=>saved[idx].orders[k]=(saved[idx].orders[k]||0)+1);writeSaved(saved);} renderLeaderboard();
  }
  function bumpRemix(r){
    const saved=savedRecipes(), idx=saved.findIndex(x=>x.id===r.id); if(idx>=0){saved[idx].remixes=(saved[idx].remixes||0)+1;writeSaved(saved);} renderLeaderboard();
  }

  function loadRecipe(r,mode,remix){
    closeModals(); if(remix)bumpRemix(r); else bumpOrder(r);
    app.draft=deep(r); app.draft.id=uid(); app.draft.orders=undefined;app.draft.remixes=undefined;app.draft.trend=undefined;app.draft.move=undefined;
    if(remix){app.draft.name=r.name+' Remix';app.draft.creator='';} else {app.draft.name=r.name;}
    app.mode=mode; app.step=remix?3:4; app.undo=[];app.redo=[];navigate('builder'); showToast(remix?'Recipe loaded — make it yours':'Original recipe loaded');
  }

  function renderSaved(){
    const list=savedRecipes(), root=$('#savedGrid');
    if(!list.length){root.innerHTML='<div class="saved-empty"><strong>No saved recipes yet</strong><span>สร้างสูตรแรกของคุณ แล้วกด Save recipe หลัง Finish</span></div>';return;}
    root.innerHTML=list.map(r=>{ const palette=visualPalette(r); return `<article class="saved-card" data-saved="${r.id}"><div class="saved-card-preview" style="--saved-glow:${palette.a}55"><div class="saved-mini-glass" style="--drink-grad:${palette.grad}">${recipeLayersHTML(r)}</div></div><div class="saved-card-body"><h3>${escapeHtml(r.name)}</h3><p>${r.id} · ${flavorName(r)} · ฿${recipePrice(r)}</p><div class="saved-card-tags">${r.items.slice(0,4).map(x=>`<span>${byId(x.id).short} ${x.pct}%</span>`).join('')}</div><div class="saved-card-actions"><button data-saved-order="${r.id}">Order</button><button data-saved-remix="${r.id}">Remix</button><button data-saved-delete="${r.id}">Delete</button></div></div></article>`}).join('');
    $$('[data-saved-order]').forEach(b=>b.addEventListener('click',()=>loadRecipe(list.find(x=>x.id===b.dataset.savedOrder),'ORDER ORIGINAL',false)));
    $$('[data-saved-remix]').forEach(b=>b.addEventListener('click',()=>loadRecipe(list.find(x=>x.id===b.dataset.savedRemix),'REMIX MODE',true)));
    $$('[data-saved-delete]').forEach(b=>b.addEventListener('click',()=>{if(confirm('Delete this saved recipe?')){writeSaved(savedRecipes().filter(x=>x.id!==b.dataset.savedDelete));renderSaved();renderLeaderboard();}}));
  }

  function recipeLayersHTML(r){let bottom=0;return r.items.map(x=>{const i=byId(x.id),h=`<i style="height:${x.pct}%;bottom:${bottom}%;background:linear-gradient(${i.color2},${i.color})"></i>`;bottom+=x.pct;return h}).join('')}
  function escapeHtml(s=''){return s.replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[c]))}

  function openModal(sel){const m=$(sel);m.classList.add('is-open');m.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}
  function closeModals(){ $$('.modal-backdrop').forEach(m=>{m.classList.remove('is-open');m.setAttribute('aria-hidden','true')});document.body.style.overflow=''; }
  function showToast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(showToast.t);showToast.t=setTimeout(()=>t.classList.remove('show'),2200)}

  let audioCtx;
  function clickSound(freq=420,dur=.025){if(!app.sound)return;try{audioCtx=audioCtx||new (window.AudioContext||window.webkitAudioContext)();const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.frequency.value=freq;g.gain.value=.025;o.connect(g);g.connect(audioCtx.destination);o.start();g.gain.exponentialRampToValueAtTime(.0001,audioCtx.currentTime+dur);o.stop(audioCtx.currentTime+dur)}catch{}}

  function bindInputs(){
    $('#stepNext').addEventListener('click',stepNext); $('#stepBack').addEventListener('click',stepBack); $('#surpriseMe').addEventListener('click',surprise); $('#undoBtn').addEventListener('click',undo); $('#redoBtn').addEventListener('click',redo); $('#resetBtn').addEventListener('click',resetDraft); $('#finishButton').addEventListener('click',openFinish);
    $('#iceLevel').addEventListener('change',e=>{pushHistory();app.draft.ice=Number(e.target.value);renderBuilder()}); $('#mixStyle').addEventListener('change',e=>{pushHistory();app.draft.mixStyle=e.target.value;renderBuilder()});
    $('#drinkName').addEventListener('input',e=>{app.draft.name=e.target.value;renderFormulaPreview()}); $('#creatorName').addEventListener('input',e=>app.draft.creator=e.target.value); $('#publicToggle').addEventListener('change',e=>app.draft.public=e.target.checked);
    $('#copyFormula').addEventListener('click',()=>navigator.clipboard?.writeText(formulaText()).then(()=>showToast('Formula copied'))); $('#saveRecipeBtn').addEventListener('click',saveCurrent); $('#shareRecipeBtn').addEventListener('click',shareCurrent); $('#newRecipeBtn').addEventListener('click',()=>{closeModals();app.draft=newDraft();app.mode='NEW RECIPE';app.step=1;app.undo=[];app.redo=[];renderBuilder()});
    $('#orderOriginalBtn').addEventListener('click',()=>app.selectedRecipe&&loadRecipe(app.selectedRecipe,'ORDER ORIGINAL',false)); $('#remixBtn').addEventListener('click',()=>app.selectedRecipe&&loadRecipe(app.selectedRecipe,'REMIX MODE',true));
    $$('[data-close-modal]').forEach(b=>b.addEventListener('click',closeModals)); $$('.modal-backdrop').forEach(m=>m.addEventListener('click',e=>{if(e.target===m)closeModals()}));
    $('#soundToggle').addEventListener('click',()=>{app.sound=!app.sound;$('#soundToggle').style.background=app.sound?'#ff6c9d':'#19191d';showToast(app.sound?'UI sound on':'UI sound off');clickSound(600,.06)});
    document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModals();if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='z'){e.preventDefault();e.shiftKey?redo():undo();}});
  }

  function initMetrics(){const local=savedRecipes();$('#metricRecipes').textContent=(1248+local.length).toLocaleString();$('#metricRemixes').textContent=(3902+local.reduce((a,r)=>a+(r.remixes||0),0)).toLocaleString();}

  function attachTilt(areaSel,targetSel,max=10){
    const area=$(areaSel), target=$(targetSel); if(!area||!target) return;
    const reset=()=>{target.style.transform='';};
    area.addEventListener('mousemove',e=>{
      const r=area.getBoundingClientRect();
      const px=(e.clientX-r.left)/r.width-.5;
      const py=(e.clientY-r.top)/r.height-.5;
      target.style.transform=`perspective(1200px) rotateX(${(-py*max).toFixed(2)}deg) rotateY(${(px*max).toFixed(2)}deg) translateY(${(-Math.abs(py)*6).toFixed(1)}px)`;
    });
    area.addEventListener('mouseleave',reset);
  }

  function setupVisualFx(){
    attachTilt('.hero-stage','.hero-glass-wrap',8);
    attachTilt('.drink-stage-panel','.drink-glass-wrap',7);
  }

  function init(){ setupNavigation();bindInputs();updateSavedCount();renderLeaderboard();renderBuilder();initMetrics();parseShared();setupVisualFx(); if('serviceWorker' in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>{}); }
  document.addEventListener('DOMContentLoaded',init);
})();
