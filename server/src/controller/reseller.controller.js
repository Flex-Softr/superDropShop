const { successResponse, errorResponse } = require("./responseHandler");
const Customer = require("../model/customers.model");
const Order = require("../model/order.model");
const generateUniqueId = require("generate-unique-id");

const addCustomer = async (req, res, next) => {
  console.log(req.body);
  try {
    const customerId = generateUniqueId({
      length: 8,
    }).toUpperCase();
    const customer = await Customer.findOne({
      $and: [{ reseller_id: req.body.reseller_id }],
      $or: [{ email: req.body.email }, { mobile: req.body.mobile }],
    });
    if (customer) {
      return errorResponse(res, 200, "This customer already exists.");
    } else {
      const customerInfo = new Customer({
        customer_id: customerId,
        ...req.body,
      });
      await customerInfo.save();
      successResponse(res, {
        message: "Customer added successfully!",
      });
    }
  } catch (error) {
    next(error);
  }
};

const getCustomers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    let query = {};
    if (req.query.q) {
      const searchRegex = new RegExp(`\\b${req.query.q}\\b`, "i");
      query = {
        $and: [{ reseller_id: req.params.reseller_id }],
        $or: [
          { customer_name: searchRegex },
          { email: searchRegex },
          { mobile: searchRegex },
        ],
      };
    } else {
      query = { reseller_id: req.query.reseller_id };
    }

    const count = await Customer.countDocuments(query);

    let customers;
    if (req.body.q) {
      customers = await Customer.find(query);
    } else {
      customers = await Customer.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
    }

    successResponse(res, {
      statusCode: 200,
      payload: { customers, count },
    });
  } catch (error) {
    next(error);
  }
};

const updateCustomer = async (req, res, next) => {
  try {
    await Customer.findOneAndUpdate(
      {
        reseller_id: req.body.reseller_id,
        customer_id: req.body.customer_id,
      },
      {
        $set: { ...req.body },
      },
      { new: true }
    );
    successResponse(res, {
      message: "successfully edited!",
    });
  } catch (error) {
    next(error);
  }
};

const getMyOrders = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    let matchQuery = {};
    if (req.query.q) {
      const searchRegex = new RegExp(`\\b${req.query.q}\\b`, "i");
      matchQuery = {
        $or: [
          { order_id: searchRegex },
          { "customer_info.name": searchRegex },
          { "customer_info.email": searchRegex },
          { "customer_info.mobile": searchRegex },
          { status: searchRegex },
        ],
      };
    }

    const pipeline = [
      { $match: { reseller_id: req.params.reseller_id } },
      {
        $lookup: {
          from: "customers",
          localField: "customer_id",
          foreignField: "customer_id",
          as: "customer_info",
        },
      },
      {
        $unwind: "$customer_info",
      },
      {
        $project: {
          _id: 0,
          order_id: 1,
          customer_info: {
            name: "$customer_info.customer_name",
            email: "$customer_info.email",
            mobile: "$customer_info.mobile",
          },
          total_ordered_product: { $size: "$ordered_products" },
          status: 1,
          createdAt: 1,
        },
      },
      { $match: matchQuery },
    ];

    const count = (await Order.aggregate(pipeline)).length;
    let orders;
    if (req.query.q) {
      orders = await Order.aggregate(pipeline);
    } else {
      orders = await Order.aggregate(pipeline)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
    }
    successResponse(res, { payload: { orders, count } });
  } catch (error) {
    next(error);
  }
};

const getResentEarning = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const pipeline = [
      {
        $match: { reseller_id: req.params.reseller_id, status: "completed" },
      },
      {
        $lookup: {
          from: "customers",
          localField: "customer_id",
          foreignField: "customer_id",
          as: "customer_info",
        },
      },
      {
        $unwind: "$customer_info",
      },
      {
        $project: {
          _id: 0,
          order_id: 1,
          name: "$customer_info.customer_name",
          completed_date: 1,
          total: {
            $sum: {
              $map: {
                input: "$ordered_products",
                as: "product",
                in: {
                  $multiply: ["$$product.quantity", "$$product.unit_price"],
                },
              },
            },
          },
          total_ordered_product: { $size: "$ordered_products" },
        },
      },
    ];

    const count = (await Order.aggregate(pipeline)).length;

    const resentEarning = await Order.aggregate(pipeline)
      .sort({ completed_date: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    successResponse(res, { payload: { resentEarning, count } });
  } catch (error) {
    next(error);
  }
};

const getProfit = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    let matchQuery = {};
    if (req.query.q) {
      const searchRegex = new RegExp(`\\b${req.query.q}\\b`, "i");
      matchQuery = {
        $or: [
          { order_id: searchRegex },
          { name: searchRegex },
          { status: searchRegex },
          { completed_date: searchRegex },
          { purchased: searchRegex },
          { total_ordered_product: searchRegex },
        ],
      };
    }
    
    const pipeline = [
      { $match: { reseller_id: req.params.reseller_id } },
      {
        $lookup: {
          from: "customers",
          localField: "customer_id",
          foreignField: "customer_id",
          as: "customer_info",
        },
      },
      {
        $unwind: "$customer_info",
      },
      {
        $project: {
          _id: 0,
          order_id: 1,
          name: "$customer_info.customer_name",
          purchased: {
            $toString: {
              $sum: {
                $map: {
                  input: "$ordered_products",
                  as: "product",
                  in: {
                    $multiply: ["$$product.quantity", "$$product.unit_price"],
                  },
                },
              },
            },
          },
          total_ordered_product: { $toString: { $size: "$ordered_products" } },
          status: 1,
          completed_date: 1,
          createdAt: 1,
        },
      },
      { $match: matchQuery },
    ];

    const count = (await Order.aggregate(pipeline)).length;
    let profit;
    if (req.query.q) {
      profit = await Order.aggregate(pipeline);
    } else {
      profit = await Order.aggregate(pipeline)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
    }
    successResponse(res, { payload: { profit, count } });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addCustomer,
  getCustomers,
  updateCustomer,
  getMyOrders,
  getResentEarning,
  getProfit,
};
