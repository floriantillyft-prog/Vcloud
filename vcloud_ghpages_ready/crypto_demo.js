const log=(...a)=>{const el=document.getElementById('log');el.textContent+=a.join(' ')+'\n';el.scrollTop=el.scrollHeight;}
const bar=(p)=>{document.getElementById('bar').style.width=(p*100).toFixed(1)+'%';}
const rand=(n)=>crypto.getRandomValues(new Uint8Array(n));
async function deriveKey(password,salt){const enc=new TextEncoder();const base=await crypto.subtle.importKey('raw',enc.encode(password),'PBKDF2',false,['deriveKey']);return await crypto.subtle.deriveKey({name:'PBKDF2',hash:'SHA-256',salt,iterations:100000},base,{name:'AES-GCM',length:256},false,['encrypt','decrypt']);}
function b64(buf){return btoa(String.fromCharCode(...new Uint8Array(buf)));}
function unb64(s){const bin=atob(s);const u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);return u.buffer;}

document.getElementById("encryptBtn").onclick=async()=>{const f=document.getElementById("file").files[0];const pw=document.getElementById("pass").value;if(!f||!pw){alert("Fichier + mot de passe");return;}bar(0);const salt=rand(16);const key=await deriveKey(pw,salt);const iv=rand(12);const ct=await crypto.subtle.encrypt({name:"AES-GCM",iv},key,await f.arrayBuffer());log("✅ Chiffré "+f.name+" ("+f.size+" octets)");bar(1);}
document.getElementById("exportBtn").onclick=()=>{alert("Export démo");}
document.getElementById("importBtn").onclick=()=>{alert("Import démo");}
document.getElementById("restoreBtn").onclick=()=>{alert("Restauration démo");}
