import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Cart extends Model {
  public id!: number;
  public UserId!: number;
}

Cart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Cart',
    timestamps: true,
  }
);

export default Cart;
