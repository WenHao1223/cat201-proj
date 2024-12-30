import React from "react";
import { ProductInterface } from "@interfaces/API/ProductInterface";

interface ProductsServletProps {
    products: ProductInterface[];
}

const ProductsServlet: React.FC<ProductsServletProps> = ({ products }) => {
    return (
        <div>
            <h2>Product Data</h2>
            {products.map((product) => (
                <div
                    key={product.productID}
                    style={{
                        border: "1px solid #ccc",
                        margin: "10px",
                        padding: "10px",
                    }}
                >
                    <h2>{product.name}</h2>
                    <p>Product ID: {product.productID}</p>
                    <p>Description: {product.description}</p>
                    <p>Price: ${product.price}</p>
                    <p>Category: {product.category}</p>
                    <p>Brand: {product.brand}</p>
                    <h3>Sizes</h3>
                    <ul>
                        {product.sizes.map((size: string, index: any) => (
                            <li key={index}>{size}</li>
                        ))}
                    </ul>
                    <h3>Colors</h3>
                    <ul>
                        {product.colors.map((color: string, index: any) => (
                            <li key={index}>{color}</li>
                        ))}
                    </ul>
                    <h3>Quantities</h3>
                    <ul>
                        {product.quantities.map(
                            (quantity: number[], index: any) => (
                                <li key={index}>
                                    {quantity.map((q, i) => (
                                        <span key={i}>{q} </span>
                                    ))}
                                </li>
                            )
                        )}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default ProductsServlet;
