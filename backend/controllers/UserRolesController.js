const UserRolesModel = require('../models/UserRole');
const UserModel = require('../models/User');
const validateRole = require('../validation/roleValidation');
const ObjectId = require('mongoose').Types.ObjectId;

exports.addUserRole = async (req, res) => {
  try {
    const { name, isAdmin, permissions } = req.body;
    const { failedMessage, isValid } = validateRole(name);

    if (!isValid) return res.json(failedMessage);

    const newRole = new UserRolesModel({
      name,
      isAdmin,
      permissions
    });
    await newRole.save();

    return res.json({ successMessage: 'New Role Added !' });
  } catch (err) {
    return res.json({ failedMessage: err.errmsg });
  }
};

exports.getRoles = async (req, res) => {
  try {
    const roles = await UserRolesModel.find({});

    return res.json(roles);
  } catch (err) {
    return res.json({ failedMessage: err.message });
  }
};

exports.deleteUserRole = async (req, res) => {
  try {
    const findRole = await UserRolesModel.findOne({
      $and: [
        {
          _id: { $in: ['5cb8d94156f66a552ee55856', '5cb8d94556f66a552ee55857'] }
        },
        { _id: new ObjectId(req.query.id) }
      ]
    });

    const deleteRole = await UserRolesModel.deleteOne({
      $and: [
        {
          _id: {
            $nin: ['5cb8d94156f66a552ee55856', '5cb8d94556f66a552ee55857']
          }
        },
        { _id: new ObjectId(req.query.id) }
      ]
    });

    if (deleteRole.n === 0 && findRole) {
      return res.json({
        failedMessage: `Role with id = ${findRole._id} can't be deleted !`
      });
    } else if (deleteRole.n === 0)
      return res.json({ failedMessage: 'No Roles deleted !' });

    await UserModel.updateMany(
      { role: req.query.id },
      { role: new ObjectId('5cb8d94556f66a552ee55857') }
    );

    return res.json({ successMessage: 'Role deleted !' });
  } catch (err) {
    return res.json({ failedMessage: err.message });
  }
};

exports.deleteManyUserRoles = async (req, res) => {
  const ids = Object.keys(req.query).map(id => req.query[id]);

  try {
    const findRole = await UserRolesModel.find({
      $and: [
        {
          _id: { $in: ['5cb8d94156f66a552ee55856', '5cb8d94556f66a552ee55857'] }
        },
        { _id: { $in: ids } }
      ]
    });
    const deleteRole = await UserRolesModel.deleteMany({
      $and: [
        {
          _id: {
            $nin: ['5cb8d94156f66a552ee55856', '5cb8d94556f66a552ee55857']
          }
        },
        { _id: { $in: ids } }
      ]
    });

    if (deleteRole.n === 0 && findRole.length) {
      const id = findRole[0]._id ? findRole[0]._id : '';
      const id1 = findRole[1] ? findRole[1]._id : '';

      return res.json({
        failedMessage: `Roles with id = ${id} ${id1} can't be deleted !`
      });
    } else if (deleteRole.n === 0)
      return res.json({ failedMessage: 'No Roles deleted !' });

    await UserModel.updateMany(
      { role: { $in: ids } },
      { role: new ObjectId('5cb8d94556f66a552ee55857') }
    );

    return res.json({ successMessage: 'Role deleted !' });
  } catch (err) {
    return res.json({ failedMessage: err.message });
  }
};

exports.getRole = async (req, res) => {
  try {
    const response = await UserRolesModel.findById(req.body.id).select(
      'isAdmin permissions name'
    );

    if (!response) {
      return res.json({
        failedMessage: `Role with provided id was not found !`
      });
    }

    return res.json(response);
  } catch (err) {
    console.log(err);
    return res.json({ failedMessage: true });
  }
};

exports.updateRole = async (req, res) => {
  const { id, name, isAdmin, permissions } = req.body;
  const { failedMessage, isValid } = validateRole(name);

  if (!isValid) return res.json(failedMessage);

  try {
    const findByName = await UserRolesModel.findOne({ name });
    const findById = await UserRolesModel.findById(id);

    if (
      findByName &&
      !findByName._id.equals(findById._id) &&
      findByName.name !== findById.name
    ) {
      return res.json({ failedMessage: 'Name Already in use' });
    }

    await UserRolesModel.updateOne(
      { _id: id },
      {
        name,
        isAdmin,
        permissions
      }
    );

    const updatedRole = await UserRolesModel.findById(id);

    return res.json({ successMessage: 'Role updated!', role: updatedRole });
  } catch (err) {
    const message = err.message ? err.message : err.CastError;
    return res.json({ failedMessage: message });
  }
};
