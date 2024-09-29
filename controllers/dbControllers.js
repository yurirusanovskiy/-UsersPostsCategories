const User = require("../models/User");
const Post = require("../models/Post");
const Category = require("../models/Category");

const models = {
    User, Post, Category
};

// Создание новой записи
const create = async (req, res, next) => {
    const { modelName, data } = req.body;
    const model = models[modelName];
    const newInstance = new model(data);
    
    try {
        await newInstance.save();
        res.status(201).json({ message: `Created ${modelName} successfully`, instance: newInstance });
    } catch (error) {
        next(`Couldn't create instance: ${error.message}`);
    }
};

// Получение всех записей с популяцией
const getAll = async (req, res, next) => {
    const { modelName } = req.body;
    const model = models[modelName];
    
    try {
        let query = model.find({});
        if (modelName === 'Post') {
            query = query.populate('author').populate('categories');  // Популяция авторов и категорий для постов
        }
        const instances = await query;
        res.status(200).json({ message: `${modelName}s found successfully`, instances });
    } catch (error) {
        next(`Couldn't find ${modelName}s: ${error.message}`);
    }
};

// Обновление записи по ID
const update = async (req, res, next) => {
    const { modelName, id, data } = req.body;
    const model = models[modelName];

    try {
        const updatedInstance = await model.findByIdAndUpdate(id, data, { new: true, runValidators: true });
        if (!updatedInstance) {
            return next(`Couldn't find ${modelName} with id: ${id}`);
        }
        res.status(200).json({ message: `Updated ${modelName} successfully`, instance: updatedInstance });
    } catch (error) {
        next(`Couldn't update ${modelName}: ${error.message}`);
    }
};

// Удаление записи по ID
const remove = async (req, res, next) => {
    const { modelName, id } = req.body;
    const model = models[modelName];

    try {
        const deletedInstance = await model.findByIdAndDelete(id);
        if (!deletedInstance) {
            return next(`Couldn't find ${modelName} with id: ${id}`);
        }
        res.status(200).json({ message: `Deleted ${modelName} successfully`, instance: deletedInstance });
    } catch (error) {
        next(`Couldn't delete ${modelName}: ${error.message}`);
    }
};

module.exports = { create, getAll, update, remove };

