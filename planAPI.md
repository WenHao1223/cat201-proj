# API Plan

## Login
### Validate users' email and password
#### /api/users/login
#### UsersLoginServlet.java
after clicking login button
- parse email, password
- return true if successfully validated info;
- return maps {username, email, nationality, firstName, lastName, phoneNo, gender, dob}
- return err if wrong credentials; server disconnected
- frontend needs to handle cases where email or password is missing or malformed
- rate-limiting to prevent brute-force attacks

## Register
### Create account
#### /api/users/create
#### UsersCreateServlet.java
- parse username, email, password, nationality, firstName, lastname, phoneNo, gender, dob, agreeToTerms
- return true if account is created
- return err if server is disconnected; missing information; wrong format; existing username; existing email
- frontend needs to validate all fields for correct format and completeness
- frontend needs to double confirm password
- hash password before storing

## Profile
### View all shipping addresses
#### /api/users/shippingAddresses
#### UsersShippingAddressesServlet.java
after user clicking the Shipping Address option
- parse email(from sys)
- return list [shipping address]
- return null if shipping address is empty
- return err if session expired; server disconnected
- frontend needs to handle cases where the user does not have any shipping addresses
### View all billing addresses
#### /api/users/billingAddresses
#### UsersBillingAddressesServlet.java
after user clicking the Billing Address option
- parse email(from sys)
- return list [billing address]
- return null if billing address is empty
- return err if session expired; server disconnected
- frontend needs to handle cases where the user does not have any billing addresses
### View all payment details
#### /api/users/paymentDetails
#### UsersPaymentDetailsServlet.java
after user clicking the Payment Details option
- parse email(from sys)
- return list [maps {payment id, payment method, card number (last 4 digits if payment method is credit_card / debit_card)}]
- return null if payment detail is empty
- return err if session expired; server disconnected
- frontend needs to handle cases where the user does not have any payment details
### Edit profile
username, nationality, firstName, lastName, phoneNo, gender, dob
- parse email (from sys), fieldToEdit, newData
- return true if profile is updated
- return err if session expired; server disconnected; user not found
- validate the new data for correct format
### Change password
- parse email (from sys), old password, new password
- return true if old password is validated, new password update
- return err msg if password is wrong, user not found
- return err if session expired; server disconnected;
### Add new shipping address
- parse email (from sys), new shipping address
- return true if shipping address is added
- return err if session expired; server disconnected; user not found
### Update shipping address
- parse email (from sys), index of shipping address, new shipping address
- return true if shipping address is updated
- return err if session expired; server disconnected; user not found, index out of range
### Remove shipping address
- parse email (from sys), index of shipping address,
- return true if shipping address is removed
- return err if session expired; server disconnected; user not found, index out of range
### Add new billing address
- parse email (from sys), new billing address
- return true if shipping address is added
- return err if session expired; server disconnected; user not found
### Update billing address
- parse email (from sys), index of shipping address, new billing address
- return true if shipping address is updated
- return err if session expired; server disconnected; user not found, index out of range
### Remove billing address
- parse email (from sys), index of billing address
- return true if shipping address is removed
- return err if session expired; server disconnected; user not found, index out of range
### Add new payment details
- parse paymentMethod, cardNumber, expiryDate, cvv
- return true if payment details are added
- return err if session expired; server disconnected; user not found
- mask sensitive information like card numbers
### Remove payment details
- parse email (from sys), paymentID
- return true if payment details are removed
- return err if paymentID is not found; session expired; server disconnected; user not found

## Home
### View all products
- return list [maps {productID, name, desccripton, price, category, brand}]
- return null if no product is found
- return err if server disconnected

## Product Details
### View specific product
after clicking specific product from homepage

if possible should update quantity in real time
- parse productID (from sys)
- return maps {productID, name, desccripton, price, category, brand, list [sizes], list [colors], list [quantities]}
- return null if no products are found
- return err if product is not found; server disconnected
- frontend should able to handle if no products are found
### Add product to cart
- parse userID (from sys), productID (from sys), quantity, size index, color index
- return true if item is added to cart
- return err if user is not found; product is not found; insufficient quantity; index out of range; server disconnected

## Cart
Can do a save button in Cart page
### Remove product from cart
- parse userID (from sys), productID (from sys), size index, color index
- return true if item is removed from cart
- return err if user is not found; product is not found; index out of range; server disconnected
### Update quantity
- parse userID (from sys), productID (from sys), quantity, size index, color index
- return true if quantity is updated
- return err if user is not found; product is not found; insufficient quantity, index out of range; server disconnected

## Payment
### Add cart items to order
- parse userID (from sys), shippingAddress, billingAddress, paymentID
- return true if items are added to order
- return err if user is not found; incorrect format; index out of range; shipping / billing address not found; payment id not found; session expired; server disconnected
### Cancel order
- parse userID (from sys), orderID
- return true if order is cancelled
- return err if user is not found; order is not found; session expired; server disconnected