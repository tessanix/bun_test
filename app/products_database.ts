import { Database } from 'bun:sqlite';

const enum productCategory {
    Tshirst,
    Pant
}

export interface Product {
    id: number;
    name: string;
    category: productCategory;
    price: number;
}

export class ProductsDatabase {
    private db: Database;

    constructor() {
        this.db = new Database('app/products.sqlite');
        // Initialize the database
        this.init()
            .then(() => console.log('Products database initialized'))
            .catch(console.error);
    }

    // Create the products table if it not already exists
    async init() {
        return this.db.run('CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, category INTEGER, price REAL)');
    }
    
    // Get all productss
    async getAllProducts() {
        return this.db.query('SELECT * FROM products').all() as Product[];
    }

    // Add a product
    async addProduct(product: Product) {
        // q: Get id type safely 
        const query = this.db.query(`INSERT INTO products (name, category, price) VALUES (?, ?, ?) RETURNING *`)
        return query.get(product.name, product.category, product.price) as Product;
    }

    // async getUserFromEmail(email: String) {
    //     return this.db.query(`SELECT id FROM users WHERE email = '${email}'`).get();
    // }

    // Update a product
    async updateProduct(id: number, product: Product) {
        return this.db.run(`UPDATE products SET name = '${product.name}', category = '${product.category}', price = '${product.price}' WHERE id = ${id}`)
    }

    // Delete a product
    async deleteProduct(id: number) {
        return this.db.run(`DELETE FROM products WHERE id = ${id}`)
    }
}