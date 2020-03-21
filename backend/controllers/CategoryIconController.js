const BaseController = require('./BaseController');
const IconService = require('../services/CategoryIconService');
const CategoryService = require('../services/CategoryService');
const validateIcon = require('../helpers/iconshelper').validateicon;

class CategoryIcon extends BaseController {
  constructor() {
    super(CategoryIcon);
  }

  async addCategoryIcon(req, res) {
    try {
      const { name } = req.body.name;
      const resValidation = validateIcon(name);

      if (resValidation) return res.json(resValidation);

      await IconService.create(name);

      return res.json({ successMessage: 'Category Icon Added !' });
    } catch (err) {
      if (err.errmsg) return res.json({ error: err.errmsg });
      return res.json({ failedMessage: err.message });
    }
  }

  async getAllCategoryIcons(req, res) {
    try {
      const categoryIcons = await IconService.getAll();

      return res.json({ categoryIcons });
    } catch (err) {
      return res.json({ failedMessage: err.message });
    }
  }

  async getCategoryIcon(req, res) {
    try {
      const { id } = req.query;
      const icon = await IconService.getSelectOne(id);

      if (!icon) {
        return res.json({
          error: `Category Icon with id = ${id} was not found`
        });
      }

      return res.json({ icon });
    } catch (err) {
      return res.json({ failedMessage: err.message });
    }
  }

  async editCategoryIcon(req, res) {
    try {
      const { name, id } = req.bodyl;
      const resValidation = validateIcon(name);

      if (resValidation) return res.json(resValidation);

      const findIcon = await IconService.getOne(id);

      const iconUpdate = await IconService.updateOne(id, name);

      if (iconUpdate.nModified === 0) {
        return res.json({ failedMessage: 'You provided same icon !' });
      }

      await CategoryService.updateByIcon(findIcon.name, name);

      return res.json({ successMessage: 'Category Icon Updated !' });
    } catch (err) {
      if (err.errmsg) return res.json({ error: err.errmsg });
      return res.json({ failedMessage: err.message });
    }
  }

  async deleteCategoryIcon(req, res) {
    try {
      const { id } = req.query;
      const findIcon = await IconService.getOne(id);

      const categoryWithIcon = await CategoryService.getByIcon(findIcon.name);

      if (categoryWithIcon) {
        return res.json({
          failedMessage: `Icon can't be deleted because it is in use in category with id= ${categoryWithIcon._id}`
        });
      }

      const deletedCategoryIcon = await IconService.delete(id);

      if (deletedCategoryIcon.n !== 1) {
        return res.json({
          failedMessage: 'Something happened and category was not deleted'
        });
      }

      return res.json({ successMessage: 'Icon successfully deleted !' });
    } catch (err) {
      if (err.errmsg) return res.json({ error: err.errmsg });
      return res.json({ failedMessage: err.message });
    }
  }

  async deleteManyCategoryIcons(req, res) {
    const ids = Object.keys(req.query).map(id => req.query[id]);
    try {
      let responseMessage = '';
      const findIcons = await IconService.getManyIds(ids);
      const iconNames = findIcons.map(icon => icon.name);
      const categoryWithIcon = await CategoryService.getManyByIcon(iconNames);
      // not deleted icon names
      const names = categoryWithIcon.map(cat => cat.icon);

      if (categoryWithIcon.length === 1) {
        responseMessage += `Icon with name = ${names[0].icon} is not deleted.`;
      } else if (categoryWithIcon.length > 1) {
        responseMessage += `Icons with names = ${names} are not deleted.`;
      }

      const categoryIcons = await IconService.deleteMany(ids, names);

      if (categoryIcons.n === 0) {
        return res.json({
          failedMessage: responseMessage + 'No category icons deleted !'
        });
      } else if (categoryIcons.n === 1) {
        return res.json({
          successMessage: responseMessage + 'One category icon deleted !'
        });
      }

      return res.json({
        successMessage:
          responseMessage + `${categoryIcons.n} category icons deleted !`
      });
    } catch (err) {
      if (err.errmsg) return res.json({ error: err.errmsg });
      return res.json({ failedMessage: err.message });
    }
  }
}

const CategoryIconInstance = new CategoryIcon();

module.exports = CategoryIconInstance;
