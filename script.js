const EMAIL = 'rossbusinessinquiries@gmail.com';
const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${EMAIL}`;

const prayers = [
  "Heavenly Father, order my steps today. Give me courage to move when You call, patience when You say wait, and compassion for every person You place in my path. Let my choices reflect Your love. In Jesus’ name, amen.",
  "Lord, quiet the noise around me and the fear within me. Help me remember that I do not walk alone. Give me wisdom for today, strength for the next step, and faith for what I cannot yet see. Amen.",
  "Father, use my life for something greater than comfort. Show me who needs encouragement, where I can serve, and what I need to release. Make me bold without becoming proud and humble without becoming afraid. Amen.",
  "God, thank You for another day. Guard my heart, guide my words, and keep my mind focused on what is true. Help me carry hope into every room I enter. In Jesus’ name, amen.",
  "Lord Jesus, when I feel stuck, remind me that faith moves. Give me the discipline to pray, the courage to act, and the trust to let You steer the road ahead. Amen.",
  "Father, bless my family, my work, and the people I serve. Let me be dependable, generous, and full of grace. Turn setbacks into lessons and opportunities into ministry. Amen.",
  "God, help me live beyond what I can see. Replace fear with faith, bitterness with mercy, and hesitation with obedience. May my life point people toward You today. Amen."
];

const prayerText = document.querySelector('#prayer-text');
const prayerDate = document.querySelector('#prayer-date');
const toast = document.querySelector('#toast');
let prayerIndex = new Date().getDate() % prayers.length;

function setPrayer(index){
  prayerIndex = (index + prayers.length) % prayers.length;
  prayerText.textContent = prayers[prayerIndex];
}
function showToast(message){
  toast.textContent = message;
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 2600);
}

setPrayer(prayerIndex);
prayerDate.textContent = new Intl.DateTimeFormat('en-US',{weekday:'long',month:'long',day:'numeric',year:'numeric'}).format(new Date());
document.querySelector('#year').textContent = new Date().getFullYear();

document.querySelector('#new-prayer').addEventListener('click',()=>setPrayer(prayerIndex+1));
document.querySelector('#copy-prayer').addEventListener('click',async()=>{
  try{await navigator.clipboard.writeText(prayerText.textContent);showToast('Prayer copied.');}
  catch{showToast('Select the prayer text to copy it.');}
});

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
menuToggle.addEventListener('click',()=>{
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded',String(open));
});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('visible')});
},{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

window.addEventListener('scroll',()=>{
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
  document.querySelector('#reading-progress').style.width = `${pct}%`;
},{passive:true});

async function submitViaFormSubmit(form){
  const button = form.querySelector('.submit-button');
  const status = form.querySelector('.form-status');
  const original = button.textContent;
  button.disabled = true;
  button.textContent = 'Sending...';
  status.className = 'form-status';
  status.textContent = '';
  try{
    const response = await fetch(FORMSUBMIT_ENDPOINT,{
      method:'POST',
      headers:{'Accept':'application/json'},
      body:new FormData(form)
    });
    if(!response.ok) throw new Error('Submission failed');
    status.classList.add('success');
    status.textContent = form.dataset.formsubmit === 'prayer'
      ? 'Your prayer request has been received. Thank you for trusting us.'
      : 'Your message has been sent successfully.';
    form.reset();
    if(form.dataset.formsubmit === 'launch') window.setTimeout(closeModal,1200);
  }catch(error){
    status.classList.add('error');
    status.textContent = 'The message could not be sent. Please try again or email rossbusinessinquiries@gmail.com.';
  }finally{
    button.disabled = false;
    button.textContent = original;
  }
}

document.querySelectorAll('[data-formsubmit]').forEach(form=>{
  form.addEventListener('submit',event=>{
    event.preventDefault();
    submitViaFormSubmit(form);
  });
});

const modal = document.querySelector('#interest-modal');
const modalProduct = document.querySelector('#modal-product');
const modalCopy = document.querySelector('#modal-copy');
function openModal(product){
  modalProduct.value = product;
  modalCopy.textContent = `Be first to hear when the ${product} becomes available.`;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
  modal.querySelector('input[name="name"]').focus();
}
function closeModal(){
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}
document.querySelectorAll('.interest-button').forEach(button=>button.addEventListener('click',()=>openModal(button.dataset.product)));
document.querySelector('#join-button').addEventListener('click',()=>openModal('Fearless Faith Collection and book updates'));
document.querySelector('.modal-close').addEventListener('click',closeModal);
modal.addEventListener('click',event=>{if(event.target===modal)closeModal()});
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeModal()});
