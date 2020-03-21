const BaseController = require('./BaseController');
const CategoryService = require('../services/CategoryService');

class CategoryController extends BaseController {
  constructor() {
    super(CategoryController);
  }

  async addCategory(req, res) {
    try {
      const { subcategories, name, icon } = req.body;

      if (subcategories.length < 1) {
        return res.json({ error: 'At least one subcategory required!' });
      }

      await CategoryService.create(name, icon, subcategories);

      return res.json({ successMessage: 'Category Added !' });
    } catch (err) {
      if (err.errmsg) return res.json({ error: err.errmsg });
      return res.json({ failedMessage: err.message });
    }
  }

  async getAllCategories(req, res) {
    try {
      const categories = await CategoryService.getAll({});

      return res.json({ categories });
    } catch (err) {
      return res.json({ failedMessage: err.message });
    }
  }

  async getCategory(req, res) {
    try {
      const { id } = req.query;
      const category = await CategoryService.getById(id);

      if (!category) {
        return res.json({
          error: `Category with id=${id} was not found !`
        });
      }

      return res.json({ category });
    } catch (err) {
      return res.json({ failedMessage: err.message });
    }
  }

  async editCategory(req, res) {
    try {
      const { id, data } = req.body;

      if (data.subcategories.length < 1) {
        return res.json({ error: 'At least one subcategory required!' });
      }

      const updateCategory = await CategoryService.update(id, data);

      if (updateCategory.nModified === 0) {
        return res.json({ failedMessage: 'Category not updated' });
      }

      return res.json({ successMessage: 'Category Updated !' });
    } catch (err) {
      if (err.errmsg) return res.json({ error: err.errmsg });
      return res.json({ failedMessage: err.message });
    }
  }

  async deleteCategory(req, res) {
    try {
      const deletedCategory = await CategoryService.delete(req.query.id);

      if (deletedCategory.n !== 1) {
        return res.json({
          failedMessage: 'Something happened and category was not deleted'
        });
      }

      return res.json({ successMessage: 'Category successfully deleted !' });
    } catch (err) {
      if (err.errmsg) return res.json({ error: err.errmsg });
      return res.json({ failedMessage: err.message });
    }
  }

  async deleteManyCategories(req, res) {
    const ids = Object.keys(req.query).map(id => req.query[id]);

    try {
      const categories = await CategoryService.deleteMany(ids);

      if (categories.n === 0) {
        return res.json({ failedMessage: 'No categories deleted !' });
      } else if (categories.n === 1) {
        return res.json({ successMessage: 'One category deleted !' });
      }

      return res.json({
        successMessage: `${categories.n} categories deleted !`
      });
    } catch (err) {
      if (err.errmsg) return res.json({ error: err.errmsg });
      return res.json({ failedMessage: err.message });
    }
  }
}

const CategoryControllerInstance = new CategoryController();

module.exports = CategoryControllerInstance;
