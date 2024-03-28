const config = {
  /** Порт приложения. */
  port: process.env.PORT || 3000,
  db: {
    url: process.env.DB_URL || 'mongodb://localhost:27017/mestodb',
  },
  jwtSecret: process.env.JWT_SECRET || '11d941775d6ce8fbade1af71e80ff34d8c8bce60e8b7e426868793bc092f9533',
  salt_length: process.env.SALT_LENGTH || 10,
};

export default config;
