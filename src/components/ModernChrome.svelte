<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    children: Snippet;
    /** Same prefix passed to the enclosed TheProject, so links stay inside this view. */
    idPrefix?: string;
  }

  let { children, idPrefix = '' }: Props = $props();
  const anchor = (id: string): string => `#${idPrefix}${id}`;
</script>

<div class="modern-page">
  <div class="modern-rule" aria-hidden="true"></div>
  <div class="modern-grid">
    <div class="modern-content">
      {@render children()}
    </div>
    <aside class="modern-side" aria-label="About this text">
      <h3>About this text</h3>
      <p>
        The World Wide Web project, set for present-day reading.
        Source: info.cern.ch — TheProject.html.
      </p>
      <ul>
        <li><a href={anchor('whats-out-there')}>What's out there?</a></li>
        <li><a href={anchor('technical')}>Technical</a></li>
        <li><a href={anchor('people')}>People</a></li>
        <li><a href={anchor('getting-code')}>Getting code</a></li>
      </ul>
    </aside>
  </div>
</div>

<style>
  .modern-page {
    background: transparent;
  }
  .modern-rule {
    height: 3px;
    background: var(--era-accent);
  }
  .modern-grid {
    max-width: 68rem;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: clamp(1.5rem, 4vw, 2.5rem) 1rem clamp(2rem, 6vw, 5rem);
  }
  .modern-side {
    border-top: 2px solid var(--era-accent);
    padding-top: 1rem;
    height: fit-content;
    position: sticky;
    top: 5rem;
  }
  .modern-side h3 {
    margin: 0 0 0.5rem;
    font-size: 1rem;
    color: var(--era-ink);
  }
  .modern-side p {
    color: var(--era-muted);
    font-size: 0.95rem;
    line-height: 1.6;
  }
  .modern-side ul {
    list-style: none;
    padding: 0;
    margin: 1rem 0 0;
    display: grid;
    gap: 0.4rem;
  }
  .modern-side a {
    color: var(--era-link);
    text-decoration: none;
    font-size: 0.9rem;
  }
  .modern-side a:visited {
    color: var(--era-visited);
  }
  @media (min-width: 960px) {
    .modern-grid {
      grid-template-columns: 1.6fr 0.7fr;
      gap: 3.5rem;
    }
  }
</style>
