const breeds = [
  {id:'golden',name:'Golden Retriever',size:'Large',look:'Strong and well-proportioned, with a dense, medium-length double coat in shades of gold or cream. Its gentle expression, dropped ears, and feathered tail are familiar features.',character:'Often friendly, patient, and eager to engage with people. Golden Retrievers tend to enjoy learning and need regular exercise, attention, and companionship.',hobbies:'Fetch, swimming, long walks, and scent games are popular activities. Retrieving games suit their history as working gundogs.'},
  {id:'corgi',name:'Pembroke Welsh Corgi',size:'Small',look:'A long body, short powerful legs, and upright ears give this herding dog its distinctive outline. Its medium-length double coat comes in several colors, often with white markings.',character:'Bright, lively, and sometimes quite independent. Corgis are alert and benefit from daily activity, positive training, and plenty of interaction.',hobbies:'They often enjoy walks, puzzle toys, and structured chasing games. Many are especially attentive to movement around them.'},
  {id:'shiba',name:'Shiba Inu',size:'Medium',look:'Compact and sturdy, with upright ears, a curled tail, and a dense double coat. Common colors include red, black and tan, and sesame, often with pale markings.',character:'Independent and alert, Shibas can be affectionate with people they know. Patient, consistent routines help build trust and good habits.',hobbies:'Outdoor walks, scent exploration, and short chase games can be rewarding. A secure space and chances to sniff are especially useful.'},
  {id:'poodle',name:'Poodle',size:'Toy, Miniature, or Standard',look:'Poodles come in three main sizes and are known for their dense, curly coat and balanced build. Their coat needs regular brushing and professional grooming.',character:'Typically clever, active, and keen to learn with people. They do best with daily interaction, mental challenges, and exercise suited to their size.',hobbies:'Many enjoy learning cues, scent games, fetch, and puzzle activities. Short, upbeat training sessions can keep them engaged.'},
  {id:'husky',name:'Siberian Husky',size:'Medium to Large',look:'Athletic and light on its feet, with a thick double coat, upright ears, and a bushy tail. Coat colors and eye colors vary; some have one blue eye and one brown eye.',character:'Often sociable, curious, and full of energy. Huskies need regular exercise, patient training, and secure handling when outdoors.',hobbies:'They often enjoy long walks, running in safe settings, scent exploration, and play with other dogs. Activity should suit the individual dog and conditions.'},
  {id:'border-collie',name:'Border Collie',size:'Medium',look:'Agile and athletic, with a short or medium-length coat in a range of colors. Black and white is common, and an attentive expression is characteristic.',character:'Highly responsive and quick to learn, Border Collies often need both physical exercise and regular mental challenges. They thrive with engaged, thoughtful training.',hobbies:'Fetch, agility, scent work, and learning new tasks are common favorites. Small activities with a clear purpose can be satisfying.'},
  {id:'french-bulldog',name:'French Bulldog',size:'Small',look:'Compact and muscular, with distinctive upright bat-shaped ears, a short muzzle, and a smooth coat.',character:'Often playful and people-oriented, French Bulldogs usually enjoy gentle company. Their short muzzle can make breathing and cooling harder, so exercise and heat need care.',hobbies:'Short walks, sniffing, and indoor play can suit them well. Avoid strenuous activity in hot weather and watch for signs of breathing discomfort.'},
  {id:'beagle',name:'Beagle',size:'Small to Medium',look:'Sturdy and compact, with long dropped ears and a smooth short coat. Many have a tricolor pattern of black, tan, and white.',character:'Usually curious and sociable, Beagles can be easily drawn to interesting scents. Reliable leash habits and patient recall practice are helpful outdoors.',hobbies:'Following scent trails, find-it games, and companionable walks make good use of their keen nose.'}
];
const list=document.getElementById('breed-list');
const panel=document.getElementById('breed-detail');
if(list&&panel){
  list.innerHTML=breeds.map((breed,index)=>`<button class="breed-card${index===0?' selected':''}" type="button" data-breed="${breed.id}" aria-pressed="${index===0}"><span class="photo-placeholder" aria-label="Photo coming soon"><span class="placeholder-icon">＋</span><span>Photo coming soon</span></span><span class="breed-card-copy"><span class="breed-name">${breed.name}</span><span class="breed-tag">${breed.size}</span></span><span class="card-arrow" aria-hidden="true">↗</span></button>`).join('');
  function showBreed(id,updateHash=true){
    const breed=breeds.find(item=>item.id===id)||breeds[0];
    list.querySelectorAll('.breed-card').forEach(button=>{const selected=button.dataset.breed===breed.id;button.classList.toggle('selected',selected);button.setAttribute('aria-pressed',String(selected));});
    panel.innerHTML=`<div class="detail-photo photo-placeholder"><span class="placeholder-icon">＋</span><span>Photo coming soon</span></div><div class="detail-content"><h2>${breed.name}</h2><p class="detail-size">${breed.size}</p><section class="detail-block"><h3>Size &amp; Appearance</h3><p>${breed.look}</p></section><section class="detail-block"><h3>Personality</h3><p>${breed.character}</p></section><section class="detail-block"><h3>Favorite Activities</h3><p>${breed.hobbies}</p></section></div>`;
    if(updateHash&&location.hash!==`#${breed.id}`)history.replaceState(null,'',`#${breed.id}`);
  }
  list.addEventListener('click',event=>{const button=event.target.closest('[data-breed]');if(button)showBreed(button.dataset.breed);});
  showBreed(decodeURIComponent(location.hash.slice(1)),false);
  window.addEventListener('hashchange',()=>showBreed(decodeURIComponent(location.hash.slice(1)),false));
}

document.querySelectorAll('.bone-link').forEach(link=>{
  link.addEventListener('click',event=>{
    if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    event.preventDefault();
    const destination=link.href;
    link.classList.remove('is-dropping');
    void link.offsetWidth;
    link.classList.add('is-dropping');
    window.setTimeout(()=>{window.location.href=destination;},360);
  });
});