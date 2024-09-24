import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class CartItem extends Model {
  public id!: number;
  public CartId!: number;
  public ProductId!: number;
  public quantity!: number;
}

CartItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    CartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    modelName: 'CartItem',
    timestamps: true,
  }
);

export default CartItem;
