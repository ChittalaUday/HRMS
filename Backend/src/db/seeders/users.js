const bcrypt = require('bcrypt')

module.exports = async (client) => {
  var pass = "admin123"
  await client.query(`
        INSERT INTO users (name,email,mobile, password, role)
        VALUES (
          'Zenith Admin',
          'admin@email.com',
          '9876543210',
          '${await bcrypt.hash(pass, 10)}',
          1
        )
      `);

  console.log("✅ user table seeded successfully.");
};