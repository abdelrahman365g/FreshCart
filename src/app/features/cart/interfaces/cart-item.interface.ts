import { Product } from "../../../core/interfaces/product.interface";

export interface CartItem {
  product: Product;
  count: number;
}
