const MenuCategory = require("../models/menuModel");

// GET ALL MENU CATEGORIES
const getMenu = async (req, res, next) => {
  try {
    const categories = await MenuCategory.find({}).sort({
      createdAt: 1,
    });

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

// ADD NEW CATEGORY
const addCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Category name is required.",
      });
    }

    const existingCategory =
      await MenuCategory.findOne({
        name: {
          $regex: `^${name.trim()}$`,
          $options: "i",
        },
      });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category already exists.",
      });
    }

    const category =
      await MenuCategory.create({
        name: name.trim(),
        items: [],
      });

    res.status(201).json({
      success: true,
      message: "Category added successfully.",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

// ADD DISH TO CATEGORY
const addDish = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    const {
      name,
      price,
      description,
    } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({
        success: false,
        message:
          "Dish name and price are required.",
      });
    }

    const category =
      await MenuCategory.findById(categoryId);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    category.items.push({
      name: name.trim(),
      price: Number(price),
      description:
        description?.trim() || "",
    });

    await category.save();

    res.status(201).json({
      success: true,
      message: "Dish added successfully.",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMenu,
  addCategory,
  addDish,
};