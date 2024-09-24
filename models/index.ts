import sequelize from '../config/database';
import User from './User';

const models = { User };

const syncDatabase = async () => {
  await sequelize.sync({ alter: true });
};

export { sequelize, syncDatabase, User };
export default models;
