import { Card } from "./Card.js";

export function ProductCard({ customLayout, class: className }) {
  const layout = customLayout();
  return Card(
    {
      class: className,
    },
    ...layout
  );
}
