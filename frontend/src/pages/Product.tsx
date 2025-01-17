import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import handleApiCall from "@utils/handleApiCall";
import { ProductInterface } from "@interfaces/API/ProductInterface";
import Swal from "sweetalert2";
import {
    CartGeneralInterface,
    UserGeneralDetailsInterface,
} from "@interfaces/API/UserInterface";
import Navbar from "@components/Navbar";
import "@styles/Product.css";

interface ProductProps {
    currentUserGeneralDetails: UserGeneralDetailsInterface | null;
    isLogin: boolean;
    carts: CartGeneralInterface[] | null;
    setCarts: React.Dispatch<
        React.SetStateAction<CartGeneralInterface[] | null>
    >;
    isAdmin: boolean;
}

const Product: React.FC<ProductProps> = ({
    currentUserGeneralDetails,
    isLogin,
    carts,
    setCarts,
    isAdmin,
}) => {
    const { productID } = useParams<{ productID: string }>();
    const [specificProduct, setSpecificProduct] =
        useState<ProductInterface | null>(null);
    const [error, setError] = useState("");
    const [images, setImages] = useState<string[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);

    const navigate = useNavigate();

    useEffect(() => {
        viewSpecificProductMethod(productID!);
    }, []);

    const viewSpecificProductMethod = async (productID: string) => {
        await handleApiCall(
            `products/${productID}`,
            "GET",
            null,
            async (result) => {
                setSpecificProduct(result);
            },
            (error) => {
                setError("\n Error viewing specific product: " + error);
                Swal.fire({
                    title: "Error!",
                    text: "Error viewing specific product: " + error,
                    icon: "error",
                    confirmButtonText: "OK",
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate("/main");
                    }
                });
            }
        );
    };

    useEffect(() => {
        if (!specificProduct) return;

        const loadImages = async () => {
            const loadedImages: string[] = [];
            for (let i = 0; i < specificProduct.colors.length; i++) {
                const color = specificProduct.colors[i]
                    .toLowerCase()
                    .replace(" ", "");
                let j = 0;
                let imageLoaded = true;
                while (imageLoaded) {
                    try {
                        const image = await import(
                            `@assets/images/${productID}/${color}-${j}.webp`
                        );
                        loadedImages.push(image.default);
                        j++;
                    } catch (error) {
                        imageLoaded = false;
                    }
                }
            }
            setImages(loadedImages);
            if (loadedImages.length > 0) {
                setSelectedImage(loadedImages[0]);
            }
        };

        loadImages();
    }, [specificProduct, productID]);

    const handleAddToCart = () => {
        if (!selectedColor || !selectedSize) {
            Swal.fire({
                title: "Error!",
                text: "Please select a colour and size.",
                icon: "error",
                confirmButtonText: "OK",
            });
            return;
        }
        if (!isLogin) {
            Swal.fire({
                title: "Error!",
                text: "Please login to add to cart.",
                icon: "error",
                confirmButtonText: "OK",
            });
            return;
        }
        addToCart(
            productID!,
            quantity,
            specificProduct!.sizes.indexOf(selectedSize),
            specificProduct!.colors.indexOf(selectedColor)
        );
        Swal.fire({
            title: "Success!",
            text: "Added to cart successfully.",
            icon: "success",
            confirmButtonText: "OK",
        });
    };

    const getMaxQuantity = () => {
        const sizeIndex = specificProduct!.sizes.indexOf(selectedSize);
        const colorIndex = specificProduct!.colors.indexOf(selectedColor);
        return sizeIndex !== -1 && colorIndex !== -1
            ? specificProduct!.quantities[sizeIndex][colorIndex]
            : 1;
    };

    const addToCart = async (
        productID: string,
        quantity: number,
        sizeIndex: number,
        colorIndex: number
    ) => {
        await handleApiCall(
            `users/cart/add`,
            "POST",
            {
                email: currentUserGeneralDetails!.email,
                productID,
                quantity,
                sizeIndex,
                colorIndex,
            },
            async (result) => {
                if ((await result.status) == "Success") {
                    setCarts(
                        result.carts.map((cart: string) => JSON.parse(cart))
                    );
                } else {
                    setError("\n Error adding to cart: " + result.message);
                }
            },
            (error) => setError("\n Error adding to cart: " + error)
        );
    };

    return (
        specificProduct && (
            <div className="bg-white">
                <Navbar
                    isLogin={isLogin}
                    setIsLogin={() => {}}
                    setCurrentUserGeneralDetails={() => {}}
                    isAdmin={isAdmin}
                    carts={carts}
                />
                <div className="product-page relative top-24 bg-white">
                    <div className="image-gallery">
                        <img
                            src={selectedImage || images[0]}
                            alt="Product Image"
                            className="main-image"
                        />
                        <div className="thumbnail-container overflow-x-auto">
                            {images.map((img, index) => (
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
                        <h1 className="product-name">
                            {specificProduct!.name}
                        </h1>
                        <p className="product-description">
                            {specificProduct!.description}
                        </p>
                        <p className="product-price">
                            RM{specificProduct!.price.toFixed(2)}
                        </p>
                        <p className="product-id">
                            <strong>Product ID:</strong> {productID}
                        </p>
                        <p className="product-category">
                            <strong>Category:</strong>{" "}
                            {specificProduct!.category}
                        </p>
                        <p className="product-brand">
                            <strong>Brand:</strong> {specificProduct!.brand}
                        </p>
                        <div className="selectors">
                            <div className="selector">
                                <label htmlFor="color">Colour:</label>
                                <select
                                    id="color"
                                    value={selectedColor}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLSelectElement>
                                    ) => setSelectedColor(e.target.value)}
                                >
                                    <option value="">Select Colour</option>
                                    {specificProduct!.colors.map(
                                        (color, index) => (
                                            <option key={index} value={color}>
                                                {color}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>
                            <div className="selector">
                                <label htmlFor="size">Size:</label>
                                <select
                                    id="size"
                                    value={selectedSize}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLSelectElement>
                                    ) => setSelectedSize(e.target.value)}
                                >
                                    <option value="">Select Size</option>
                                    {specificProduct!.sizes.map(
                                        (size, index) => (
                                            <option key={index} value={size}>
                                                {size}
                                            </option>
                                        )
                                    )}
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
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => setQuantity(Number(e.target.value))}
                                />
                            </div>
                        </div>
                        {!isAdmin && (
                            <button
                                className="add-to-cart-button"
                                onClick={handleAddToCart}
                            >
                                Add to Cart
                            </button>
                        )}
                    </div>
                </div>
            </div>
        )
    );
};

export default Product;
