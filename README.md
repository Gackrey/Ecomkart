# Ecomkart
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![badge](https://david-dm.org/tterb/Hyde/status.svg)]()
[![Website shields.io](https://img.shields.io/website-up-down-green-red/http/shields.io.svg)](http://shields.io/)
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
│   └── index.html              
├── src
│   ├── api
│   ├── components 
│   ├── Pages
│   ├── Redux_files 
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

## Screenshots
### Desktop view
![ecomkart](https://user-images.githubusercontent.com/36769948/115062819-65b75300-9f08-11eb-8143-06da74f87fda.JPG)

### Mobile view
![mobile](https://user-images.githubusercontent.com/36769948/115062854-6d76f780-9f08-11eb-9a6c-d8bbe4d767ac.JPG)