<script lang="ts">
  import { onMount } from 'svelte';

  let canvas: HTMLCanvasElement | undefined = $state();
  let host: HTMLElement | undefined = $state();
  let inner: HTMLElement | undefined = $state();

  onMount(() => {
    const el = canvas;
    const root = host;
    if (!el || !root) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = el.getContext('2d');
    if (!ctx) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const orbits = [
      { rx: 1.0, tilt: 0.32, speed: 0.22, phase: 0 },
      { rx: 1.0, tilt: -0.34, speed: -0.17, phase: 2.1 },
      { rx: 1.0, tilt: 1.05, speed: 0.13, phase: 4.2 }
    ];
    let raf = 0;
    let running = false;
    let t = 0;

    function cssVar(name: string): string {
      return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    }

    function palette(): { line: string; glow: string; core: string; electron: string } {
      return {
        line: cssVar('--atom-line'),
        glow: cssVar('--atom-glow'),
        core: cssVar('--atom-core'),
        electron: cssVar('--atom-electron')
      };
    }

    let pal = palette();

    function resize(): void {
      if (!el || !root) return;
      const rect = root.getBoundingClientRect();
      el.width = Math.max(1, Math.floor(rect.width * DPR));
      el.height = Math.max(1, Math.floor(rect.height * DPR));
      if (reduced) draw(0);
    }

    function electronPos(
      o: { rx: number; tilt: number; speed: number; phase: number },
      time: number,
      R: number,
      cx: number,
      cy: number
    ): { x: number; y: number } {
      const a = o.phase + time * o.speed;
      const ex = Math.cos(a) * R * o.rx;
      const ey = Math.sin(a) * R * o.rx;
      const c = Math.cos(o.tilt);
      const s = Math.sin(o.tilt);
      return { x: cx + ex * c - ey * s * 0.42, y: cy + ex * s + ey * c * 0.42 };
    }

    function draw(time: number): void {
      if (!el || !ctx) return;
      const w = el.width;
      const h = el.height;
      const cx = w / 2;
      const cy = h / 2;
      const R = Math.min(w, h) * 0.3;
      ctx.clearRect(0, 0, w, h);

      for (const o of orbits) {
        ctx.beginPath();
        ctx.ellipse(cx, cy, R * o.rx, R * o.rx * 0.42, o.tilt, 0, Math.PI * 2);
        ctx.strokeStyle = pal.line;
        ctx.lineWidth = Math.max(1, DPR * 0.75);
        ctx.stroke();
      }

      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 14 * DPR);
      g.addColorStop(0, pal.glow);
      g.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.beginPath();
      ctx.arc(cx, cy, 14 * DPR, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx, cy, 3.2 * DPR, 0, Math.PI * 2);
      ctx.fillStyle = pal.core;
      ctx.fill();

      for (const o of orbits) {
        const p = electronPos(o, time, R, cx, cy);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.6 * DPR, 0, Math.PI * 2);
        ctx.fillStyle = pal.electron;
        ctx.fill();
      }
    }

    function tick(): void {
      if (!running) return;
      t += 0.016;
      draw(t);
      raf = requestAnimationFrame(tick);
    }

    function parallax(): void {
      if (!root || !inner || reduced) return;
      const vh = window.innerHeight;
      const y = Math.min(Math.max(window.scrollY, 0), vh);
      inner.style.opacity = (1 - y / (vh * 0.85)).toFixed(3);
      inner.style.transform = `translateY(${(y * 0.12).toFixed(1)}px)`;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (reduced) return;
        if (entries[0]?.isIntersecting) {
          if (!running) {
            running = true;
            raf = requestAnimationFrame(tick);
          }
        } else {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 }
    );
    io.observe(root);

    function onScroll(): void {
      requestAnimationFrame(parallax);
    }

    window.addEventListener('resize', resize);
    window.addEventListener('scroll', onScroll, { passive: true });
    const themeObserver = new MutationObserver(() => {
      pal = palette();
      if (reduced) draw(t);
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    resize();
    parallax();

    return () => {
      io.disconnect();
      themeObserver.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  });
</script>

<header class="hero" bind:this={host} aria-labelledby="hero-title">
  <canvas class="hero-atom" bind:this={canvas} aria-hidden="true"></canvas>
  <div class="hero-inner" bind:this={inner}>
    <p class="hero-eyebrow">A timeline tribute · 1989 — 2026</p>
    <h1 id="hero-title">The World Wide Web</h1>
    <p class="hero-lede">From a line-mode terminal to the present web — the first page, kept intact, presented through time.</p>
    <ol class="hero-years" aria-label="Timeline">
      <li><span>1989</span></li>
      <li><span>1990</span></li>
      <li><span>2010</span></li>
      <li><span>2026</span></li>
    </ol>
    <p class="hero-cue" aria-hidden="true"><span>Scroll to begin</span><i></i></p>
  </div>
</header>

<style>
  .hero {
    position: relative;
    min-height: 92svh;
    display: grid;
    place-items: center;
    overflow: hidden;
    background-color: var(--hero-bg-2);
    background-image: linear-gradient(var(--hero-bg-1), var(--hero-bg-2));
    color: var(--hero-ink);
    text-align: center;
    padding: 4rem 1rem 3rem;
    transition: background-color 0.35s ease, color 0.35s ease;
  }
  .hero-atom {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
  .hero-inner {
    position: relative;
    max-width: 44rem;
    display: grid;
    gap: 1rem;
    justify-items: center;
    animation: hero-in 1.1s ease both;
  }
  .hero-eyebrow {
    margin: 0;
    font-family: var(--font-mono);
    font-size: 0.8rem;
    letter-spacing: 0.14em;
    color: var(--hero-faint);
  }
  .hero h1 {
    margin: 0;
    font-family: Georgia, 'Times New Roman', serif;
    font-weight: 600;
    letter-spacing: -0.02em;
    font-size: clamp(2.6rem, 8vw, 4.75rem);
    line-height: 1.02;
    color: var(--hero-ink);
  }
  .hero-lede {
    margin: 0;
    max-width: 38ch;
    line-height: 1.65;
    color: var(--hero-muted);
    font-size: 1.05rem;
  }
  .hero-years {
    list-style: none;
    display: flex;
    align-items: center;
    gap: 0;
    margin: 0.5rem 0 0;
    padding: 0;
    font-family: var(--font-mono);
    font-size: 0.82rem;
    color: var(--hero-faint);
  }
  .hero-years li {
    display: flex;
    align-items: center;
  }
  .hero-years li + li::before {
    content: '';
    width: 2.5rem;
    height: 1px;
    background: var(--hero-line);
    margin: 0 0.75rem;
  }
  .hero-cue {
    margin: 1.5rem 0 0;
    display: grid;
    gap: 0.6rem;
    justify-items: center;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    letter-spacing: 0.18em;
    color: var(--hero-faint);
  }
  .hero-cue i {
    width: 1px;
    height: 2.5rem;
    background: linear-gradient(var(--hero-faint), transparent);
    display: block;
    animation: cue 2.2s ease-in-out infinite;
  }
  @keyframes hero-in {
    from {
      opacity: 0;
      transform: translateY(24px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }
  @keyframes cue {
    0%,
    100% {
      transform: scaleY(0.6);
      transform-origin: top;
      opacity: 0.5;
    }
    50% {
      transform: scaleY(1);
      transform-origin: top;
      opacity: 1;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .hero-inner {
      animation: none;
    }
    .hero-cue i {
      animation: none;
    }
  }
</style>
