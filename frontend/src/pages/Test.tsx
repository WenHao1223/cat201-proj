import React, { useState } from "react";

import image1 from "../assets/image1.webp";
import image2 from "../assets/image2.webp";
import image3 from "../assets/image3.webp";

const Product = () => {
    const [product] = useState({
        productID: "PM001",
        name: "KitchenAid ® 3.5-Cup Food Chopper",
        description: "Compact and convenient for everyday use, this two-speed food chopper in chic matte black chops and purees with one-touch operation. With a three-cup capacity and wet-ingredient opening on the lid, it's easy to whip up cheese dips, hummus, salsa and lots more.",
        price: 99.99,
        category: "Food Processor and Mixer",
        brand: "Kitchen Aid",
        sizes: ["10 inch"],
        colors: ["Matte Black", "Metallic Chrome"],
        quantities: [20, 15],
        images: [image1, image2, image3],
    });

    const [selectedImage, setSelectedImage] = useState(product.images[0]);

    return (
        <div className="product-page">
            <style>
                {`
          .product-page {
            font-family: Arial, sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 40px;
            align-items: center;
          }

          @media (min-width: 768px) {
            .product-page {
              flex-direction: row;
              align-items: flex-start;
            }
          }

          .image-gallery {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: 100%;
          }

          .main-image {
            width: 100%;
            height: auto;
            border-radius: 8px;
            border: 1px solid #ddd;
          }

          .thumbnail-container {
            display: flex;
            gap: 10px;
            justify-content: center;
          }

          .thumbnail {
            width: 80px;
            height: 80px;
            cursor: pointer;
            border-radius: 4px;
            border: 1px solid #ddd;
          }

          .thumbnail.selected {
            border: 2px solid #007bff;
          }

          .product-details {
            flex: 2;
            display: flex;
            flex-direction: column;
            gap: 20px;
            width: 100%;
          }

          .product-name {
            font-size: 28px;
            margin: 0;
            text-align: center;
          }

          .product-description {
            font-size: 16px;
            line-height: 1.6;
            color: #555;
            text-align: center;
          }

          .product-price {
            font-size: 22px;
            font-weight: bold;
            color: #333;
            text-align: center;
          }

          .product-id,
          .product-category,
          .product-brand,
          .product-sizes,
          .product-colors,
          .product-quantities {
            font-size: 16px;
            color: #333;
            text-align: center;
          }

          .add-to-cart-button {
            background-color: #007bff;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            align-self: center;
          }

          .add-to-cart-button:hover {
            background-color: #0056b3;
          }

          @media (min-width: 768px) {
            .product-name,
            .product-description,
            .product-price,
            .product-id,
            .product-category,
            .product-brand,
            .product-sizes,
            .product-colors,
            .product-quantities {
              text-align: left;
            }

            .add-to-cart-button {
              align-self: flex-start;
            }
          }
        `}
            </style>
            <div className="image-gallery">
                <img
                    src={selectedImage}
                    alt="Selected"
                    className="main-image"
                />
                <div className="thumbnail-container">
                    {product.images.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`Thumbnail ${index + 1}`}
                            className={`thumbnail ${
                                selectedImage === img ? "selected" : ""
                            }`}
                            onClick={() => setSelectedImage(img)}
                        />
                    ))}
                </div>
            </div>
            <div className="product-details">
                <h1 className="product-name">{product.name}</h1>
                <p className="product-description">{product.description}</p>
                <p className="product-price">${product.price.toFixed(2)}</p>
                <p className="product-id"><strong>Product ID:</strong> {product.productID}</p>
                <p className="product-category"><strong>Category:</strong> {product.category}</p>
                <p className="product-brand"><strong>Brand:</strong> {product.brand}</p>
                <p className="product-sizes"><strong>Sizes:</strong> {product.sizes.join(", ")}</p>
                <p className="product-colors"><strong>Colors:</strong> {product.colors.join(", ")}</p>
                <p className="product-quantities"><strong>Quantities:</strong> {product.quantities.join(", ")}</p>
                <button className="add-to-cart-button">Add to Cart</button>
            </div>
        </div>
    );
};

export default Product;
