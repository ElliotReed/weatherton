export function createElement(tagName, attributes, ...children) {
  const $el = document.createElement(tagName);

  for (let key in attributes) {
    $el.setAttribute(key, attributes[key]);
  }

  children.forEach((child) => {
    if (typeof child === "string") {
      $el.appendChild(document.createTextNode(child));
    } else {
      $el.appendChild(child);
    }
  });
  return $el;
}
