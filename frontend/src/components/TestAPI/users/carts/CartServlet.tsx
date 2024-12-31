import react from "react";

import { CartGeneralInterface } from "@interfaces/API/UserInterface";

interface CartServletProps {
    carts: CartGeneralInterface[];
}

const CartServlet: React.FC<CartServletProps> = ({ carts }) => {
    return (
        <div>
            <h2>Cart</h2>
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

export default CartServlet;
