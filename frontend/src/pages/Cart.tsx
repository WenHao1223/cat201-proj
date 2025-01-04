import React, { useEffect } from "react";
import {
    CheckIcon,
    ClockIcon,
    QuestionMarkCircleIcon,
    XMarkIcon,
} from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";

import {
    CartGeneralInterface,
    UserGeneralDetailsInterface,
} from "@interfaces/API/UserInterface";
import Navbar from "@components/Navbar";

import handleApiCall from "@utils/handleApiCall";

import AsyncImage from "@components/AsyncImage";
import Swal from "sweetalert2";

interface CartProps {
    carts: CartGeneralInterface[] | null;
    setCarts: React.Dispatch<
        React.SetStateAction<CartGeneralInterface[] | null>
    >;
    currentUserGeneralDetails: UserGeneralDetailsInterface;
    setCurrentUserGeneralDetails: React.Dispatch<
        React.SetStateAction<UserGeneralDetailsInterface | null>
    >;
    isLogin: boolean;
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const Cart: React.FC<CartProps> = ({
    carts,
    setCarts,
    currentUserGeneralDetails,
    setCurrentUserGeneralDetails,
    isLogin,
    setIsLogin,
}) => {
    const [subtotal, setSubtotal] = React.useState(0);
    const [error, setError] = React.useState("");

    const navigate = useNavigate();
    if (!isLogin) {
        navigate("/login");
    }

    useEffect(() => {
        if (currentUserGeneralDetails) {
            viewCart();
        }
    }, [currentUserGeneralDetails]);

    const viewCart = async () => {
        await handleApiCall(
            `users/cart?email=${currentUserGeneralDetails!.email}`,
            "GET",
            null,
            async (result) => {
                console.log(result);
                if ((await result.status) == "Success") {
                    console.log("result.carts", result.carts);
                    setCarts(
                        result.carts.map((cart: string) => JSON.parse(cart))
                    );
                } else {
                    setError("\n Error viewing cart: " + result.message);
                }
            },
            (error) => setError("\n Error viewing cart: " + error)
        );
    };

    const updateCart = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const productID = event.target.id.split("-")[1];
        const quantity = parseInt(event.target.value);
        const sizeIndex = carts!.find(
            (cart) => cart.productID === productID
        )!.sizeIndex;
        const colorIndex = carts!.find(
            (cart) => cart.productID === productID
        )!.colorIndex;

        await handleApiCall(
            "users/cart/update",
            "PUT",
            {
                email: currentUserGeneralDetails!.email,
                productID: productID,
                quantity: quantity,
                sizeIndex: sizeIndex,
                colorIndex: colorIndex,
            },
            async (result) => {
                console.log(result);
                if ((await result.status) == "Success") {
                    console.log("result.carts", result.carts);
                    setCarts(
                        result.carts.map((cart: string) => JSON.parse(cart))
                    );
                    Swal.fire({
                        icon: "success",
                        title: "Cart updated",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                } else {
                    setError("\n Error updating cart: " + result.message);
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Error updating cart - " + result.message,
                    });
                }
            },
            (error) => {
                setError("\n Error updating cart: " + error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Error updating cart - " + error,
                });
            }
        );
    };

    return (
        <div className="bg-white">
            <Navbar
                isLogin={isLogin}
                setIsLogin={setIsLogin}
                setCurrentUserGeneralDetails={setCurrentUserGeneralDetails}
            />
            <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="relative top-12">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Shopping Cart
                    </h1>
                    <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                        <section
                            aria-labelledby="cart-heading"
                            className="lg:col-span-7"
                        >
                            <h2 id="cart-heading" className="sr-only">
                                Items in your shopping cart
                            </h2>

                            <ul
                                role="list"
                                className="divide-y divide-gray-200 border-b border-t border-gray-200"
                            >
                                {carts ? (
                                    carts.map((product) => (
                                        <li
                                            key={product.productID}
                                            className="flex py-6 sm:py-10"
                                        >
                                            <div className="flex-shrink-0">
                                                <AsyncImage
                                                    alt={product.name}
                                                    productID={
                                                        product.productID
                                                    }
                                                    color={product.color}
                                                    number={0}
                                                    className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                                                />
                                            </div>

                                            <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                                <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                                    <div>
                                                        <div className="flex justify-between">
                                                            <h3 className="text-sm">
                                                                <Link
                                                                    className="font-medium text-gray-700 hover:text-gray-800 hover:underline"
                                                                    to={`/carts/${product.productID}`}
                                                                >
                                                                    {
                                                                        product.name
                                                                    }
                                                                </Link>
                                                            </h3>
                                                        </div>
                                                        <div className="mt-1 flex text-sm">
                                                            {product.color ? (
                                                                <p className="text-gray-500">
                                                                    {
                                                                        product.color
                                                                    }
                                                                </p>
                                                            ) : null}
                                                            {product.size ? (
                                                                <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
                                                                    {
                                                                        product.size
                                                                    }
                                                                </p>
                                                            ) : null}
                                                        </div>
                                                        <p className="mt-1 text-sm font-medium text-gray-900">
                                                            {product.price}
                                                        </p>
                                                    </div>

                                                    <div className="mt-4 sm:mt-0 sm:pr-9">
                                                        <label
                                                            htmlFor={`quantity-${product.productID}`}
                                                            className="sr-only"
                                                        >
                                                            Quantity,{" "}
                                                            {product.name}
                                                        </label>
                                                        <select
                                                            id={`quantity-${product.productID}`}
                                                            name={`quantity-${product.productID}`}
                                                            defaultValue={
                                                                product.quantity
                                                            }
                                                            className="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-300 sm:text-sm"
                                                            onChange={
                                                                updateCart
                                                            }
                                                        >
                                                            <option value={1}>
                                                                1
                                                            </option>
                                                            <option value={2}>
                                                                2
                                                            </option>
                                                            <option value={3}>
                                                                3
                                                            </option>
                                                            <option value={4}>
                                                                4
                                                            </option>
                                                            <option value={5}>
                                                                5
                                                            </option>
                                                            <option value={6}>
                                                                6
                                                            </option>
                                                            <option value={7}>
                                                                7
                                                            </option>
                                                            <option value={8}>
                                                                8
                                                            </option>
                                                        </select>

                                                        <div className="absolute right-0 top-0">
                                                            <button
                                                                type="button"
                                                                className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                                                            >
                                                                <span className="sr-only">
                                                                    Remove
                                                                </span>
                                                                <XMarkIcon
                                                                    aria-hidden="true"
                                                                    className="h-5 w-5"
                                                                />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                ) : error ? (
                                    <div>
                                        <p className="text-red-500 p-4">
                                            {error}
                                        </p>
                                    </div>
                                ) : (
                                    <div>
                                        <p className="p-4">No items in cart</p>
                                    </div>
                                )}
                            </ul>
                        </section>

                        {/* Order summary */}
                        <section
                            aria-labelledby="summary-heading"
                            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
                        >
                            <h2
                                id="summary-heading"
                                className="text-lg font-medium text-gray-900"
                            >
                                Order summary
                            </h2>

                            <dl className="mt-6 space-y-4">
                                <div className="flex items-center justify-between">
                                    <dt className="text-sm text-gray-600">
                                        Subtotal
                                    </dt>
                                    <dd className="text-sm font-medium text-gray-900">
                                        RM {subtotal.toFixed(2)}
                                    </dd>
                                </div>
                                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                    <dt className="flex items-center text-sm text-gray-600">
                                        <span>Shipping estimate</span>
                                        <a
                                            href="#"
                                            className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                                        >
                                            <span className="sr-only">
                                                Learn more about how shipping is
                                                calculated
                                            </span>
                                            <QuestionMarkCircleIcon
                                                aria-hidden="true"
                                                className="h-5 w-5"
                                            />
                                        </a>
                                    </dt>
                                    <dd className="text-sm font-medium text-gray-900">
                                        RM 5.00
                                    </dd>
                                </div>
                                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                    <dt className="flex text-sm text-gray-600">
                                        <span>Tax estimate</span>
                                        <a
                                            href="#"
                                            className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                                        >
                                            <span className="sr-only">
                                                Learn more about how tax is
                                                calculated
                                            </span>
                                            <QuestionMarkCircleIcon
                                                aria-hidden="true"
                                                className="h-5 w-5"
                                            />
                                        </a>
                                    </dt>
                                    <dd className="text-sm font-medium text-gray-900">
                                        RM 8.32
                                    </dd>
                                </div>
                                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                    <dt className="text-base font-medium text-gray-900">
                                        Order total
                                    </dt>
                                    <dd className="text-base font-medium text-gray-900">
                                        RM 112.32
                                    </dd>
                                </div>
                            </dl>

                            <div className="mt-6">
                                <button
                                    type="submit"
                                    className="w-full rounded-md border border-transparent bg-indigo-500 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                                >
                                    Checkout
                                </button>
                            </div>
                        </section>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Cart;
