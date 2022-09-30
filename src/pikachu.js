const string = `
.skin *{margin: 0; padding: 0; box-sizing: border-box;}
.shin *::before,.skin *::after{box-sizing: border-box;}
.skin{
    background: #ffe600;
    min-height: 70vh;
    position: relative;   
}

.nose.up{
    border: 10px solid #000;
    border-color: #000 transparent transparent;
    border-bottom: none;
    position: absolute;
    left: 50%;
    top: 145px;
    margin-left: -10px;
}
.nose.down{
    border-radius: 10px 10px 0 0;
    width: 20px;
    height: 7px;
    position: absolute;
    left: -10px;
    top: -17px; 
    background: #000;
}
.eye{
    border-radius: 50%;
    width: 64px;
    height: 64px;
    position: absolute;
    left: 50%;
    top: 100px;
    margin-left: -32px;
    background: #2e2e2e;
}
.eye.left{
    transform: translateX(-100px);
}
.eye.right{
    transform: translateX(100px);    
}
.eye::before{
    content:'';
    display: block;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    background: #fff;
    position: relative;
    left: 16px;
    top: 4px;
    box-shadow: 0px 2px 20px #ddd;
}

.mouth{
    width: 128px;
    height: 128px;
    position: absolute;
    left: 50%;
    top: 170px;
    margin-left: -64px;
}
.upperLip{
    position: relative;
    top: -10px;
    z-index: 1;
}
.lip{
    border: 3px solid #000;
    height: 24px; 
    width: 64px;
    background: #ffe600;
    border-top-color: transparent;
    position: absolute;
    left: 50%;
    margin-left: -32px;
}
.lip.left{   
    border-radius: 0 0 0 20px;
    transform: rotate(-18deg) translateX(-32px); 
    border-right-color: transparent;
}
.lip.right{
     border-radius: 0 0 20px 0;
     transform: rotate(18deg) translateX(32px);
     border-left-color: transparent;
}
.lowerLip{
    height: 110px;
    width: 100%;
    position: absolute;
    top: 5px;
    overflow: hidden;
}
.tongue.up{
    border: 2px solid #000;
    border-radius: 48px/192px;
    width: 96px;
    height: 1000px;
    background: #9b000a;
    position: absolute;
    bottom: 0;
    left: 50%;
    margin-left: -48px;
    overflow: hidden;
}
.tongue.down{
    border-radius: 100px;
    width: 96px;
    height: 120px;
    background: #ff485f;
    position: absolute;
    bottom: -36px;
    left: 50%;
    margin-left: -48px;
}
.face{
    border-radius: 50%;
    box-shadow: 0px 3px 15px #ff0000;
    width: 66px;
    height: 66px;
    background: #ff0000;
    position: absolute;
    top: 200px;
    left: 50%;
    margin-left: -33px; 
}
.face.left{
    transform: translateX(-150px);
}
.face.right{
    transform: translateX(150px);
}`;

// 初始化
// 制作播放器
const player = {
  n: 1,
  time: 100,
  id: undefined,
  ui: {
    demo1: document.querySelector("#demo1"),
    demo2: document.querySelector("#demo2"),
  },
  events: {
    // 点击：事件
    "#btnPlay": "play",
    "#btnPause": "pause",
    "#btnSlow": "slow",
    "#btnStandard": "standard",
    "#btnFast": "fast",
  },
  init: () => {
    player.ui.demo1.innerText = string.substring(0, player.n);
    player.ui.demo2.innerHTML = string.substring(0, player.n);
    player.bindEvents();
    player.play();
  },
  bindEvents: () => {
    for (let key in player.events) {
      if (player.events.hasOwnProperty(key)) {
        const value = player.events[key]; // play /pause / slow
        document.querySelector(key).onclick = player[value];
      }
    }
  },
  // 先跑起来
  run: () => {
    player.n += 1;
    if (player.n > string.length) {
      window.clearInterval(player.id);
      return;
    }
    console.log(player.n + ":" + string.substring(0, player.n));
    player.ui.demo1.innerText = string.substring(0, player.n);
    player.ui.demo2.innerHTML = string.substring(0, player.n);
    player.ui.demo1.scrollTop = player.ui.demo1.scrollHeight;
  },
  // 播放
  play: () => {
    player.id = setInterval(player.run, player.time);
  },
  // 暂停
  pause: () => {
    window.clearInterval(player.id);
  },
  // 变速
  slow: () => {
    player.pause();
    player.time = 300;
    player.play();
  },
  standard: () => {
    player.pause();
    player.time = 100;
    player.play();
  },
  fast: () => {
    player.pause();
    player.time = 0;
    player.play();
  },
};

player.init();
