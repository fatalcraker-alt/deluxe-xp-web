export type Uso = "día" | "noche" | "día/noche";
export type Genero = "hombre" | "mujer" | "unisex";
export type Categoria = "diseñador" | "árabe";

export interface Decant {
  id: string;
  nombre: string;
  marca: string;
  uso: Uso;
  genero: Genero;
  categoria: Categoria;
  precio5ml: number;
  precio10ml: number;
}

export interface Completo {
  id: string;
  nombre: string;
  marca: string;
  uso: Uso;
  genero: Genero;
  categoria: Categoria;
  ml: number;
  precio: number;
}

export interface ProductDetail {
  descripcion: string;
  notasTop: string[];
  notasCorazon: string[];
  notasFondo: string[];
  temporada: string[];
  intensidad: string;
}
