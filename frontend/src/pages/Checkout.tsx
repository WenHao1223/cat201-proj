import React from "react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { useNavigate } from "react-router-dom";

import { UserGeneralDetailsInterface } from "@interfaces/API/UserInterface";
import Navbar from "@components/Navbar";

import image1 from "../assets/image1.webp";
import image2 from "../assets/image2.webp";
import image3 from "../assets/image3.webp";

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
    imageSrc: image3,
    imageAlt: "Insulated bottle with white base and black snap lid.",
  },
];

interface CheckoutProps {
  currentUserGeneralDetails: UserGeneralDetailsInterface | null;
  isLogin: boolean;
}

const Checkout: React.FC<CheckoutProps> = ({
  currentUserGeneralDetails,
  isLogin,
}) => {
  const navigate = useNavigate();
  if (!isLogin) {
    navigate("/login");
  }

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
                  {products.map((product) => (
                    <li
                      key={product.id}
                      className="flex items-start space-x-4 py-6"
                    >
                      <img
                        alt={product.imageAlt}
                        src={product.imageSrc}
                        className="h-20 w-20 flex-none rounded-md object-cover object-center"
                      />
                      <div className="flex-auto space-y-1">
                        <h3>{product.name}</h3>
                        <p className="text-gray-500">{product.color}</p>
                        <p className="text-gray-500">{product.size}</p>
                      </div>
                      <p className="flex-none text-base font-medium">
                        {product.price}
                      </p>
                    </li>
                  ))}
                </ul>

                <dl className="hidden space-y-6 border-t border-gray-200 pt-6 text-base font-medium text-gray-700 lg:block">
                  <div className="flex items-center justify-between">
                    <dt className="text-gray-600">Subtotal</dt>
                    <dd>$320.00</dd>
                  </div>

                  <div className="flex items-center justify-between">
                    <dt className="text-gray-600">Shipping</dt>
                    <dd>$15.00</dd>
                  </div>

                  <div className="flex items-center justify-between">
                    <dt className="text-gray-600">Taxes</dt>
                    <dd>$26.80</dd>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                    <dt className="text-base">Total</dt>
                    <dd className="text-base">$361.80</dd>
                  </div>
                </dl>

                <Popover className="fixed inset-x-0 bottom-0 flex flex-col-reverse text-base font-medium text-gray-700 lg:hidden">
                  <div className="relative z-10 border-t border-gray-200 bg-white px-4 sm:px-6">
                    <div className="mx-auto max-w-lg">
                      <PopoverButton className="flex w-full items-center py-6 font-medium">
                        <span className="mr-auto text-base">Total</span>
                        <span className="mr-2 text-base">$361.80</span>
                        <ChevronUpIcon
                          aria-hidden="true"
                          className="h-5 w-5 text-gray-500"
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
                        <dt className="text-gray-600">Subtotal</dt>
                        <dd>$320.00</dd>
                      </div>

                      <div className="flex items-center justify-between">
                        <dt className="text-gray-600">Shipping</dt>
                        <dd>$15.00</dd>
                      </div>

                      <div className="flex items-center justify-between">
                        <dt className="text-gray-600">Taxes</dt>
                        <dd>$26.80</dd>
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
                        className="block w-full rounded-lg border border-gray-300 focus:ring-2 sm:text-base px-4 py-3 font-serif shadow-md"
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
                        className="block w-full rounded-lg border border-gray-300 focus:ring-2 sm:text-base px-4 py-3 font-serif shadow-md"
                      />
                    </div>
                  </div>
                </section>

                <section aria-labelledby="payment-heading" className="mt-10">
                  <h2
                    id="payment-heading"
                    className="text-xl font-medium text-gray-900"
                  >
                    Payment details
                  </h2>

                  <div className="mt-6 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4">
                    <div className="col-span-3 sm:col-span-4">
                      <label
                        htmlFor="name-on-card"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name on card
                      </label>
                      <div className="mt-2">
                        <input
                          id="name-on-card"
                          name="name-on-card"
                          type="text"
                          autoComplete="cc-name"
                          className="block w-full rounded-lg border border-gray-300 focus:ring-2 sm:text-base px-4 py-3 font-serif shadow-md"
                        />
                      </div>
                    </div>

                    <div className="col-span-3 sm:col-span-4">
                      <label
                        htmlFor="card-number"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Card number
                      </label>
                      <div className="mt-2">
                        <input
                          id="card-number"
                          name="card-number"
                          type="text"
                          autoComplete="cc-number"
                          className="block w-full rounded-lg border border-gray-300 focus:ring-2 sm:text-base px-4 py-3 font-serif shadow-md"
                        />
                      </div>
                    </div>

                    <div className="col-span-2 sm:col-span-3">
                      <label
                        htmlFor="expiration-date"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Expiration date (MM/YY)
                      </label>
                      <div className="mt-2">
                        <input
                          id="expiration-date"
                          name="expiration-date"
                          type="text"
                          autoComplete="cc-exp"
                          className="block w-full rounded-lg border border-gray-300 focus:ring-2 sm:text-base px-4 py-3 font-serif shadow-md"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="cvc"
                        className="block text-sm font-medium text-gray-700"
                      >
                        CVC
                      </label>
                      <div className="mt-2">
                        <input
                          id="cvc"
                          name="cvc"
                          type="text"
                          autoComplete="csc"
                          className="block w-full rounded-lg border border-gray-300 focus:ring-2 sm:text-base px-4 py-3 font-serif shadow-md"
                        />
                      </div>
                    </div>
                  </div>
                </section>

                <section aria-labelledby="shipping-heading" className="mt-10">
                  <h2
                    id="shipping-heading"
                    className="text-xl font-medium text-gray-900"
                  >
                    Shipping address
                  </h2>

                  <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Company
                      </label>
                      <div className="mt-2">
                        <input
                          id="company"
                          name="company"
                          type="text"
                          className="block w-full rounded-lg border border-gray-300 focus:ring-2 sm:text-base px-4 py-3 font-serif shadow-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Address
                      </label>
                      <div className="mt-2">
                        <input
                          id="address"
                          name="address"
                          type="text"
                          autoComplete="street-address"
                          className="block w-full rounded-lg border border-gray-300 focus:ring-2 sm:text-base px-4 py-3 font-serif shadow-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="apartment"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Apartment, suite, etc.
                      </label>
                      <div className="mt-2">
                        <input
                          id="apartment"
                          name="apartment"
                          type="text"
                          className="block w-full rounded-lg border border-gray-300 focus:ring-2 sm:text-base px-4 py-3 font-serif shadow-md"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          id="city"
                          name="city"
                          type="text"
                          autoComplete="address-level2"
                          className="block w-full rounded-lg border border-gray-300 focus:ring-2 sm:text-base px-4 py-3 font-serif shadow-md"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="region"
                        className="block text-sm font-medium text-gray-700"
                      >
                        State / Province
                      </label>
                      <div className="mt-2">
                        <input
                          id="region"
                          name="region"
                          type="text"
                          autoComplete="address-level1"
                          className="block w-full rounded-lg border border-gray-300 focus:ring-2 sm:text-base px-4 py-3 font-serif shadow-md"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="postal-code"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          id="postal-code"
                          name="postal-code"
                          type="text"
                          autoComplete="postal-code"
                          className="block w-full rounded-lg border border-gray-300 focus:ring-2 sm:text-base px-4 py-3 font-serif shadow-md"
                        />
                      </div>
                    </div>
                  </div>
                </section>

                <section aria-labelledby="billing-heading" className="mt-10">
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
                      className="h-5 w-5 rounded-lg border border-gray-300"
                    />
                    <label
                      htmlFor="same-as-shipping"
                      className="ml-3 text-sm font-medium text-gray-900 cursor-pointer"
                    >
                      Same as shipping information
                    </label>
                  </div>
                </section>
                <div className="mt-10 border-t border-gray-200 pt-6 sm:flex sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    className="w-full rounded-md border border-transparent text-white shadow-sm focus:ring-offset-gray-50 sm:order-last sm:ml-6 sm:w-auto hover:bg-black hover:shadow-lg"
                  >
                    Continue
                  </button>
                  <p className="mt-4 text-center text-sm text-gray-500 sm:mt-0 sm:text-left">
                    You won't be charged until the next step.
                  </p>
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
