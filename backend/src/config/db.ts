const createDbConfig = () => {
  const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
  
  if (!DB_HOST || !DB_USER || !DB_PASSWORD || !DB_NAME) {
    throw Error("Missing env var" );
  }

  return {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    name: DB_NAME,
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  } as const
};

export default createDbConfig;
