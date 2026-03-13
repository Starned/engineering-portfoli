// easter eggs and secret stuff
// if you're reading this you're nosy as hell
(function() {
  var buf = '';
  var edpTimes = [];
  var videoFile = 'images/foxy jumpscare fnaf 2 - That One Foxy (360p, h264).mp4';

  // 1% chance every image becomes miso beef. like mr beast
  if (Math.random() < 1 / 100) {
    function misoAll() {
      var imgs = document.querySelectorAll('img');
      for (var i = 0; i < imgs.length; i++) {
        imgs[i].src = 'images/miso.jpg';
      }
    }
    window.addEventListener('DOMContentLoaded', function() {
      misoAll();
      setTimeout(misoAll, 50);
    });
    window.addEventListener('load', misoAll);
  }

  // 10% chance the femboy eee guy shows up on the side
  if (Math.random() < 1 / 10) {
    window.addEventListener('DOMContentLoaded', function() {
      var eee = document.createElement('img');
      eee.src = 'images/eee-removebg-preview.png';
      eee.alt = 'eee';
      eee.style.cssText = 'position:fixed;top:50%;right:-140px;transform:translateY(-50%);width:280px;height:auto;z-index:9998;pointer-events:none;';
      document.body.appendChild(eee);
    });
  }

  // dark mode via url param, kinda hacky but it works
  var isDark = window.location.search.indexOf('dark=1') !== -1;

  if (isDark) {
    document.body.classList.add('dark-mode');
    var links = document.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute('href');
      if (href && href.indexOf('#') !== 0 && href.indexOf('http') !== 0) {
        if (href.indexOf('index.html') !== -1) continue;
        if (href.indexOf('?') === -1) {
          links[i].setAttribute('href', href + '?dark=1');
        }
      }
    }
  }

  // foxy jumpscare. i literally scared myself testing this at 1am
  function playJumpscare() {
    var overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:99999;background:#000;display:flex;align-items:center;justify-content:center;';
    var vid = document.createElement('video');
    vid.src = videoFile;
    vid.autoplay = true;
    vid.volume = 1.0;
    vid.style.cssText = 'width:100%;height:100%;object-fit:cover;';
    overlay.appendChild(vid);
    document.body.appendChild(overlay);
    vid.play();
    vid.addEventListener('ended', function() {
      overlay.remove();
    });
  }

  // plays ddr audio in the background, hidden video element
  function playDdr() {
    var media = document.createElement('video');
    media.src = 'images/DDR.mp4';
    media.autoplay = true;
    media.volume = 1.0;
    media.style.display = 'none';
    document.body.appendChild(media);
    media.play();
    media.addEventListener('ended', function() {
      media.remove();
    });
  }

  // you gotta type edp 3 times in 10 seconds for this one
  function showEdp() {
    var overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:99999;background:#000;display:flex;align-items:center;justify-content:center;';
    var img = document.createElement('img');
    img.src = 'images/Edp.jpg';
    img.style.cssText = 'max-width:100%;max-height:100%;';
    overlay.appendChild(img);
    document.body.appendChild(overlay);
  }

  function activateDark() {
    document.body.classList.add('dark-mode');
    var links = document.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute('href');
      if (href && href.indexOf('#') !== 0 && href.indexOf('http') !== 0) {
        if (href.indexOf('index.html') !== -1) continue;
        if (href.indexOf('?dark=1') === -1 && href.indexOf('?') === -1) {
          links[i].setAttribute('href', href + '?dark=1');
        }
      }
    }
  }

  function deactivateDark() {
    document.body.classList.remove('dark-mode');
    var links = document.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute('href');
      if (href) {
        links[i].setAttribute('href', href.replace('?dark=1', ''));
      }
    }
  }

  // whole ass snake game, i spent too long on this
  function startSnakeGame() {
    var size = 15;
    var cell = 18;
    var w = size * cell;
    var snake = [{x: 7, y: 7}];
    var dir = {x: 0, y: 0};
    var food = {x: 5, y: 5};
    var score = 0;
    var gameOver = false;

    var overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:99999;background:rgba(0,0,0,0.9);display:flex;align-items:center;justify-content:center;';
    var box = document.createElement('div');
    box.style.cssText = 'background:#1a1a2e;padding:12px;border-radius:8px;text-align:center;';
    var title = document.createElement('p');
    title.textContent = 'Snake - WASD to move, ESC to close';
    title.style.cssText = 'margin:0 0 8px;color:#fff;font-size:12px;';
    var canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = w;
    canvas.style.cssText = 'display:block;background:#0d1117;border-radius:4px;';
    box.appendChild(title);
    box.appendChild(canvas);
    overlay.appendChild(box);
    document.body.appendChild(overlay);

    function randFood() {
      food.x = Math.floor(Math.random() * size);
      food.y = Math.floor(Math.random() * size);
      for (var i = 0; i < snake.length; i++) {
        if (snake[i].x === food.x && snake[i].y === food.y) return randFood();
      }
    }

    function draw() {
      var ctx = canvas.getContext('2d');
      ctx.fillStyle = '#0d1117';
      ctx.fillRect(0, 0, w, w);
      ctx.fillStyle = '#22c55e';
      for (var i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x * cell + 1, snake[i].y * cell + 1, cell - 2, cell - 2);
      }
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(food.x * cell + 1, food.y * cell + 1, cell - 2, cell - 2);
      if (gameOver) {
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(0, 0, w, w);
        ctx.fillStyle = '#fff';
        ctx.font = '16px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over - Score: ' + score, w / 2, w / 2);
      }
    }

    function tick() {
      if (gameOver) return;
      var head = {x: snake[0].x + dir.x, y: snake[0].y + dir.y};
      if (dir.x === 0 && dir.y === 0) return;
      if (head.x < 0 || head.x >= size || head.y < 0 || head.y >= size) {
        gameOver = true;
        draw();
        return;
      }
      for (var i = 0; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
          gameOver = true;
          draw();
          return;
        }
      }
      snake.unshift(head);
      if (head.x === food.x && head.y === food.y) {
        score++;
        // if you somehow get 67 you deserve this
        if (score === 67) {
          window.location.href = 'https://www.youtube.com/watch?v=L7ejl_Hj3A8';
          return;
        }
        randFood();
      } else {
        snake.pop();
      }
      draw();
    }

    var interval = setInterval(tick, 120);

    function keyHandler(e) {
      if (e.key === 'Escape') {
        overlay.remove();
        clearInterval(interval);
        document.removeEventListener('keydown', keyHandler);
        return;
      }
      if (gameOver) return;
      if ((e.key === 'ArrowUp' || e.key === 'w') && dir.y !== 1) { dir.x = 0; dir.y = -1; e.preventDefault(); }
      if ((e.key === 'ArrowDown' || e.key === 's') && dir.y !== -1) { dir.x = 0; dir.y = 1; e.preventDefault(); }
      if ((e.key === 'ArrowLeft' || e.key === 'a') && dir.x !== 1) { dir.x = -1; dir.y = 0; e.preventDefault(); }
      if ((e.key === 'ArrowRight' || e.key === 'd') && dir.x !== -1) { dir.x = 1; dir.y = 0; e.preventDefault(); }
    }
    document.addEventListener('keydown', keyHandler);
    draw();
  }

  function showEggList() {
    var overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:99999;background:rgba(0,0,0,0.92);display:flex;align-items:center;justify-content:center;';
    var box = document.createElement('div');
    box.style.cssText = 'background:#151d26;padding:2rem;border-radius:8px;max-width:500px;width:90%;border:1px solid #2a3a4a;';
    box.innerHTML = '<h2 style="font-family:Barlow Condensed,sans-serif;color:#e85d04;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 1rem;font-size:1.4rem;">Easter Eggs</h2>'
      + '<ul style="list-style:none;padding:0;margin:0;font-family:IBM Plex Mono,monospace;font-size:0.85rem;color:#e8eaed;line-height:2;">'
      + '<li><span style="color:#e85d04;">test</span> &mdash; foxy jumpscare</li>'
      + '<li><span style="color:#e85d04;">ddr</span> &mdash; DDR audio</li>'
      + '<li><span style="color:#e85d04;">dark</span> &mdash; dark mode</li>'
      + '<li><span style="color:#e85d04;">light</span> &mdash; light mode</li>'
      + '<li><span style="color:#e85d04;">snake</span> &mdash; snake game</li>'
      + '<li><span style="color:#e85d04;">killnazis</span> &mdash; Wolfenstein 3D</li>'
      + '<li><span style="color:#e85d04;">agartha</span> &mdash; ???</li>'
      + '<li><span style="color:#e85d04;">kirk</span> &mdash; ???</li>'
      + '<li><span style="color:#e85d04;">edp</span> (x3 in 10s) &mdash; you\'ll see</li>'
      + '<li><span style="color:#e85d04;">tapering</span> &mdash; click it on Spaghetti Tower page</li>'
      + '<li style="color:#8b9caa;margin-top:0.5rem;">1% chance all images become miso beef</li>'
      + '<li style="color:#8b9caa;">10% chance femboy eee guy appears</li>'
      + '<li style="color:#8b9caa;">~1/1500 chance per second of random jumpscare</li>'
      + '</ul>'
      + '<p style="margin:1rem 0 0;font-size:0.75rem;color:#576779;font-family:IBM Plex Mono,monospace;">press ESC to close</p>';
    overlay.appendChild(box);
    document.body.appendChild(overlay);
    function closeEgg(e) {
      if (e.key === 'Escape') {
        overlay.remove();
        document.removeEventListener('keydown', closeEgg);
      }
    }
    document.addEventListener('keydown', closeEgg);
  }

  function startWolfenstein() {
    var overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:99999;background:#000;display:flex;flex-direction:column;align-items:center;justify-content:center;';
    var hint = document.createElement('p');
    hint.textContent = 'Wolfenstein 3D — press ESC to close';
    hint.style.cssText = 'margin:0 0 8px;color:#fff;font-size:12px;font-family:monospace;';
    var frame = document.createElement('iframe');
    frame.src = 'https://vpoupet.github.io/wolfenstein/game.html';
    frame.style.cssText = 'width:100%;height:100%;border:none;';
    frame.allow = 'autoplay';
    overlay.appendChild(hint);
    overlay.appendChild(frame);
    document.body.appendChild(overlay);
    function closeWolf(e) {
      if (e.key === 'Escape') {
        overlay.remove();
        document.removeEventListener('keydown', closeWolf);
      }
    }
    document.addEventListener('keydown', closeWolf);
  }

  // random jumpscare every ~25 min on avg. yes im evil
  setInterval(function() {
    if (Math.random() < 1 / 1500) {
      playJumpscare();
    }
  }, 1000);

  // konami code but better. type keywords to trigger stuff
  document.addEventListener('keydown', function(e) {
    buf += e.key.toLowerCase();
    if (buf.length > 30) buf = buf.slice(-30);

    if (buf.endsWith('test')) {
      playJumpscare();
    }

    if (buf.endsWith('ddr')) {
      playDdr();
    }

    if (buf.endsWith('dark')) {
      activateDark();
    }

    if (buf.endsWith('light')) {
      deactivateDark();
    }

    // dont ask about these
    if (buf.endsWith('agartha')) {
      window.location.href = 'https://www.youtube.com/watch?v=mFp0NuMfvOM';
    }

    if (buf.endsWith('kirk')) {
      window.location.href = 'https://www.youtube.com/watch?v=ZUHpUXlsvbI&t=44';
    }

    if (buf.endsWith('snake')) {
      startSnakeGame();
    }

    if (buf.endsWith('killnazis')) {
      startWolfenstein();
    }

    if (buf.endsWith('egg')) {
      showEggList();
    }

    // gotta type it 3x in 10 sec, keeps people from finding it on accident
    if (buf.endsWith('edp')) {
      var now = Date.now();
      edpTimes.push(now);
      edpTimes = edpTimes.filter(function(t) { return now - t <= 10000; });
      if (edpTimes.length >= 3) {
        edpTimes = [];
        showEdp();
      }
    }
  });
})();
