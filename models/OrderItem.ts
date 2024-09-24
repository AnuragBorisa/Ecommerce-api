import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class OrderItem extends Model {
  public id!: number;
  public OrderId!: number;
  public ProductId!: number;
  public quantity!: number;
  public price!: number; 
}

OrderItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    OrderId: {
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
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'OrderItem',
    timestamps: true,
  }
);

export default OrderItem;
