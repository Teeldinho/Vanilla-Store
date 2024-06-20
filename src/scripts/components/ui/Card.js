/**
 * This module provides a set of flexible Card components using the createElement utility function.
 * Each component allows custom classes and styles to be passed, making it easy to customize the
 * layout and appearance of cards. This approach allows for reusable and composable UI components
 * in a manner similar to modern JavaScript frameworks, but without the need for a build step or dependencies
 * on a specific library. Vanilla-style, basically.
 */

import { createElement } from "../../utils.js";

export function Card({ class: className, style, ...props }, ...children) {
  return createElement(
    "div",
    { class: `card border rounded-lg overflow-hidden shadow-lg flex flex-col gap-1 ${className}`, style, ...props },
    ...children
  );
}

export function CardHeader({ class: className, style, ...props }, ...children) {
  return createElement("div", { class: `card-header flex flex-col gap-1 ${className}`, style, ...props }, ...children);
}

export function CardTitle({ class: className, style, ...props }, children) {
  return createElement("h2", { class: `card-title uppercase text-lg font-medium tracking-wider ${className}`, style, ...props }, children);
}

export function CardDescription({ class: className, style, ...props }, children) {
  return createElement("p", { class: `card-description text-gray-600 ${className}`, style, ...props }, children);
}

export function CardContent({ class: className, style, ...props }, ...children) {
  return createElement("div", { class: `card-content py-2 flex flex-col gap-1 ${className}`, style, ...props }, ...children);
}

export function CardFooter({ class: className, style, ...props }, ...children) {
  return createElement("div", { class: `card-footer p-4 border-t flex flex-col gap-1 ${className}`, style, ...props }, ...children);
}

export function CardImage({ src, alt, class: className, style, ...props }) {
  return createElement("img", { src, alt, class: `card-image flex-1 object-fit rounded-lg ${className}`, style, ...props });
}
