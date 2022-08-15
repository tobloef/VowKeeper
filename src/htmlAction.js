export const html = (node, content) => {
  node.innerHTML = content
  return {
    update(content) {
      node.innerHTML = content
    }
  }
};