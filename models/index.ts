import sequelize from '../config/database';
import User from './User';
import Product from './Product';
import Cart from './Cart';
import CartItem from './CartItem';
import Order from './Order';
import OrderItem from './OrderItem';


User.hasOne(Cart, { foreignKey: 'UserId' });
Cart.belongsTo(User, { foreignKey: 'UserId' });

Cart.hasMany(CartItem, { foreignKey: 'CartId' });
CartItem.belongsTo(Cart, { foreignKey: 'CartId' });

Product.hasMany(CartItem, { foreignKey: 'ProductId' });
CartItem.belongsTo(Product, { foreignKey: 'ProductId' });

User.hasMany(Order, { foreignKey: 'UserId' });
Order.belongsTo(User, { foreignKey: 'UserId' });

Order.hasMany(OrderItem, { foreignKey: 'OrderId' });
OrderItem.belongsTo(Order, { foreignKey: 'OrderId' });

Product.hasMany(OrderItem, { foreignKey: 'ProductId' });
OrderItem.belongsTo(Product, { foreignKey: 'ProductId' });


const syncDatabase = async () => {
  await sequelize.sync({ alter: true });
};

export { sequelize, syncDatabase, User, Product, Cart, CartItem, Order, OrderItem };
