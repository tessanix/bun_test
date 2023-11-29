import { Database } from 'bun:sqlite';

export interface User {
    id?: number;
    email: string;
    password: string;
}

export class UsersDatabase {
    private db: Database;

    constructor() {
        this.db = new Database('users.sqlite');
        // Initialize the database
        this.init()
            .then(() => console.log('Database initialized'))
            .catch(console.error);
    }

    // Create the users table if it not already exists
    async init() {
        return this.db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT)');
    }
    // Get all users
    async getAllUsers() {
        return this.db.query('SELECT * FROM users').all();
    }

    // Add a user
    async addUser(user: User) {
        // q: Get id type safely 
        return this.db.query(`INSERT INTO users (email, password) VALUES (?, ?) RETURNING id`).get(user.email, user.password) as User;
    }

    async getUserFromEmail(email: String) {
        return this.db.query(`SELECT id FROM users WHERE email = '${email}'`).get();
    }

    // Update a user
    async updateUser(id: number, user: User) {
        return this.db.run(`UPDATE users SET email = '${user.email}', password = '${user.password}' WHERE id = ${id}`)
    }

    // Delete a user
    async deleteBook(id: number) {
        return this.db.run(`DELETE FROM users WHERE id = ${id}`)
    }

}