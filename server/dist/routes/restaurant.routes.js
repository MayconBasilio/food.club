"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const restaurant_controller_1 = require("../controllers/restaurant.controller");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post("/dish", restaurant_controller_1.createDish);
router.delete("/dish/:restaurantId/:dishId", restaurant_controller_1.deleteDish);
router.patch("/dish/:restaurantId/:dishId", restaurant_controller_1.updateDish);
router.get("/dishes", restaurant_controller_1.getDishes);
router.get("/list", restaurant_controller_1.getRestaurants);
router.get("/:id", restaurant_controller_1.getRestaurant);
router.post("/:restaurantId/:dishId/rating", restaurant_controller_1.ratingDish);
exports.default = router;
