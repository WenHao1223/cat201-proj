import react from "react";

import {
    CartGeneralInterface,
    CartInterface,
} from "@interfaces/API/UserInterface";

interface CartUpdateServletProps {
    carts: CartGeneralInterface[];
    updateCartInfo: CartInterface;
    updateCartStatus: boolean;
}

const CartUpdateServlet: React.FC<CartUpdateServletProps> = ({
    carts,
    updateCartInfo,
    updateCartStatus,
}) => {
    return (
        <div>
            <div>
                <h2>Update Quantity of Item in Cart</h2>
                <h3>Updated Product</h3>
                <div
                    style={{
                        border: "1px solid #ccc",
                        padding: "10px",
                        margin: "10px 10px 20px",
                    }}
                >
                    <p>Product ID: {updateCartInfo.productID}</p>
                    <p>Add : {updateCartInfo.quantity}</p>
                    <p>Size: {updateCartInfo.sizeIndex}</p>
                    <p>Size: {updateCartInfo.colorIndex}</p>
                </div>
                <hr />
                <p>
                    Add to cart status:{" "}
                    {updateCartStatus ? "Success" : "Failure"}
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
                    <p>Size Index: {cart.sizeIndex}</p>
                    <p>Color Index: {cart.colorIndex}</p>
                    <p>Size: {cart.size}</p>
                    <p>Color: {cart.color}</p>
                </div>
            ))}
        </div>
    );
};

export default CartUpdateServlet;
