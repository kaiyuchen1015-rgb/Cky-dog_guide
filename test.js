const quizQuestions=[
  {prompt:'How do you like to spend a free day?',answers:[['Exploring outdoors and staying active',['energetic','adventurous']],['Relaxing at home with people I love',['affectionate','calm']],['Learning or making something new',['curious','clever']],['Meeting friends and trying something fun',['social','playful'] ]},
  {prompt:'Which word best describes your social style?',answers:[['Outgoing — the more friends, the better',['social','playful']],['Warm with my close circle',['affectionate','loyal']],['Independent — I enjoy my own space',['independent','calm']],['Quiet at first, curious once I feel safe',['thoughtful','curious'] ]},
  {prompt:'What pace feels right for your everyday life?',answers:[['Fast and full of activity',['energetic','adventurous']],['Steady, with a daily walk or two',['loyal','calm']],['Flexible, with a mix of play and rest',['playful','affectionate']],['A little challenge to keep my mind busy',['clever','curious'] ]},
  {prompt:'When plans change unexpectedly, you usually…',answers:[['Adapt quickly and make it an adventure',['adventurous','independent']],['Check in with my people first',['loyal','affectionate']],['Stay calm and find a practical solution',['calm','clever']],['Get curious and see where it leads',['curious','playful'] ]},
  {prompt:'Which compliment would make your day?',answers:[['“You are always there for your people.”',['loyal','affectionate']],['“You bring so much joy into the room.”',['playful','social']],['“You are brave and full of energy.”',['energetic','adventurous']],['“You are clever and wonderfully original.”',['clever','independent'] ]},
  {prompt:'Pick your ideal home atmosphere.',answers:[['Lively, welcoming, and full of visitors',['social','playful']],['Cozy, close-knit, and peaceful',['affectionate','calm']],['A base camp for outdoor adventures',['energetic','adventurous']],['Quiet enough to focus and recharge',['independent','thoughtful'] ]},
  {prompt:'How do you show you care?',answers:[['I make time and stay dependable',['loyal','thoughtful']],['I offer affection and encouragement',['affectionate','social']],['I help solve the problem',['clever','loyal']],['I invite them to share a new experience',['adventurous','playful'] ]}
];

const quizBreeds=[
  {name:'Golden Retriever',image:'https://pic4.zhimg.com/v2-a0ebaefb66af5b5b6a5025cd1e15695b_r.jpg',traits:['loyal','affectionate','social','playful'],summary:'Warm, dependable, and generous with affection. You make people feel welcome and value being part of a close circle.'},
  {name:'Shiba Inu',image:'https://www.carecredit.com/sites/cc/image/hero_shiba_inu.jpg',traits:['independent','curious','thoughtful','calm'],summary:'Self-possessed, observant, and quietly curious. You value your independence while choosing your connections with care.'},
  {name:'Poodle',image:'https://ask.woodgreen.org.uk/media/pages/images/99f12e906e-1737559438/miniature-poodle-900x900-crop.jpg',traits:['clever','curious','social','playful'],summary:'Bright, adaptable, and expressive. You enjoy learning, new ideas, and sharing your enthusiasm with others.'},
  {name:'Siberian Husky',image:'https://cdn.britannica.com/84/232784-050-1769B477/Siberian-Husky-dog.jpg',traits:['energetic','adventurous','social','independent'],summary:'Energetic, adventurous, and spirited. You thrive on new experiences and bring lively momentum to a group.'},
  {name:'Beagle',image:'https://cdn.britannica.com/80/29280-050-A3A13277/Beagles-pets.jpg',traits:['curious','social','playful','affectionate'],summary:'Friendly, curious, and easy to bring along. You find joy in small discoveries and enjoy having good company.'},
  {name:'Border Collie',image:'https://animalsbreeds.com/wp-content/uploads/2015/01/border-collie-8.jpg',traits:['clever','energetic','thoughtful','loyal'],summary:'Focused, capable, and quick to learn. You care deeply, notice details, and love having a meaningful challenge.'},
  {name:'French Bulldog',image:'https://www.mihavmarket.com.tr/uploads/French-Bulldog%20(2).jpg',traits:['affectionate','playful','calm','social'],summary:'Charming, affectionate, and good at enjoying the moment. Your steady presence and sense of fun bring people together.'},
  {name:'Labrador Retriever',image:'https://spotpet.com/_next/image?url=https:%2F%2Fimages.ctfassets.net%2Fm5ehn3s5t7ec%2Fwp-image-197858%2F7746c729ddf5a2a730f17999268362de%2FLabrador-Retriever-Dog-Breed-Guide.jpg&w=3840&q=75',traits:['social','loyal','energetic','affectionate'],summary:'Open-hearted, upbeat, and reliable. You are happiest when sharing activities and showing up for your people.'},
  {name:'Pembroke Welsh Corgi',image:'https://koala.sh/api/image/v2-me52k-uz03m.jpg?width=1216&height=832&dream',traits:['playful','clever','social','adventurous'],summary:'Clever, spirited, and full of character. You combine a playful streak with a practical knack for getting things done.'},
  {name:'Maltese',image:'https://media-be.chewy.com/wp-content/uploads/2021/05/27162345/Maltese_FeaturedImage.jpg',traits:['affectionate','thoughtful','calm','loyal'],summary:'Gentle, devoted, and attentive to others. You value close bonds and bring a soothing warmth to the people around you.'},
  {name:'German Shepherd',image:'https://cdn.britannica.com/79/232779-050-6B0411D7/German-Shepherd-dog-Alsatian.jpg',traits:['loyal','thoughtful','energetic','clever'],summary:'Steadfast, observant, and purposeful. You are protective of your values and dependable when people count on you.'},
  {name:'Samoyed',image:'https://thepedigreepaws.b-cdn.net/web/dog-breed/83/1695041605-samoyed-the-pedigree-paws-outdoor-fun.jpg',traits:['social','affectionate','playful','energetic'],summary:'Sociable, optimistic, and warm. You lift the mood around you and enjoy being part of shared adventures.'}
];

const quizShell=document.getElementById('quiz-shell');
const progressWrap=document.getElementById('quiz-progress-wrap');
const progressText=document.getElementById('quiz-progress-text');
const progressPercent=document.getElementById('quiz-progress-percent');
const progressBar=document.getElementById('quiz-progress-bar');
const answers=Array(quizQuestions.length).fill(null);
let currentQuestion=0;

function updateProgress(){
  const complete=answers.filter(answer=>answer!==null).length;
  progressText.textContent=`Question ${Math.min(currentQuestion+1,quizQuestions.length)} of ${quizQuestions.length} · ${complete} answered`;
  progressPercent.textContent=`${Math.round(complete/quizQuestions.length*100)}%`;
  progressBar.style.width=`${complete/quizQuestions.length*100}%`;
}

function showIntro(){
  progressWrap.hidden=true;
  quizShell.innerHTML='<div class="quiz-intro"><span class="quiz-kicker">A little self-discovery</span><h1>Which dog breed matches your spirit?</h1><p>Answer seven lighthearted questions to discover your primary and secondary breed matches, plus a dog breed that may complement your style.</p><button class="button" id="quiz-start" type="button">Start the quiz</button></div>';
  document.getElementById('quiz-start').addEventListener('click',()=>{progressWrap.hidden=false;renderQuestion();});
}

function renderQuestion(){
  updateProgress();
  const question=quizQuestions[currentQuestion];
  const chosen=answers[currentQuestion];
  quizShell.innerHTML=`<section class="quiz-question"><span class="quiz-kicker">Question ${currentQuestion+1}</span><h1>${question.prompt}</h1><div class="quiz-answers">${question.answers.map((answer,index)=>`<button type="button" class="quiz-answer${chosen===index?' is-selected':''}" data-answer="${index}" aria-pressed="${chosen===index}"><span class="quiz-answer-mark">${String.fromCharCode(65+index)}</span><span>${answer[0]}</span></button>`).join('')}</div><div class="quiz-controls"><button type="button" class="quiz-back" ${currentQuestion===0?'disabled':''}>Back</button><button type="button" class="button" id="quiz-next" ${chosen===null?'disabled':''}>${currentQuestion===quizQuestions.length-1?'See my results':'Next'}</button></div></section>`;
  quizShell.querySelectorAll('[data-answer]').forEach(button=>button.addEventListener('click',()=>{answers[currentQuestion]=Number(button.dataset.answer);renderQuestion();}));
  quizShell.querySelector('.quiz-back').addEventListener('click',()=>{if(currentQuestion>0){currentQuestion--;renderQuestion();}});
  document.getElementById('quiz-next').addEventListener('click',()=>{
    if(answers[currentQuestion]===null)return;
    if(currentQuestion<quizQuestions.length-1){currentQuestion++;renderQuestion();return;}
    showResults();
  });
}

function scoreBreeds(){
  const scores=Object.fromEntries(quizBreeds.map(breed=>[breed.name,0]));
  answers.forEach((answerIndex,questionIndex)=>{
    const traits=quizQuestions[questionIndex].answers[answerIndex][1];
    quizBreeds.forEach(breed=>{scores[breed.name]+=traits.filter(trait=>breed.traits.includes(trait)).length;});
  });
  return [...quizBreeds].sort((a,b)=>scores[b.name]-scores[a.name]||a.name.localeCompare(b.name));
}

function showResults(){
  const ranked=scoreBreeds();
  const [primary,secondary]=ranked;
  const complementary={
    'Golden Retriever':'Shiba Inu','Shiba Inu':'Golden Retriever','Poodle':'Maltese','Siberian Husky':'Golden Retriever','Beagle':'German Shepherd','Border Collie':'French Bulldog','French Bulldog':'Border Collie','Labrador Retriever':'Shiba Inu','Pembroke Welsh Corgi':'Maltese','Maltese':'Siberian Husky','German Shepherd':'Beagle','Samoyed':'Shiba Inu'
  };
  const match=quizBreeds.find(breed=>breed.name===complementary[primary.name])||ranked[2];
  progressText.textContent='Quiz complete';progressPercent.textContent='100%';progressBar.style.width='100%';
  const card=(breed,label,extra='')=>`<article class="quiz-result-card ${extra}"><img src="${breed.image}" alt="${breed.name}" loading="lazy"><div><span class="quiz-result-label">${label}</span><h2>${breed.name}</h2><p>${breed.summary}</p></div></article>`;
  quizShell.innerHTML=`<section class="quiz-results"><span class="quiz-kicker">Your results</span><h1>Your dog-breed spirit</h1><div class="quiz-result-featured">${card(primary,'Primary match','is-primary')}${card(secondary,'Secondary match','is-secondary')}</div><div class="quiz-match"><h2>Your complementary breed</h2><p>A breed with a different but potentially balancing style.</p>${card(match,'A complementary match','is-match')}</div><a class="button quiz-home-button" href="index.html">Retake quiz · Back to home</a></section>`;
}

showIntro();
