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

export interface OrderInterface {
    orderID: number;
    shippingAddress: string;
    billingAddress: string;
    paymentID: number;
    orderDate: string;
    orderStatus: string;
    cartProducts?: CartInterface[];
}
