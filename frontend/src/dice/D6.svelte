<script lang="ts">
  export let number: number;

  const numberParams = {
    1: {
      x: "24%",
      y: "75%",
      fontSize: "60%",
    },
    2: {
      x: "24%",
      y: "75%",
      fontSize: "60%",
    },
    3: {
      x: "24%",
      y: "75%",
      fontSize: "60%",
    },
    4: {
      x: "24%",
      y: "75%",
      fontSize: "60%",
    },
    5: {
      x: "24%",
      y: "75%",
      fontSize: "60%",
    },
    6: {
      x: "24%",
      y: "75%",
      fontSize: "60%",
    },
  };
</script>

<svg width="92.3" height="76.2" viewBox="0 0 24.4 20.2" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <clipPath clipPathUnits="userSpaceOnUse" id="a">
            <path d="M50.4 400h306v104.5h-306z"/>
        </clipPath>
    </defs>
    <g clip-path="url(#a)" transform="matrix(.35278 0 0 -.35278 -99.6 169.7)">
        <path d="M285.8 424h41c.6 0 1 0 1.5.3l21 9.3c1.3.6 2.2 1.9 2.2 3.3v40.6c0 2-1.6 3.6-3.6 3.6H309c-.5 0-1-.1-1.3-.3l-23.2-9a3.6 3.6 0 01-2.3-3.3v-41c0-2 1.6-3.6 3.5-3.6"
              fill="#414042"/>
        <path d="M323.6 467.8h-34.5a2.5 2.5 0 01-2.5-2.5v-34.6c0-1.3 1-2.5 2.5-2.5h34.5c1.4 0 2.5 1.2 2.5 2.5v34.6c0 1.4-1 2.5-2.5 2.5"
              fill="#e6e7e8"/>
        <path d="M347.9 440.5v34.1c0 1-.5 1.5-1.2 1.5a2 2 0 01-.8-.2l-15-6.4a4.6 4.6 0 01-2.6-3.8V431c0-.9.4-1.4 1.1-1.4l.8.1 15.2 6.8c1.3.6 2.5 2.4 2.5 3.9"
              fill="#77787b"/>
        <path d="M323.6 470c1.7 0 4.4.5 6 1.2l14.8 6.3h-32.1c-1.7 0-4.4-.5-6-1.1l-16.6-6.4z" fill="#bcbec0"/>
    </g>
    <text
            x={numberParams[number].x}
            y={numberParams[number].y}
            font-size={numberParams[number].fontSize}
            font-family="sans-serif"
            fill="#3e3e3f"
            font-weight="bold"
            textLength="30%"
    >{number}</text>
</svg>
