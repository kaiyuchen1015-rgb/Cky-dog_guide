const machineStage=document.getElementById('machine-stage');
const launchBallButton=document.getElementById('launch-ball');
const machineStatus=document.getElementById('machine-status');
let machineBusy=false;

launchBallButton?.addEventListener('click',()=>{
  if(machineBusy)return;
  machineBusy=true;
  launchBallButton.disabled=true;
  machineStatus.textContent='Ball away! Juanjuan is going to fetch it.';
  machineStage.classList.add('is-launching');

  window.setTimeout(()=>{
    machineStage.classList.remove('is-launching');
    machineStage.classList.add('is-chasing');
    machineStatus.textContent='Juanjuan is chasing the ball!';
  },1100);

  window.setTimeout(()=>{
    machineStage.classList.remove('is-chasing');
    machineStage.classList.add('is-returning');
    machineStatus.textContent='Got it! Juanjuan is bringing it back.';
  },3500);

  window.setTimeout(()=>{
    machineStage.classList.remove('is-returning');
    machineBusy=false;
    launchBallButton.disabled=false;
    machineStatus.textContent='All done. Ready for another throw?';
  },6000);
});