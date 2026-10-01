<script lang="ts">
  import { onMount } from 'svelte';

  interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    r: number;
  }

  let canvas: HTMLCanvasElement | undefined = $state();
  let wrap: HTMLElement | undefined = $state();

  onMount(() => {
    const el = canvas;
    const host = wrap;
    if (!el || !host) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = el.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let raf = 0;
    let running = false;
    let lastY = window.scrollY;
    let drift = 0;
    let rgb = '11, 61, 145';
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    function readTheme(): void {
      const v = getComputedStyle(document.documentElement).getPropertyValue('--particle-rgb').trim();
      if (v) rgb = v;
    }

    readTheme();

    function resize(): void {
      if (!el || !host) return;
      const rect = host.getBoundingClientRect();
      el.width = Math.max(1, Math.floor(rect.width * DPR));
      el.height = Math.max(1, Math.floor(rect.height * DPR));
      seed();
    }

    function seed(): void {
      if (!el) return;
      const count = Math.min(60, Math.floor(el.width / (28 * DPR)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * el!.width,
        y: Math.random() * el!.height,
        vx: (Math.random() - 0.5) * 0.12 * DPR,
        vy: (Math.random() - 0.5) * 0.12 * DPR,
        r: (0.8 + Math.random() * 1.4) * DPR
      }));
    }

    function tick(): void {
      if (!running || !el || !ctx) return;
      const y = window.scrollY;
      drift = drift * 0.92 + (y - lastY) * 0.04;
      lastY = y;

      ctx.clearRect(0, 0, el.width, el.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy + drift * 0.25;
        if (p.x < 0) p.x = el.width;
        if (p.x > el.width) p.x = 0;
        if (p.y < 0) p.y = el.height;
        if (p.y > el.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, 0.14)`;
        ctx.fill();
      }

      const linkDist = 110 * DPR;
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d > linkDist) continue;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(${rgb}, ${((1 - d / linkDist) * 0.1).toFixed(3)})`;
          ctx.stroke();
        }
      }

      raf = requestAnimationFrame(tick);
    }

    function start(): void {
      if (running) return;
      running = true;
      lastY = window.scrollY;
      raf = requestAnimationFrame(tick);
    }

    function stop(): void {
      running = false;
      cancelAnimationFrame(raf);
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) start();
        else stop();
      },
      { threshold: 0 }
    );
    io.observe(host);
    window.addEventListener('resize', resize);
    const themeObserver = new MutationObserver(readTheme);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    resize();

    return () => {
      io.disconnect();
      themeObserver.disconnect();
      window.removeEventListener('resize', resize);
      stop();
    };
  });
</script>

<span bind:this={wrap} class="cern-field" aria-hidden="true">
  <canvas bind:this={canvas} class="modern-canvas"></canvas>
</span>

<style>
  .cern-field {
    position: absolute;
    inset: 0;
    display: block;
  }
</style>
