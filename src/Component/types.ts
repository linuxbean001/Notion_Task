export interface ProductVariant {
  label: string;
  color: string;
  sku: string;
  price: number;
  reducedPrice?: number;
  thumbnail: string;
  image: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  vendor: string;
  tags?: string[];
  variants: ProductVariant[];
}
