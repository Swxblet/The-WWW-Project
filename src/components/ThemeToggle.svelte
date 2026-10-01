<script lang="ts">
  import { onMount } from 'svelte';

  const STORAGE_KEY = 'www-theme';

  let dark = $state(false);

  function apply(value: boolean): void {
    dark = value;
    document.documentElement.dataset.theme = value ? 'dark' : 'light';
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', value ? '#0a0f0a' : '#fafaf9');
    try {
      localStorage.setItem(STORAGE_KEY, value ? 'dark' : 'light');
    } catch {
      // Private mode: theme simply does not persist.
    }
  }

  onMount(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      stored = null;
    }
    if (stored === 'dark' || stored === 'light') {
      apply(stored === 'dark');
    } else {
      apply(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  });
</script>

<button
  type="button"
  class="theme-toggle"
  aria-pressed={dark}
  aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
  title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
  onclick={() => apply(!dark)}
>
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
    {#if dark}
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="1.8" />
      <g stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
        <line x1="12" y1="2.5" x2="12" y2="5" />
        <line x1="12" y1="19" x2="12" y2="21.5" />
        <line x1="2.5" y1="12" x2="5" y2="12" />
        <line x1="19" y1="12" x2="21.5" y2="12" />
        <line x1="5" y1="5" x2="6.8" y2="6.8" />
        <line x1="17.2" y1="17.2" x2="19" y2="19" />
        <line x1="5" y1="19" x2="6.8" y2="17.2" />
        <line x1="17.2" y1="6.8" x2="19" y2="5" />
      </g>
    {:else}
      <path
        d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5Z"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linejoin="round"
      />
    {/if}
  </svg>
</button>

<style>
  .theme-toggle {
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: 60;
    width: 2.5rem;
    height: 2.5rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    border: 1px solid rgba(128, 128, 128, 0.45);
    background: rgba(250, 250, 249, 0.85);
    color: #1a1a1a;
    cursor: pointer;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }
  .theme-toggle:hover {
    border-color: currentColor;
  }
  .theme-toggle:focus-visible {
    outline: 3px solid var(--focus);
    outline-offset: 2px;
  }
  :global(html[data-theme='dark']) .theme-toggle {
    background: rgba(16, 16, 16, 0.85);
    color: #e8e6e1;
  }
</style>
