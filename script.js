const prayers=[
"Heavenly Father, guide my thoughts, words, and choices today. Help me walk with courage, serve with humility, and trust You with what I cannot control. In Jesus’ name, amen.",
"Lord, quiet the noise around me and the fear within me. Remind me that Your presence is greater than every problem I face. Give me peace for today and faith for the next step. Amen.",
"Father, thank You for another day. Open my eyes to someone who needs encouragement, give me the courage to help, and let my life reflect the love of Christ. Amen.",
"God, when I do not understand the road ahead, help me trust the One who sees the whole journey. Keep me moving faithfully, one step at a time. Amen.",
"Lord Jesus, strengthen me where I feel weak, humble me where I feel proud, and guide me where I feel lost. Let my choices honor You today. Amen.",
"Father, help me release yesterday, receive Your grace today, and face tomorrow without fear. Thank You that Your mercies are new every morning. Amen.",
"Lord, give me wisdom before I speak, patience before I react, and compassion before I judge. Use me to bring peace into every room I enter. Amen.",
"God, place purpose in my work, kindness in my words, and courage in my heart. Help me remember that even small acts of faithfulness matter. Amen.",
"Father, protect my family and the people I love. Draw us closer to You and help our home become a place of peace, truth, laughter, and grace. Amen.",
"Lord, meet me in the parts of life I keep hidden. Bring healing to old wounds, freedom from shame, and hope where I have felt stuck. Amen.",
"God, help me pray before I panic, listen before I answer, and trust before I give up. Lead me through this day with steady faith. Amen.",
"Father, show me where You are already working. Give me the humility to join You, the courage to obey, and the endurance to keep going. Amen.",
"Lord Jesus, make my faith visible through the way I love, forgive, serve, and stand for truth. Let my life point people toward You. Amen.",
"Father, help me carry only what You have asked me to carry. Teach me to surrender the burdens that belong in Your hands. Amen.",
"Lord, bless the people who feel forgotten today. Use my words, time, and resources to remind someone that they matter and are not alone. Amen.",
"God, give me discipline when motivation fades and hope when progress feels slow. Help me stay faithful to the work You placed before me. Amen.",
"Father, guard my mind from fear and comparison. Help me recognize the gifts, calling, and path You have given me. Amen.",
"Lord, when doors close, keep me from bitterness. When doors open, keep me humble. In every season, keep my heart close to You. Amen.",
"God, help me forgive as I have been forgiven. Free my heart from resentment and give me wisdom to pursue peace with healthy boundaries. Amen.",
"Father, provide for every genuine need and teach me to be generous with what I have. Let gratitude be stronger than worry. Amen.",
"Lord Jesus, give me boldness without arrogance, confidence without pride, and strength that remains gentle. Amen.",
"God, bless the leaders, teachers, volunteers, and caregivers serving others today. Renew their energy and remind them that their work matters. Amen.",
"Father, guide every decision in front of me. Close the wrong paths clearly and give me peace and courage to walk through the right doors. Amen.",
"Lord, help me be present today. Keep me from missing the people, lessons, beauty, and opportunities You have placed right in front of me. Amen.",
"God, restore joy where life has become heavy. Help me laugh, breathe, rest, and receive the good gifts You have placed in this day. Amen.",
"Father, strengthen everyone facing grief, illness, loneliness, or uncertainty. Surround them with Your comfort and with people who care. Amen.",
"Lord Jesus, teach me to lead by serving. Help me make room for others, share credit freely, and use influence for good. Amen.",
"God, give me courage to begin what I have been afraid to start. Help me remember that You can guide a moving heart and a willing life. Amen.",
"Father, protect my integrity when no one is watching. Let my private choices match the faith I share publicly. Amen.",
"Lord, thank You for every prayer You answered differently than I expected. Help me trust that Your wisdom is greater than my limited view. Amen.",
"God, as this day ends, forgive where I failed, receive my gratitude, calm my mind, and prepare me to rise again with renewed faith. Amen."
];
const verses=[
["Trust in the LORD with all thine heart; and lean not unto thine own understanding.","Proverbs 3:5 (KJV)","Faith does not require you to understand every detail. It asks you to place the next step in God’s hands and move with trust."],
["I can do all things through Christ which strengtheneth me.","Philippians 4:13 (KJV)","This is not a promise of effortless success. It is a reminder that Christ supplies strength for every faithful assignment and season."],
["Cast thy burden upon the LORD, and he shall sustain thee.","Psalm 55:22 (KJV)","You were never meant to carry every fear alone. Prayer is the act of moving the weight from your shoulders into God’s hands."],
["For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.","2 Timothy 1:7 (KJV)","Courage is not the absence of fear. It is choosing power, love, and clear thinking while fear is present."],
["But they that wait upon the LORD shall renew their strength.","Isaiah 40:31 (KJV)","Waiting on God is not wasted time. It can become the place where strength, direction, and endurance are rebuilt."],
["Let all your things be done with charity.","1 Corinthians 16:14 (KJV)","Faith becomes visible in how we treat people. Let love shape the tone, timing, and purpose of what you do this week."]
];
const now=new Date(),day=Math.floor(now.getTime()/86400000);let prayerIndex=((day%prayers.length)+prayers.length)%prayers.length;
const prayerText=document.querySelector('#prayer-text');const prayerDate=document.querySelector('#prayer-date');
function showPrayer(){prayerText.textContent=prayers[prayerIndex];prayerDate.textContent=new Intl.DateTimeFormat('en-US',{weekday:'long',month:'long',day:'numeric',year:'numeric'}).format(now)}showPrayer();
document.querySelector('#another-prayer').onclick=()=>{prayerIndex=(prayerIndex+1)%prayers.length;showPrayer()};document.querySelector('#copy-prayer').onclick=async e=>{await navigator.clipboard.writeText(prayerText.textContent);const old=e.target.textContent;e.target.textContent='Copied ✓';setTimeout(()=>e.target.textContent=old,1600)};
const week=Math.floor(day/7)%verses.length;document.querySelector('#verse-text').textContent=verses[week][0];document.querySelector('#verse-ref').textContent=verses[week][1];document.querySelector('#verse-reflection').textContent=verses[week][2];
const hour=now.getHours();document.querySelector('#greeting').textContent=hour<12?'GOOD MORNING — WALK IN PURPOSE':hour<18?'KEEP GOING — ONE FAITHFUL STEP AT A TIME':'REST IN HIS PROMISES';document.querySelector('#year').textContent=now.getFullYear();
const menu=document.querySelector('#menu'),nav=document.querySelector('#nav');menu.onclick=()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open)};nav.querySelectorAll('a').forEach(a=>a.onclick=()=>nav.classList.remove('open'));
window.addEventListener('scroll',()=>{const h=document.documentElement;document.querySelector('#progress').style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%'});
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
const dialog=document.querySelector('#launch-dialog');document.querySelectorAll('.interest').forEach(btn=>btn.onclick=()=>{const p=btn.dataset.product;document.querySelector('#launch-product').textContent=`Get notified when the ${p} is available.`;document.querySelector('#product-field').value=p;dialog.showModal()});document.querySelector('.dialog-close').onclick=()=>dialog.close();
document.querySelectorAll('[data-ajax-form]').forEach(form=>form.addEventListener('submit',async e=>{e.preventDefault();const status=form.querySelector('.status');const button=form.querySelector('button[type="submit"],button:not([type])');const original=button.textContent;button.disabled=true;button.textContent='Sending…';status.className='status';status.textContent='';try{const response=await fetch('https://formsubmit.co/ajax/rossbusinessinquiries@gmail.com',{method:'POST',headers:{Accept:'application/json'},body:new FormData(form)});if(!response.ok)throw new Error('Send failed');form.reset();status.classList.add('success');status.textContent=form.classList.contains('prayer-form')?'Your prayer request has been received. You are not alone.':'Your message has been sent successfully.'}catch(err){status.classList.add('error');status.textContent='The message could not be sent right now. Please try again.'}finally{button.disabled=false;button.textContent=original}}));
