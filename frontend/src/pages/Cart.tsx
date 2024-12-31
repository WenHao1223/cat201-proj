import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ShoppingCart = () => {
    const navigate = useNavigate();
    const [quantities, setQuantities] = useState([1, 1, 1]);
    const [shippingCost, setShippingCost] = useState(5.0);

    const continueShopping = () => {
        navigate(-1);
    };

    const incrementQuantity = (index: number, event: React.MouseEvent) => {
        event.preventDefault();
        const newQuantities = [...quantities];
        newQuantities[index]++;
        setQuantities(newQuantities);
    };

    const decrementQuantity = (index: number, event: React.MouseEvent) => {
        event.preventDefault();
        const newQuantities = [...quantities];
        if (newQuantities[index] > 1) {
            newQuantities[index]--;
        }
        setQuantities(newQuantities);
    };

    const handleQuantityChange = (
        index: number,
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newQuantities = [...quantities];
        const value = parseInt(event.target.value, 10);
        if (!isNaN(value) && value > 0) {
            newQuantities[index] = value;
            setQuantities(newQuantities);
        }
    };

    const handleShippingChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const selectedOption = event.target.value;
        let cost = 5.0;
        if (selectedOption === "Express-Delivery - RM10.00") {
            cost = 10.0;
        } else if (selectedOption === "Self-Collect - RM0.00") {
            cost = 0.0;
        }
        setShippingCost(cost);
    };

    const totalItems = quantities.reduce((a, b) => a + b, 0);
    const totalPrice = totalItems * 44.0 + shippingCost;

    return (
        <div
            style={{
                background: "#ddd",
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "sans-serif",
                fontSize: "0.8rem",
                fontWeight: "bold",
                margin: 0,
                padding: 0,
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    height: "100%",
                    boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    borderRadius: "0",
                    background: "#fff",
                }}
            >
                <div
                    style={{
                        flex: "2",
                        padding: "2rem",
                        borderRight: "1px solid #ddd",
                        overflowY: "auto",
                    }}
                >
                    <div style={{ marginBottom: "2rem" }}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <h4 style={{ fontSize: "1.5rem" }}>
                                <b>Shopping Cart</b>
                            </h4>
                        </div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            borderBottom: "1px solid #ddd",
                            paddingBottom: "1rem",
                            marginBottom: "1rem",
                        }}
                    >
                        <div style={{ flex: "0 0 20%" }}>Products</div>
                        <div style={{ flex: "1", textAlign: "center" }}>
                            Quantity
                        </div>
                        <div style={{ flex: "1", textAlign: "right" }}>
                            Price
                        </div>
                    </div>
                    {quantities.map((quantity, i) => (
                        <div
                            key={i}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                borderTop: i > 0 ? "1px solid #ddd" : "none",
                                borderBottom: "1px solid #ddd",
                                padding: "1rem 0",
                            }}
                        >
                            <div style={{ flex: "0 0 20%" }}>
                                <img
                                    src={`https://i.imgur.com/${
                                        ["1GrakTl", "ba3tvGm", "pHQ3xT3"][i]
                                    }.jpg`}
                                    alt="product"
                                    style={{ width: "100%" }}
                                />
                            </div>
                            <div style={{ flex: "1", paddingLeft: "1rem" }}>
                                <div style={{ color: "#888" }}>Shirt</div>
                                <div>Cotton T-shirt</div>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    border: "1px solid #ccc",
                                    borderRadius: "1px",
                                    width: "130px",
                                    overflow: "hidden",
                                }}
                            >
                                <button
                                    style={{
                                        border: "none",
                                        backgroundColor: "#f8f8f8",
                                        cursor: "pointer",
                                        fontSize: "18px",
                                        width: "40px",
                                        height: "40px",
                                        display: "flex",
                                        margin: "0 5px",
                                        justifyContent: "center", 
                                        borderRadius: "0", // Make the button square
                                        transition:
                                            "background-color 0.3s, transform 0.3s",
                                        outline: "none", // Remove the default focus outline
                                    }}
                                    onMouseEnter={(e) =>
                                        (e.currentTarget.style.backgroundColor =
                                            "#e0e0e0")
                                    }
                                    onMouseLeave={(e) =>
                                        (e.currentTarget.style.backgroundColor =
                                            "#f0f0f0")
                                    }
                                    onMouseDown={(e) =>
                                        (e.currentTarget.style.transform =
                                            "scale(0.95)")
                                    }
                                    onMouseUp={(e) =>
                                        (e.currentTarget.style.transform =
                                            "scale(1)")
                                    }
                                    onClick={(e) => decrementQuantity(i, e)}
                                >
                                    -
                                </button>
                                <input
                                    value={quantity}
                                    onChange={(e) => handleQuantityChange(i, e)}
                                    style={{
                                        borderLeft: "1px solid #ccc",
                                        borderRight: "1px solid #ccc",
                                        width: "40px",
                                        textAlign: "center",
                                        padding: "10px 0",
                                        fontSize: "18px",
                                        fontFamily: "display",
                                        border: "none",
                                        appearance: "textfield",
                                        justifyContent: "center",
                                    }}
                                />
                                <button
                                    style={{
                                        border: "none",
                                        backgroundColor: "#f8f8f8",
                                        cursor: "pointer",
                                        fontSize: "18px",
                                        width: "40px",
                                        height: "40px",
                                        display: "flex",
                                        justifyContent: "center",
                                        margin: "0 5px",
                                        borderRadius: "0", // Make the button square
                                        transition:
                                            "background-color 0.3s, transform 0.3s",
                                        outline: "none", // Remove the default focus outline
                                    }}
                                    onMouseEnter={(e) =>
                                        (e.currentTarget.style.backgroundColor =
                                            "#e0e0e0")
                                    }
                                    onMouseLeave={(e) =>
                                        (e.currentTarget.style.backgroundColor =
                                            "#f0f0f0")
                                    }
                                    onMouseDown={(e) =>
                                        (e.currentTarget.style.transform =
                                            "scale(0.95)")
                                    }
                                    onMouseUp={(e) =>
                                        (e.currentTarget.style.transform =
                                            "scale(1)")
                                    }
                                    onClick={(e) => incrementQuantity(i, e)}
                                >
                                    +
                                </button>
                            </div>
                            <div style={{ flex: "1", textAlign: "right" , fontSize: "1.2rem"}}>
                                RM 44.00{" "}
                                <span
                                    style={{ color: "#888", cursor: "pointer" }}
                                >
                                    &#10005; Remove
                                </span>
                            </div>
                        </div>
                    ))}
                    <div style={{ marginTop: "2rem" }}>
                        <a
                            href="#"
                            style={{ textDecoration: "none", color: "black" }}
                            onClick={continueShopping}
                        >
                            &larr;{" "}
                            <span style={{ color: "#888" }}>
                                Continue shopping
                            </span>
                        </a>
                    </div>
                </div>
                <div
                    style={{
                        flex: "1",
                        backgroundColor: "#f6f6f6",
                        padding: "2rem",
                        color: "#414141",
                        overflowY: "auto",
                    }}
                >
                    <h4 style={{ fontSize: "1.5rem" }}>
                        <b>ORDER SUMMARY</b>
                    </h4>
                    <hr style={{ margin: "1.5rem 0" }} />
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            margin: "1rem 0",
                        }}
                    >
                        <div>TOTAL ITEMS: {totalItems}</div>
                        <div>&euro; {totalItems * 44.0}</div>
                    </div>
                    <form style={{ padding: "1rem 0" }}>
                        <p>SHIPPING</p>
                        <select
                            onChange={handleShippingChange}
                            style={{
                                border: "1px solid rgba(0, 0, 0, 0.137)",
                                padding: "1rem",
                                marginBottom: "2rem",
                                outline: "none",
                                width: "100%",
                                backgroundColor: "rgb(247, 247, 247)",
                            }}
                        >
                            <option>Standard-Delivery - RM5.00</option>
                            <option>Express-Delivery - RM10.00</option>
                            <option>Self-Collect - RM0.00</option>
                        </select>
                        <p>DISCOUNT</p>
                        <input
                            placeholder="Enter your discount code"
                            style={{
                                border: "1px solid rgba(0, 0, 0, 0.137)",
                                padding: "1rem",
                                marginBottom: "2rem",
                                outline: "none",
                                width: "100%",
                                backgroundColor: "rgb(247, 247, 247)",
                            }}
                        />
                    </form>
                    <div
                        style={{
                            borderTop: "1px solid rgba(0, 0, 0, 0.1)",
                            padding: "1rem 0",
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <div>TOTAL PRICE</div>
                        <div>&euro; {totalPrice}</div>
                    </div>
                    <button
                        style={{
                            backgroundColor: "#000",
                            color: "#fff",
                            width: "100%",
                            fontSize: "1rem",
                            marginTop: "2rem",
                            padding: "0.8rem",
                            borderRadius: "0.5rem",
                            border: "none",
                            cursor: "pointer",
                        }}
                    >
                        PROCEED TO CHECKOUT
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;
