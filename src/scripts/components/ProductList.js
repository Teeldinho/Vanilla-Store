import { createElement, formatPrice, renderStars } from "../utils.js";
import { ProductCard } from "./ProductCard.js";
import { CardHeader, CardTitle, CardContent, CardImage } from "./ui/Card.js";
import { withImageSwap } from "./withImageSwap.js";
import { productsData } from "../../data/products.js";
import { Button } from "./ui/Button.js";

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
            createElement("span", { class: "font-semibold text-gray-400 ml-2 text-xs line-clamp-1" }, `${product.reviews} Reviews`)
          ),
          createElement("p", { class: "text-gray-800 text-sm font-semibold tracking-wider" }, formatPrice(product.price))
        ),
      ],
      class: "snap-always snap-center",
    })
  );

  const productContainer = createElement(
    "div",
    {
      class: "product-list grid grid-cols-2 grid-rows-2 gap-4 md:flex md:flex-row md:snap-x md:snap-mandatory custom-scrollbar h-full",
    },
    ...productCards
  );

  const showMoreButton = Button(
    {
      id: "show-more",
      class: "block md:hidden mt-6 bg-black text-white px-8 py-3 flex items-center justify-center text-sm font-semibold rounded-full w-full",
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
