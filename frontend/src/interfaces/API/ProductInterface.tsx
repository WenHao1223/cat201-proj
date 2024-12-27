// ProductInterface.tsx

export interface Product {
    productID: string;
    name: string;
    description: string;
    price: number;
    category: string;
    brand: string;
    sizes: string[];
    colors: string[];
    quantities: number[][];
}
