import { render } from "./utils.js";
import { ProductList } from "./components/ProductList.js";

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  if (app) {
    render(ProductList(), app);
  }
});
