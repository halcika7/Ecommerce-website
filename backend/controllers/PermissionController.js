const BaseController = require('./BaseController');
const PermissionService = require('../services/PermissionService');
const UserRoleModel = require('../models/UserRole');

class PermissionController extends BaseController {
  constructor() {
    super(PermissionController);
  }

  async addPermission(req, res) {
    const permission = [...req.body.permission.replace('_', ' ').split(' ')]
      .map(char => char.charAt(0).toUpperCase() + char.substring(1))
      .join(' ');

    const names = [
      'Create ' + permission,
      'Read ' + permission,
      'Update ' + permission,
      'Delete ' + permission
    ];

    const permissions = names.map(permission => ({
      slug: permission
        .toLowerCase()
        .split(' ')
        .join('_'),
      permission
    }));

    try {
      const findPermissions = await PermissionService.findInNames(names);

      if (findPermissions.length > 0) {
        return res.json({ failedMessage: 'Permission already in use' });
      }

      await PermissionService.insertMany(permissions);

      return res.json({
        successMessage: 'Permissions ' + permissionNames.toString() + ' added!'
      });
    } catch (err) {
      return res.json({ failedMessage: err.errmsg });
    }
  }

  async getAllPermissions(req, res) {
    try {
      const permissions = await PermissionService.getAll();

      return res.json({ permissions });
    } catch (err) {
      return res.json({ failedMessage: err.message });
    }
  }

  async getAllModelNames(req, res) {
    try {
      const response = await Promise.all(
        PermissionService.namesArray.map(async name => {
          const findPermissions = await PermissionService.findBySlug(name);

          if (findPermissions.length === 0) return name;
          return;
        })
      );

      const availablePermissions = response.filter(res => res !== undefined);

      if (availablePermissions.length === 0) {
        return res.json({ error: 'No available Permissions !' });
      }

      return res.json({ names: availablePermissions });
    } catch (err) {
      if (err.errmsg) return res.json({ error: err.errmsg });
      return res.json({ failedMessage: err.message });
    }
  }

  async deletePermission(req, res) {
    try {
      const permission = req.query.permission.slice(
        req.query.permission.indexOf(' ') + 1
      );
      const deletedPermissions = await PermissionService.deleteMany(permission);

      if (deletedPermissions.n === 0) {
        return res.json({ failedMessage: 'Permission is not deleted' });
      }

      await UserRoleModel.updateMany(
        {},
        { $pull: { permissions: { $regex: permission } } }
      );

      return res.json({ successMessage: 'Permission deleted !' });
    } catch (err) {
      return res.json({ failedMessage: err.message });
    }
  }

  async deleteManyPermissions(req, res) {
    try {
      const permissions = Object.keys(req.query)
        .map(permission =>
          req.query[permission].slice(req.query[permission].indexOf(' '))
        )
        .join('|');
      const deleted = await PermissionService.deleteMany(permissions);

      if (deleted.n === 0) {
        return res.json({ failedMessage: 'Permission is not deleted' });
      }

      await UserRoleModel.updateMany(
        {},
        { $pull: { permissions: { $regex: permissions } } }
      );

      return res.json({ successMessage: 'Permission deleted !' });
    } catch (err) {
      return res.json({ failedMessage: err.message });
    }
  }
}

const PermissionControllerInstance = new PermissionController();

module.exports = PermissionControllerInstance;
