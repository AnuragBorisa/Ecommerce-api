import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Product from './Product';

interface CartItemAttributes {
  id: number;
  CartId: number;
  ProductId: number;
  quantity: number;
  Product?: Product; 
}

class CartItem extends Model<CartItemAttributes> implements CartItemAttributes {
  public id!: number;
  public CartId!: number;
  public ProductId!: number;
  public quantity!: number;
  
  // Optional association with Product
  public Product?: Product;
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
    },
  },
  {
    sequelize,
    modelName: 'CartItem',
  }
);

// Setup association with Product
CartItem.belongsTo(Product, { foreignKey: 'ProductId' });

export default CartItem;
