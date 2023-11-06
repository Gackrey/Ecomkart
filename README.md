# Ecomkart
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![badge](https://david-dm.org/tterb/Hyde/status.svg)]()
[![NPM badge](https://badge.fury.io/js/badge-list.svg)](https://www.npmjs.com/package/badge-list)

It is a Ecommerce Site made with React and useContext and useReducer hooks
## Made with
* [React](https://reactjs.org/)
* [Builder UI](https://builder-ui.netlify.app)
* [Netlify](https://www.netlify.com/)

**Deployed at** [Webapp](https://ecomkart.netlify.app/)

## Setup
1) To clone this repo
```
git clone https://github.com/Gackrey/Ecomkart.git
```
2) For installing dependencies
```
$ npm install
```
3) To run this project
```
$ npm start
```

## File Structure
```
.              
├── public                
│   └── img              
│   └── index.html              
├── src
│   ├── @ecomkart
|   │   ├── api
|   │   ├── constants 
|   │   ├── context
|   │   ├── core
|   │   ├── reducer
|   │   ├── utils
│   ├── Pages
│   ├── App.js  
│   ├── index.js  
│   └── styles.css
├── app.js                                     
├── package.json     
├── LICENSE
└── README.md
```

## Functionalities Implemented
1. Product Listing Page

   * List of products
   * Search for products
   * Wishlist button
   * Add to cart button
   * Go to cart button if added to cart
   * Sort by Price functionality
   * Filters as follows
     * Exclude "out of stock" products (Greyed out | Cannot be added to cart)
     * Show fast delivery products
     * Price range of products
     * Category/brand filter
    
2. Cart functionality

   * Cart item list
   * Remove item from cart
   * Increment/decrement item quanity on cart
   * Move from cart to wishlist
   * Total items present in the cart with overall cost
   * Address management

3. Wishlist functionality

   * Wishlist item list
   * Remove from wishlist
   * Move from wishlist to cart

Backend Repo link :- https://github.com/Gackrey/Ecomkart-backend

## Screenshots
### Desktop view
![ecomkart](https://github.com/Gackrey/Ecomkart/assets/36769948/34ffd532-c56c-41d9-ae28-f28834a6446f)

### Mobile view
![mobile](https://github.com/Gackrey/Ecomkart/assets/36769948/fbb94623-f45c-4ce6-8291-13f561b50875)
