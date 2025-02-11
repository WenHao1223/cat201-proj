import React from "react";
import { ProductInterface } from "@interfaces/API/ProductInterface";

interface ProductsServletProps {
    product: ProductInterface;
}

const ProductsServlet: React.FC<ProductsServletProps> = ({ product }) => {
    return (
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
                {product.sizes.map((size, index) => (
                    <li key={index}>{size}</li>
                ))}
            </ul>
            <h3>Colors</h3>
            <ul>
                {product.colors.map((color, index) => (
                    <li key={index}>{color}</li>
                ))}
            </ul>
            <h3>Quantities</h3>
            <ul>
                {product.quantities.map((quantity, index) => (
                    <li key={index}>
                        {quantity.map((q, i) => (
                            <span key={i}>{q} </span>
                        ))}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductsServlet;
