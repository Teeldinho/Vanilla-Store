/**
 * Creates a DOM element with the specified type, properties, and children.
 *
 * @param {string} type - The type of the element to create (e.g., 'div', 'span', 'p', 'h1', and more).
 * @param {Object} [props={}] - An object containing properties and attributes to set on the element.
 * @param {Object.<string, *>} [props] - Optional properties and attributes for the element.
 * @param {...Node|string} children - The children to append to the created element.
 * @returns {HTMLElement} The created DOM element.
 */
export function createElement(type, props = {}, ...children) {
  const element = document.createElement(type);

  props = props || {};

  // Iterate over the properties object
  Object.keys(props).forEach((key) => {
    // Check if the property is an event listener (e.g., onClick, onSubmit, etc.)
    if (key.startsWith("on") && typeof props[key] === "function") {
      // Add the event listener to the element
      element.addEventListener(key.substring(2).toLowerCase(), props[key]);
    } else if (key === "class") {
      // Set the class name of the element, if the key is 'class'
      element.className = props[key];
    } else if (key === "style") {
      // Assign the style properties to the element's style, if the key is 'style'
      Object.assign(element.style, props[key]);
    } else {
      // Set other attributes on the element
      element.setAttribute(key, props[key]);
    }
  });

  // Iterate over the children and append them to the element
  children.forEach((child) => {
    if (child === null || child === undefined) {
      return;
    }
    if (typeof child === "string") {
      // Append text nodes directly, if the child is a string
      element.appendChild(document.createTextNode(child));
    } else {
      // Append other nodes, if the child is not a string
      element.appendChild(child);
    }
  });

  // Return the created element
  return element;
}

/**
 * Appends a DOM element to a specified container element.
 *
 * @param {HTMLElement} element - The element to append to the container.
 * @param {HTMLElement} container - The container to which the element will be appended.
 */
export function render(element, container) {
  // Append the element to the container
  container.appendChild(element);
}

/**
 * Formats a price value as a currency string.
 * @param {number} price - The price value to format.
 */

export function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

/**
 * Renders a star rating based on the given rating value.
 * @param {number} rating - The rating value to render.
 */
export function renderStars(rating) {
  const maxStars = 5;
  const blackStars = Array.from({ length: rating }, (_, i) => createElement("span", { class: "text-black" }, "★"));
  const whiteStars = Array.from({ length: maxStars - rating }, (_, i) => createElement("span", { class: "text-gray-200" }, "★"));
  return [...blackStars, ...whiteStars];
}
