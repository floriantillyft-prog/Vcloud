const PASSWORD = "vcloud123"; // change ici si besoin
const dbp=new Promise((res,rej)=>{const r=indexedDB.open('vcloud_drive',1);r.onupgradeneeded=()=>{r.result.createObjectStore('files');};r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error);});
const put=(k,v)=>dbp.then(db=>new Promise((res,rej)=>{const tx=db.transaction('files','readwrite');tx.objectStore('files').put(v,k);tx.oncomplete=()=>res();tx.onerror=()=>rej(tx.error);}));
const del=(k)=>dbp.then(db=>new Promise((res,rej)=>{const tx=db.transaction('files','readwrite');tx.objectStore('files').delete(k);tx.oncomplete=()=>res();tx.onerror=()=>rej(tx.error);}));
const keys=()=>dbp.then(db=>new Promise((res,rej)=>{const tx=db.transaction('files','readonly');const rq=tx.objectStore('files').getAllKeys();rq.onsuccess=()=>res(rq.result||[]);rq.onerror=()=>rej(rq.error);}));
const get=(k)=>dbp.then(db=>new Promise((res,rej)=>{const tx=db.transaction('files','readonly');const rq=tx.objectStore('files').get(k);rq.onsuccess=()=>res(rq.result);rq.onerror=()=>rej(rq.error);}));

const sel=new Set();
function setView(v){document.getElementById('view-grid').style.display=(v==='grid')?'block':'none';document.getElementById('view-about').style.display=(v==='about')?'block':'none';}
function login(){const ok=document.getElementById('pwd').value===PASSWORD;if(!ok){alert('Mot de passe incorrect');return;}document.getElementById('gate').style.display='none';document.getElementById('app').style.display='grid';refresh();}
document.getElementById('fileInput')?.addEventListener('change',async e=>{for(const f of e.target.files){const buf=await f.arrayBuffer();await put(f.name,{name:f.name,type:f.type,data:buf});}refresh();});
async function refresh(){const list=await keys(); const grid=document.getElementById('grid'); grid.innerHTML=''; document.getElementById('count').textContent=list.length+(list.length>1?' fichiers':' fichier');
 for(const name of list){const rec=await get(name); const blob=new Blob([rec.data],{type:rec.type||'application/octet-stream'}); const url=URL.createObjectURL(blob);
  const tile=document.createElement('div'); tile.className='tile'; tile.onclick=()=>{ if(sel.has(name)){sel.delete(name); tile.style.outline='none';} else {sel.add(name); tile.style.outline='2px solid #2a63ff';} };
  if((rec.type||'').startsWith('image/')){const img=document.createElement('img'); img.src=url; tile.appendChild(img);}
  else if((rec.type||'').startsWith('video/')){const vid=document.createElement('video'); vid.src=url; vid.controls=true; tile.appendChild(vid);}
  else {const p=document.createElement('p'); p.textContent=rec.name; tile.appendChild(p);}
  grid.appendChild(tile);
 }
}
async function downloadSelected(){for(const name of sel){const rec=await get(name); const blob=new Blob([rec.data],{type:rec.type||'application/octet-stream'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=rec.name; a.click();}}
async function deleteSelected(){for(const name of Array.from(sel)){await del(name); sel.delete(name);} refresh();}
