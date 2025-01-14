import React, { useEffect, useState } from "react";
import { ChevronRightIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import {
    Popover,
    PopoverBackdrop,
    PopoverButton,
    PopoverPanel,
} from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import {
    CartGeneralInterface,
    PaymentGeneralInterface,
    UserGeneralDetailsInterface,
} from "@interfaces/API/UserInterface";
import Navbar from "@components/Navbar";

import image1 from "../assets/image1.webp";
import image2 from "../assets/image2.webp";
import image3 from "../assets/image3.webp";
import handleApiCall from "@utils/handleApiCall";
import AsyncImage from "@components/AsyncImage";

const products = [
    {
        id: 1,
        name: "KitchenAid ® Go ™ Cordless Hand Blender with Battery",
        href: "#",
        price: "RM 69.99",
        color: "Black",
        inStock: true,
        size: "15 inch",
        imageSrc: image1,
        imageAlt: "Front of men's Basic Tee in sienna.",
    },
    {
        id: 2,
        name: "KitchenAid ® Go ™ Cordless Personal Blender 16-Oz",
        href: "#",
        price: "RM 89.99",
        color: "Black",
        inStock: false,
        leadTime: "3–4 weeks",
        size: "12 inch",
        imageSrc: image2,
        imageAlt: "Front of men's Basic Tee in black.",
    },
    {
        id: 3,
        name: "KitchenAid ® Steel Blender",
        href: "#",
        price: "RM 129.99",
        color: "Steel Blue",
        inStock: true,
        size: "15.8 inch",
        imageSrc: image3,
        imageAlt: "Insulated bottle with white base and black snap lid.",
    },
];

interface CheckoutProps {
    currentUserGeneralDetails: UserGeneralDetailsInterface | null;
    isLogin: boolean;
    carts: CartGeneralInterface[] | null;
}

const Checkout: React.FC<CheckoutProps> = ({
    currentUserGeneralDetails,
    isLogin,
    carts,
}) => {
    const [subtotal, setSubtotal] = React.useState(0);
    const [shippingTotal, setShippingTotal] = React.useState(0);
    const [taxTotal, setTaxTotal] = React.useState(0);

    const [currentUserPaymentDetails, setCurrentUserPaymentDetails] = useState<
        PaymentGeneralInterface[]
    >([]);
    const [currentUserShippingAddresses, setCurrentUserShippingAddresses] =
        useState<string[]>([]);
    const [currentUserBillingAddresses, setCurrentUserBillingAddresses] =
        useState<string[]>([]);

    const [selectedShippingAddress, setSelectedShippingAddress] = useState("");
    const [newShippingAddress, setNewShippingAddress] = useState("");
    const [selectedBillingAddress, setSelectedBillingAddress] = useState("");
    const [newBillingAddress, setNewBillingAddress] = useState("");
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
    const [newPaymentMethod, setNewPaymentMethod] = useState({
        paymentMethod: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
    });

    const [error, setError] = React.useState("");

    const navigate = useNavigate();
    useEffect(() => {
        if (!isLogin) {
            navigate("/login");
        } else {
            viewCurrentUserPaymentDetailsMethod();
            viewCurrentUserShippingAddressesMethod();
            viewCurrentUserBillingAddressesMethod();
        }
    }, [isLogin]);

    useEffect(() => {
        if (carts) {
            let subtotal = 0;
            carts.forEach((cart) => {
                subtotal += cart.price * cart.quantity;
            });
            setSubtotal(subtotal);
            if (subtotal < 150) {
                setShippingTotal(5);
            }
            setTaxTotal(subtotal * 0.06);
        }
    }, [carts]);

    const [isSameAsShipping, setIsSameAsShipping] = useState(false);

    const handleCheckboxChange = () => {
        setIsSameAsShipping(!isSameAsShipping);
    };

    const viewCurrentUserPaymentDetailsMethod = async () => {
        await handleApiCall(
            `users/paymentDetails?email=${currentUserGeneralDetails?.email}`,
            "GET",
            null,
            async (result) => {
                if ((await result.status) === "Success") {
                    const paymentDetailsArray = result.paymentDetails.map(
                        (paymentDetail: string) => JSON.parse(paymentDetail)
                    );
                    console.log(paymentDetailsArray);
                    setCurrentUserPaymentDetails(paymentDetailsArray);
                } else {
                    setError(
                        "\n Error viewing payment details: " + result.message
                    );
                }
            },
            (error) => setError("\n Error viewing payment details: " + error)
        );
    };

    const viewCurrentUserShippingAddressesMethod = async () => {
        await handleApiCall(
            `users/shippingAddresses?email=${currentUserGeneralDetails?.email}`,
            "GET",
            null,
            async (result) => {
                if ((await result.status) === "Success") {
                    setCurrentUserShippingAddresses(
                        JSON.parse(result.shippingAddresses)
                    );
                } else {
                    setError(
                        "\n Error viewing shipping addresses: " + result.message
                    );
                }
            },
            (error) => setError("\n Error viewing shipping addresses: " + error)
        );
    };

    const viewCurrentUserBillingAddressesMethod = async () => {
        await handleApiCall(
            `users/billingAddresses?email=${currentUserGeneralDetails?.email}`,
            "GET",
            null,
            async (result) => {
                if ((await result.status) === "Success") {
                    setCurrentUserBillingAddresses(
                        JSON.parse(result.billingAddresses)
                    );
                } else {
                    setError(
                        "\n Error viewing billing addresses: " + result.message
                    );
                }
            },
            (error) => setError("\n Error viewing billing addresses: " + error)
        );
    };

    const handleCheckout = () => {
        if (
            (!selectedShippingAddress && !newShippingAddress) ||
            (!selectedBillingAddress && !newBillingAddress) ||
            (!selectedPaymentMethod && !newPaymentMethod.cardNumber)
        ) {
            Swal.fire("Error", "Please select all required fields.", "error");
            return;
        }

        // Implement checkout functionality here
        Swal.fire("Success", "Checkout successful!", "success");
    };

    return (
        <div className="bg-white">
            <Navbar
                isLogin={isLogin}
                setIsLogin={() => {}}
                setCurrentUserGeneralDetails={() => {}}
            />
            <div className="mx-auto max-w-2xl px-4 pb-24 pt-12 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="relative top-12">
                    {/* Background color split screen for large screens */}
                    <div
                        aria-hidden="true"
                        className="fixed left-0 top-0 hidden h-full w-1/2 bg-white lg:block"
                    />
                    <div
                        aria-hidden="true"
                        className="fixed right-0 top-0 hidden h-full w-1/2 bg-gray-50 lg:block"
                    />

                    <main className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 xl:gap-x-48">
                        <h1 className="sr-only">Order information</h1>

                        <section
                            aria-labelledby="summary-heading"
                            className="bg-gray-50 px-4 pb-10 pt-5 sm:px-6 lg:col-start-2 lg:row-start-1 lg:bg-transparent lg:px-0 lg:pb-16"
                        >
                            <div className="mx-auto max-w-lg lg:max-w-none">
                                <h2
                                    id="summary-heading"
                                    className="text-xl font-medium text-gray-900"
                                >
                                    Order summary
                                </h2>

                                <ul
                                    role="list"
                                    className="divide-y divide-gray-200 text-base font-medium text-gray-700"
                                >
                                    {carts &&
                                        carts.map((product) => (
                                            <li
                                                key={product.productID}
                                                className="flex items-start space-x-4 py-6"
                                            >
                                                <AsyncImage
                                                    alt={product.name}
                                                    productID={
                                                        product.productID
                                                    }
                                                    color={product.color}
                                                    number={0}
                                                    className="h-20 w-20 flex-none rounded-md object-cover object-center"
                                                />
                                                <div className="flex-auto space-y-1">
                                                    <h3>{product.name}</h3>
                                                    <p className="text-gray-500">
                                                        {product.color}
                                                    </p>
                                                    <p className="text-gray-500">
                                                        {product.size}
                                                    </p>
                                                </div>
                                                <p className="flex-none text-base font-medium">
                                                    {product.price}
                                                </p>
                                            </li>
                                        ))}
                                </ul>

                                <dl className="hidden space-y-6 border-t border-gray-200 pt-6 text-base font-medium text-gray-700 lg:block">
                                    <div className="flex items-center justify-between">
                                        <dt className="text-gray-600">
                                            Subtotal
                                        </dt>
                                        <dd>RM {subtotal.toFixed(2)}</dd>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <dt className="text-gray-600">
                                            Shipping
                                        </dt>
                                        <dd>RM {shippingTotal.toFixed(2)}</dd>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <dt className="text-gray-600">Tax</dt>
                                        <dd>RM {taxTotal.toFixed(2)}</dd>
                                    </div>

                                    <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                                        <dt className="text-base">Total</dt>
                                        <dd className="text-base">
                                            RM{" "}
                                            {(
                                                subtotal +
                                                shippingTotal +
                                                taxTotal
                                            ).toFixed(2)}
                                        </dd>
                                    </div>

                                    <div className="mt-10 border-t border-gray-200 pt-6 sm:flex sm:items-center sm:justify-between">
                                        <button
                                            type="submit"
                                            className="w-full rounded-lg border border-transparent bg-gray-800 text-white shadow-sm focus:ring-offset-gray-50 sm:order-last m:w-auto hover:bg-black hover:shadow-md px-4 py-3"
                                            onClick={handleCheckout}
                                        >
                                            Proceed to Payment
                                        </button>
                                    </div>
                                </dl>

                                <Popover className="fixed inset-x-0 bottom-0 flex flex-col-reverse text-base font-medium text-gray-200 lg:hidden">
                                    <div className="relative z-10 border-t border-gray-200 bg-white px-4 sm:px-6">
                                        <div className="mx-auto max-w-lg">
                                            <PopoverButton className="flex w-full items-center py-6 bg-gray-900 font-medium">
                                                <span className="mr-auto text-base">
                                                    Total
                                                </span>
                                                <span className="mr-3 text-base">
                                                    $361.80
                                                </span>
                                                <ChevronUpIcon
                                                    aria-hidden="true"
                                                    className="h-5 w-7 text-gray-200"
                                                />
                                            </PopoverButton>
                                        </div>
                                    </div>

                                    <PopoverBackdrop
                                        transition
                                        className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                                    />

                                    <PopoverPanel
                                        transition
                                        className="relative transform bg-white px-4 py-6 transition duration-300 ease-in-out data-[closed]:translate-y-full sm:px-6"
                                    >
                                        <dl className="mx-auto max-w-lg space-y-6">
                                            <div className="flex items-center justify-between">
                                                <dt className="text-gray-600">
                                                    Subtotal
                                                </dt>
                                                <dd className="text-gray-700">
                                                    $320.00
                                                </dd>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <dt className="text-gray-600">
                                                    Shipping
                                                </dt>
                                                <dd className="text-gray-700">
                                                    $15.00
                                                </dd>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <dt className="text-gray-600">
                                                    Taxes
                                                </dt>
                                                <dd className="text-gray-700">
                                                    $26.80
                                                </dd>
                                            </div>
                                        </dl>
                                    </PopoverPanel>
                                </Popover>
                            </div>
                        </section>

                        <form className="px-4 pb-36 pt-5 sm:px-6 lg:col-start-1 lg:row-start-1 lg:px-0 lg:pb-16">
                            <div className="mx-auto max-w-lg lg:max-w-none">
                                <section aria-labelledby="contact-info-heading">
                                    <h2
                                        id="contact-info-heading"
                                        className="text-xl font-medium text-gray-900"
                                    >
                                        Contact information
                                    </h2>

                                    <div className="mt-6">
                                        <label
                                            htmlFor="email-address"
                                            className="block text-base font-medium text-gray-700"
                                        >
                                            Email address
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="email-address"
                                                name="email-address"
                                                type="email"
                                                autoComplete="email"
                                                defaultValue={
                                                    currentUserGeneralDetails?.email
                                                }
                                                className="block w-full rounded-lg border border-gray-300 focus:ring-2 sm:text-base px-4 py-3 shadow-md"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <label
                                            htmlFor="contact-number"
                                            className="block text-base font-medium text-gray-700"
                                        >
                                            Contact number
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="contact-number"
                                                name="contact-number"
                                                type="tel"
                                                autoComplete="tel"
                                                defaultValue={
                                                    currentUserGeneralDetails?.phoneNo
                                                }
                                                className="block w-full rounded-lg border border-gray-300 focus:ring-2 sm:text-base px-4 py-3 shadow-md"
                                            />
                                        </div>
                                    </div>
                                </section>

                                <section
                                    aria-labelledby="payment-heading"
                                    className="mt-10"
                                >
                                    <h2
                                        id="payment-heading"
                                        className="text-xl font-medium text-gray-900"
                                    >
                                        Payment details
                                    </h2>

                                    <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
                                        <div className="sm:col-span-3">
                                            <label
                                                htmlFor="payment-method"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Payment Method
                                            </label>
                                            <div className="mt-2">
                                                <select
                                                    id="payment-method"
                                                    name="payment-method"
                                                    value={
                                                        selectedPaymentMethod
                                                    }
                                                    onChange={(e) =>
                                                        setSelectedPaymentMethod(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block w-full rounded-lg border border-gray-300 focus:ring-2 sm:text-base px-4 py-3 shadow-md"
                                                >
                                                    <option value="">
                                                        Select Payment Method
                                                    </option>
                                                    {currentUserPaymentDetails.map(
                                                        (method, index) => (
                                                            <option
                                                                key={index}
                                                                value={
                                                                    method.paymentID
                                                                }
                                                            >
                                                                {
                                                                    method.paymentMethod
                                                                }{" "}
                                                                -{" "}
                                                                {
                                                                    method.cardNumber
                                                                }
                                                            </option>
                                                        )
                                                    )}
                                                    <option value="new">
                                                        New Payment Method
                                                    </option>
                                                </select>
                                            </div>
                                            {selectedPaymentMethod ===
                                                "new" && (
                                                <div className="mt-2 space-y-4">
                                                    <select
                                                        id="new-payment-method"
                                                        name="new-payment-method"
                                                        value={
                                                            newPaymentMethod.paymentMethod
                                                        }
                                                        onChange={(e) =>
                                                            setNewPaymentMethod(
                                                                {
                                                                    ...newPaymentMethod,
                                                                    paymentMethod:
                                                                        e.target
                                                                            .value,
                                                                }
                                                            )
                                                        }
                                                        className="block w-full rounded-lg border border-gray-300 focus:ring-2 sm:text-base px-4 py-3 shadow-md"
                                                    >
                                                        <option value="">
                                                            Select Payment
                                                            Method
                                                        </option>
                                                        <option value="debit_card">
                                                            Debit Card
                                                        </option>
                                                        <option value="credit_card">
                                                            Credit Card
                                                        </option>
                                                        <option value="paypal">
                                                            PayPal
                                                        </option>
                                                        <option value="visa">
                                                            Visa
                                                        </option>
                                                    </select>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter card number"
                                                        value={
                                                            newPaymentMethod.cardNumber
                                                        }
                                                        onChange={(e) =>
                                                            setNewPaymentMethod(
                                                                {
                                                                    ...newPaymentMethod,
                                                                    cardNumber:
                                                                        e.target
                                                                            .value,
                                                                }
                                                            )
                                                        }
                                                        className="block w-full rounded-lg border border-gray-300 focus:ring-2 sm:text-base px-4 py-3 shadow-md"
                                                    />
                                                    {(newPaymentMethod.paymentMethod ===
                                                        "debit_card" ||
                                                        newPaymentMethod.paymentMethod ===
                                                            "credit_card") && (
                                                        <div className="flex space-x-4">
                                                            <input
                                                                type="text"
                                                                placeholder="Expiry date (MM/YY)"
                                                                value={
                                                                    newPaymentMethod.expiryDate
                                                                }
                                                                onChange={(e) =>
                                                                    setNewPaymentMethod(
                                                                        {
                                                                            ...newPaymentMethod,
                                                                            expiryDate:
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                        }
                                                                    )
                                                                }
                                                                className="block w-50 rounded-lg border border-gray-300 focus:ring-2 sm:text-base px-4 py-3 shadow-md"
                                                            />
                                                            <input
                                                                type="text"
                                                                placeholder="CVV (3 digits)"
                                                                value={
                                                                    newPaymentMethod.cvv
                                                                }
                                                                onChange={(e) =>
                                                                    setNewPaymentMethod(
                                                                        {
                                                                            ...newPaymentMethod,
                                                                            cvv: e
                                                                                .target
                                                                                .value,
                                                                        }
                                                                    )
                                                                }
                                                                className="block w-50 rounded-lg border border-gray-300 focus:ring-2 sm:text-base px-4 py-3 shadow-md"
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </section>

                                <section
                                    aria-labelledby="shipping-heading"
                                    className="mt-10"
                                >
                                    <h2
                                        id="shipping-heading"
                                        className="text-xl font-medium text-gray-900"
                                    >
                                        Shipping address
                                    </h2>
                                    <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
                                        <div className="sm:col-span-3">
                                            <label
                                                htmlFor="shipping-address"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Shipping Address
                                            </label>
                                            <div className="mt-2">
                                                <select
                                                    id="shipping-address"
                                                    name="shipping-address"
                                                    value={
                                                        selectedShippingAddress
                                                    }
                                                    onChange={(e) =>
                                                        setSelectedShippingAddress(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block w-full rounded-lg border border-gray-300 focus:ring-2 sm:text-base px-4 py-3 shadow-md"
                                                >
                                                    <option value="">
                                                        Select Shipping Address
                                                    </option>
                                                    {currentUserShippingAddresses.map(
                                                        (address, index) => (
                                                            <option
                                                                key={index}
                                                                value={address}
                                                            >
                                                                {address}
                                                            </option>
                                                        )
                                                    )}
                                                    <option value="new">
                                                        New Address
                                                    </option>
                                                </select>
                                            </div>
                                            {selectedShippingAddress ===
                                                "new" && (
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        placeholder="Enter new shipping address"
                                                        value={
                                                            newShippingAddress
                                                        }
                                                        onChange={(e) =>
                                                            setNewShippingAddress(
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block w-full rounded-lg border border-gray-300 focus:ring-2 sm:text-base px-4 py-3 shadow-md"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </section>

                                <section
                                    aria-labelledby="billing-heading"
                                    className="mt-10"
                                >
                                    <h2
                                        id="billing-heading"
                                        className="text-xl font-medium text-gray-900"
                                    >
                                        Billing information
                                    </h2>

                                    <div className="mt-6 flex items-center">
                                        <input
                                            id="same-as-shipping"
                                            name="same-as-shipping"
                                            type="checkbox"
                                            className="h-5 w-5 rounded-md border border-gray-300"
                                            checked={isSameAsShipping}
                                            onChange={handleCheckboxChange}
                                        />
                                        <label
                                            htmlFor="same-as-shipping"
                                            className="ml-2 text-sm font-medium text-gray-900 cursor-pointer"
                                        >
                                            Same as shipping address
                                        </label>
                                    </div>
                                </section>
                                {!isSameAsShipping && (
                                    <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
                                        <div className="sm:col-span-3">
                                            <label
                                                htmlFor="billing-address"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Billing Address
                                            </label>
                                            <div className="mt-2">
                                                <select
                                                    id="billing-address"
                                                    name="billing-address"
                                                    value={
                                                        selectedBillingAddress
                                                    }
                                                    onChange={(e) =>
                                                        setSelectedBillingAddress(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block w-full rounded-lg border border-gray-300 focus:ring-2 sm:text-base px-4 py-3 shadow-md"
                                                >
                                                    <option value="">
                                                        Select Billing Address
                                                    </option>
                                                    {currentUserBillingAddresses.map(
                                                        (address, index) => (
                                                            <option
                                                                key={index}
                                                                value={address}
                                                            >
                                                                {address}
                                                            </option>
                                                        )
                                                    )}
                                                    <option value="new">
                                                        New Address
                                                    </option>
                                                </select>
                                            </div>
                                            {selectedBillingAddress ===
                                                "new" && (
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        placeholder="Enter new billing address"
                                                        value={
                                                            newBillingAddress
                                                        }
                                                        onChange={(e) =>
                                                            setNewBillingAddress(
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block w-full rounded-lg border border-gray-300 focus:ring-2 sm:text-base px-4 py-3 shadow-md"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                                <div className="mt-10 border-t border-gray-200 pt-6 sm:flex sm:items-center sm:justify-between lg:hidden">
                                    <button
                                        type="submit"
                                        className="w-full rounded-lg border border-gray-300 bg-gray-900 px-4 py-3 text-white shadow-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 sm:order-last sm:w-auto"
                                        onClick={handleCheckout}
                                    >
                                        Proceed to Payment
                                    </button>
                                </div>
                            </div>
                        </form>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
