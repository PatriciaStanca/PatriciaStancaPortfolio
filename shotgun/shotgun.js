const state={playerAmmo:0,cpuAmmo:0,round:1,gameOver:false,sound:true};
const arena=document.querySelector('#arena');
const actions=[...document.querySelectorAll('[data-action]')];
const labels={load:'Load',block:'Block',shoot:'Shoot',shotgun:'Shotgun'};

function tone(action){
  if(!state.sound)return;
  const AudioContext=window.AudioContext||window.webkitAudioContext;
  if(!AudioContext)return;
  const context=tone.context||(tone.context=new AudioContext());
  const oscillator=context.createOscillator();
  const gain=context.createGain();
  const frequencies={load:240,block:150,shoot:86,shotgun:58};
  oscillator.type=action==='load'?'sine':'sawtooth';
  oscillator.frequency.setValueAtTime(frequencies[action]||190,context.currentTime);
  gain.gain.setValueAtTime(.0001,context.currentTime);
  gain.gain.exponentialRampToValueAtTime(action==='shotgun'?.14:.07,context.currentTime+.01);
  gain.gain.exponentialRampToValueAtTime(.0001,context.currentTime+(action==='shotgun'?.34:.15));
  oscillator.connect(gain).connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime+(action==='shotgun'?.36:.17));
}

function ammoMarkup(value){return [0,1,2].map(index=>`<i class="${index<value?'':'empty'}"></i>`).join('');}
function render(){
  document.querySelector('#player-ammo').innerHTML=ammoMarkup(state.playerAmmo);
  document.querySelector('#cpu-ammo').innerHTML=ammoMarkup(state.cpuAmmo);
  document.querySelector('#round-number').textContent=String(state.round).padStart(2,'0');
  document.querySelector('[data-action="shoot"]').disabled=state.playerAmmo<1||state.gameOver;
  document.querySelector('[data-action="shotgun"]').disabled=state.playerAmmo<3||state.gameOver;
  document.querySelector('[data-action="load"]').disabled=state.gameOver;
  document.querySelector('[data-action="block"]').disabled=state.gameOver;
}
function cpuChoice(){
  const pool=['load','block'];
  if(state.cpuAmmo>0)pool.push('shoot','shoot');
  if(state.cpuAmmo>=3)pool.push('shotgun','shotgun','shotgun');
  if(state.playerAmmo>=3)pool.push('shoot','block');
  return pool[Math.floor(Math.random()*pool.length)];
}
function spend(side,amount=1){state[`${side}Ammo`]=Math.max(0,state[`${side}Ammo`]-amount);}
function resolve(player,cpu){
  if(player==='shotgun'&&cpu!=='shotgun'){spend('player',3);return end(true,'You committed at the perfect moment. The shotgun broke the deadlock.');}
  if(cpu==='shotgun'&&player!=='shotgun'){spend('cpu',3);return end(false,'The CPU reached three rounds and took the decisive shot.');}
  if(player==='shotgun'&&cpu==='shotgun'){spend('player',3);spend('cpu',3);return 'Both fired. The neon district is still standing.';}
  if(player==='load')state.playerAmmo+=1;
  if(cpu==='load')state.cpuAmmo+=1;
  if(player==='shoot')spend('player');
  if(cpu==='shoot')spend('cpu');
  if(player==='shoot'&&cpu==='load')return end(true,'You caught the CPU loading and ended the duel.');
  if(player==='load'&&cpu==='shoot')return end(false,'The CPU read your reload and fired first.');
  if(player==='shoot'&&cpu==='block')return 'Your shot hit the CPU block. One round spent.';
  if(player==='block'&&cpu==='shoot')return 'Perfect block. The CPU loses one round.';
  if(player==='shoot'&&cpu==='shoot')return 'Both fired. Both lose one round.';
  if(player==='load'&&cpu==='load')return 'Both loaded. The pressure rises.';
  if(player==='load'&&cpu==='block')return 'You gained one round while the CPU defended.';
  if(player==='block'&&cpu==='load')return 'The CPU gained one round while you defended.';
  return 'Both held position. Nothing changes.';
}
function end(playerWon,copy){
  state.gameOver=true;
  setTimeout(()=>{
    document.querySelector('#result-kicker').textContent=playerWon?'Tactical victory':'Match complete';
    document.querySelector('#result-title').textContent=playerWon?'You won.':'CPU wins.';
    document.querySelector('#result-copy').textContent=copy;
    document.querySelector('#result-dialog').showModal();
  },620);
  return playerWon?'Direct hit. You win.':'Direct hit. CPU wins.';
}
function play(player){
  if(state.gameOver)return;
  const cpu=cpuChoice();
  tone(player);
  document.querySelector('#player-status').textContent=labels[player];
  document.querySelector('#cpu-status').textContent=labels[cpu];
  document.querySelector('#message-kicker').textContent=`You: ${labels[player]} · CPU: ${labels[cpu]}`;
  document.querySelector('#player-fighter').classList.add('is-acting');
  document.querySelector('#cpu-fighter').classList.add('is-acting');
  const message=resolve(player,cpu);
  document.querySelector('#round-message').textContent=message;
  if(!state.gameOver)state.round+=1;
  render();
  setTimeout(()=>document.querySelectorAll('.fighter').forEach(node=>node.classList.remove('is-acting')),260);
}
function reset(){
  Object.assign(state,{playerAmmo:0,cpuAmmo:0,round:1,gameOver:false});
  document.querySelector('#player-status').textContent='Ready';
  document.querySelector('#cpu-status').textContent='Watching';
  document.querySelector('#message-kicker').textContent='Choose your move';
  document.querySelector('#round-message').textContent='The CPU is already thinking.';
  document.querySelector('#result-dialog').close();
  render();
}
document.querySelector('#start-game').addEventListener('click',()=>{arena.hidden=false;arena.scrollIntoView({behavior:'smooth'});render();});
actions.forEach(button=>button.addEventListener('click',()=>play(button.dataset.action)));
document.querySelector('#play-again').addEventListener('click',reset);
document.querySelector('#sound-toggle').addEventListener('click',event=>{state.sound=!state.sound;event.currentTarget.textContent=state.sound?'Sound on':'Sound off';event.currentTarget.setAttribute('aria-pressed',String(state.sound));});
document.addEventListener('keydown',event=>{if(arena.hidden)return;const action={1:'load',2:'block',3:'shoot',4:'shotgun'}[event.key];const button=action&&document.querySelector(`[data-action="${action}"]`);if(button&&!button.disabled)button.click();});
render();
