// product.model.ts
export interface Product {
  id: number;
  name: string;
  price: string;     // Matches public string Price in C#
  color: string;
  available: string;
  image: string;
  category: string;// Matches public string Category in C#
  company:string; 
  stock:number; 
}