import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Order extends Model {
  public id!: number;
  public UserId!: number;
  public totalAmount!: number;
  public orderDate!: Date;
}

Order.init(
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
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    orderDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Order',
    timestamps: true,
  }
);

export default Order;
