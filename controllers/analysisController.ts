
import { Request, Response } from 'express';
import  sequelize  from '../config/database';

export const getUserProductOrders = async (req: Request, res: Response) => {
    try {
        const result = await sequelize.query(`
            SELECT 
                u.id AS user_id, 
                u.name AS user_name,
                p.id AS product_id, 
                p.name AS product_name,
                SUM(oi.quantity) AS total_quantity,
                SUM(oi.price * oi.quantity) AS total_value
            FROM 
                "Orders" o
            JOIN 
                "OrderItems" oi ON o.id = oi."OrderId"
            JOIN 
                "Users" u ON o."UserId" = u.id
            JOIN 
                "Products" p ON oi."ProductId" = p.id
            GROUP BY 
                u.id, u.name, p.id, p.name
            ORDER BY 
                u.id, p.id;
        `);
        res.status(200).json(result[0]);
    } catch (error) {
        console.error('Error fetching user-product order details:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};


export const getWeeklyOrders = async (req: Request, res: Response) => {
    try {
        const result = await sequelize.query(`
            SELECT 
                DATE_TRUNC('week', o."orderDate") AS week,
                COUNT(o.id) AS total_orders,
                SUM(oi.quantity) AS total_products_sold,
                SUM(oi.price * oi.quantity) AS total_sales
            FROM 
                "Orders" o
            JOIN 
                "OrderItems" oi ON o.id = oi."OrderId"
            WHERE 
                o."orderDate" >= '2024-01-01' 
                AND o."orderDate" < '2024-04-01'
            GROUP BY 
                week
            ORDER BY 
                week;
        `);
        res.status(200).json(result[0]);
    } catch (error) {
        console.error('Error fetching weekly orders:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};


export const getTopProducts = async (req: Request, res: Response) => {
    try {
        const result = await sequelize.query(`
            SELECT 
                p.name AS product_name,
                COUNT(o.id) AS total_orders
            FROM 
                "Orders" o
            JOIN 
                "OrderItems" oi ON o.id = oi."OrderId"
            JOIN 
                "Products" p ON oi."ProductId" = p.id
            GROUP BY 
                p.id, p.name
            HAVING 
                COUNT(o.id) >= 5
            ORDER BY 
                total_orders DESC;
        `);
        res.status(200).json(result[0]);
    } catch (error) {
        console.error('Error fetching top products:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

