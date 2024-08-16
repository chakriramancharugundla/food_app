const express = require('express');
const app = express();
app.use(express.json());

const restaurantManagementRouter = express.Router();

const restaurantModel = require('../../models/restaurant.model');

restaurantManagementRouter.post('/', async (req, res) => {
    const { restaurantId, name, address, phone, menu, gmail, password } = req.body;

    // Check if the Gmail already exists
    const existingRestaurant = await restaurantModel.findOne({ gmail });
    if (existingRestaurant) {
        return res.status(400).json({ error: 'Gmail already exists' });
    }

    // Create the new restaurant
    const restaurant = await restaurantModel.create({ restaurantId, name, address, phone, menu, gmail, password });
    res.status(200).json(restaurant);
});

restaurantManagementRouter.put('/:id', async (req, res) => {
    const { name, address, phone, menu } = req.body;
    const restaurant = await restaurantModel.findOneAndUpdate({ restaurantId: req.params.id }, { name, address, phone, menu }, { new: true });
    res.status(200).json(restaurant);
});

restaurantManagementRouter.delete('/:id', async (req, res) => {
    await restaurantModel.findOneAndDelete({ restaurantId: req.params.id });
    res.json("Success");
});

restaurantManagementRouter.get('/:id', async (req, res) => {
    const restaurant = await restaurantModel.findOne({ restaurantId: req.params.id });
    res.status(200).json(restaurant);
});

module.exports = restaurantManagementRouter;
