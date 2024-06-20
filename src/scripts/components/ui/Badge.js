import { createElement } from "../../utils.js";

export const badgeVariant = {
  primary: "bg-white text-gray-800 border-2 border-black",
  secondary: "bg-emerald-800/60 text-white border-1 border-black",
};

export function Badge({ variant = "primary", class: className, ...props }, children) {
  const variantClass = badgeVariant[variant] || badgeVariant.primary;
  return createElement(
    "span",
    {
      class: `badge tracking-tight rounded-full text-xs uppercase px-1.5 md:px-3 py-0.15 md:py-0.5 ${variantClass} ${className}`,
      ...props,
    },
    children
  );
}
