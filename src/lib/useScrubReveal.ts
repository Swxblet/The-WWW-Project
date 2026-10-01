import { onMount } from 'svelte';

function clamp01(v: number): number {
  return Math.min(1, Math.max(0, v));
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Scroll-scrubbed entry transition for the era sections.
 * While a section rises into view its inner content interpolates
 * from transparent / shifted / blurred to its final state,
 * driven continuously by scroll position (same quiet language
 * everywhere: fade + 32px rise + 8px blur).
 * The progress is recomputed on every scroll frame in both
 * directions, so scrolling back up reverses the fade (the vanish
 * returns) instead of leaving every section permanently revealed.
 * Entry only: content that already scrolled past stays visible
 * while it remains on screen, so reading is never interrupted.
 * CSS defaults `--p` to 1 so content is visible without JS
 * and under prefers-reduced-motion.
 */
export function useScrubReveal(getSections: () => (HTMLElement | undefined)[]): void {
  onMount(() => {
    if (prefersReducedMotion()) return;
    const sections = getSections().filter((el): el is HTMLElement => el !== undefined);
    if (sections.length === 0) return;

    let raf = 0;
    let ticking = false;

    const update = (): void => {
      ticking = false;
      const vh = window.innerHeight;
      for (const el of sections) {
        const top = el.getBoundingClientRect().top;
        const p = clamp01((vh * 0.95 - top) / (vh * 0.5));
        el.style.setProperty('--p', p.toFixed(3));
      }
    };

    const onScroll = (): void => {
      if (ticking) return;
      ticking = true;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  });
}
