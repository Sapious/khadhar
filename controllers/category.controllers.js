const categoryModels = require("../models/category.models");

const createCategory = async (req, res) => {
	const newCategory = new categoryModels({
		name: req.body.name,
	});
	try {
		const savedCategory = await newCategory.save();
		return res.status(201).json(savedCategory);
	} catch (err) {
		return res.status(500).json(err);
	}
};

const getCategories = async (req, res) => {
	try {
		const categories = await categoryModels.find();
		return res.status(200).json(categories);
	} catch (err) {
		return res.status(500).json(err);
	}
};

const getCategory = async (req, res) => {
	const id = req.params.categoryId;
	try {
		const category = await categoryModels.findById(id);
		return res.status(200).json(category);
	} catch (err) {
		return res.status(500).json(err);
	}
};

const deleteCategory = async (req, res) => {
	const id = req.params.categoryId;
	try {
		const category = await categoryModels.findByIdAndDelete(id);
		return res.status(200).json(category);
	} catch (err) {
		return res.status(500).json(err);
	}
};
const updateCategory = async (req, res) => {
	const id = req.params.categoryId;
	try {
		const category = await categoryModels.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		return res.status(200).json(category);
	} catch (err) {
		return res.status(500).json(err);
	}
};
module.exports.getCategory = getCategory;
module.exports.getCategories = getCategories;
module.exports.createCategory = createCategory;
module.exports.deleteCategory = deleteCategory;
module.exports.updateCategory = updateCategory;
