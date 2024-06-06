import { Categoria } from "./categoria";

export interface Prodotto {
    id: number;
    title: string;
    description: string;
    price: number;
    stars: number;
    images: string;
    idCategory: number;
    category: Categoria;
  }