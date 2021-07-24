<script lang="ts">
  import {darkGrey} from "../colors";

  export let number: number;
  export let isHit: true | false | undefined;

  const numberPositions = {
    0: {
      x: "13.5px",
      y: "13px",
    },
    1: {
      x: "13.5px",
      y: "13px",
    },
    2: {
      x: "13.5px",
      y: "13px",
    },
    3: {
      x: "13.5px",
      y: "13px",
    },
    4: {
      x: "13.5px",
      y: "13px",
    },
    5: {
      x: "13.5px",
      y: "13px",
    },
    6: {
      x: "13.5px",
      y: "13px",
    },
    7: {
      x: "13.5px",
      y: "13.5px",
    },
    8: {
      x: "13.5px",
      y: "13px",
    },
    9: {
      x: "13.5px",
      y: "13px",
    },
    10: {
      x: "13.2px",
      y: "13.4px",
    },
  };
</script>

<svg
        height="100%"
        viewBox="0 0 26.81 28.43"
        xmlns="http://www.w3.org/2000/svg"
>
    <defs>
        <clipPath clipPathUnits="userSpaceOnUse">
            <path d="M50.4 400.07h306v104.48h-306z"/>
        </clipPath>
    </defs>
    <g transform="matrix(.35278 0 0 -.35278 -20.56 178)">
        <path d="M133.26 466.57l-34.13 36.74a3.86 3.86 0 01-5.66 0l-34.14-36.74a3.86 3.86 0 01.02-5.28l34.14-36.13a3.86 3.86 0 015.61 0l34.14 36.13a3.86 3.86 0 01.02 5.28"
              fill="#414042"/>
        <path d="M99.18 463.33l13.9 6c.64.28 1.1.75 1.26 1.34.18.59.07 1.23-.32 1.8l-16.45 24.89c-.36.55-.81.85-1.27.85-.46 0-.91-.3-1.28-.85l-16.45-24.89a2.14 2.14 0 01-.32-1.8c.17-.59.62-1.06 1.25-1.34l13.91-6c.74-.32 1.8-.5 2.89-.5s2.14.18 2.88.5"
              fill="#e6e7e8"/>
        <path d="M128.81 462.68c-.1.5-.49.9-1.1 1.18l-7.48 3.27a7.6 7.6 0 01-2.9.51 7.57 7.57 0 01-2.86-.5l-13.9-6a4.97 4.97 0 01-2.73-4.15v-26.48c0-.7.17-.96.22-1 .1 0 .4.13.83.58l29.37 31.08c.45.49.65 1.02.55 1.51"
              fill="#77787b"/>
        <path d="M120.85 469.32l7.26-3.18-25.22 27.15 13.2-19.96c.97-1.47 3.15-3.31 4.76-4.01" fill="#939598"/>
        <path d="M92.03 461.14l-13.91 6c-.74.32-1.78.5-2.86.5-1.1 0-2.15-.19-2.9-.51l-7.48-3.28c-.61-.26-1-.68-1.1-1.17-.1-.49.1-1.02.55-1.5l29.37-31.09c.42-.45.72-.57.83-.57.05.03.22.28.22 1v26.47c0 1.61-1.25 3.51-2.72 4.15"
              fill="#77787b"/>
        <path d="M71.74 469.32c1.61.7 3.8 2.54 4.77 4l13.2 19.97-25.23-27.15z" fill="#939598"/>
    </g>
    <text
            x={numberPositions[number].x}
            y={numberPositions[number].y}
            font-size={number >= 10 ? "8.5px" : "10px"}
            font-family="sans-serif"
            fill={darkGrey}
            font-weight="bold"
            textLength="8.5px"
            text-anchor="middle"
    >{number}</text>
    {#if isHit === true}
        <svg
                x="15px"
                y="6px"
                width="12px"
                viewBox="0 0 6.3888 6.3885"
                xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <clipPath clipPathUnits="userSpaceOnUse">
                    <path d="M31.5 517.639H297v64.824H31.5z"/>
                </clipPath>
            </defs>
            <g transform="matrix(.35278 0 0 -.35278 -97.7255 195.5202)">
                <path d="M294.1907 545.1761c0-4.484-3.635-8.118-8.119-8.118-4.483 0-8.118 3.634-8.118 8.118s3.635 8.118 8.118 8.118c4.484 0 8.119-3.634 8.119-8.118"
                      fill="hsl(120deg 100% 75%)"/>
                <path d="M294.1907 545.1761c0-4.484-3.635-8.118-8.119-8.118-4.483 0-8.118 3.634-8.118 8.118s3.635 8.118 8.118 8.118c4.484 0 8.119-3.634 8.119-8.118z"
                      fill="none" stroke="#393536" stroke-width="1.873" stroke-miterlimit="10"/>
                <path d="M285.1126 540.1478l-4.225 3.228 1.084 1.42 2.807-2.146 5.06 6.624 1.419-1.084z" fill="#393536"/>
            </g>
        </svg>
    {/if}
    {#if isHit === false}
        <svg
                x="15px"
                y="6px"
                width="12px"
                viewBox="0 0 6.39 6.39"
                xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <clipPath clipPathUnits="userSpaceOnUse">
                    <path d="M31.5 517.64H297v64.82H31.5z"/>
                </clipPath>
            </defs>
            <g transform="matrix(.35278 0 0 -.35278 -97.71 195.53)">
                <path d="M294.16 545.2a8.12 8.12 0 10-16.24 0 8.12 8.12 0 0016.24 0"
                      fill="hsl(0deg 100% 70%)"/>
                <path d="M294.16 545.2a8.12 8.12 0 10-16.24 0 8.12 8.12 0 0016.24 0z" fill="none" stroke="#393536"
                      stroke-width="1.87" stroke-miterlimit="10"/>
                <path d="M290.59 542.19l-1.44-1.5-3.11 2.82-3.12-2.82-1.43 1.5 3 2.73-3 2.72 1.33 1.6 3.22-2.92 3.21 2.93 1.34-1.61-3-2.72z"
                      fill="#393536"/>
            </g>
        </svg>

    {/if}
</svg>
