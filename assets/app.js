// Drawer
const drawer = document.getElementById('drawer');
const burger = document.getElementById('burger');
const scrim = document.getElementById('drawerScrim');
const topPricing = document.getElementById('topPricing');
const drawerPricing = document.getElementById('drawerPricing');
const openPricingBtn = document.getElementById('openPricing');

function openDrawer(){ drawer.setAttribute('aria-hidden','false'); }
function closeDrawer(){ drawer.setAttribute('aria-hidden','true'); }

burger?.addEventListener('click', openDrawer);
scrim?.addEventListener('click', closeDrawer);
drawer.addEventListener('click', (e)=>{
  if(e.target.classList.contains('drawer-link')) closeDrawer();
});

// Toggle pricing slide
function slideToPricing(){
  document.body.classList.add('show-pricing');
  // also set hash for deep link
  history.replaceState(null, '', '#pricing');
  // move focus to first card
  const firstBtn = document.querySelector('.pricing .card .btn');
  if(firstBtn) firstBtn.focus();
}
openPricingBtn?.addEventListener('click', slideToPricing);
topPricing?.addEventListener('click', (e)=>{ e.preventDefault(); slideToPricing(); });
drawerPricing?.addEventListener('click', (e)=>{ e.preventDefault(); closeDrawer(); slideToPricing(); });

// If user opens page with #pricing -> show slide directly
if(location.hash === '#pricing'){
  document.body.classList.add('show-pricing');
}
