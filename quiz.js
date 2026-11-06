const questions=[
{prompt:'连续上了五天班/学，周五晚上你的理想状态是？',answers:[['立刻约上三五好友出去嗨，越热闹越能回血','E'],['赶紧回家，换上睡衣，完全不想和任何人说话','I']]},
{prompt:'在一个人多的社交场合，你通常？',answers:[['游刃有余，能主动和陌生人搭话，甚至成为破冰的那个人','E'],['安静地待在熟人旁边，默默观察全场，等别人来找我聊天','I']]},
{prompt:'面对一项新任务或新爱好，你更关注？',answers:[['具体细节、操作步骤，喜欢脚踏实地按部就班','S'],['整体概念、未来的可能性，脑子里经常有天马行空的脑洞','N']]},
{prompt:'当你走在街上，你的注意力通常在哪？',answers:[['关注眼前的现实，比如路边新开的店、别人的穿搭','S'],['经常“神游”，思考人生哲理，或者沉浸在刚才没想完的点子里','N']]},
{prompt:'好朋友做了一个不太理智的决定（比如冲动辞职），你会？',answers:[['帮TA客观分析利弊，列出下一步的规划，指出风险','T'],['先照顾TA的情绪，站在TA这边陪伴TA，等TA平静了再商量','F']]},
{prompt:'在工作中被人否定或批评了，你的第一反应是？',answers:[['有点不爽，但立刻反思：对方说的有没有道理？逻辑有没有漏洞？','T'],['心里咯噔一下，极度内耗，甚至觉得对方是不是讨厌自己','F']]},
{prompt:'计划周末去旅游，你的行李箱通常什么时候收拾？',answers:[['提前一天就列好清单，整整齐齐装好，甚至做好了攻略','J'],['出发前一晚随便塞两件，主打一个“缺什么再去买”，走一步看一步','P']]},
{prompt:'当你的日常节奏被打乱（比如突然被临时安排了事情），你会？',answers:[['非常烦躁，需要立刻重新安排好时间表，恢复秩序感','J'],['无所谓，反正计划赶不上变化，随遇而安，灵活应对','P']]}
];
const outcomes={
ESFJ:{dog:'Golden Retriever',zh:'金毛',line:'人间暖宝宝，天生的大家长。'},
ESFP:{dog:'Labrador Retriever',zh:'拉布拉多',line:'社交恐怖分子，乐天派干饭王。'},
ISFJ:{dog:'Bernese Mountain Dog',zh:'伯恩山',line:'默默付出，最坚实的后盾。'},
ISFP:{dog:'Cocker Spaniel',zh:'可卡犬',line:'温柔敏感的艺术家。'},
ESTJ:{dog:'German Shepherd',zh:'德国牧羊犬',line:'效率至上，绝对指挥官。'},
ISTJ:{dog:'Schnauzer',zh:'雪纳瑞',line:'严谨的规矩制造者，底线分明。'},
ESTP:{dog:'Doberman Pinscher',zh:'杜宾',line:'西装暴徒，追求刺激，冷静果断。'},
ISTP:{dog:'Alaskan Malamute',zh:'阿拉斯加',line:'外表酷炫，内心佛系。'},
INTJ:{dog:'Akita',zh:'秋田犬',line:'极其独立，高冷且固执。'},
INTP:{dog:'Czechoslovakian Wolfdog',zh:'捷克狼犬',line:'思维清奇，不随波逐流。'},
ENTP:{dog:'Border Collie',zh:'边境牧羊犬',line:'点子王，聪明且喜欢挑战规则。'},
ENFP:{dog:'Siberian Husky',zh:'哈士奇',line:'三分钟热度，快乐源泉。'},
INFP:{dog:'Bichon Frise',zh:'比熊',line:'内心柔软，渴望抱抱。'},
INFJ:{dog:'Samoyed',zh:'萨摩耶',line:'外表治愈，内心有着极高精神追求。'},
ENFJ:{dog:'Poodle',zh:'贵宾犬',line:'高情商大师，察言观色能力极强。'},
ENTJ:{dog:'Chihuahua',zh:'吉娃娃',line:'气场两米八，领地意识极强。'}
};
const quizShell=document.getElementById('quiz-shell'),progressWrap=document.getElementById('quiz-progress-wrap'),progressText=document.getElementById('quiz-progress-text'),progressPercent=document.getElementById('quiz-progress-percent'),progressBar=document.getElementById('quiz-progress-bar'),quizMachine=document.querySelector('.quiz-machine');
let answers=[],currentQuestion=0;
function updateProgress(){const done=answers.length,percent=Math.round(done/questions.length*100);progressText.textContent='已完成 '+done+' / '+questions.length+' 题';progressPercent.textContent=percent+'%';progressBar.style.width=percent+'%';}
function startFirstQuestion(){answers=[];currentQuestion=0;progressWrap.hidden=false;quizMachine.hidden=true;renderQuestion();}
function showIntro(){progressWrap.hidden=true;quizMachine.hidden=false;quizShell.innerHTML='<div class="quiz-intro"><span class="quiz-kicker">DOG BREED QUIZ</span><h1>测测你像哪种狗狗</h1><p>回答 8 道关于日常选择的问题，看看哪种狗狗最像你的性格。</p><button class="button" id="quiz-start" type="button">Start</button></div>';document.getElementById('quiz-start').onclick=startFirstQuestion;}
function renderQuestion(){
  quizMachine.hidden=true;
  updateProgress();
  const q=questions[currentQuestion],selected=answers[currentQuestion];
  quizShell.innerHTML=`<section class="quiz-question"><h1>${q.prompt}</h1><div class="quiz-answers">${q.answers.map((a,i)=>'<button type="button" class="quiz-answer'+(selected===a[1]?' is-selected':'')+'" data-answer="'+i+'" aria-pressed="'+(selected===a[1])+'"><span class="quiz-answer-mark">'+String.fromCharCode(65+i)+'</span><span>'+a[0]+'</span></button>').join('')}</div><div class="quiz-controls"><button type="button" class="quiz-back" ${currentQuestion===0?'disabled':''}>上一题</button><button type="button" class="button" id="quiz-next" ${selected?'':'disabled'}>${currentQuestion===questions.length-1?'看结果':'下一题'}</button><button type="button" class="quiz-back" id="quiz-restart">重新开始</button></div></section>`;
  quizShell.querySelectorAll('[data-answer]').forEach(button=>button.addEventListener('click',()=>{answers[currentQuestion]=q.answers[Number(button.dataset.answer)][1];renderQuestion();}));
  quizShell.querySelector('.quiz-back').addEventListener('click',()=>{if(currentQuestion>0){currentQuestion--;answers=answers.slice(0,currentQuestion+1);renderQuestion();}});
  document.getElementById('quiz-next').addEventListener('click',()=>{if(!answers[currentQuestion])return;if(currentQuestion<questions.length-1){currentQuestion++;renderQuestion();}else showResult();});
  document.getElementById('quiz-restart').addEventListener('click',startFirstQuestion);
}
function getType(){const pick=(first,second,a,b)=>{const countA=answers.filter(x=>x===a).length,countB=answers.filter(x=>x===b).length;return countA===countB?answers[second]:countA>countB?a:b;};return pick(0,1,'E','I')+pick(2,3,'S','N')+pick(4,5,'T','F')+pick(6,7,'J','P');}
function imageFor(name){const aliases={'Czechoslovakian Wolfdog':'Czech Wolfdog'};const target=aliases[name]||name;const item=typeof breeds!=='undefined'?breeds.find(b=>b.name===target):null;return item?.image||'images/01_v2-a0ebaefb66af5b5b6a5025cd1e15695b_r.jpg';}
function showResult(){quizMachine.hidden=true;const type=getType(),result=outcomes[type];progressText.textContent='测试完成';progressPercent.textContent='100%';progressBar.style.width='100%';quizShell.innerHTML='<section class="quiz-results"><span class="quiz-kicker">你的狗狗人格类型</span><h1>'+type+'</h1><article class="quiz-result-card is-primary"><img src="'+imageFor(result.dog)+'" alt="'+result.dog+'" loading="lazy"><div><span class="quiz-result-label">'+result.zh+'</span><h2>'+result.dog+'</h2><p>'+result.line+'</p></div></article><div class="quiz-controls"><button class="quiz-back" id="quiz-result-restart" type="button">重新测试</button><button class="quiz-back" id="quiz-result-home" type="button">返回 Quiz 首页</button></div></section>';document.getElementById('quiz-result-restart').onclick=startFirstQuestion;document.getElementById('quiz-result-home').onclick=showIntro;}
showIntro();
