const END_STR = {
  ko: { gameOver:'게임 종료!', again:'다시 하기', win:'🎉 승리!', lose:'😢 아쉬워요', draw:'🤝 무승부' },
  en: { gameOver:'Game Over', again:'Play Again', win:'🎉 You Win!', lose:'😢 So close!', draw:'🤝 Draw' }
};

function showEndOverlay({ lang='ko', result, title, scoreText, onRestart }) {
  const s = END_STR[lang];
  const box = document.createElement('div');
  box.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;z-index:9999';
  box.innerHTML = `<div style="background:#fff;border-radius:16px;padding:24px 32px;text-align:center;max-width:80vw">
    <div style="color:#888">${s.gameOver}</div>
    <div style="font-size:1.8em;margin:8px 0">${title || s[result]}</div>
    <div style="margin-bottom:16px">${scoreText}</div>
    <button id="endAgainBtn" style="font-size:1.1em;padding:10px 24px;border-radius:10px;border:0;background:#ffd54f">${s.again}</button></div>`;
  document.body.appendChild(box);
  box.querySelector('#endAgainBtn').onclick = () => { box.remove(); (onRestart || (() => location.reload()))(); };
  if (result === 'win') launchConfetti();
}

function launchConfetti(n = 60) {
  const colors = ['#ff5252','#ffd740','#69f0ae','#40c4ff','#e040fb'];
  for (let i = 0; i < n; i++) {
    const c = document.createElement('div');
    c.style.cssText = `position:fixed;top:-10px;left:${Math.random()*100}vw;width:8px;height:12px;background:${colors[i%5]};z-index:10000;pointer-events:none;transition:transform ${2+Math.random()*2}s ease-in,opacity 1s 2s`;
    document.body.appendChild(c);
    requestAnimationFrame(() => { c.style.transform = `translateY(110vh) rotate(${Math.random()*720}deg)`; c.style.opacity = 0; });
    setTimeout(() => c.remove(), 4500);
  }
}
