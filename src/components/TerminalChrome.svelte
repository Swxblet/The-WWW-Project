<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    children: Snippet;
    statusLine?: string;
  }

  let { children, statusLine = 'connected to info.cern.ch — line-mode' }: Props = $props();
</script>

<div class="term-frame" role="group" aria-label="Line-mode browser simulator">
  <div class="term-bar" aria-hidden="true">
    <span class="term-title">www — line-mode browser</span>
    <span class="term-status">{statusLine}</span>
  </div>
  <div class="term-screen">
    <div class="term-screen-inner">
      <p class="term-prompt-line"><span aria-hidden="true">&gt;</span> www http://info.cern.ch/hypertext/WWW/TheProject.html</p>
      {@render children()}
      <p class="term-cursor-line" aria-hidden="true"><span>&gt;</span><span class="term-cursor">_</span></p>
    </div>
  </div>
</div>

<style>
  .term-frame {
    border: 0;
    border-radius: 0;
    overflow: hidden;
    background: #060906;
  }
  .term-bar {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.55rem 1rem;
    background: #101710;
    border-bottom: 1px solid #1e2b1e;
    font-family: var(--font-mono);
    font-size: 0.78rem;
    color: #7da87d;
  }
  .term-title {
    font-weight: 600;
    letter-spacing: 0.02em;
  }
  .term-status {
    margin-left: auto;
    opacity: 0.8;
  }
  .term-screen {
    padding: 0;
  }
  .term-screen-inner {
    max-width: 68rem;
    margin: 0 auto;
    padding: clamp(2rem, 6vw, 5rem) 1rem clamp(2rem, 6vw, 3.5rem);
  }
  .term-prompt-line {
    color: #8fff8f;
    margin: 0 0 1rem;
  }
  .term-cursor-line {
    margin: 1.25rem 0 0;
    color: #33ff33;
  }
  .term-cursor {
    display: inline-block;
    animation: blink 1.1s steps(1) infinite;
  }
  @keyframes blink {
    50% {
      opacity: 0;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .term-cursor {
      animation: none;
    }
  }
</style>
