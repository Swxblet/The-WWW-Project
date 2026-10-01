<script lang="ts">
  import { wwwContent, type InlineChunk } from '$lib/content/www-content';

  function renderChunk(chunk: InlineChunk, index: number): string {
    void index;
    return chunk.text;
  }
  void renderChunk;

  interface Props {
    /** Prefix for in-page anchors so each era instance owns unique IDs. */
    idPrefix?: string;
  }

  let { idPrefix = '' }: Props = $props();
  const titleId = $derived(`${idPrefix}www-title`);
</script>

<article class="www" aria-labelledby={titleId}>
  <header class="www-header">
    <p class="www-kicker">{wwwContent.headerNote}</p>
    <h1 id={titleId}>{wwwContent.title}</h1>
  </header>

  {#each wwwContent.intro as paragraph, pi (pi)}
    <p class="www-p">
      {#each paragraph as chunk, ci (`${pi}-${ci}`)}
        {#if chunk.href}
          <a href={chunk.href} rel="noreferrer">{chunk.text}</a>
        {:else}
          {chunk.text}
        {/if}
      {/each}
    </p>
  {/each}

  <dl class="www-index">
    {#each wwwContent.sections as section (section.id)}
      <div class="www-entry" id={`${idPrefix}${section.id}`}>
        <dt>
          <a href={`#${idPrefix}${section.id}`}>{section.heading}</a>
        </dt>
        <dd>
          {#each section.paragraphs as paragraph, pi (`${section.id}-${pi}`)}
            <p>
              {#each paragraph as chunk, ci (`${section.id}-${pi}-${ci}`)}
                {#if chunk.href}
                  <a href={chunk.href} rel="noreferrer">{chunk.text}</a>
                {:else}
                  {chunk.text}
                {/if}
              {/each}
            </p>
          {/each}
        </dd>
      </div>
    {/each}
  </dl>

  <footer class="www-footer">
    {#each wwwContent.footerNote as paragraph, pi (pi)}
      <p>
        {#each paragraph as chunk, ci (`f-${pi}-${ci}`)}
          {#if chunk.href}
            <a href={chunk.href} rel="noreferrer">{chunk.text}</a>
          {:else}
            {chunk.text}
          {/if}
        {/each}
      </p>
    {/each}
  </footer>
</article>

<style>
  .www {
    display: block;
  }
  .www-header,
  .www-p,
  .www-entry,
  .www-footer {
    max-width: var(--measure, 72ch);
  }
</style>
