const fs = require('fs-extra');
const BaseController = require('./BaseController');
const StoreService = require('../services/StoreService');

class StoreController extends BaseController {
  constructor() {
    super(StoreController);
  }

  async addStore(req, res) {
    try {
      const storeData = JSON.parse(req.body.options);
      const { errors, isValid } = await StoreService.validate(
        req.body,
        req.file
      );

      if (!isValid) return res.json(errors);

      await StoreService.create(storeData);

      return res.json({ successMessage: 'Store added' });
    } catch (err) {
      if (err.errmsg) return res.json({ failedMessage: err.errmsg });
      return res.json({ failedMessage: err.message });
    }
  }

  async updateStore(req, res) {
    try {
      const storeData = JSON.parse(req.body.options);
      const id = req.body.id;
      const { errors, isValid } = await StoreService.validate(
        req.body,
        req.file,
        id
      );

      if (!isValid) return res.json(errors);

      const updateObj = req.file
        ? {
            ...storeData,
            picture: req.file.path,
            saturdayHours: storeData.satHours
          }
        : {
            ...storeData,
            saturdayHours: storeData.satHours
          };

      await StoreService.updateOne(id, updateObj);
      const store = await StoreService.findOne(id);

      return res.json({ successMessage: 'Store updated', store });
    } catch (err) {
      if (err.errmsg) return res.json({ failedMessage: err.errmsg });
      return res.json({ failedMessage: err.message });
    }
  }

  async deleteStore(req, res) {
    try {
      const { id } = req.query;
      const findStore = await StoreService.findOne(id);

      if (findStore) await fs.remove(findStore.picture);

      await StoreService.deleteOne(id);

      const stores = await StoreService.findAll();

      return res.json({ successMessage: 'Store deleted', stores });
    } catch (err) {
      if (err.errmsg) return res.json({ failedMessage: err.errmsg });
      return res.json({ failedMessage: err.message });
    }
  }

  async getAllStores(req, res) {
    try {
      const stores = await StoreService.findAll();

      return res.json({ stores });
    } catch (err) {
      if (err.errmsg) return res.json({ failedMessage: err.errmsg });
      return res.json({ failedMessage: err.message });
    }
  }

  async getStore(req, res) {
    try {
      const store = await StoreService.findOne(req.query.id);

      return res.json({ store });
    } catch (err) {
      if (err.errmsg) return res.json({ failedMessage: err.errmsg });
      return res.json({ failedMessage: err.message });
    }
  }

  async getStoreContact(req, res) {
    try {
      const store = await StoreService.findOneSelect();

      return res.json({ store });
    } catch (err) {
      if (err.errmsg) return res.json({ failedMessage: err.errmsg });
      return res.json({ failedMessage: err.message });
    }
  }

  async getAllStoresFront(req, res) {
    try {
      const stores = await StoreService.findAllFront();

      return res.json({ stores });
    } catch (err) {
      if (err.errmsg) return res.json({ failedMessage: err.errmsg });
      return res.json({ failedMessage: err.message });
    }
  }
}

const StoreControllerInstance = new StoreController();

module.exports = StoreControllerInstance;
