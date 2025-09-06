const dbPromise=new Promise((res,rej)=>{const r=indexedDB.open("vcloud_drive",1);r.onupgradeneeded=()=>{r.result.createObjectStore("files");};r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error);});
async function putFile(name,content){const db=await dbPromise;return new Promise((res,rej)=>{const tx=db.transaction("files","readwrite");tx.objectStore("files").put(content,name);tx.oncomplete=()=>res();tx.onerror=()=>rej(tx.error);});}
async function getAll(){const db=await dbPromise;return new Promise((res,rej)=>{const tx=db.transaction("files","readonly");const rq=tx.objectStore("files").getAllKeys();rq.onsuccess=()=>res(rq.result);rq.onerror=()=>rej(rq.error);});}
async function getFile(name){const db=await dbPromise;return new Promise((res,rej)=>{const tx=db.transaction("files","readonly");const rq=tx.objectStore("files").get(name);rq.onsuccess=()=>res(rq.result);rq.onerror=()=>rej(rq.error);});}

function login(){const pwd=document.getElementById("pwd").value;if(pwd==="vcloud123"){document.getElementById("login").classList.add("hidden");document.getElementById("app").classList.remove("hidden");loadFiles();}else{alert("Mot de passe incorrect");}}

document.getElementById("fileInput")?.addEventListener("change",async(e)=>{for(const f of e.target.files){const buf=await f.arrayBuffer();await putFile(f.name,buf);}loadFiles();});

async function loadFiles(){const list=document.getElementById("fileList");list.innerHTML="";const files=await getAll();for(const name of files){const data=await getFile(name);const blob=new Blob([data]);let el=document.createElement("div");el.className="file-item";if(name.match(/\.(png|jpg|jpeg|gif)$/i)){const img=document.createElement("img");img.src=URL.createObjectURL(blob);el.appendChild(img);}else if(name.match(/\.(mp4|webm)$/i)){const vid=document.createElement("video");vid.src=URL.createObjectURL(blob);vid.controls=true;el.appendChild(vid);}else{el.textContent=name;}list.appendChild(el);}}
