const PermissionModel = require('../models/Permission');
const UserRoleModel = require('../models/UserRole');
const ObjectId = require('mongoose').Types.ObjectId;
const validatePermission = require('../validation/permissionValidation');
const mongoose = require('mongoose');

let namesArray = [];

mongoose.connection.on('open', ref =>
  mongoose.connection.db.listCollections().toArray((err, names) => {
    const namesCollection = [];
    names.forEach(collection => namesCollection.push(collection.name));
    namesArray = [...namesCollection];
  })
);

exports.addPermission = async (req, res) => {
  const permission = [...req.body.permission.replace('_', ' ').split(' ')]
    .map((char, i) => char.charAt(0).toUpperCase() + char.substring(1))
    .join(' ');

  const permissionNames = [
    'Create ' + permission,
    'Read ' + permission,
    'Update ' + permission,
    'Delete ' + permission
  ];

  const permissions = permissionNames.map((slug, i) => ({
    slug: slug
      .toLowerCase()
      .split(' ')
      .join('_'),
    permission: permissionNames[i]
  }));

  try {
    const findPermissions = await PermissionModel.find({
      permission: { $in: permissionNames }
    });

    if (findPermissions.length > 0) {
      return res.json({ failedMessage: 'Permission already in use' });
    }

    await PermissionModel.insertMany(permissions);

    return res.json({
      successMessage: 'Permissions ' + permissionNames.toString() + ' added!'
    });
  } catch (err) {
    return res.json({ failedMessage: err.errmsg });
  }
};

exports.getAllPermissions = async (req, res) => {
  try {
    const permissions = await PermissionModel.find({});

    return res.json({ permissions });
  } catch (err) {
    return res.json({ failedMessage: err.message });
  }
};

exports.getAllModelNames = async (req, res) => {
  try {
    const response = await Promise.all(
      namesArray.map(async name => {
        const findPermissions = await PermissionModel.find({
          slug: { $regex: name }
        });

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
};

exports.deletePermission = async (req, res) => {
  const spaceIndex = req.query.permission.indexOf(' ');
  const permission = req.query.permission.slice(spaceIndex + 1);

  try {
    const deletedPermissions = await PermissionModel.deleteMany({
      permission: { $regex: permission }
    });

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
};

exports.deleteManyPermissions = async (req, res) => {
  const permissions = Object.keys(req.query).map(permission =>
    req.query[permission].slice(req.query[permission].indexOf(' '))
  );

  try {
    const deletedPermissions = await PermissionModel.deleteMany({
      permission: { $regex: permissions.join('|') }
    });

    if (deletedPermissions.n === 0) {
      return res.json({ failedMessage: 'Permission is not deleted' });
    }

    await UserRoleModel.updateMany(
      {},
      { $pull: { permissions: { $regex: permissions.join('|') } } }
    );

    return res.json({ successMessage: 'Permission deleted !' });
  } catch (err) {
    return res.json({ failedMessage: err.message });
  }
};
