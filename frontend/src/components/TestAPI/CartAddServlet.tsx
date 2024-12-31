import react from "react";

import { CartGeneralInterface } from "@interfaces/API/UserInterface";

interface CartAddServletProps {
    carts: CartGeneralInterface[];
    addToCartStatus: boolean;
}

const CartAddServlet: React.FC<CartAddServletProps> = ({
    carts,
    addToCartStatus,
}) => {
    return (
        <div>
            <div>
                <h2>Add to Cart</h2>
                <h3>Added Product</h3>
                <div
                    style={{
                        border: "1px solid #ccc",
                        padding: "10px",
                        margin: "10px 10px 20px",
                    }}
                >
                    <p>Product ID: {carts[0].productID}</p>
                    <p>Quantity: {carts[0].quantity}</p>
                    <p>Size: {carts[0].size}</p>
                    <p>Color: {carts[0].color}</p>
                </div>
                <hr />
                <p>
                    Add to cart status:{" "}
                    {addToCartStatus ? "Success" : "Failure"}
                </p>
            </div>
            <h1>Cart</h1>
            {carts.map((cart, index) => (
                <div
                    key={index}
                    style={{
                        border: "1px solid #ccc",
                        padding: "10px",
                        margin: "10px",
                    }}
                >
                    <h3>{cart.name}</h3>
                    <p>Price: {cart.price}</p>
                    <p>Category: {cart.category}</p>
                    <p>Brand: {cart.brand}</p>
                    <p>Quantity: {cart.quantity}</p>
                    <p>Size: {cart.size}</p>
                    <p>Color: {cart.color}</p>
                </div>
            ))}
        </div>
    );
};

export default CartAddServlet;
