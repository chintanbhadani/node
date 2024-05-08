import Sequelize from 'sequelize';
import sequelize from '.';
import bcrypt from 'bcrypt';

export interface UserModelInputs {
  userId?: number;
  name: string;
  email: string;
  password: string;
}

export interface UserModel extends Sequelize.Model<UserModel, UserModelInputs> {
  userId: number;
  name: string;
  email: string;
  password: string;
}

const User = sequelize.define<UserModel, UserModelInputs>('users', {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    set(value: string) {
      const hash = bcrypt.hashSync(value, 10);
      this.setDataValue('password', hash);
    },
  },
});

export default User;
