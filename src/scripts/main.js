import { ProductSection } from "./sections/ProductSection.js";
import { render } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  if (app) {
    render(ProductSection(), app);
  }
});
