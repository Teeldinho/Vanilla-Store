import { createElement } from "../../utils.js";

/**
 * Creates a reusable button component.
 *
 * @param {Object} props - The properties to set on the button element.
 * @param {Object.<string, *>} [props] - Optional properties and attributes for the button element.
 * @param {...Node|string} children - The children to append to the button element.
 * @returns {HTMLElement} The created button element.
 */
export function Button({ class: className, style, ...props }, ...children) {
  return createElement(
    "button",
    {
      class: `block md:hidden bg-black text-white px-8 py-4 flex items-center justify-center text-sm font-semibold rounded-full w-full font-poppins ${className}`,
      style,
      ...props,
    },
    ...children
  );
}
