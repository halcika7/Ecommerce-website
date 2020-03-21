const UserModel = require('../models/User');
const ObjectId = require('mongoose').Types.ObjectId;

const BaseController = require('./BaseController');
const RoleService = require('../services/RoleService');

class RoleController extends BaseController {
  constructor() {
    super(RoleController);
  }

  async addRole(req, res) {
    try {
      const invalid = await RoleService.create(req.body);

      if (invalid) return res.json(invalid);

      return res.json({ successMessage: 'New Role Added !' });
    } catch (err) {
      return res.json({ failedMessage: err.errmsg });
    }
  }

  async getRoles(req, res) {
    try {
      const roles = await RoleService.findAll();

      return res.json(roles);
    } catch (err) {
      return res.json({ failedMessage: err.message });
    }
  }

  async deleteRole(req, res) {
    try {
      const { failedMessage } = await RoleService.delete(eq.query.id);

      if (failedMessage) return res.json({ failedMessage });

      await UserModel.updateMany(
        { role: req.query.id },
        { role: new ObjectId('5cb8d94556f66a552ee55857') }
      );

      return res.json({ successMessage: 'Role deleted !' });
    } catch (err) {
      return res.json({ failedMessage: err.message });
    }
  }

  async deleteManyRoles(req, res) {
    try {
      const ids = Object.keys(req.query).map(id => req.query[id]);
      const { failedMessage } = await RoleService.deleteMany(ids);

      if (failedMessage) return res.json({ failedMessage });

      await UserModel.updateMany(
        { role: { $in: ids } },
        { role: new ObjectId('5cb8d94556f66a552ee55857') }
      );

      return res.json({ successMessage: 'Role deleted !' });
    } catch (err) {
      return res.json({ failedMessage: err.message });
    }
  }

  async getRole(req, res) {
    try {
      const response = await RoleService.findOneSelect(req.body.id);

      if (!response) {
        return res.json({
          failedMessage: `Role with provided id was not found !`
        });
      }

      return res.json(response);
    } catch (err) {
      return res.json({ failedMessage: true });
    }
  }

  async updateRole(req, res) {
    try {
      const { failedMessage } = await RoleService.update(req.body);

      if (failedMessage) return res.json({ failedMessage });

      const updatedRole = await RoleService.findOne(id);

      return res.json({ successMessage: 'Role updated!', role: updatedRole });
    } catch (err) {
      const message = err.message ? err.message : err.CastError;
      return res.json({ failedMessage: message });
    }
  }
}

const RoleControllerInstance = new RoleController();

module.exports = RoleControllerInstance;
