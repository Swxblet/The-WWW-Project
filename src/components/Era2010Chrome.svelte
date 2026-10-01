<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    children: Snippet;
    /** Same prefix passed to the enclosed TheProject, so nav stays inside this view. */
    idPrefix?: string;
  }

  let { children, idPrefix = '' }: Props = $props();
  const anchor = (id: string): string => `#${idPrefix}${id}`;
</script>

<div class="y2k-page">
  <header class="y2k-header">
    <div class="y2k-header-inner">
      <div class="y2k-brand">
        <span class="y2k-logo" aria-hidden="true">W3</span>
        <span>
          <strong>World Wide Web</strong>
          <small>The World Wide Web project</small>
        </span>
      </div>
    <nav class="y2k-nav" aria-label="Document">
      <a href={anchor('whats-out-there')}>What's out there?</a>
      <a href={anchor('help')}>Help</a>
      <a href={anchor('software')}>Software Products</a>
      <a href={anchor('technical')}>Technical</a>
      <a href={anchor('people')}>People</a>
      <a href={anchor('history')}>History</a>
      <a href={anchor('getting-code')}>Getting code</a>
    </nav>
    </div>
  </header>

  <div class="y2k-body">
    <aside class="y2k-sidebar" aria-label="Contents">
      <h2>Contents</h2>
      <ul>
        <li><a href={anchor('whats-out-there')}>What's out there?</a></li>
        <li><a href={anchor('help')}>Help</a></li>
        <li><a href={anchor('software')}>Software Products</a></li>
        <li><a href={anchor('technical')}>Technical</a></li>
        <li><a href={anchor('bibliography')}>Bibliography</a></li>
        <li><a href={anchor('people')}>People</a></li>
        <li><a href={anchor('history')}>History</a></li>
        <li><a href={anchor('helping')}>How can I help?</a></li>
        <li><a href={anchor('getting-code')}>Getting code</a></li>
      </ul>
    </aside>
    <div class="y2k-main">
      {@render children()}
    </div>
    <aside class="y2k-ads" aria-label="Reference">
      <h2>Reference</h2>
      <p>November's W3 news and the list of mailing lists are part of the original document.</p>
      <a href={anchor('helping')}>How can I help?</a>
    </aside>
  </div>
</div>

<style>
  .y2k-page {
    background: transparent;
  }
  .y2k-header {
    background: var(--era-header);
    color: var(--era-header-ink);
  }
  .y2k-header-inner {
    max-width: 68rem;
    margin: 0 auto;
    padding: clamp(1.5rem, 4vw, 2.5rem) 1rem;
    display: grid;
    gap: 0.75rem;
  }
  .y2k-brand {
    display: flex;
    gap: 0.75rem;
    align-items: center;
  }
  .y2k-logo {
    width: 2.5rem;
    height: 2.5rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: radial-gradient(circle at 30% 30%, #fff, #9cc4ee 60%, #2a6cb6);
    color: #0b2a52;
    font-weight: 900;
  }  .y2k-brand strong {
    display: block;
  }
  .y2k-brand small {
    opacity: 0.9;
  }
  .y2k-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }
  .y2k-nav a {
    background: var(--era-pill-bg);
    color: var(--era-pill-ink);
    border-radius: 999px;
    padding: 0.25rem 0.75rem;
    font-size: 0.85rem;
    text-decoration: none;
    border: 1px solid var(--era-pill-line);
  }
  .y2k-body {
    max-width: 68rem;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 1rem;
    padding: clamp(1.5rem, 4vw, 2.5rem) 1rem clamp(2rem, 6vw, 5rem);
  }
  .y2k-sidebar,
  .y2k-ads {
    background: var(--era-card);
    border: 1px solid var(--era-line);
    border-radius: 8px;
    padding: 0.9rem;
    font-size: 0.9rem;
    height: fit-content;
  }
  .y2k-sidebar h2,
  .y2k-ads h2 {
    color: var(--era-ink);
  }
  .y2k-sidebar a,
  .y2k-ads a {
    color: var(--era-link);
  }
  .y2k-ads {
    display: none;
  }
  @media (min-width: 900px) {
    .y2k-body {
      grid-template-columns: 220px 1fr 200px;
    }
    .y2k-ads {
      display: block;
    }
  }
  @media (max-width: 640px) {
    .y2k-body {
      grid-template-columns: 1fr;
    }
    .y2k-sidebar {
      order: 2;
    }
  }
</style>
