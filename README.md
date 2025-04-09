# 🧶 Cozy Threads

Cozy Threads is a demo e-commerce application I created while exploring payment integrations. Inspired by the Stripe's payment, I wanted to create a simple but well-structured shopping experience for a fictional direct-to-consumer brand that sells high-quality, ethically-sourced apparel and accessories.

## ✨ Overview

Cozy Threads offers a smooth shopping and checkout experience featuring:

- 🛍️ A product catalog displaying cozy apparel
- 🛒 A shopping cart with item selection and quantity tracking
- 💳 A Stripe-powered checkout flow for secure payment collection
- ✅ A confirmation screen after successful purchase

The application is fully responsive and styled with a warm color palette that reflects the cozy, relaxing vibe of the brand.

## 🔧 Tech Stack

- **Frontend:** Vue 3 (Composition + Options API)
- **Routing:** Vue Router
- **State Management:** Pinia
- **Payment:** Stripe Payment Element
- **Backend:** Node.js

## 🧱 Architecture

The frontend is built using a component-based structure in Vue 3. Key components include:

- `ProductList` – Displays all available Cozy Threads products
- `Cart` – Manages selected products
- `Checkout` – Integrates Stripe’s Payment Element
- `OrderPlaced` – Displays transaction confirmation

Stripe is integrated via a simple Node.js backend, which handles the creation of the payment intent and securely interacts with the Stripe API.

## 🚀 Future Improvements

- Implementing **address validation** for more reliable deliveries
- Adding **user login and authentication**
- Building out **comprehensive testing** (unit, integration, and end-to-end)
- Improving the **UI polish** for better UX consistency


## 📝 Setup & Installation

1. navigate to the client directory, install the necessary dependencies, and run the frontend locally with the following commands:

        cd client
        npm install
        npm run dev
        

2. In a separate terminal window, navigate to the server directory, install the dependencies, and start the backend:

        cd server
        npm install
        npm run start


With both the frontend and backend running, the app will be accessible locally at http://localhost:5173/

## 📷 Screenshots

1. Home Page - Product Catalog
This is the home page showcasing all the cozy apparel products. Users can browse and select items to add to their shopping cart.<br>
        <img src="https://github.com/user-attachments/assets/119a2887-9969-4499-8309-74ff1ed3277f" width="400"/>
        <img src="https://github.com/user-attachments/assets/0143a116-fab3-4d4f-bc23-da397fed2a22" width="400"/>

<br>

2. Add to Shopping Cart
Clicking the "Add to Cart" button adds an item to the shopping cart. The cart will automatically update to reflect the addition.<br>
        <img src="https://github.com/user-attachments/assets/6cfdd6b5-a747-4c08-bc74-a18542563ed2" width="200"/>

<br>

3. Shopping Cart - Incrementing Items
When users select more of the same item, the quantity is updated, and the cart reflects the total quantity and price.<br>
        <img src="https://github.com/user-attachments/assets/5c52d2fc-de27-4180-b828-b475098f8381" width="100" />

<br>

4. Shopping Cart View
The shopping cart view shows all the items the user has added, along with their quantities and a total price calculation.<br>
        <img src="https://github.com/user-attachments/assets/6bd0a2bd-afc2-49ff-aab0-467c5021327f" width="500"/>

<br>

5. Checkout Page - Address Input
On the checkout page, users input their shipping address before proceeding with the payment.<br>
        <img src="https://github.com/user-attachments/assets/407d6251-ff59-4d9e-a199-1d7e806f3614" width="500"/>

<br>

6. Order Summary
Before finalizing the purchase, users can review an order summary with details of the items, quantities, and total cost.<br>
        <img src="https://github.com/user-attachments/assets/27b5b1e1-b958-4af8-9d78-d126272f40da" width="500"/>

<br>

7. Stripe Payment Checkout
The final step is the Stripe-powered payment checkout, where users enter their payment details to complete the purchase securely.<br>
        <img src="https://github.com/user-attachments/assets/7a2dccbf-6e6b-4645-9ba7-35977d1d8877" width="500"/>

