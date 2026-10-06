<script lang="ts">
  import HeroIntro from './components/HeroIntro.svelte';
  import ThemeToggle from './components/ThemeToggle.svelte';
  import TheProject from './components/TheProject.svelte';
  import TerminalChrome from './components/TerminalChrome.svelte';
  import Era2010Chrome from './components/Era2010Chrome.svelte';
  import ModernChrome from './components/ModernChrome.svelte';
  import CernParticles from './components/CernParticles.svelte';
  import { ERAS } from '$lib/content/www-content';
  import { useScrubReveal } from '$lib/useScrubReveal';

  let scrubTerminal: HTMLElement | undefined = $state();
  let scrubOriginal: HTMLElement | undefined = $state();
  let scrub2010s: HTMLElement | undefined = $state();
  let scrubModern: HTMLElement | undefined = $state();

  useScrubReveal(() => [scrubTerminal, scrubOriginal, scrub2010s, scrubModern]);

  const viewAnchors: Record<string, string> = {
    terminal: '#view-line-mode',
    original: '#view-original-page',
    'retro-2010': '#view-2010s',
    modern: '#view-present'
  };
</script>

<a class="skip-link" href="#main">Skip to content</a>
<ThemeToggle />

<main id="main">
  <HeroIntro />

  <section id="view-line-mode" class="era-section" data-era="terminal" data-scrub aria-label="Document reference" bind:this={scrubTerminal}>
    <div class="scrub">
      <TerminalChrome>
        <TheProject idPrefix="terminal-" />
      </TerminalChrome>
    </div>
  </section>

  <section id="view-original-page" class="era-section" data-era="original" data-scrub aria-label="Document reference" bind:this={scrubOriginal}>
    <div class="era-inner scrub">
      <TheProject idPrefix="original-" />
    </div>
  </section>

  <section id="view-2010s" class="era-section" data-era="retro-2010" data-scrub aria-label="Document reference" bind:this={scrub2010s}>
    <div class="scrub">
      <Era2010Chrome idPrefix="retro-">
        <TheProject idPrefix="retro-" />
      </Era2010Chrome>
    </div>
  </section>

  <section id="view-present" class="era-section modern-wrap" data-era="modern" data-scrub aria-label="Document reference" bind:this={scrubModern}>
    <CernParticles />
    <div class="scrub">
      <ModernChrome idPrefix="modern-">
        <TheProject idPrefix="modern-" />
      </ModernChrome>
    </div>
  </section>
</main>

<footer class="site-footer">
  <div class="site-footer-inner">
    <div class="hub-about">
      <h2>About this presentation</h2>
      <p>
        Educational tribute. Text from
        <a href="http://info.cern.ch/hypertext/WWW/TheProject.html" rel="noreferrer">info.cern.ch — TheProject.html</a>.
        Not an official CERN site. See
        <a href="https://home.web.cern.ch/topics/birth-web" rel="noreferrer">birth of the web</a>.
      </p>
    </div>
    <nav class="hub-views" aria-label="Consult the document as">
      <h2>Consult the document as</h2>
      <ul>
        {#each ERAS as era (era.id)}
          <li><a href={viewAnchors[era.id]}>{era.label}</a></li>
        {/each}
      </ul>
    </nav>
    <p class="hub-top"><a href="#main">Back to top</a></p>
    <p class="hub-credits">
      Made at <a href="https://covao.ed.cr/" rel="noreferrer">COVAO</a> by Ian Díaz Sandi and Emily
      Navarro Santamaría, in collaboration with
      <a href="https://codepixels.dev" rel="noreferrer">CodePixels Studio</a>.
    </p>
  </div>
</footer>
