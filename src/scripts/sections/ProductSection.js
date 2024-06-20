import { ProductList } from "../components/ProductList.js";
import { createElement } from "../utils.js";

export function ProductSection() {
  const sectionTitle = createElement("h2", { class: "font-sourceSerif text-3xl md:text-4xl font-extrabold" }, "Best Sellers");
  const sectionCTA = createElement("p", { class: "font-poppins hidden md:block text-lg font-semibold text-gray-500" }, "Shop All Best Sellers →");

  const sectionHeading = createElement(
    "div",
    { class: "flex items-center justify-center md:justify-between w-full md:max-w-[85vw]" },
    sectionTitle,
    sectionCTA
  );

  const productList = ProductList();

  const section = createElement(
    "section",
    { class: "p-2 md:p-0 md:pl-28 lg:pl-28 product-section flex flex-col gap-5 md:gap-10 w-full" },
    sectionHeading,
    productList
  );

  return section;
}
