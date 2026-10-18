// Payal & Jalaram Wedding Invitation - Interactive Animation Controller
(function() {
  'use strict';

  // 1. Particle Canvas System (Lotus petals, flowers, roses, marigold, sparkles, embers, akshantalu grains)
  const Q = (min, max) => min + Math.random() * (max - min);
  const ia = arr => arr[Math.floor(Math.random() * arr.length)];

  function makeCanvas(w, h, drawFn) {
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    const ctx = c.getContext('2d');
    ctx.translate(w / 2, h / 2);
    drawFn(ctx);
    return { c, max: Math.max(w, h) };
  }

  function createSprites() {
    const petal = (c1, c2, stroke) => makeCanvas(48, 64, ctx => {
      const g = ctx.createRadialGradient(0, 8, 2, 0, 0, 34);
      g.addColorStop(0, c1);
      g.addColorStop(1, c2);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.moveTo(0, 30);
      ctx.bezierCurveTo(-26, 12, -22, -24, -4, -30);
      ctx.quadraticCurveTo(0, -24, 4, -30);
      ctx.bezierCurveTo(22, -24, 26, 12, 0, 30);
      ctx.fill();
      ctx.strokeStyle = stroke;
      ctx.globalAlpha = 0.35;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(0, 26);
      ctx.quadraticCurveTo(2, 0, 0, -22);
      ctx.stroke();
    });

    const whiteFlower = makeCanvas(64, 64, ctx => {
      for (let t = 0; t < 5; t++) {
        ctx.save();
        ctx.rotate((t * Math.PI * 2) / 5);
        const g = ctx.createLinearGradient(0, 0, 0, -28);
        g.addColorStop(0, '#f3ecd4');
        g.addColorStop(1, '#fffdf5');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.ellipse(0, -15, 8, 15, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#d9cfb2';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      }
      ctx.fillStyle = '#e6d27a';
      ctx.beginPath();
      ctx.arc(0, 0, 4.5, 0, Math.PI * 2);
      ctx.fill();
    });

    const orangeFlower = (c1, c2) => makeCanvas(64, 64, ctx => {
      for (let r = 0; r < 3; r++) {
        const count = 14 - r * 3;
        const rad = 24 - r * 7;
        for (let o = 0; o < count; o++) {
          ctx.save();
          ctx.rotate((o * Math.PI * 2) / count + r * 0.3);
          ctx.fillStyle = r % 2 ? c2 : c1;
          ctx.beginPath();
          ctx.ellipse(0, -rad + 6, 6 - r, 9 - r, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }
      ctx.fillStyle = '#b45309';
      ctx.beginPath();
      ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
      ctx.fill();
    });

    const sparkleSprite = (c1, c2, isStar) => makeCanvas(48, 48, ctx => {
      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, 24);
      g.addColorStop(0, c1);
      g.addColorStop(0.25, c2);
      g.addColorStop(1, 'rgba(255,200,90,0)');
      ctx.fillStyle = g;
      ctx.fillRect(-24, -24, 48, 48);
      if (isStar) {
        ctx.fillStyle = c1;
        ctx.beginPath();
        for (let e = 0; e < 8; e++) {
          const t = e % 2 ? 2.2 : 16;
          const a = (e * Math.PI) / 4;
          ctx.lineTo(Math.cos(a) * t, Math.sin(a) * t);
        }
        ctx.fill();
      }
    });

    const lotusPetal = color => makeCanvas(56, 88, ctx => {
      ctx.shadowColor = 'rgba(120,84,50,.32)';
      ctx.shadowBlur = 5;
      ctx.shadowOffsetY = 2;
      const g = ctx.createLinearGradient(0, 32, 0, -34);
      g.addColorStop(0, '#f4ecd9');
      g.addColorStop(0.55, '#fffdf7');
      g.addColorStop(1, color);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.moveTo(0, 32);
      ctx.bezierCurveTo(-19, 18, -16, -16, 0, -34);
      ctx.bezierCurveTo(16, -16, 19, 18, 0, 32);
      ctx.fill();
      ctx.shadowColor = 'transparent';
      ctx.strokeStyle = '#cdbd9c';
      ctx.globalAlpha = 0.45;
      ctx.lineWidth = 0.9;
      for (const e of [-6, 0, 6]) {
        ctx.beginPath();
        ctx.moveTo(e * 0.3, 28);
        ctx.quadraticCurveTo(e, 0, e * 0.4, -26);
        ctx.stroke();
      }
    });

    const lotusFull = makeCanvas(96, 76, ctx => {
      ctx.shadowColor = 'rgba(120,84,50,.28)';
      ctx.shadowBlur = 5;
      ctx.shadowOffsetY = 2;
      const drawLayer = (rot, len, rad, c1, c2) => {
        ctx.save();
        ctx.translate(0, 18);
        ctx.rotate(rot);
        const g = ctx.createLinearGradient(0, 0, 0, -len);
        g.addColorStop(0, c1);
        g.addColorStop(1, c2);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-rad, -len * 0.35, -rad * 0.6, -len * 0.8, 0, -len);
        ctx.bezierCurveTo(rad * 0.6, -len * 0.8, rad, -len * 0.35, 0, 0);
        ctx.fill();
        ctx.strokeStyle = '#d6c8a8';
        ctx.globalAlpha = 0.5;
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.restore();
      };
      for (const r of [-1.25, 1.25]) drawLayer(r, 30, 11, '#efe5cf', '#fbeff0');
      for (const r of [-0.7, 0.7]) drawLayer(r, 38, 13, '#f3ead6', '#fdf1f2');
      drawLayer(0, 44, 14, '#f6efdd', '#fff4f4');
      ctx.fillStyle = '#e8cf72';
      ctx.beginPath();
      ctx.ellipse(0, 12, 7, 3, 0, 0, Math.PI * 2);
      ctx.fill();
    });

    const grain = (c1, c2) => makeCanvas(14, 28, ctx => {
      const g = ctx.createLinearGradient(-5, 0, 5, 0);
      g.addColorStop(0, c2);
      g.addColorStop(0.45, c1);
      g.addColorStop(1, c2);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.ellipse(0, 0, 5, 12, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(90,50,10,.55)';
      ctx.lineWidth = 1.3;
      ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,240,.7)';
      ctx.beginPath();
      ctx.ellipse(-1.4, -3, 1.2, 4, 0, 0, Math.PI * 2);
      ctx.fill();
    });

    return {
      flowers: [
        whiteFlower,
        whiteFlower,
        petal('#fff7f0', '#f3c6cf', '#c2687e'),
        petal('#f7a3b5', '#c2365d', '#7d1535'),
        petal('#ffd27a', '#f28a1a', '#a84b00'),
        orangeFlower('#f59e0b', '#fbbf24'),
        orangeFlower('#ea580c', '#f97316')
      ],
      roses: [
        petal('#f7a3b5', '#c2365d', '#7d1535'),
        petal('#ffe0e6', '#e98aa2', '#a73a5a'),
        whiteFlower
      ],
      marigold: [
        petal('#ffd27a', '#f28a1a', '#a84b00'),
        petal('#ffe7a3', '#f5b301', '#9a6400'),
        orangeFlower('#f59e0b', '#fbbf24')
      ],
      lotus: [
        lotusPetal('#f1cdd5'),
        lotusPetal('#f7e2e0'),
        lotusPetal('#ecc3cd'),
        lotusPetal('#f9ece6'),
        lotusFull,
        whiteFlower
      ],
      sparkle: [
        sparkleSprite('#fff6d8', 'rgba(236,190,96,.75)', true),
        sparkleSprite('#ffffff', 'rgba(255,221,150,.7)', true)
      ],
      ember: [
        sparkleSprite('#fff3c4', 'rgba(255,160,50,.8)', false),
        sparkleSprite('#ffe9a8', 'rgba(245,120,40,.75)', false)
      ],
      grains: [
        grain('#f7cf3d', '#d9a011'),
        grain('#f5c52a', '#c98d0c'),
        grain('#fbd955', '#e0a91a'),
        grain('#f7cf3d', '#d9a011'),
        grain('#d63b2f', '#9e1f18'),
        grain('#fff1c7', '#e3cf95')
      ]
    };
  }

  // 2. Setup Celebration Particles
  function initParticles(canvas) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const sprites = createSprites();
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(2, window.devicePixelRatio || 1);
    let animId = 0;
    let lastTime = 0;
    let particles = [];
    let currentScene = 'opening';
    let presence = 1;
    let sceneStartTime = performance.now();
    let lastCoupleShowerTime = -1e9;
    let spawnAccumulator = 0;
    let mouseX = -999, mouseY = -999;
    let mouseVx = 0, mouseVy = 0, mouseTravel = 0;
    let lastScrollY = window.scrollY;

    const scaleFactor = () => Math.max(0.72, Math.min(1.15, width / 1250));

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      requestFrame();
    }

    const createParticle = (kind, sprite, x, y, size) => ({
      kind,
      s: sprite,
      x,
      y,
      size,
      vx: 0,
      vy: 0,
      rot: Q(0, 6.28),
      vr: Q(-1.5, 1.5),
      flip: Q(0, 6.28),
      vf: Q(1.5, 4),
      age: 0,
      life: 1e9,
      delay: 0,
      term: Q(45, 95),
      swayA: Q(12, 40),
      swayF: Q(0.6, 1.6),
      phase: Q(0, 6.28)
    });

    const addFlower = (x, y, list = sprites.flowers) => {
      const p = createParticle('flower', ia(list), x, y, Q(17, 30) * scaleFactor());
      return p;
    };

    const addLotus = (x, y) => {
      const sprite = ia(sprites.lotus);
      const isFull = sprite === sprites.lotus[4];
      const isWhite = sprite === sprites.lotus[5];
      const size = isFull ? Q(34, 44) : isWhite ? Q(15, 20) : Q(22, 32);
      const p = createParticle('flower', sprite, x, y, size * scaleFactor());
      p.term = Q(22, 42);
      p.swayA = Q(18, 38);
      p.swayF = Q(0.35, 0.8);
      p.vr = Q(-0.7, 0.7);
      p.vf = Q(0.8, 1.8);
      p.alpha = Q(0.75, 0.95);
      if (isFull) {
        p.vf = Q(0.2, 0.5);
        p.rot = Q(-0.3, 0.3);
        p.vr = Q(-0.2, 0.2);
      }
      return p;
    };

    const addSparkle = (x, y, size = Q(10, 20)) => {
      const p = createParticle('sparkle', ia(sprites.sparkle), x, y, size);
      p.life = Q(0.6, 1.3);
      p.vr = Q(-2, 2);
      return p;
    };

    const addEmber = (x, y) => {
      const p = createParticle('ember', ia(sprites.ember), x, y, Q(8, 18) * scaleFactor());
      p.life = Q(3, 6);
      p.term = -Q(30, 70);
      p.swayA = Q(8, 22);
      return p;
    };

    const addGrain = (x, y) => {
      const p = createParticle('grain', ia(sprites.grains), x, y, Q(9, 12) * Math.max(0.85, scaleFactor()));
      p.vr = Q(-12, 12);
      p.stick = Math.random() < 0.6;
      p.life = 1e9;
      return p;
    };

    const pushParticle = p => {
      if (p) {
        particles.push(p);
        if (particles.length > 900) particles.splice(0, particles.length - 900);
      }
    };

    const getCoupleBounds = () => {
      const el = document.querySelector('.illustrated-couple');
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const aspect = 1024 / 1536;
      if (rect.width / rect.height > aspect) {
        const h = rect.height;
        const w = h * aspect;
        return { x: rect.left + (rect.width - w) / 2, y: rect.top, w, h };
      }
      const w = rect.width;
      const h = w / aspect;
      return { x: rect.left, y: rect.top + (rect.height - h) / 2, w, h };
    };

    const sceneGenerators = {
      opening: { rate: 0, make: () => null },
      gate: { rate: 11, make: w => addFlower(Q(0, w), -30) },
      events: { rate: 5, make: w => addFlower(Q(0, w), -30, sprites.marigold) },
      couple: { rate: 3, make: w => addFlower(Q(0, w), -30, sprites.roses) },
      portrait: {
        rate: 7,
        make: (w, h) => {
          const el = document.querySelector('.gold-portrait');
          if (!el) return null;
          const rect = el.getBoundingClientRect();
          if (rect.top > h) return null;
          const p = addSparkle(Q(rect.left - 30, rect.right + 30), Q(rect.top - 20, rect.bottom), Q(8, 16));
          p.vy = -Q(5, 25);
          p.life = Q(1, 2);
          return p;
        }
      },
      venue: { rate: 12, make: (w, h) => addEmber(Q(w * 0.08, w * 0.92), Q(h * 0.45, h + 10)) },
      blessing: { rate: 6, make: w => addFlower(Q(0, w), -30, sprites.roses) },
      memories: {
        rate: 6,
        make: (w, h) => {
          const p = addSparkle(Q(0, w), Q(h * 0.1, h), Q(8, 14));
          p.vy = -Q(8, 20);
          p.life = Q(1.5, 2.6);
          return p;
        }
      },
      final: { rate: 3.2, make: w => addLotus(Q(0, w), -40) }
    };

    const burstRain = (count, makeFn) => {
      for (let i = 0; i < count; i++) {
        const p = makeFn(Q(-20, width + 20), -Q(20, height * 0.9));
        if (p) {
          p.vy = Q(40, 120);
          pushParticle(p);
        }
      }
    };

    const coupleTargets = [[0.45, 0.12], [0.645, 0.2]];

    const showerAkshantalu = (heavy = false) => {
      const bounds = getCoupleBounds();
      if (!bounds) return;
      const count = Math.round((heavy ? 320 : 140) * Math.max(0.6, scaleFactor()));
      for (let r = 0; r < count; r++) {
        const t = ia(coupleTargets);
        const relX = Math.random() < 0.75 ? t[0] + Q(-0.13, 0.13) : Q(0.12, 0.88);
        const p = addGrain(bounds.x + relX * bounds.w, -Q(10, 60));
        p.vy = Q(120, 420);
        p.vx = Q(-40, 40);
        p.delay = Q(0, heavy ? 1.6 : 1);
        pushParticle(p);
      }
      for (let n = 0; n < (heavy ? 26 : 12); n++) {
        const p = addFlower(bounds.x + Q(0.1, 0.9) * bounds.w, -Q(20, 200), sprites.flowers);
        p.delay = Q(0, 1.2);
        pushParticle(p);
      }
      window.dispatchEvent(new CustomEvent('invitation:blessed', { detail: heavy ? 5 : 1 }));
      requestFrame();
    };

    window.addEventListener('invitation:shower', () => showerAkshantalu(true));

    window.addEventListener('invitation:scene', () => {
      const scene = window.__currentScene || 'opening';
      if (scene !== currentScene) {
        currentScene = scene;
        sceneStartTime = performance.now();
        if (scene === 'gate') burstRain(Math.round(90 * scaleFactor()), (x, y) => addFlower(x, y));
        if (scene === 'events') burstRain(Math.round(30 * scaleFactor()), (x, y) => addFlower(x, y, sprites.marigold));
        if (scene === 'blessing') burstRain(Math.round(40 * scaleFactor()), (x, y) => addFlower(x, y, sprites.roses));
        if (scene === 'final') burstRain(Math.round(12 * scaleFactor()), addLotus);
        if (scene === 'couple') {
          const now = performance.now();
          if (now - lastCoupleShowerTime > 3500) {
            lastCoupleShowerTime = now;
            setTimeout(() => {
              if (window.__currentScene === 'couple') showerAkshantalu(false);
            }, 650);
          }
        }
      }
      requestFrame();
    });

    // Click burst
    window.addEventListener('click', e => {
      if (e.target.closest('button, a, input, [role=dialog]')) return;
      const x = e.clientX, y = e.clientY;
      const s = scaleFactor();
      if (currentScene === 'couple') {
        const bounds = getCoupleBounds();
        if (bounds) {
          const target = coupleTargets.reduce((a, b) =>
            Math.abs(bounds.x + a[0] * bounds.w - x) < Math.abs(bounds.x + b[0] * bounds.w - x) ? a : b
          );
          const targetX = bounds.x + target[0] * bounds.w;
          const targetY = bounds.y + (target[1] - 0.06) * bounds.h;
          const dur = 0.6;
          for (let n = 0; n < 38; n++) {
            const p = addGrain(x + Q(-8, 8), y + Q(-8, 8));
            p.vx = (targetX - x) / dur + Q(-90, 90);
            p.vy = (targetY - y) / dur - 0.5 * 1100 * dur + Q(-90, 60);
            pushParticle(p);
          }
          for (let n = 0; n < 4; n++) {
            const p = addFlower(x, y, sprites.flowers);
            p.vx = Q(-160, 160);
            p.vy = -Q(120, 300);
            pushParticle(p);
          }
          window.dispatchEvent(new CustomEvent('invitation:blessed', { detail: 1 }));
          requestFrame();
          return;
        }
      }

      if (currentScene === 'final') {
        for (let n = 0; n < 9; n++) {
          const angle = Q(Math.PI * 1.1, Math.PI * 1.9);
          const speed = Q(60, 170);
          const p = addLotus(x, y);
          p.vx = Math.cos(angle) * speed;
          p.vy = Math.sin(angle) * speed;
          pushParticle(p);
        }
        requestFrame();
        return;
      }

      const count = Math.round(26 * s) + 8;
      for (let n = 0; n < count; n++) {
        const angle = Q(0, Math.PI * 2);
        const speed = Q(120, 460);
        let p;
        if (currentScene === 'venue') p = addEmber(x, y);
        else if (currentScene === 'events') p = addFlower(x, y, sprites.marigold);
        else if (currentScene === 'portrait' || currentScene === 'memories' || currentScene === 'opening') {
          p = Math.random() < 0.55 ? addSparkle(x, y, Q(10, 22)) : addFlower(x, y, sprites.roses);
        } else {
          p = addFlower(x, y);
        }
        p.vx = Math.cos(angle) * speed;
        p.vy = Math.sin(angle) * speed - 120;
        if (p.kind === 'sparkle') p.life = Q(0.7, 1.4);
        pushParticle(p);
      }
      requestFrame();
    });

    // Pointer move breeze
    window.addEventListener('pointermove', e => {
      if (e.pointerType === 'touch') return;
      if (mouseX > -999) {
        mouseVx = mouseVx * 0.5 + (e.clientX - mouseX) * 30;
        mouseVy = mouseVy * 0.5 + (e.clientY - mouseY) * 30;
        mouseTravel += Math.hypot(e.clientX - mouseX, e.clientY - mouseY);
      }
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (mouseTravel > 34) {
        mouseTravel = 0;
        const p = addSparkle(mouseX + Q(-4, 4), mouseY + Q(-4, 4), Q(7, 13));
        p.vy = Q(10, 40);
        p.life = Q(0.45, 0.8);
        pushParticle(p);
      }

      // 3D Tilt on data-tilt elements
      const tiltEl = e.target.closest('[data-tilt]');
      document.querySelectorAll('[data-tilt]').forEach(el => {
        if (el !== tiltEl) el.style.rotate = '';
      });
      if (tiltEl) {
        const rect = tiltEl.getBoundingClientRect();
        const rx = (e.clientX - rect.left) / rect.width - 0.5;
        const ry = (e.clientY - rect.top) / rect.height - 0.5;
        const mag = Math.min(1, Math.hypot(rx, ry) * 2) * Number(tiltEl.dataset.tilt || 7);
        tiltEl.style.rotate = `${(-ry).toFixed(3)} ${rx.toFixed(3)} 0 ${mag.toFixed(2)}deg`;
      }
      requestFrame();
    }, { passive: true });

    document.documentElement.addEventListener('pointerleave', () => {
      mouseX = mouseY = -999;
      document.querySelectorAll('[data-tilt]').forEach(el => { el.style.rotate = ''; });
    });

    function requestFrame() {
      if (!animId && !document.hidden) {
        animId = requestAnimationFrame(render);
      }
    }

    function render(now) {
      animId = 0;
      const dt = lastTime ? Math.min((now - lastTime) / 1000, 0.05) : 1 / 60;
      lastTime = now;

      const gen = sceneGenerators[currentScene] || sceneGenerators.opening;
      const coupleBounds = currentScene === 'couple' ? getCoupleBounds() : null;
      const sceneElapsed = (now - sceneStartTime) / 1000;

      spawnAccumulator += gen.rate * scaleFactor() * Math.max(0, presence) * Math.min(1, sceneElapsed / 0.6 + 0.3) * dt;
      while (spawnAccumulator >= 1) {
        spawnAccumulator--;
        pushParticle(gen.make(width, height));
      }

      const scrollDelta = (window.scrollY - lastScrollY) * (1 - Math.exp(-dt * 1000 / 190));
      lastScrollY += scrollDelta;
      mouseVx *= Math.exp(-dt * 5);
      mouseVy *= Math.exp(-dt * 5);

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let restingGrains = 0;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        if (p.delay > 0) {
          p.delay -= dt;
          continue;
        }
        p.age += dt;

        if (p.kind === 'grain') {
          if (p.rest) {
            restingGrains++;
            if (!coupleBounds || p.age > 9) {
              particles.splice(i, 1);
              continue;
            }
            p.x = coupleBounds.x + p.u * coupleBounds.w;
            p.y = coupleBounds.y + p.v * coupleBounds.h;
          } else {
            p.py = p.y;
            p.vy = Math.min(p.vy + 1100 * dt, 950);
            p.vx *= Math.exp(-dt * 0.4);
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            p.rot += p.vr * dt;
            if (coupleBounds && p.vy > 0) {
              const relX = (p.x - coupleBounds.x) / coupleBounds.w;
              const headY = relX < 0.19 || relX > 0.77 ? null : relX < 0.35 ? 0.22 : relX < 0.4 ? 0.14 : relX < 0.52 ? 0.095 : relX < 0.58 ? 0.215 : relX < 0.7 ? 0.175 : 0.27;
              const stickGrain = (vVal) => {
                p.rest = true;
                p.age = 0;
                p.u = relX;
                p.v = vVal;
                p.vr = 0;
              };
              if (headY !== null && p.py < coupleBounds.y + headY * coupleBounds.h && p.y >= coupleBounds.y + headY * coupleBounds.h) {
                if (p.stick) stickGrain(headY + Q(0, 0.035));
                else {
                  p.bounced = true;
                  p.vy *= -0.28;
                  p.vx += Q(-120, 120);
                }
              } else if (relX > 0.17 && relX < 0.85 && p.y >= coupleBounds.y + 0.895 * coupleBounds.h && p.py < coupleBounds.y + 0.895 * coupleBounds.h) {
                stickGrain(0.895 + Q(-0.025, 0.02));
              }
            }
          }
        } else {
          if (p.kind === 'sparkle') {
            p.vx *= Math.exp(-dt * 3);
            p.vy = p.vy * Math.exp(-dt * 3) + 12 * dt;
          } else {
            p.vx *= Math.exp(-dt * 1.3);
            p.vy += (p.term - p.vy) * Math.min(1, dt * 1.6);
            p.y -= scrollDelta * (p.kind === 'ember' ? 0.15 : 0.3);
          }

          if (mouseX > -999 && p.kind !== 'sparkle') {
            const dx = p.x - mouseX;
            const dy = p.y - mouseY;
            const distSq = dx * dx + dy * dy;
            if (distSq < 16000) {
              const inf = (1 - distSq / 16000) * Math.min(1, dt * 7);
              p.vx += (mouseVx - p.vx) * inf * 0.7 + dx * inf * 2;
              p.vy += (mouseVy - p.vy) * inf * 0.5 + dy * inf * 2;
              p.vr += mouseVx * inf * 0.002;
            }
          }

          const sway = p.kind === 'sparkle' ? 0 : Math.sin(p.age * p.swayF + p.phase) * p.swayA;
          p.x += (p.vx + sway) * dt;
          p.y += p.vy * dt;
          p.rot += p.vr * dt;
          p.flip += p.vf * dt;
        }

        if (p.age > p.life || p.y > height + 60 || p.y < -height || p.x < -120 || p.x > width + 120 || (p.kind === 'ember' && p.y < -30)) {
          particles.splice(i, 1);
          continue;
        }

        let alpha = 1;
        if (p.kind === 'sparkle') {
          alpha = Math.sin(Math.min(1, p.age / p.life) * Math.PI) * (0.75 + 0.25 * Math.sin(p.age * 18 + p.phase));
        } else if (p.kind === 'ember') {
          alpha = Math.min(1, p.age * 2) * (1 - p.age / p.life) * (0.7 + 0.3 * Math.sin(p.age * 9 + p.phase));
        } else if (p.rest) {
          alpha = p.age > 8 ? 9 - p.age : 1;
        } else if (p.alpha) {
          alpha = p.alpha * Math.min(1, p.age * 1.5);
        }

        const scale = (p.size * dpr) / p.s.max;
        const cosR = Math.cos(p.rot);
        const sinR = Math.sin(p.rot);
        const flipScale = p.kind === 'flower' ? 0.25 + 0.75 * Math.abs(Math.cos(p.flip)) : 1;

        ctx.globalAlpha = Math.max(0, alpha);
        ctx.setTransform(cosR * flipScale * scale, sinR * flipScale * scale, -sinR * scale, cosR * scale, p.x * dpr, p.y * dpr);
        ctx.drawImage(p.s.c, -p.s.c.width / 2, -p.s.c.height / 2);
      }

      if (restingGrains > 520) {
        let toRemove = restingGrains - 520;
        for (let j = 0; j < particles.length && toRemove > 0; j++) {
          if (particles[j].rest) {
            particles.splice(j--, 1);
            toRemove--;
          }
        }
      }

      ctx.globalAlpha = 1;
      if (particles.length || gen.rate > 0) requestFrame();
      else lastTime = 0;
    }

    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (animId) cancelAnimationFrame(animId);
        animId = 0;
        lastTime = 0;
      } else {
        requestFrame();
      }
    });

    resize();
  }

  // 3. Scroll Animation Engine
  function initScrollAnimation() {
    const root = document.getElementById('invitation-top') || document.body;
    const stage = document.querySelector('.film-stage');
    if (!stage) return;

    const layerMap = {};
    const layerSceneMap = {};
    const sceneMap = {};

    document.querySelectorAll('[data-layer]').forEach(el => {
      const name = el.dataset.layer;
      layerMap[name] = el;
      const sceneEl = el.closest('[data-scene]');
      if (sceneEl) layerSceneMap[name] = sceneEl.dataset.scene;
    });

    document.querySelectorAll('[data-scene]').forEach(el => {
      sceneMap[el.dataset.scene] = el;
    });

    const invitations = Array.from(document.querySelectorAll('.event-invitation'));
    const airDepths = Array.from(document.querySelectorAll('[data-air-depth]')).map(el => ({
      node: el,
      depth: Number(el.dataset.airDepth)
    }));

    const sceneOffsets = {};
    const activeScenes = new Set();
    const styleCache = new WeakMap();

    const setStyle = (el, prop, val) => {
      let cached = styleCache.get(el);
      if (!cached) {
        cached = {};
        styleCache.set(el, cached);
      }
      if (cached[prop] !== val) {
        cached[prop] = val;
        el.style[prop] = val;
      }
    };

    const setAttr = (el, attr, val) => {
      const s = String(val);
      if (el.getAttribute(attr) !== s) el.setAttribute(attr, s);
    };

    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
    const smoothStep = (v, min, max) => {
      const t = clamp((v - min) / (max - min), 0, 1);
      return t * t * (3 - 2 * t);
    };
    const norm = (v, min, max) => clamp((v - min) / (max - min), 0, 1);

    let viewWidth = window.innerWidth;
    let viewHeight = stage.clientHeight;
    let maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);

    let smoothScrollY = window.scrollY;
    let targetScrollY = window.scrollY;
    let lastRenderedScroll = -1;
    let rafId = 0;
    let lastTs = 0;
    let inputMode = 'wheel';
    let mouseNormX = 0, mouseNormY = 0;
    let smoothMouseX = 0, smoothMouseY = 0;
    let touchResetTimer = null;

    const requestUpdate = () => {
      if (!rafId && !document.hidden) {
        rafId = requestAnimationFrame(updateFrame);
      }
    };

    const onResize = () => {
      viewWidth = window.innerWidth;
      viewHeight = stage.clientHeight;
      maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      targetScrollY = window.scrollY;
      lastRenderedScroll = -1;
      requestUpdate();
    };

    const transformLayer = (name, xPct, yPct, scale = 1, rotateDeg = 0, opacity = 1) => {
      if (!activeScenes.has(layerSceneMap[name])) return;
      const el = layerMap[name];
      if (!el) return;
      setStyle(el, 'transform', `translate3d(${(xPct * viewWidth / 100).toFixed(3)}px,${(yPct * viewHeight / 100).toFixed(3)}px,0) scale(${scale.toFixed(4)}) rotate(${rotateDeg.toFixed(3)}deg)`);
      setStyle(el, 'opacity', opacity.toFixed(4));
    };

    const updateScene = (sceneName, startIn, fullIn, fullOut, endOut, progress) => {
      const el = sceneMap[sceneName];
      if (!el) return;
      const inVal = 1 - smoothStep(progress, startIn, fullIn);
      const outVal = smoothStep(progress, fullOut, endOut);
      let offset = inVal * 100 - outVal * 105;
      let active = progress >= startIn - 0.025 && progress <= endOut + 0.015;

      if (sceneName === 'opening') {
        offset = 0;
        active = progress < 0.195;
      }
      if (sceneName === 'final') {
        offset = inVal * 100;
        active = progress >= startIn - 0.025;
      }

      setAttr(el, 'data-active', active);
      setStyle(el, 'visibility', active ? 'visible' : 'hidden');
      const interactive = active && Math.abs(offset) < 15;
      setStyle(el, 'pointerEvents', interactive ? 'auto' : 'none');
      el.inert = !interactive;
      setAttr(el, 'aria-hidden', !interactive);

      if (active) {
        activeScenes.add(sceneName);
        sceneOffsets[sceneName] = offset;
        setStyle(el, 'transform', `translate3d(0,${(offset * viewHeight / 100).toFixed(3)}px,0)`);
      }
    };

    const renderScenes = progress => {
      activeScenes.clear();
      updateScene('opening', 0, 0, 0.15, 0.255, progress);
      updateScene('gate', 0.105, 0.175, 0.255, 0.315, progress);
      updateScene('events', 0.265, 0.315, 0.412, 0.468, progress);
      updateScene('couple', 0.413, 0.462, 0.516, 0.573, progress);
      updateScene('portrait', 0.516, 0.575, 0.64, 0.69, progress);
      updateScene('venue', 0.645, 0.69, 0.735, 0.791, progress);
      updateScene('blessing', 0.744, 0.792, 0.83, 0.878, progress);
      updateScene('memories', 0.837, 0.877, 0.932, 0.978, progress);
      updateScene('final', 0.93, 0.99, 1, 1.01, progress);

      let focusedScene = 'opening';
      for (const s of ['opening', 'gate', 'events', 'couple', 'portrait', 'venue', 'blessing', 'memories', 'final']) {
        if (activeScenes.has(s) && Math.abs(sceneOffsets[s] ?? 0) <= 50) {
          focusedScene = s;
        }
      }

      if (window.__currentScene !== focusedScene) {
        window.__currentScene = focusedScene;
        window.dispatchEvent(new Event('invitation:scene'));
      }

      // Parallax layers
      transformLayer('blessing-controls', 0, 0, 1, 0, norm(progress, 0.47, 0.49));
      transformLayer('opening-title', 0, -norm(progress, 0.012, 0.115) * 83, 1, 0, 1 - norm(progress, 0.055, 0.11));
      transformLayer('opening-temple', 0, 85 - norm(progress, 0, 0.235) * 225, 0.91 + norm(progress, 0, 0.19) * 0.28);
      transformLayer('opening-hint', 0, 0, 1, 0, 1 - norm(progress, 0, 0.035));
      transformLayer('opening-atmosphere', 0, -norm(progress, 0, 0.15) * 28, 1, 0, 1 - smoothStep(progress, 0.065, 0.16));
      transformLayer('invitation-words', 0, 10 - norm(progress, 0.13, 0.25) * 14, 1, 0, norm(progress, 0.145, 0.178));
      transformLayer('gate-frame', 0, -norm(progress, 0.18, 0.265) * 7, 1 + norm(progress, 0.15, 0.26) * 0.05);
      transformLayer('event-window', 0, 3 - norm(progress, 0.3, 0.43) * 6, 0.99 + norm(progress, 0.3, 0.43) * 0.02);
      transformLayer('event-surround', 0, 2 - norm(progress, 0.27, 0.43) * 4);

      if (activeScenes.has('events')) {
        const slide = smoothStep(progress, 0.35, 0.385);
        invitations.forEach((el, idx) => {
          const isInactive = idx !== (slide < 0.5 ? 0 : 1);
          el.inert = isInactive;
        });
        if (layerMap['event-reel']) {
          setStyle(layerMap['event-reel'], 'transform', `translate3d(${(-slide * 50).toFixed(4)}%,0,0)`);
        }
        if (layerMap['pip-one']) setStyle(layerMap['pip-one'], 'opacity', (1 - slide * 0.65).toFixed(4));
        if (layerMap['pip-two']) setStyle(layerMap['pip-two'], 'opacity', (0.35 + slide * 0.65).toFixed(4));
      }

      transformLayer('couple-temple', 0, 16 - norm(progress, 0.437, 0.54) * 35, 1 + norm(progress, 0.44, 0.53) * 0.1);
      transformLayer('illustrated-couple', 0, 55 - norm(progress, 0.44, 0.525) * 72, 0.8 + norm(progress, 0.44, 0.525) * 0.23);
      transformLayer('portrait-intro', 0, 7 - norm(progress, 0.566, 0.64) * 10, 1, 0, norm(progress, 0.551, 0.582));
      transformLayer('gold-portrait', 0, 43 - norm(progress, 0.572, 0.625) * 48, 0.9 + norm(progress, 0.58, 0.64) * 0.1);
      transformLayer('temple-procession', 0, 45 - norm(progress, 0.61, 0.665) * 61, 1.1);
      transformLayer('venue-copy', 0, 16 - norm(progress, 0.674, 0.737) * 29, 1, 0, norm(progress, 0.67, 0.695));
      transformLayer('venue-temple', 0, 35 - norm(progress, 0.674, 0.745) * 47, 1);
      transformLayer('blessing-copy', 0, 14 - norm(progress, 0.773, 0.833) * 21, 1, 0, norm(progress, 0.77, 0.795));
      transformLayer('countdown-heading', 0, -norm(progress, 0.885, 0.927) * 53, 1, 0, 1 - norm(progress, 0.912, 0.93));
      transformLayer('memories-heading', 0, 17 - norm(progress, 0.886, 0.932) * 25, 1, 0, norm(progress, 0.884, 0.903) * (1 - norm(progress, 0.934, 0.95)));

      if (activeScenes.has('memories')) {
        const n = smoothStep(progress, 0.892, 0.936);
        const r = smoothStep(progress, 0.936, 0.974);
        [
          [-36, 28, -19],
          [35, 37, 17],
          [-24, 62, 12],
          [28, 70, -14],
          [4, 83, -8]
        ].forEach(([xPos, yPos, deg], idx) => {
          transformLayer(
            `memory-${idx}`,
            xPos * (1 - n) + Math.sin(idx * 2) * r * 60,
            yPos * (1 - n) + 14 * n - r * (50 + idx * 12),
            0.58 + n * 0.15 - r * 0.33,
            deg * (1 - n) + idx * 6 * n - r * deg,
            norm(progress, 0.881 + idx * 0.003, 0.9 + idx * 0.003) * (1 - r)
          );
        });
      }

      transformLayer('final-landscape', 0, 12 - norm(progress, 0.94, 1) * 12, 1.02);
      transformLayer('final-words', 0, 12 - norm(progress, 0.96, 0.995) * 12, 1, 0, norm(progress, 0.955, 0.985));
    };

    function updateFrame(now) {
      rafId = 0;
      const dt = lastTs ? Math.min(now - lastTs, 64) : 16.67;
      lastTs = now;

      const factor = 1 - Math.exp(-dt / (inputMode === 'touch' ? 80 : 190));
      smoothScrollY += (targetScrollY - smoothScrollY) * factor;
      if (Math.abs(targetScrollY - smoothScrollY) < 0.12) smoothScrollY = targetScrollY;

      const progress = clamp(smoothScrollY / maxScroll, 0, 1);
      const isStill = smoothScrollY === targetScrollY;
      setAttr(root, 'data-scroll-moving', !isStill);

      if (lastRenderedScroll !== smoothScrollY) {
        lastRenderedScroll = smoothScrollY;
        renderScenes(progress);
      }

      // Parallax atmosphere for clouds & butterflies
      if (activeScenes.has('opening')) {
        const mouseFactor = 1 - Math.exp(-dt / 240);
        smoothMouseX += (mouseNormX - smoothMouseX) * mouseFactor;
        smoothMouseY += (mouseNormY - smoothMouseY) * mouseFactor;
        if (Math.abs(mouseNormX - smoothMouseX) < 0.001) smoothMouseX = mouseNormX;
        if (Math.abs(mouseNormY - smoothMouseY) < 0.001) smoothMouseY = mouseNormY;
        airDepths.forEach(({ node, depth }) => {
          setStyle(node, 'transform', `translate3d(${(smoothMouseX * depth).toFixed(2)}px,${(smoothMouseY * depth * 0.6).toFixed(2)}px,0)`);
        });
      }

      const hasMousePending = activeScenes.has('opening') && (smoothMouseX !== mouseNormX || smoothMouseY !== mouseNormY);
      if (!isStill || hasMousePending) requestUpdate();
      else lastTs = 0;
    }

    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', () => {
      targetScrollY = window.scrollY;
      requestUpdate();
    }, { passive: true });
    window.addEventListener('wheel', () => { inputMode = 'wheel'; }, { passive: true });
    window.addEventListener('touchstart', () => { inputMode = 'touch'; }, { passive: true });
    window.addEventListener('pointermove', e => {
      if (e.pointerType === 'touch' || smoothScrollY / maxScroll > 0.13) return;
      mouseNormX = (e.clientX / viewWidth) * 2 - 1;
      mouseNormY = (e.clientY / viewHeight) * 2 - 1;
      requestUpdate();
    }, { passive: true });

    document.documentElement.addEventListener('pointerleave', () => {
      mouseNormX = mouseNormY = 0;
      requestUpdate();
    });

    onResize();
  }

  // 4. Live Countdown Timer to 24 September 2026, 6:00 PM IST
  function initCountdown() {
    const target = Date.parse('2026-11-24T18:00:00+05:30');
    const digits = document.querySelectorAll('.countdown .count-digit');
    if (!digits.length) return;

    function update() {
      const diff = Math.max(0, target - Date.now());
      const d = Math.floor(diff / 864e5);
      const h = Math.floor((diff / 36e5) % 24);
      const m = Math.floor((diff / 6e4) % 60);
      const s = Math.floor((diff / 1e3) % 60);
      const values = [d, h, m, s].map(n => String(n).padStart(2, '0'));

      digits.forEach((el, idx) => {
        if (values[idx] !== undefined && el.textContent !== values[idx]) {
          el.textContent = values[idx];
        }
      });
    }

    update();
    setInterval(update, 1000);
  }

  // 5. Blessings Counter & Akshantalu Button
  function initBlessings() {
    const btn = document.querySelector('.akshantalu-button');
    const hint = document.querySelector('.tap-hint');
    let count = 0;

    window.addEventListener('invitation:blessed', e => {
      count += (e.detail || 1);
      if (hint) {
        hint.innerHTML = `जोड़े को आशीर्वाद देने के लिए टैप करें · <b>${count}</b> ${count === 1 ? 'आशीर्वाद' : 'आशीर्वाद'}`;
      }
    });

    if (btn) {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        window.dispatchEvent(new Event('invitation:shower'));
      });
    }
  }

  // 6. Event Details Modal
  const eventData = [
    {
      title: 'हल्दी / मेहंदी / संगीत',
      date: 'सोमवार, 23 नवम्बर 2026',
      time: 'दोपहर 1:00 बजे से',
      venue: 'LD Public School, बाबा डैम मंदिर के पास, भीलवाड़ा, राजस्थान',
      desc: 'हल्दी की खुशबू, मेहंदी के रंग, संगीत की धुन और अपनों का साथ... आइए इस रंगारंग उत्सव में हमारे साथ शामिल हों।'
    },
    {
      title: 'फेरे / विवाह भोज',
      date: 'मंगलवार, 24 नवम्बर 2026',
      time: 'शाम 6:00 बजे से',
      venue: 'LD Public School, बाबा डैम मंदिर के पास, भीलवाड़ा, राजस्थान',
      desc: 'वैवाहिक संस्कार के पावन अवसर पर आपकी गरिमामयी उपस्थिति हमारे लिए आशीर्वाद स्वरूप होगी। प्रीतिभोज एवं शुभ फेरे।'
    },
    {
      title: 'शुभ विवाह समारोह',
      date: 'मंगलवार, 24 नवम्बर 2026',
      time: 'शाम 6:00 बजे से',
      venue: 'LD Public School, बाबा डैम मंदिर के पास, भीलवाड़ा, राजस्थान',
      desc: 'परमपिता परमेश्वर की असीम कृपा से हमारे परिवार में शुभ विवाह का पावन अवसर आया है। कृपया पधारकर वर-वधू को अपना स्नेह एवं शुभाशीर्वाद प्रदान करें।'
    }
  ];

  function initModal() {
    let modal = document.getElementById('wedding-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'wedding-modal';
      modal.className = 'custom-modal';
      modal.setAttribute('aria-hidden', 'true');
      modal.innerHTML = `
        <div class="custom-modal-backdrop"></div>
        <div class="custom-modal-dialog">
          <button class="custom-modal-close" aria-label="Close">&times;</button>
          <span class="custom-modal-eyebrow eyebrow">पायल एवं जालाराम · शुभ विवाह</span>
          <h2 class="custom-modal-title"></h2>
          <p class="custom-modal-desc"></p>
          <div class="custom-modal-divider"></div>
          <p class="custom-modal-date"></p>
          <p class="custom-modal-venue"></p>
          <div class="custom-modal-actions">
            <button class="gold-button wine-button custom-modal-ok">स्वीकार करें ✦</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      const close = () => {
        modal.setAttribute('aria-hidden', 'true');
        modal.classList.remove('active');
      };

      modal.querySelector('.custom-modal-backdrop').addEventListener('click', close);
      modal.querySelector('.custom-modal-close').addEventListener('click', close);
      modal.querySelector('.custom-modal-ok').addEventListener('click', close);
      window.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modal.classList.contains('active')) close();
      });
    }

    const openModal = index => {
      const data = eventData[index] || eventData[0];
      modal.querySelector('.custom-modal-title').textContent = data.title;
      modal.querySelector('.custom-modal-desc').textContent = data.desc;
      modal.querySelector('.custom-modal-date').innerHTML = `<b>दिनांक:</b> ${data.date}<br><b>समय:</b> ${data.time}`;
      modal.querySelector('.custom-modal-venue').innerHTML = `<b>स्थल:</b> ${data.venue}`;
      modal.setAttribute('aria-hidden', 'false');
      modal.classList.add('active');
    };

    // Attach to details buttons
    const eventBtns = document.querySelectorAll('.event-invitation .gold-button');
    eventBtns.forEach((btn, idx) => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        openModal(idx);
      });
    });

    const venueBtn = document.querySelector('.venue-copy .gold-button');
    if (venueBtn) {
      venueBtn.addEventListener('click', e => {
        e.stopPropagation();
        openModal(2);
      });
    }
  }

  // 7. Initialize Everything on DOM Ready
  function start() {
    const loader = document.querySelector('.film-loader');
    const container = document.getElementById('invitation-top') || document.body;

    initCountdown();
    initBlessings();
    initModal();

    const canvas = document.querySelector('.celebration-layer');
    if (canvas) initParticles(canvas);

    initScrollAnimation();

    // Hide loader once images decode or after short safety timeout
    const images = Array.from(document.querySelectorAll('img'));
    Promise.allSettled(images.map(img => img.decode ? img.decode() : Promise.resolve())).then(() => {
      setTimeout(() => {
        if (loader) loader.setAttribute('aria-hidden', 'true');
        if (container) container.classList.add('ready');
      }, 300);
    }).catch(() => {
      if (loader) loader.setAttribute('aria-hidden', 'true');
      if (container) container.classList.add('ready');
    });

    // Fallback timer to ensure loader never hangs
    setTimeout(() => {
      if (loader) loader.setAttribute('aria-hidden', 'true');
      if (container) container.classList.add('ready');
    }, 2000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
