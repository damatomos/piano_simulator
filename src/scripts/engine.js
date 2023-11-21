const pianoKeys = document.querySelectorAll('.piano-keys .key');
const volumeSlider = document.querySelector('.volume-slider input');
const keysCheck = document.querySelector('.keys-check input');

let audioDir = 'src/tunes';

let audio = new Audio(`${audioDir}/a.wav`);
let mapedKeys = [];

pianoKeys.forEach((item, index) => 
{
  item.addEventListener("click", () =>
  {
    playTune(item.dataset.key);
  })
  mapedKeys.push(item.dataset.key);
})

function playTune(key)
{
  console.log(key)
  audio.src = `${audioDir}/${key}.wav`;
  audio.playbackRate=2;
  audio.play();

  const clickedKey = document.querySelector(`[data-key="${key}"]`);
  clickedKey.classList.add('active');
  setTimeout(() => clickedKey.classList.remove('active'), 150);
}

document.addEventListener('keydown', (e) =>
{
  if (!mapedKeys.includes(e.key)) return;
  playTune(e.key);
})

function handleVolume(e)
{
  volumeSlider.setAttribute('data-volume', e.target.value);
  audio.volume = e.target.value / 100;
} 

volumeSlider.addEventListener('input', handleVolume);
volumeSlider.addEventListener('mouseup', () => volumeSlider.setAttribute('data-volume', ''));

function showHideKeys()
{
  pianoKeys.forEach(key => key.classList.toggle('hide'));
}

keysCheck.addEventListener('click', showHideKeys);