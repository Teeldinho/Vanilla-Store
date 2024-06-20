import { createElement, formatPrice, renderStars } from "../utils.js";
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
      class: "snap-always snap-start last:snap-end",
    })
  );

  const productContainer = createElement(
    "div",
    {
      class:
        "w-full product-list grid grid-cols-2 grid-rows-2 md:max-w-[90vw] lg:max-w-[94vw] gap-4 md:gap-6 md:flex md:flex-row md:snap-x md:snap-mandatory h-full md:overflow-x-auto md:pb-16",
    },
    ...productCards
  );

  const showMoreButton = Button(
    {
      id: "show-more",
      class: "mt-4",
      onclick: () => {
        currentStartIndex = (currentStartIndex + initialProductCount) % productsData.length;
        updateProductContainer(productContainer, currentStartIndex, initialProductCount, productsData, productCards);
      },
    },
    "Show More"
  );

  const updateProductContainer = (startIndex, count) => {
    // Clear the container
    productContainer.innerHTML = "";

    // Get the new set of products
    const newProducts = productsData.slice(startIndex, startIndex + count);

    // If there are less than 'count' products remaining, get the remaining products from the start
    if (newProducts.length < count) {
      newProducts.push(...productsData.slice(0, count - newProducts.length));
    }

    // Add the new set of products to the container
    newProducts.forEach((_, index) => {
      productContainer.appendChild(productCards[(startIndex + index) % productsData.length]);
    });
  };

  showMoreButton.addEventListener("click", () => {
    currentStartIndex = (currentStartIndex + initialProductCount) % productsData.length;
    updateProductContainer(currentStartIndex, initialProductCount);
  });

  const mainElement = createElement("main", null, productContainer, showMoreButton);

  // Initial visibility setup
  window.addEventListener("load", () => {
    if (window.innerWidth < 768) {
      updateProductContainer(0, initialProductCount);
    } else {
      productCards.forEach((product) => product.classList.remove("hidden"));
      productContainer.append(...productCards);
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth < 768) {
      updateProductContainer(0, initialProductCount);
      showMoreButton.classList.remove("hidden");
    } else {
      productCards.forEach((product) => product.classList.remove("hidden"));
      productContainer.innerHTML = "";
      productContainer.append(...productCards);
      showMoreButton.classList.add("hidden");
    }
  });

  return mainElement;
}
