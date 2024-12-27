export interface User {
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
    paymentDetails?: Payment[];
    carts?: Cart[];
    orders?: Order[];
}

export interface Payment {
    paymentID: number;
    paymentMethod: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
}

export interface Cart {
    productID: string;
    quantity: number;
    sizeIndex: number;
    colorIndex: number;
}

export interface Order {
    orderID: number;
    shippingAddress: string;
    billingAddress: string;
    paymentID: number;
    orderDate: string;
    orderStatus: string;
    cartProducts?: Cart[];
}
