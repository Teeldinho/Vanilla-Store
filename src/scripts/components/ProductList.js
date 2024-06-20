import { createElement, formatPrice, renderStars } from "../utils.js";
import { ProductCard } from "./ProductCard.js";
import { CardHeader, CardTitle, CardDescription, CardContent, CardImage } from "./Card.js";
import { withImageSwap } from "./withImageSwap.js";
import { productsData } from "../../data/products.js";

export function ProductList() {
  const productCards = productsData.map((product) =>
    ProductCard({
      customLayout: () => [
        CardHeader(
          {
            class: "flex-1",
          },
          createElement(
            "div",
            { class: "relative h-full max-h-72" },
            withImageSwap(CardImage, { src: product.imageSrc, alt: product.imageAlt, class: "flex-1 h-full" }),
            product.label
              ? createElement(
                  "span",
                  {
                    class:
                      "absolute top-2 left-2 tracking-tight bg-white text-black rounded-full text-xs font-semibold px-3 uppercase border-2 border-black py-0.5",
                  },
                  product.label
                )
              : null,
            product.discount
              ? createElement(
                  "span",
                  {
                    class:
                      "absolute top-2 right-2 tracking-tight bg-emerald-800/60 rounded-full text-white text-xs font-semibold px-3 py-0.5 uppercase border-1 border-black",
                  },
                  product.discount
                )
              : null
          )
        ),
        CardContent(
          {},
          CardTitle(
            {
              class: "uppercase text-sm font-bold tracking-tighter line-clamp-1 p-0",
            },
            product.title
          ),
          createElement(
            "div",
            { class: "flex items-center" },
            ...renderStars(product.rating),
            createElement("span", { class: "font-semibold text-gray-400 ml-2 text-xs" }, `${product.reviews} Reviews`)
          ),
          createElement("p", { class: "text-gray-800 text-sm font-semibold tracking-wider" }, formatPrice(product.price))
        ),
      ],
      class: "snap-always snap-center border-none shadow-none w-full md:min-w-80 justify-between",
    })
  );

  const productContainer = createElement(
    "div",
    {
      class:
        "product-list flex h-full w-full md:snap-x md:snap-mandatory md:overflow-x-auto gap-4 md:overflow-x-hidden custom-scrollbar h-full md:max-h-96",
    },
    ...productCards
  );

  const showMoreButton = createElement(
    "button",
    {
      id: "show-more",
      class: "block md:hidden mt-6 bg-black text-white px-8 py-3 flex items-center justify-center text-sm font-semibold rounded-full w-full",
    },
    "Show More"
  );

  showMoreButton.addEventListener("click", () => {
    const hiddenProducts = document.querySelectorAll(".product-card.hidden");
    hiddenProducts.forEach((product) => product.classList.remove("hidden"));
    showMoreButton.classList.add("hidden");
  });

  return createElement("main", null, productContainer, showMoreButton);
}
