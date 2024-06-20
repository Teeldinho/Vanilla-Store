import { Card } from "./ui/Card.js";

export function ProductCard({ customLayout, class: className }) {
  const layout = customLayout();
  return Card(
    {
      class: `border-none shadow-none justify-between w-full md:min-w-96 ${className} `,
    },
    ...layout
  );
}
