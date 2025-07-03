module.exports = async (client) => {
  await client.query(`
      CREATE EXTENSION IF NOT EXISTS "pgcrypto";
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    
      CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          uid UUID DEFAULT gen_random_uuid() UNIQUE NOT NULL,
          name VARCHAR(255),
          email VARCHAR(255) UNIQUE NOT NULL,
          mobile VARCHAR(255),
          status VARCHAR(255) DEFAULT 'active',
          password TEXT NOT NULL,
          role INT REFERENCES user_roles(id) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
  
      `);

  console.log("✅ users table migrated successfully");
};