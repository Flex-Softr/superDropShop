const passport = require("passport");
const {
  addCustomer,
  getCustomers,
  updateCustomer,
  getMyOrders,
  getResentEarning,
  getProfit,
  getWithdrawData,
  getResellerStatics,
} = require("../controller/reseller.controller");
const {
  validateEmail,
  validateMobile,
  runValidation,
} = require("../validation/validate");

const resellerRoute = require("express").Router();
const { isReseller } = require("../middleware/checkRole");

//TODO: Secure reseller routes.
resellerRoute.use(passport.authenticate("jwt", { session: false }), isReseller);

/*=======================
     reseller dashboard
=========================*/

//add customer
// /api/reseller/dashboard/add-customer
resellerRoute.post(
  "/dashboard/add-customer",
  validateEmail,
  validateMobile,
  runValidation,
  addCustomer
);

// get customers
// /api/reseller/dashboard/my-customers
resellerRoute.get("/dashboard/my-customers", getCustomers);

// update customers
// /api/reseller/dashboard/my-customers
resellerRoute.patch(
  "/dashboard/update-customers",
  validateEmail,
  validateMobile,
  runValidation,
  updateCustomer
);

//search customer
// /api/reseller/dashboard/my-customers/:reseller_id/search
resellerRoute.get("/dashboard/my-customers/:reseller_id/search", getCustomers);

// get orders
// /api/reseller/dashboard/my-orders/:reseller_id
resellerRoute.get("/dashboard/my-orders/:reseller_id", getMyOrders);

// search orders
// /api/reseller/dashboard/my-orders/:reseller_id/search
resellerRoute.get("/dashboard/my-orders/:reseller_id/search", getMyOrders);

// get reseller statistics data
// /api/reseller/dashboard/reseller-statistics
resellerRoute.get("/dashboard/reseller-statistics", getResellerStatics)

// get resent earning
// /api/reseller/dashboard/resent-earning/:reseller_id
resellerRoute.get("/dashboard/resent-earning/:reseller_id", getResentEarning);

// get profit profit
// /api/reseller/dashboard/profit/:reseller_id
resellerRoute.get("/dashboard/profit/:reseller_id", getProfit);

// search profit
// /api/reseller/dashboard/profit/:reseller_id/search
resellerRoute.get("/dashboard/profit/:reseller_id/search", getProfit);

// get withdraw data
// /api/reseller/dashboard/withdraw/:reseller_id
resellerRoute.get("/dashboard/withdraw", getWithdrawData);

;

module.exports = resellerRoute;
