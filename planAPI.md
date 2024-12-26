# API Plan

## Login
### Validate users' email and password
after clicking login button
- parse email, password
- return true if successfully validated info; 
- return err if wrong credentials; server disconnected

## Register
### Create account
- parse username, email, password, nationality, firstName, lastname, phoneNo, dob, agreeToTerms
- return true if account is created
- return err if server is disconnected; missing information; wrong format; existing username

## Profile
### Fetch user's account
- parse email(from sys)
- return maps {username, email, nationality, firstName, lastName, phoneNo, gender, dob}
- return err if user is not found; session expired; server disconnected
### View all shipping addresses
after user clicking the Shipping Address option
- parse email(from sys)
- return list [shipping address]
- return null if shipping address is empty
- return err if session expired; server disconnected
### View all billing addresses
after user clicking the Billing Address option
- parse email(from sys)
- return list [billing address]
- return null if billing address is empty
- return err if session expired; server disconnected
### View all payment details
after user clicking the Payment Details option
- parse email(from sys)
- return list [maps {payment id, payment method, card number (last 4 digits if payment method is credit_card / debit_card)}]
- return null if payment detail is empty
- return err if session expired; server disconnected
### Edit profile
username, nationality, firstName, lastName, phoneNo, gender, dob
- parse email (from sys), fieldToEdit, newData
- return true if profile is updated
- return err if session expired; server disconnected; user not found
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
### Remove payment details
- parse email (from sys), paymentID
- return true if payment details are removed
- return err if session expired; server disconnected; user not found

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
- return err if product is not found; server disconnected
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
- get time, cartProducts