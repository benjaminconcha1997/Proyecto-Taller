import { products } from "../data/products.js";

export async function getProducts() {
  return Promise.resolve(products);
}