const questions=[
{prompt:'After five days of work or school, what is your ideal Friday night?',answers:[['Meet a few friends and go out; the livelier it is, the more I recharge','E'],['Head home, change into pajamas, and have some time to myself','I']]},
{prompt:'At a crowded social event, you usually…',answers:[['Feel at ease starting conversations with strangers and breaking the ice','E'],['Stay near people you know, observe, and wait for someone to approach','I']]},
{prompt:'When you take on a new task or hobby, what interests you more?',answers:[['The practical details and steps; I like a clear, hands-on approach','S'],['The big picture and future possibilities; I often imagine what could be','N']]},
{prompt:'When you walk down the street, where does your attention tend to go?',answers:[['What is right in front of me, like a new shop or someone’s outfit','S'],['My thoughts, big questions, or an idea I have not finished exploring','N']]},
{prompt:'A close friend makes a risky decision, like quitting a job impulsively. What do you do?',answers:[['Help them weigh the pros and cons, plan next steps, and see the risks','T'],['Support them emotionally first and talk it through once they feel calmer','F']]},
{prompt:'When someone criticizes your work, what is your first reaction?',answers:[['I may feel annoyed, but I quickly consider whether their reasoning is sound','T'],['I take it personally and may wonder if they dislike me','F']]},
{prompt:'When do you usually pack for a weekend trip?',answers:[['The day before, with a checklist and an itinerary','J'],['At the last minute; I can figure out anything I forgot along the way','P']]},
{prompt:'How do you react when an unexpected task disrupts your day?',answers:[['I feel unsettled and want to reorganize my schedule right away','J'],['I adapt as I go; plans change, and that is fine','P']]}
];
const outcomes={
ESFJ:{dog:'Golden Retriever',line:'A natural caregiver who brings warmth wherever you go.'},
ESFP:{dog:'Labrador Retriever',line:'A joyful social spark who is always ready for fun and food.'},
ISFJ:{dog:'Bernese Mountain Dog',line:'Quietly dependable, you are a steady source of support.'},
ISFP:{dog:'Cocker Spaniel',line:'A gentle, sensitive soul with an artistic streak.'},
ESTJ:{dog:'German Shepherd',line:'Efficient and decisive, you naturally take the lead.'},
ISTJ:{dog:'Schnauzer',line:'Thorough and principled, you know where you stand.'},
ESTP:{dog:'Doberman Pinscher',line:'Cool under pressure, decisive, and drawn to a challenge.'},
ISTP:{dog:'Alaskan Malamute',line:'You look cool and capable, with a relaxed side underneath.'},
INTJ:{dog:'Akita',line:'Independent and self-possessed, you know your own mind.'},
INTP:{dog:'Czechoslovakian Wolfdog',line:'An original thinker who prefers their own path.'},
ENTP:{dog:'Border Collie',line:'Full of ideas, clever, and always ready to challenge the rules.'},
ENFP:{dog:'Siberian Husky',line:'An unpredictable burst of energy and a source of joy.'},
INFP:{dog:'Bichon Frise',line:'Soft-hearted and affectionate, you value closeness.'},
INFJ:{dog:'Samoyed',line:'Warm on the outside, with a thoughtful inner world.'},
ENFJ:{dog:'Poodle',line:'Socially perceptive, thoughtful, and quick to read the room.'},
ENTJ:{dog:'Chihuahua',line:'Small in number? Never in presence. You have a strong sense of purpose.'}
};
const quizShell=document.getElementById('quiz-shell'),progressWrap=document.getElementById('quiz-progress-wrap'),progressText=document.getElementById('quiz-progress-text'),progressPercent=document.getElementById('quiz-progress-percent'),progressBar=document.getElementById('quiz-progress-bar'),quizMachine=document.querySelector('.quiz-machine');
let answers=[],currentQuestion=0;
function updateProgress(){const done=answers.length,percent=Math.round(done/questions.length*100);progressText.textContent='Answered '+done+' of '+questions.length;progressPercent.textContent=percent+'%';progressBar.style.width=percent+'%';}
function startFirstQuestion(){answers=[];currentQuestion=0;progressWrap.hidden=false;quizMachine.hidden=true;renderQuestion();}
function showIntro(){progressWrap.hidden=true;quizMachine.hidden=false;quizShell.innerHTML='<div class="quiz-intro"><span class="quiz-kicker">DOG BREED QUIZ</span><h1>Find Your Dog Personality Type</h1><p>Answer eight everyday questions to discover the dog breed that matches your personality.</p><button class="button" id="quiz-start" type="button">Start</button></div>';document.getElementById('quiz-start').onclick=startFirstQuestion;}
function renderQuestion(){
 quizMachine.hidden=true;updateProgress();const q=questions[currentQuestion],selected=answers[currentQuestion];
 quizShell.innerHTML=`<section class="quiz-question"><h1>${q.prompt}</h1><div class="quiz-answers">${q.answers.map((a,i)=>'<button type="button" class="quiz-answer'+(selected===a[1]?' is-selected':'')+'" data-answer="'+i+'" aria-pressed="'+(selected===a[1])+'"><span class="quiz-answer-mark">'+String.fromCharCode(65+i)+'</span><span>'+a[0]+'</span></button>').join('')}</div><div class="quiz-controls"><button type="button" class="quiz-back" ${currentQuestion===0?'disabled':''}>Previous</button><button type="button" class="button" id="quiz-next" ${selected?'':'disabled'}>${currentQuestion===questions.length-1?'See My Result':'Next'}</button><button type="button" class="quiz-back" id="quiz-restart">Restart</button></div></section>`;
 quizShell.querySelectorAll('[data-answer]').forEach(button=>button.addEventListener('click',()=>{answers[currentQuestion]=q.answers[Number(button.dataset.answer)][1];renderQuestion();}));
 quizShell.querySelector('.quiz-back').addEventListener('click',()=>{if(currentQuestion>0){currentQuestion--;answers=answers.slice(0,currentQuestion+1);renderQuestion();}});
 document.getElementById('quiz-next').addEventListener('click',()=>{if(!answers[currentQuestion])return;if(currentQuestion<questions.length-1){currentQuestion++;renderQuestion();}else showResult();});
 document.getElementById('quiz-restart').addEventListener('click',startFirstQuestion);
}
function getType(){const choose=(a,b)=>{const countA=answers.filter(x=>x===a).length,countB=answers.filter(x=>x===b).length;return countA===countB?null:countA>countB?a:b;};return (choose('E','I')||answers[1])+(choose('S','N')||answers[3])+(choose('T','F')||answers[5])+(choose('J','P')||answers[7]);}
function imageFor(name){const item=typeof breeds!=='undefined'?breeds.find(b=>b.name===name):null;return item?.image||'images/01_v2-a0ebaefb66af5b5b6a5025cd1e15695b_r.jpg';}
function showResult(){quizMachine.hidden=true;const type=getType(),result=outcomes[type];progressText.textContent='Quiz complete';progressPercent.textContent='100%';progressBar.style.width='100%';quizShell.innerHTML='<section class="quiz-results"><span class="quiz-kicker">YOUR DOG PERSONALITY TYPE</span><h1>'+type+'</h1><article class="quiz-result-card is-primary"><img src="'+imageFor(result.dog)+'" alt="'+result.dog+'" loading="lazy"><div><span class="quiz-result-label">YOUR MATCH</span><h2>'+result.dog+'</h2><p>'+result.line+'</p></div></article><div class="quiz-controls"><button class="quiz-back" id="quiz-result-restart" type="button">Retake Quiz</button><button class="quiz-back" id="quiz-result-home" type="button">Back to Quiz Home</button></div></section>';document.getElementById('quiz-result-restart').onclick=startFirstQuestion;document.getElementById('quiz-result-home').onclick=showIntro;}
showIntro();
