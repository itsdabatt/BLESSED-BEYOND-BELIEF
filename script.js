const EMAIL = 'rossbusinessinquiries@gmail.com';
const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${EMAIL}`;

const prayers = [
  "Heavenly Father, order my steps today. Give me courage to move when You call, patience when You say wait, and compassion for every person You place in my path. Let my choices reflect Your love. In Jesus’ name, amen.",
  "Lord, quiet the noise around me and the fear within me. Help me remember that I do not walk alone. Give me wisdom for today, strength for the next step, and faith for what I cannot yet see. Amen.",
  "Father, use my life for something greater than comfort. Show me who needs encouragement, where I can serve, and what I need to release. Make me bold without becoming proud and humble without becoming afraid. Amen.",
  "God, thank You for another day. Guard my heart, guide my words, and keep my mind focused on what is true. Help me carry hope into every room I enter. In Jesus’ name, amen.",
  "Lord Jesus, when I feel stuck, remind me that faith moves. Give me the discipline to pray, the courage to act, and the trust to let You steer the road ahead. Amen.",
  "Father, bless my family, my work, and the people I serve. Let me be dependable, generous, and full of grace. Turn setbacks into lessons and opportunities into ministry. Amen.",
  "God, help me live beyond what I can see. Replace fear with faith, bitterness with mercy, and hesitation with obedience. May my life point people toward You today. Amen.",
  "Lord, give me a clean heart and a steady spirit. Help me release yesterday, receive Your mercy today, and walk forward with purpose. Amen.",
  "Father, when plans change, keep my faith anchored. Teach me to trust Your timing and recognize the doors You are opening. Amen.",
  "Jesus, help me speak life today. Let my words heal, encourage, and point people toward hope rather than fear. Amen.",
  "Lord, strengthen everyone carrying a burden in silence. Surround them with peace, wise support, and the reminder that they are not forgotten. Amen.",
  "Father, give me wisdom before I react, humility when I am corrected, and courage when I must stand for what is right. Amen.",
  "God, bless the work of my hands. Let what I build be honest, useful, generous, and pleasing to You. Amen.",
  "Lord, protect my mind from comparison. Help me celebrate others while faithfully walking the path You have given me. Amen.",
  "Father, renew my strength. Where I am tired, carry me; where I am discouraged, remind me of Your faithfulness. Amen.",
  "Jesus, teach me to forgive as I have been forgiven. Free my heart from resentment and lead me toward peace. Amen.",
  "Lord, guide every decision I face today. Close the wrong doors clearly and give me peace about the right ones. Amen.",
  "Father, help me notice the person who feels unseen. Give me the courage to pause, listen, and show them Your love. Amen.",
  "God, keep me faithful in the small things. Build character in private that can carry responsibility in public. Amen.",
  "Lord, when fear tells me to stay parked, remind me that obedient faith takes the next step. Lead me and I will follow. Amen.",
  "Father, bring peace to my home. Help us communicate with patience, forgive quickly, and choose love over pride. Amen.",
  "Jesus, help me carry my faith beyond Sunday. Let it shape my work, relationships, choices, and service today. Amen.",
  "Lord, comfort everyone grieving today. Be close in the quiet moments and give them strength for one breath and one step at a time. Amen.",
  "Father, teach me contentment without complacency. Let me be grateful for today while still growing toward what You have called me to become. Amen.",
  "God, protect those traveling, working, serving, and caring for others today. Give them safety, wisdom, and endurance. Amen.",
  "Lord, help me use my time wisely. Remove distractions that drain me and focus my energy on what matters most. Amen.",
  "Father, replace my need to control everything with trust in Your character. You see what I cannot see. Amen.",
  "Jesus, give me courage to begin again. Let failure become instruction, not identity, and grace become the ground beneath my feet. Amen.",
  "Lord, bless our communities. Raise up servants, peacemakers, teachers, and leaders who care for people with integrity. Amen.",
  "Father, let generosity become part of my lifestyle. Show me what I can give, share, teach, or do for someone else today. Amen.",
  "God, thank You for Your mercy that meets me every morning. Help me live today with faith, courage, kindness, and purpose. In Jesus’ name, amen."
];

const prayerText = document.querySelector('#prayer-text');
const prayerDate = document.querySelector('#prayer-date');
const toast = document.querySelector('#toast');
const today = new Date();
const startOfYear = new Date(today.getFullYear(),0,0);
const dayOfYear = Math.floor((today - startOfYear) / 86400000);
let prayerIndex = dayOfYear % prayers.length;

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
