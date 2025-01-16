// UserInterface.tsx

export interface UserInterface {
    username: string;
    email: string;
    password: string;
    nationality: string;
    firstName: string;
    lastName: string;
    phoneNo: string;
    gender: number;
    dob: string;
    role?: string;
    agreeToTerms: boolean;
    shippingAddresses?: string[];
    billingAddresses?: string[];
    paymentDetails?: PaymentInterface[];
    carts?: CartInterface[];
    orders?: OrderInterface[];
}

export interface UserGeneralDetailsInterface {
    username: string;
    email: string;
    nationality: string;
    firstName: string;
    lastName: string;
    phoneNo: string;
    gender: number;
    role: string;
    dob: string;
}

export interface PaymentInterface {
    paymentID?: number;
    paymentMethod: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
}

export interface PaymentGeneralInterface {
    paymentID: number;
    paymentMethod: string;
    cardNumber: string;
}

export interface CartInterface {
    productID: string;
    quantity: number;
    sizeIndex: number;
    colorIndex: number;
}

export interface CartGeneralInterface {
    productID: string;
    name: string;
    price: number;
    category: string;
    brand: string;
    quantity: number;
    sizeIndex: number;
    colorIndex: number;
    size: string;
    color: string;
}

export interface OrderInterface {
    email?: string;
    orderID: number;
    shippingAddress: string;
    billingAddress: string;
    payment: PaymentGeneralInterface;
    paymentID?: number;
    orderDate: string;
    orderStatus: string;
    cartProducts: CartGeneralInterface[];
    orderTotal: number;
}

export interface PlaceOrderInterface {
    shippingAddress: string;
    billingAddress: string;
    paymentID: number;
}