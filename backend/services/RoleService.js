const BaseService = require('./BaseService');

const Role = require('../models/Role');
const validateRole = require('../validation/roleValidation');
const ObjectId = require('mongoose').Types.ObjectId;

const roleID1 = '5cb8d94156f66a552ee55856';
const roleID2 = '5cb8d94556f66a552ee55857';

class RoleService extends BaseService {
  constructor() {
    super(RoleService);
  }

  async create(data) {
    const { name, isAdmin, permissions } = data;
    const { failedMessage, isValid } = validateRole(name);

    if (!isValid) return failedMessage;

    await new Role({
      name,
      isAdmin,
      permissions
    }).save();

    return;
  }

  async findAll() {
    return await Role.find({});
  }

  async findOne(id) {
    return await Role.findById(id);
  }

  async findOneSelect(id) {
    return await Role.findById(id).select('isAdmin permissions name');
  }

  async update(data) {
    const { id: _id, name, isAdmin, permissions } = data;
    const { failedMessage, isValid } = validateRole(name);

    if (!isValid) return failedMessage;

    const findByName = await Role.findOne({ name });
    const findById = await Role.findById(_id);

    if (
      findByName &&
      !findByName._id.equals(findById._id) &&
      findByName.name !== findById.name
    ) {
      return { failedMessage: 'Name Already in use' };
    }

    return await Role.updateOne({ _id }, { name, isAdmin, permissions });
  }

  async protectedRoles(ids) {
    return await Role.find({
      $and: [{ _id: { $in: [roleID1, roleID2] } }, { _id: { $in: ids } }]
    });
  }

  async delete(id) {
    const proteced = await this.protectedRoles([id]);

    if (proteced.length) {
      return {
        failedMessage: `Role with id = ${findRole._id} can't be deleted !`
      };
    }

    const deleteRole = await Role.deleteOne({
      $and: [{ _id: { $nin: [roleID1, roleID2] } }, { _id: new ObjectId(id) }]
    });

    if (deleteRole.n === 0) return { failedMessage: 'No Roles deleted !' };

    return;
  }

  async deleteMany(ids) {
    const proteced = await this.protectedRoles(ids);

    if (proteced.length) {
      const id = proteced[0]._id ? proteced[0]._id : '';
      const id1 = proteced[1] ? proteced[1]._id : '';

      return {
        failedMessage: `Roles with id = ${id} ${id1} can't be deleted !`
      };
    }

    const deleted = await Role.deleteMany({
      $and: [{ _id: { $nin: [roleID1, roleID2] } }, { _id: { $in: ids } }]
    });

    if (deleted.n === 0) {
      return { failedMessage: 'No Roles deleted !' };
    }

    return;
  }
}

const RoleServiceInstance = new RoleService();

module.exports = RoleServiceInstance;
