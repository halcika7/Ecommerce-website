const BaseService = require('./BaseService');
const Permission = require('../models/Permission');
const mongoose = require('mongoose');

class PermissionService extends BaseService {
  static namesArray = [];
  constructor() {
    super(PermissionService);
    mongoose.connection.on('open', ref =>
      mongoose.connection.db.listCollections().toArray((err, names) => {
        const namesCollection = [];
        names.forEach(collection => namesCollection.push(collection.name));
        this.namesArray = [...namesCollection];
      })
    );
  }

  async findInNames(names) {
    return await Permission.find({ permission: { $in: names } });
  }

  async findBySlug(slug) {
    return await Permission.find({
      slug: { $regex: slug }
    });
  }

  async getAll() {
    return await Permission.find({});
  }

  async isertMany(permissions) {
    return await Permission.insertMany(permissions);
  }

  async deleteMany(permission) {
    return await Permission.deleteMany({
      permission: { $regex: permission }
    });
  }
}

const PermissionServiceInstance = new PermissionService();

module.exports = PermissionServiceInstance;
