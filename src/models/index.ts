import { Dialect, Sequelize } from 'sequelize';
import dbConfig from '../db/config/dbConfig';
import dotenv from 'dotenv';

dotenv.config();

const mode = process.env.NODE_ENV;

const configuration = dbConfig[mode as 'development' | 'production'];

const sequelize = new Sequelize(
  configuration.database,
  configuration.username,
  configuration.password ?? '',
  {
    host: configuration.host,
    dialect: configuration.dialect as Dialect,
    port: (configuration?.port as number) ?? 3306,
    logging: false,
    define: {
      paranoid: true,
      timestamps: true,
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected');
  })
  .catch(e => {
    console.log('Unable to connect with database');
  });

export default sequelize;
