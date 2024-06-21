import { createElement, formatPrice, renderStars, updateProductContainer } from "../utils.js";
import { ProductCard } from "./ProductCard.js";
import { CardHeader, CardTitle, CardContent, CardImage } from "./ui/Card.js";
import { withImageSwap } from "./withImageSwap.js";
import { productsData } from "../../data/products.js";
import { Button } from "./ui/Button.js";
import { Badge } from "./ui/Badge.js";

export function ProductList() {
  const initialProductCount = 4;
  let currentStartIndex = 0;

  const productCards = productsData.map((product) =>
    ProductCard({
      customLayout: () => [
        CardHeader(
          {
            class: "flex-1",
          },
          createElement(
            "div",
            { class: "relative h-full w-full" },
            withImageSwap(CardImage, { src: product.imageSrc, alt: product.imageAlt, class: "w-full h-full md:h-96" }),
            product.label ? Badge({ variant: "primary", class: "absolute top-2 left-2" }, product.label) : null,
            product.discount ? Badge({ variant: "secondary", class: "absolute top-2 right-2" }, `Save ${product.discount}`) : null
          )
        ),
        CardContent(
          {},
          CardTitle(
            {
              class: "line-clamp-1 p-0",
            },
            product.title
          ),
          createElement(
            "div",
            { class: "flex items-center" },
            ...renderStars(product.rating),
            createElement("span", { class: "text-gray-500 ml-2 text-xs line-clamp-1 capitalize font-poppins" }, `${product.reviews} Reviews`)
          ),
          createElement("p", { class: "text-gray-700 text-base font-semibold font-poppins" }, formatPrice(product.price))
        ),
      ],
      class: "snap-always snap-start last:snap-end h-full",
    })
  );

  const productContainer = createElement(
    "div",
    {
      class:
        "w-full product-list grid grid-cols-2 md:max-w-[90vw] lg:max-w-[94vw] gap-4 md:gap-6 md:flex md:flex-row md:snap-x md:snap-mandatory h-full md:overflow-x-auto md:pb-12 custom-scrollbar",
    },
    ...productCards
  );

  const showMoreButton = Button(
    {
      id: "show-more",
      class: "mt-5",
      onclick: () => {
        dropdownContainer.classList.toggle("hidden");
        dropdownContainer.classList.toggle("block");
      },
    },
    "Show More"
  );

  const closeButton = Button(
    {
      id: "close-dropdown",
      class: "absolute -top-0 right-2 z-50 max-w-fit ring-2 ring-white",
      onclick: () => {
        dropdownContainer.classList.toggle("hidden");
        dropdownContainer.classList.toggle("block");
      },
    },
    "X"
  );

  const dropdownContainer = createElement(
    "div",
    {
      class:
        "hidden absolute top-0 left-0 pt-16 right-0 z-40 bg-white h-full p-2 grid grid-cols-2 grid grid-flow-row auto-rows-max gap-4 overflow-y-auto h-full min-h-[100svh] transform transition-transform duration-1000 ease-in-out",
    },
    closeButton,
    ...productCards.slice(initialProductCount)
  );

  const mainElement = createElement(
    "main",
    { class: "relative overflow-x-hidden overflow-y-auto" },
    productContainer,
    showMoreButton,
    dropdownContainer
  );

  // Initial visibility setup
  window.addEventListener("load", () => {
    if (window.innerWidth < 768) {
      updateProductContainer(productContainer, 0, initialProductCount, productsData, productCards);
    } else {
      productCards.forEach((product) => product.classList.remove("hidden"));
      productContainer.append(...productCards);
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth < 768) {
      updateProductContainer(productContainer, 0, initialProductCount, productsData, productCards);
      showMoreButton.classList.remove("hidden");
    } else {
      productCards.forEach((product) => product.classList.remove("hidden"));
      productContainer.innerHTML = "";
      productContainer.append(...productCards);
      showMoreButton.classList.add("hidden");
      dropdownContainer.classList.add("hidden");
    }
  });

  return mainElement;
}
