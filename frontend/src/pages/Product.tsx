import React, { useState } from "react";
import image1 from "../assets/image1.webp";
import image2 from "../assets/image2.webp";
import image3 from "../assets/image3.webp";

const Product = () => {
    const [product] = useState({
        productID: "PM001",
        name: "KitchenAid ® 3.5-Cup Food Chopper",
        description:
            "Compact and convenient for everyday use, this two-speed food chopper in chic matte black chops and purees with one-touch operation. With a three-cup capacity and wet-ingredient opening on the lid, it's easy to whip up cheese dips, hummus, salsa and lots more.",
        price: 99.99,
        category: "Food Processor and Mixer",
        brand: "Kitchen Aid",
        sizes: ["10 inch"],
        colors: ["Matte Black", "Metallic Chrome"],
        quantities: [20, 15],
        images: [image1, image2, image3],
    });

    const [selectedImage, setSelectedImage] = useState(product.images[0]);
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        if (!selectedColor || !selectedSize) {
            alert("Please select a colour and size before adding to cart.");
            return;
        }
        alert(`Added ${quantity} item(s) of ${product.name} to the cart.`);
    };

    const getMaxQuantity = () => {
        const colorIndex = product.colors.indexOf(selectedColor);
        return colorIndex !== -1 ? product.quantities[colorIndex] : 1;
    };

    return (
        <div className="product-page">
            <style>
                {`
          .product-page {
            font-family: 'Helvetica Neue', sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 40px;
            color: #333;
          }

          @media (min-width: 768px) {
            .product-page {
              flex-direction: row;
              gap: 60px;
            }
          }

          .image-gallery {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 20px;
          }

          .main-image {
            width: 100%;
            border-radius: 8px;
            border: 1px solid #ddd;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
            object-fit: cover;
            transition: border-color 0.3s;
          }

          .thumbnail.selected {
            border: 2px solid #007bff;
          }

          .thumbnail:hover {
            border-color: #007bff;
          }

          .product-details {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 20px;
          }

          .product-name {
            font-size: 32px;
            margin: 0;
            font-weight: 600;
          }

          .product-description {
            font-size: 18px;
            line-height: 1.6;
            color: #555;
          }

          .product-price {
            font-size: 26px;
            font-weight: bold;
            color: #333;
          }

          .product-id,
          .product-category,
          .product-brand {
            font-size: 16px;
            color: #777;
          }

          .selectors {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
          }

          .selector {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .selector label {
            font-weight: bold;
          }

          select, input[type="number"] {
            padding: 10px;
            border-radius: 4px;
            border: 1px solid #ddd;
            width: 100%;
            max-width: 200px;
            font-size: 16px;
          }

          .add-to-cart-button {
            background-color: #007bff;
            color: white;
            border: none;
            padding: 14px 24px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 18px;
            margin-top: 20px;
            align-self: start;
            transition: background-color 0.3s;
          }

          .add-to-cart-button:hover {
            background-color: #0056b3;
          }
        `}
            </style>
            <div className="image-gallery">
                <img src={selectedImage} alt="Selected" className="main-image" />
                <div className="thumbnail-container">
                    {product.images.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`Thumbnail ${index + 1}`}
                            className={`thumbnail ${selectedImage === img ? "selected" : ""}`}
                            onClick={() => setSelectedImage(img)}
                        />
                    ))}
                </div>
            </div>
            <div className="product-details">
                <h1 className="product-name">{product.name}</h1>
                <p className="product-description">{product.description}</p>
                <p className="product-price">RM{product.price.toFixed(2)}</p>
                <p className="product-id"><strong>Product ID:</strong> {product.productID}</p>
                <p className="product-category"><strong>Category:</strong> {product.category}</p>
                <p className="product-brand"><strong>Brand:</strong> {product.brand}</p>
                <div className="selectors">
                    <div className="selector">
                        <label htmlFor="color">Colour:</label>
                        <select
                            id="color"
                            value={selectedColor}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedColor(e.target.value)}
                        >
                            <option value="">Select Colour</option>
                            {product.colors.map((color, index) => (
                                <option key={index} value={color}>
                                    {color}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="selector">
                        <label htmlFor="size">Size:</label>
                        <select
                            id="size"
                            value={selectedSize}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedSize(e.target.value)}
                        >
                            <option value="">Select Size</option>
                            {product.sizes.map((size, index) => (
                                <option key={index} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="selector">
                        <label htmlFor="quantity">Quantity:</label>
                        <input
                            type="number"
                            id="quantity"
                            min="1"
                            max={getMaxQuantity()}
                            value={quantity}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuantity(Number(e.target.value))}
                        />
                    </div>
                </div>
                <button className="add-to-cart-button" onClick={handleAddToCart}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default Product;
