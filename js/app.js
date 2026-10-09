(()=>{
  'use strict';
  const config=window.PROMPTVAULT_CONFIG||{payhipLinks:{},supportEmail:''};
  const catalog=window.PROMPTVAULT_CATALOG||[];
  const samples=window.PROMPTVAULT_SAMPLES||{};
  const productInfo={
    writing:{title:'Writing & Communication',description:'Thirty detailed prompts to transform notes into clear emails, polish professional writing, build useful proposals, and communicate with confidence.',price:29,label:'COLLECTION 01'},
    business:{title:'Business & Marketing',description:'Thirty practical templates for researching your audience, refining offers, planning marketing tests, and improving product and landing-page copy.',price:49,label:'COLLECTION 02'},
    creativity:{title:'Creativity & Content',description:'Thirty creative templates for fresh story premises, compelling content ideas, brand exploration, and inventive creative briefs.',price:39,label:'COLLECTION 03'},
    productivity:{title:'Productivity & Career',description:'Thirty focused prompts for planning, task management, studying, interview preparation, and goal setting.',price:29,label:'COLLECTION 04'},
    complete:{title:'The Complete Vault',description:'Every template in our collection: 120 prompts across Writing, Business, Creativity, and Productivity, with editable files and PDF versions.',price:99,label:'THE COMPLETE VAULT'}
  };
  const $=(s)=>document.querySelector(s);
  const $$=(s)=>[...document.querySelectorAll(s)];
  const toast=$('#toast');
  let toastTimeout;
  function notify(message){if(!toast)return;toast.textContent=message;toast.classList.add('shown');clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>toast.classList.remove('shown'),3800)}
  function buildPrompt(p){return `You are a skilled specialist helping me with this task.\n\nOBJECTIVE\n${p.objective}\n\nINPUTS\n${p.input_fields}\n\nRULES\n${p.rules}\n\nREQUIRED OUTPUT\n${p.required_output}\n\nIf essential information is missing, first ask up to three targeted questions. Otherwise proceed, clearly identifying any assumptions. Use specific, natural language rather than filler.`}
  function copyText(value){if(navigator.clipboard&&window.isSecureContext){return navigator.clipboard.writeText(value)}const el=document.createElement('textarea');el.value=value;el.style.position='fixed';el.style.left='-9999px';document.body.append(el);el.select();let ok=false;try{ok=document.execCommand('copy')}finally{el.remove()}return ok?Promise.resolve():Promise.reject(Error('Copy unsupported'))}

  const modal=$('#product-dialog');
  let lastFocused=null,activeProduct='';
  function buildList(pack){return catalog.filter(p=>pack==='complete'||p.pack===pack)}
  function openProduct(pack){
    const item=productInfo[pack];if(!item||!modal)return;
    lastFocused=document.activeElement;activeProduct=pack;
    $('#dialog-kicker').textContent=item.label;
    $('#dialog-title').textContent=item.title;
    $('#dialog-description').textContent=item.description;
    $('#dialog-price').textContent=`$${item.price}`;
    const selected=buildList(pack);
    $('#dialog-count').textContent=`${selected.length} PROMPTS`;
    $('#dialog-list').replaceChildren(...selected.map(p=>{const li=document.createElement('li');li.textContent=p.title;return li}));
    $('#dialog-buy').textContent='';
    $('#dialog-buy').append(document.createTextNode('Continue to Payhip checkout '));
    const arrow=document.createElement('span');arrow.textContent='↗';arrow.setAttribute('aria-hidden','true');$('#dialog-buy').append(arrow);
    const url=config.payhipLinks?.[pack]?.trim();
    $('#dialog-buy').disabled=!url;
    $('#dialog-buy').style.opacity=url?'1':'.65';
    $('#dialog-buy').style.cursor=url?'pointer':'not-allowed';
    $('#dialog-disclaimer').textContent=url?'Checkout and digital delivery are handled securely by Payhip.':'Checkout is not connected yet. Please check back after launch.';
    if(!modal.open)modal.showModal();
  }
  $$('.card-action,[data-product].button').forEach(button=>button.addEventListener('click',()=>openProduct(button.dataset.product)));
  $('#dialog-close')?.addEventListener('click',()=>modal.close());
  modal?.addEventListener('click',e=>{if(e.target===modal)modal.close()});
  modal?.addEventListener('close',()=>lastFocused?.focus());
  $('#dialog-buy')?.addEventListener('click',()=>{
    const url=config.payhipLinks?.[activeProduct]?.trim();if(!url)return;
    try{const parsed=new URL(url);if(parsed.protocol!=='https:')throw Error('Invalid URL');window.location.assign(parsed.href)}catch{notify('Your checkout link needs a valid HTTPS Payhip URL.')}
  });

  let filter='all';let term='';let showAll=false;
  const perPage=18;
  const grid=$('#catalog-grid');
  function renderCatalog(){
    const matching=catalog.filter(p=>(filter==='all'||p.pack===filter)&&(`${p.title} ${p.objective}`.toLowerCase().includes(term)));
    const visible=showAll?matching:matching.slice(0,perPage);
    const fragment=document.createDocumentFragment();
    for(const p of visible){const entry=document.createElement('div');entry.className='catalog-entry';entry.dataset.category=p.pack;
      const n=document.createElement('span');n.className='catalog-entry-number';n.textContent=String(p.number).padStart(2,'0');
      const name=document.createElement('span');name.className='catalog-entry-title';name.textContent=p.title;
      const category=document.createElement('span');category.className='catalog-entry-chip';category.textContent=p.pack;
      entry.append(n,name,category);fragment.append(entry)}
    grid.replaceChildren(fragment);
    $('#catalog-count').textContent=`Showing ${visible.length} of ${matching.length} prompt titles`;
    $('#catalog-empty').hidden=matching.length>0;
    $('#show-more').hidden=visible.length===matching.length;
    $('#show-more').textContent=`Show ${Math.min(perPage,matching.length-visible.length)} more titles ↓`;
  }
  $$('.filter').forEach(button=>button.addEventListener('click',()=>{filter=button.dataset.filter;showAll=false;$$('.filter').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button))});renderCatalog()}));
  $('#catalog-search')?.addEventListener('input',e=>{term=e.target.value.trim().toLowerCase();showAll=false;renderCatalog()});
  $('#show-more')?.addEventListener('click',()=>{showAll=true;renderCatalog()});
  renderCatalog();

  let sampleCategory='writing';
  function selectSample(category){const p=samples[category];if(!p)return;sampleCategory=category;
    $('#sample-label').textContent=`FREE SAMPLE / ${category.toUpperCase()}`;
    $('#sample-title').textContent=p.title;
    $('#sample-prompt').textContent=buildPrompt(p);
    $$('.sample-tab').forEach(button=>{button.classList.toggle('selected',button.dataset.sample===category);button.setAttribute('aria-pressed',String(button.dataset.sample===category))})}
  $$('.sample-tab').forEach(button=>button.addEventListener('click',()=>selectSample(button.dataset.sample)));
  $('#sample-copy')?.addEventListener('click',()=>copyText(buildPrompt(samples[sampleCategory])).then(()=>notify('Full prompt copied to clipboard.')).catch(()=>notify('Copy failed. Please select the text and copy it.')));
  $('#hero-copy-btn')?.addEventListener('click',()=>copyText(buildPrompt(samples.writing)).then(()=>notify('Full writing prompt copied to clipboard.')).catch(()=>notify('Copy failed. Try the free sample below.')));
  selectSample('writing');
  $('#year').textContent=new Date().getFullYear();
  const email=(config.supportEmail||'').trim();
  if(email&&/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){$('#support-link').href=`mailto:${email}`;$('#support-link').textContent='Contact support'}else{$('#support-link').remove()}
})();
