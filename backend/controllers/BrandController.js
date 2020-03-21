const BaseController = require('./BaseController');
const BrandService = require('../services/BrandService');

class BrandController extends BaseController {
  constructor() {
    super(BrandController);
  }

  async addBrand(req, res) {
    const { name, categories } = req.body;

    try {
      if (name.length < 2) {
        return res.json({
          error: 'Brand name needs to be at least 2 characters'
        });
      } else if (categories.length < 1) {
        return res.json({ failedMessage: 'At least one category required!' });
      }

      await BrandService.createBrand(name, categories);

      return res.json({ successMessage: 'Brand Added !' });
    } catch (err) {
      if (err.errmsg) return res.json({ error: err.errmsg });
      return res.json({ failedMessage: err.message });
    }
  }

  async getAllBrands(req, res) {
    try {
      const brands = await BrandService.getAll();

      return res.json({ brands });
    } catch (err) {
      if (err.errmsg) return res.json({ error: err.errmsg });
      return res.json({ failedMessage: err.message });
    }
  }

  async getBrand(req, res) {
    try {
      const brand = await BrandService.getById(req.query.id);

      if (!brand) {
        return res.json({
          error: `Brand was not found with id = ${req.query.id}`
        });
      }

      return res.json({ brand });
    } catch (err) {
      if (err.errmsg) return res.json({ error: err.errmsg });
      return res.json({ failedMessage: err.message });
    }
  }

  async editBrand(req, res) {
    try {
      const { id, data } = req.body;

      if (data.categories.length < 1) {
        return res.json({ failedMessage: 'At least one category required!' });
      }

      const brand = await BrandService.updateOne(id, data);

      if (brand.nModified === 0) {
        return res.json({ failedMessage: 'Nothing to update !' });
      }

      return res.json({ successMessage: 'Brand Edited !' });
    } catch (err) {
      if (err.errmsg) return res.json({ error: err.errmsg });
      return res.json({ failedMessage: err.message });
    }
  }

  async deleteBrand(req, res) {
    try {
      const deletedBrand = await BrandService.deleteOne(req.query.id);

      if (deletedBrand.n !== 1) {
        return res.json({
          failedMessage: 'Something happened and brand was not deleted'
        });
      }

      return res.json({ successMessage: 'Brand successfully deleted !' });
    } catch (err) {
      if (err.errmsg) return res.json({ error: err.errmsg });
      return res.json({ failedMessage: err.message });
    }
  }

  async deleteManyBrands(req, res) {
    const ids = Object.keys(req.query).map(id => req.query[id]);

    try {
      const brands = await BrandService.deleteMany(ids);

      if (brands.n === 0) {
        return res.json({ failedMessage: 'No bradns deleted !' });
      } else if (brands.n === 1) {
        return res.json({ successMessage: 'One brand deleted !' });
      }

      return res.json({ successMessage: `${brands.n} bradns deleted !` });
    } catch (err) {
      if (err.errmsg) return res.json({ error: err.errmsg });
      return res.json({ failedMessage: err.message });
    }
  }

  async getBrandsByCategory(req, res) {
    try {
      const brands = await BrandService.getByCategory(req.query.category);

      return res.json(brands);
    } catch (err) {
      if (err.errmsg) return res.json({ error: err.errmsg });
      return res.json({ failedMessage: err.message });
    }
  }
}

const BrandControllerInstance = new BrandController();

module.exports = BrandControllerInstance;
