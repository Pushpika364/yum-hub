import stripe from 'stripe'; 
import orderModal from "../models/orderModal.js";
import userModel from "../models/userModel.js";


export const placeOrder = async (req, res, next) => {

  const frontendUrl = "http://localhost:5173";

  try {
    const newOrder = new orderModal({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();

    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "lkr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, 
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "lkr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 200 * 100, 
      },
      quantity: 1,
    });

    const session = await stripe(process.env.STRIPE_SECRET_KEY).checkout.sessions.create({
      payment_method_types: ['card'], 
      line_items: line_items,
      mode: "payment",
      success_url: `${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontendUrl}/verify?false=true&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await orderModal.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
