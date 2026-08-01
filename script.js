const prayers = [
  "Heavenly Father, order my steps today. Give me courage to move when You call, patience when You say wait, and compassion for every person You place in my path. Let my choices reflect Your love. In Jesus’ name, amen.",
  "Lord, quiet the noise around me and the fear within me. Help me remember that I do not walk alone. Give me wisdom for today, strength for the next step, and faith for what I cannot yet see. Amen.",
  "Father, use my life for something greater than comfort. Show me who needs encouragement, where I can serve, and what I need to release. Make me bold without becoming proud and humble without becoming afraid. Amen.",
  "God, thank You for another day. Guard my heart, guide my words, and keep my mind focused on what is true. Help me carry hope into every room I enter. In Jesus’ name, amen.",
  "Lord Jesus, when I feel stuck, remind me that faith moves. Give me the discipline to pray, the courage to act, and the trust to let You steer the road ahead. Amen.",
  "Father, bless my family, my work, and the people I serve. Let me be dependable, generous, and full of grace. Turn setbacks into lessons and opportunities into ministry. Amen.",
  "God, help me live beyond what I can see. Replace fear with faith, bitterness with mercy, and hesitation with obedience. May my life point people toward You today. Amen."
];

const prayerEl = document.querySelector('#daily-prayer');
const dateEl = document.querySelector('#prayer-date');
const toast = document.querySelector('#toast');
let prayerIndex = new Date().getDate() % prayers.length;

function setPrayer(index){
  prayerIndex = (index + prayers.length) % prayers.length;
  prayerEl.textContent = prayers[prayerIndex];
}
function showToast(message){
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2400);
}

setPrayer(prayerIndex);
dateEl.textContent = new Intl.DateTimeFormat('en-US',{weekday:'long',month:'long',day:'numeric',year:'numeric'}).format(new Date());
document.querySelector('#year').textContent = new Date().getFullYear();

document.querySelector('#new-prayer').addEventListener('click',()=>setPrayer(prayerIndex+1));
document.querySelector('#copy-prayer').addEventListener('click',async()=>{
  try{await navigator.clipboard.writeText(prayerEl.textContent);showToast('Prayer copied.');}
  catch{showToast('Select the prayer text to copy it.');}
});

document.querySelectorAll('.product-button').forEach(button=>{
  button.addEventListener('click',()=>{
    const subject = encodeURIComponent(`Blessed Beyond Belief — ${button.dataset.product}`);
    const body = encodeURIComponent(`Please let me know when the ${button.dataset.product} is available.`);
    window.location.href = `mailto:rossbusinessinquiries@gmail.com?subject=${subject}&body=${body}`;
  });
});

document.querySelector('#contact-form').addEventListener('submit',(event)=>{
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const subject = encodeURIComponent(`Blessed Beyond Belief: ${data.get('reason')}`);
  const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nReason: ${data.get('reason')}\n\n${data.get('message')}`);
  window.location.href = `mailto:rossbusinessinquiries@gmail.com?subject=${subject}&body=${body}`;
});

const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('visible')});
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
toggle.addEventListener('click',()=>{
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded',String(open));
});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>nav.classList.remove('open')));
