<script lang="ts">
  type Progress = 1 | 2 | 3 | 4;

  export let progress: Progress;
  export let onClick: () => void;
</script>

<svg
  viewBox="0.5 -6 33 33"
  xmlns="http://www.w3.org/2000/svg"
  on:click={onClick !== undefined && onClick()}
  class:clickable={onClick !== undefined}
>
  <defs>
    <clipPath clipPathUnits="userSpaceOnUse">
      <path d="M31.5 420.5h27v26.3h-27z"/>
    </clipPath>
  </defs>
  <g transform="matrix(1.33333, 0, 0, -1.33333, -42.987354, 587.929871)">
    <path d="M56 422.3H33.6v22.4H56z" fill="white" stroke="#444141" stroke-width="1.7" stroke-miterlimit="10"/>
    {#if progress >= 1}
      <path
        d="M52.5 425.2l-.4.1c-5.8 4.4-11.4 9.3-16.5 14.5-.4.4-.3 1-.1 1.5.2.5.6.8.8.8l.3-.1a145 145 0 0116.7-14.6c.5-.4.3-1 .2-1.2-.1-.6-.6-1-1-1"
        fill="#2e2a2b"/>
    {/if}
    {#if progress >= 2}
      <path
        d="M38.4 423.3c-.3 0-.5.2-.7.5-.1.3 0 .7.2 1.1l3.9 4.8c3.6 4.3 7.4 8.8 9.7 13.8.4.7.9.8 1 .8.3 0 .6-.1.7-.3v-1c-2.5-5.2-6.4-10-10.2-14.6l-3.8-4.6c-.2-.3-.5-.5-.8-.5"
        fill="#2e2a2b"/>
    {/if}
    {#if progress >= 3}
      <path
        d="M43.9 421.2l-.6.2-.2.9c.2 7 .1 14-.3 21.2 0 .5.2.9.4 1 .2.3.6.5.9.5 0 0 .4 0 .4-.7.5-7.2.6-14.6.3-22 0-.7-.5-1-1-1"
        fill="#2e2a2b"/>
    {/if}
    {#if progress >= 4}
      <path
        d="M33.8 429.5c-.1 0-.4 0-.4.5 0 .7.5 1.7 1.2 1.8 7.3 1 14.7 1.9 22 2.7h.2c.1 0 .4 0 .4-.5 0-.8-.5-1.7-1.1-1.8a2247 2247 0 01-22.3-2.7"
        fill="#2e2a2b"/>
    {/if}
  </g>
</svg>

<style>
  svg {
    user-select: none;
  }

  .clickable {
    cursor: pointer;
  }
</style>
