const log=(...a)=>{const el=document.getElementById('log');el.textContent+=a.join(' ')+'\n';el.scrollTop=el.scrollHeight;}
const bar=(p)=>{document.getElementById('bar').style.width=(p*100).toFixed(1)+'%';}
const dbp=new Promise((res,rej)=>{const r=indexedDB.open('vcloud_demo',1);r.onupgradeneeded=()=>{r.result.createObjectStore('pkg');};r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error);});
const put=async(k,v)=>new Promise(async(res,rej)=>{const tx=(await dbp).transaction('pkg','readwrite');tx.objectStore('pkg').put(v,k);tx.oncomplete=()=>res();tx.onerror=()=>rej(tx.error);});
const get=async(k)=>new Promise(async(res,rej)=>{const tx=(await dbp).transaction('pkg','readonly');const rq=tx.objectStore('pkg').get(k);rq.onsuccess=()=>res(rq.result);rq.onerror=()=>rej(rq.error);});
const rand=n=>crypto.getRandomValues(new Uint8Array(n));
async function keyFromPass(pw,salt){const enc=new TextEncoder();const base=await crypto.subtle.importKey('raw',enc.encode(pw),'PBKDF2',false,['deriveKey']);return await crypto.subtle.deriveKey({name:'PBKDF2',hash:'SHA-256',salt,iterations:150000},base,{name:'AES-GCM',length:256},false,['encrypt','decrypt']);}
function b64(a){return btoa(String.fromCharCode(...new Uint8Array(a)))};function ub64(s){const b=atob(s);const u=new Uint8Array(b.length);for(let i=0;i<b.length;i++)u[i]=b.charCodeAt(i);return u.buffer;}

document.getElementById('encryptBtn').onclick=async()=>{
  const f=document.getElementById('file').files[0]; const pw=document.getElementById('pass').value;
  if(!f||!pw){alert('Fichier + mot de passe');return;}
  bar(0); const salt=rand(16), iv=rand(12), key=await keyFromPass(pw,salt);
  const ct=await crypto.subtle.encrypt({name:'AES-GCM',iv},key,await f.arrayBuffer());
  await put('last',{salt:b64(salt),iv:b64(iv),data:b64(ct),name:f.name,size:f.size});
  log('✅ Chiffré & stocké :',f.name,'('+f.size+' octets)'); bar(1);
}
document.getElementById('exportBtn').onclick=async()=>{
  const pkg=await get('last'); if(!pkg){alert('Rien à exporter');return;}
  const blob=new Blob([JSON.stringify(pkg,null,2)],{type:'application/json'});
  const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=(pkg.name||'fichier')+'.vcloud'; a.click();
  log('📦 Exporté .vcloud');
}
document.getElementById('importBtn').onclick=()=>{
  const i=document.createElement('input'); i.type='file'; i.accept='.vcloud,application/json'; i.onchange=async()=>{
    const pkg=JSON.parse(await i.files[0].text()); await put('last',pkg); log('⬇️ Importé',pkg.name||'paquet'); };
  i.click();
}
document.getElementById('restoreBtn').onclick=async()=>{
  const pkg=await get('last'); if(!pkg){alert('Aucun paquet');return;}
  const pw=document.getElementById('pass').value; if(!pw){alert('Mot de passe');return;}
  const key=await keyFromPass(pw,Uint8Array.from(atob(pkg.salt),c=>c.charCodeAt(0)));
  const pt=await crypto.subtle.decrypt({name:'AES-GCM',iv:Uint8Array.from(atob(pkg.iv),c=>c.charCodeAt(0))},key,Uint8Array.from(atob(pkg.data),c=>c.charCodeAt(0))).catch(()=>null);
  if(!pt){alert('Mot de passe incorrect');return;}
  const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([pt])); a.download=pkg.name||'restored.bin'; a.click();
  log('🧩 Restauré');
}
