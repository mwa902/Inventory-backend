import Order from "../models/order.js";

const getAllOrders = async (req, res) => {
  try {
    const order = await Order.find();
    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching Order:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ error: "Order not found", message: error.message });
    }

    res.status(200).json({
      message: "Order Successful Founded",
      order,
    });
  } catch (error) {
    console.error("Error fetching Order by ID:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error creating Order:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

// const confirmOrder = async (req,res)=>{
//   try{
//     const order_id = req.body.order_id;
//     const orderstatus = await Order.findOneAndUpdate()
//     if(orderstatus == "Confirmed"){
//       resizeBy.status(200).json({message: "Order Confirmed Successfully"});

//     }

//   }

//  }
export { getAllOrders, getOrderById, createOrder };
