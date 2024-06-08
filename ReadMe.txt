User ---
- username (unique)
- email (unique)
- password (hashed)
- favorites [array of Product ID's]
- admin (boolean value)

Product ---
- name
- description
- rating : 1-5 number
- category : Home, Clothing, Electronics
Give me 6 products that fit this mongoose schema. All 6 products should be the same brand and 
- price
- brand : Brand ID
- image : url

Brand ---
- name
- products [Product Id]

PAGES ------

Registration Page ---
- Register New User

login Page ---
- Input Username/password or email/password

Home Page ---
- Page of all products w/ filters (brand, category)
- 9 Products in 3x3 Grid with Pagination
- Favorites Sidebar
- Can only favorite items if logged in

Product Page ---
- Page of a specific product
- Has additional info
- Gallery of products of the same brand
- Can only favorite items if logged in

Admin Page ---
- View all user accounts + their favorites lists

ROUTING ---

User---
    Register : POST /user/register
    Login : POST /user/login

    Get Favorites : GET /user/favorite
    Favorite Product : PUT /user/favorite/{productId}

Products ---
    Get Products Page : GET /products?page=1
    Get Products Page (filters) : GET /products?page=1&brand=”brand1;brand2”&type=”type1;type2”
        - Can filter across multiple brands. Checkboxes?
        
    Get Product Details : GET /products/details/{productId}
    Get 9 More Products from Brand : GET /products?page=1brand=”brand1”

Admin ---
    Get All users : GET /users
    Get User favorites : GET /users/{userid}

- Seed DB with 5 brands of 30 products each across 3 product types (categories) + 1 admin account

- Can i use modules in frontned??