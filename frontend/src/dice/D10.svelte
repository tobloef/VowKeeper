<script lang="ts">
  export let number: number;

  const numberParams = {
    1: {
      x: "41%",
      y: "45%",
      fontSize: "55%",
    },
    2: {
      x: "41%",
      y: "45%",
      fontSize: "55%",
    },
    3: {
      x: "41%",
      y: "45%",
      fontSize: "55%",
    },
    4: {
      x: "40%",
      y: "45%",
      fontSize: "55%",
    },
    5: {
      x: "41%",
      y: "45%",
      fontSize: "55%",
    },
    6: {
      x: "41%",
      y: "45%",
      fontSize: "55%",
    },
    7: {
      x: "41%",
      y: "45%",
      fontSize: "55%",
    },
    8: {
      x: "41%",
      y: "45%",
      fontSize: "55%",
    },
    9: {
      x: "41%",
      y: "45%",
      fontSize: "55%",
    },
    10: {
      x: "34.5%",
      y: "46%",
      fontSize: "50%",
    },
  };

  const addText = (event) => {
    const object = event.target;
    const svg = object.contentDocument.documentElement;
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    const params = numberParams[number];
    text.setAttributeNS(null, "x", params.x);
    text.setAttributeNS(null, "y", params.y);
    text.setAttributeNS(null, "font-size", params.fontSize);
    text.setAttributeNS(null, "font-family", "sans-serif");
    text.setAttributeNS(null, "fill", "#3e3e3f");
    text.setAttributeNS(null, "font-weight", "bold");
    text.setAttributeNS(null, "textLength", "30%");
    const textNode = document.createTextNode(String(number));
    text.appendChild(textNode);
    svg.appendChild(text);
  }
</script>

<object
        type="image/svg+xml"
        data="./d10.svg"
        on:load={addText}
></object>
