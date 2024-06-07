import Category from "../models/categoryModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createCategory = asyncHandler(async (req, res) => {
    try {
        const {name} = req.body;

        if (!name) {
            return res.json({error: "Le nom est obligatoire"});
        }

        const existingCategory = await Category.findOne({name});

        if (existingCategory) {
            return res.json({error: "Existe déjà"});
        }

        const category = await new Category({name}).save();
        res.json(category);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
});

const updateCategory = asyncHandler(async (req, res) => {
    try {
        const {name} = req.body;
        const {categoryId} = req.params;

        const category = await Category.findOne({_id: categoryId});

        if (!category) {
            return res.status(404).json({error: "Catégorie non trouvée"});
        }

        category.name = name;

        const updatedCategory = await category.save();
        res.json(updatedCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Erreur de serveur interne"});
    }
});

const removeCategory = asyncHandler(async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ error: "Catégorie non trouvée" });
    }

    await category.remove();
    res.json({ message: "Catégorie supprimée avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur de serveur interne" });
  }
});

const listCategory = asyncHandler(async (req, res) => {
    try {
        const all = await Category.find({});
        res.json(all);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error.message);
    }
});

const readCategory = asyncHandler(async (req, res) => {
    try {
        const category = await Category.findOne({_id: req.params.id});
        res.json(category);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error.message);
    }
});

export {
    createCategory,
    updateCategory,
    removeCategory,
    listCategory,
    readCategory,
};
