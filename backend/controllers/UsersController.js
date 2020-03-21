const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../config/keys').secretOrKey;
const fs = require('fs-extra');
const ObjectId = require('mongoose').Types.ObjectId;
const UserModel = require('../models/User');
const UserRolesModel = require('../models/UserRole');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const addUserValidation = require('../validation/addUserValidation');
const validatePasswords = require('../validation/checkpassword');
const sendActivationEmail = require('../controllers/EmailController')
  .sendActivationEmail;
const getTokenEXP = require('../helpers/getTokenEXP').getDecodedTokenEXP;
const generatePassword = require('../helpers/generatePassword')
  .generatePassword;

exports.registerUser = async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) return res.json(errors);

  try {
    const user = await UserModel.find({
      $or: [{ email: req.body.email }, { username: req.body.username }]
    });

    if (user.length > 0) {
      (user[0].email || user[1].email) === req.body.email
        ? (errors.errors.email = 'Email already in use !')
        : null;
      (user[0].username || user[1].username) === req.body.username
        ? (errors.errors.username = 'Username already in use!')
        : null;
      return res.json(errors);
    }
    const jwtToken = await jwt.sign({ email: req.body.email }, secret, {
      expiresIn: 86400
    });
    const userRoles = await UserRolesModel.findOne({ name: 'User' });
    const hash = await bcrypt.hash(req.body.password, 10);
    const addNewUser = new UserModel({
      name: req.body.name,
      email: req.body.email,
      role: userRoles._id,
      username: req.body.username,
      password: hash,
      emailConfirmation: {
        token: 'Bearer ' + jwtToken,
        tokenExparation: new Date(getTokenEXP(jwtToken)),
        confirmed: false
      }
    });
    await addNewUser.save();
    sendActivationEmail(addNewUser, `Bearer ${jwtToken}`);
    return res.json({
      message: `Please ${addNewUser.username} go to your Email and confirm your email address in order to log in.`,
      addNewUser
    });
  } catch (err) {
    return res.json({ failedMessage: err.message });
  }
};

exports.loginUser = async (req, res) => {
  const { usernameEmail, password, rememberMe } = req.body;
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) return res.json(errors);

  const expiresIn = rememberMe ? null : { expiresIn: 3600 };
  try {
    const user = await UserModel.findOne({
      $or: [{ email: usernameEmail }, { username: usernameEmail }]
    })
      .select('-userInfo -updatedAt -__v')
      .populate('role', 'isAdmin permissions -_id');
    if (!user) {
      errors.errors.usernameEmail =
        'User not found with that Email or Username';
      return res.json(errors);
    }
    if (!user.emailConfirmation.confirmed) {
      return res.json({
        failedMessage:
          'Please confirm your email address we have send you an email with activation link'
      });
    }

    const payload = {
      id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
      profilePicture: user.profilePicture,
      rememberMe: req.body.rememberMe
    };
    const byCrypt = await bcrypt.compare(password, user.password);
    if (!byCrypt) {
      errors.errors.password = 'Password is incorrect';
      return res.json(errors);
    }
    const jwtToken = await jwt.sign(payload, secret, expiresIn);
    return res.json({
      success: true,
      token: 'Bearer ' + jwtToken,
      rememberMe: req.body.rememberMe,
      successMessage: `You are successfully logged in as ${user.username}`
    });
  } catch (err) {
    if (err.errmsg) return res.json({ failedMessage: err.errmsg });
    return res.json({ failedMessage: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  const { errors, isValid } = validatePasswords(req.body);

  if (!isValid) return res.json(errors);

  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.json({ failedMessage: 'User not found!' });
    }
    const expiresIn = new Date(user.resetPassword.expiresIn).getTime();
    if (expiresIn < Date.now()) {
      errors.errors.expiredToken =
        'Token has expired please make request again !!';
      return res.json(errors);
    }
    const byCrypt = await bcrypt.compare(req.body.password, user.password);
    if (byCrypt) {
      return res.json({ failedMessage: 'Provided password is already in use' });
    }
    const hash = await bcrypt.hash(req.body.password, 10);
    await UserModel.updateOne(
      { email: req.body.email },
      { resetPassword: {}, password: hash }
    );
    return res.json({
      successMessage: 'Password has bees successfuly changed'
    });
  } catch (err) {
    if (err.errmsg) return res.json({ failedMessage: err.errmsg });
    else if (err.message) return res.json({ failedMessage: err.message });
    else return res.json({ failedMessage: err });
  }
};

exports.updateProfilePicture = async (req, res) => {
  try {
    if (!req.file && !req.body.file) {
      return res.json({ failedMessage: 'Attached file is not an image.' });
    }
    const user = await UserModel.findOne({ username: req.body.username });
    if (!user) return res.json({ failedMessage: 'User not found' });
    if (req.body.file) {
      if (user.profilePicture === req.body.file.path) {
        return res.json({
          failedMessage: 'Selected picture is same as the one u already use !'
        });
      }
    }
    if (req.file) {
      if (user.profilePicture === req.file.path) {
        return res.json({
          failedMessage: 'Selected picture is same as the one u already use !'
        });
      }
    }
    if (user.profilePicture !== '') {
      await fs.remove(`${user.profilePicture}`);
    }
    await UserModel.updateOne(
      { username: req.body.username },
      { profilePicture: req.file.path }
    );
    await UserModel.findOne({
      username: req.body.username
    });
    return res.json({
      successMessage: 'Profile Picture is successfuly updated !'
    });
  } catch (err) {
    return res.json({ failedMessage: err.message });
  }
};

exports.getProfilePicture = async (req, res) => {
  try {
    const user = await UserModel.findOne({
      _id: new ObjectId(req.query.id)
    }).select('profilePicture -_id');
    if (!user) return res.json({ failedMessage: 'User not found' });
    return res.json({ profilePicture: user.profilePicture });
  } catch (err) {
    return res.json({ failedMessage: err.message });
  }
};

exports.updatePassword = async (req, res) => {
  const { errors, isValid } = validatePasswords(req.body);
  if (!isValid) return res.json(errors);
  try {
    const user = await UserModel.findOne({ username: req.body.username });
    if (!user) return res.json({ failedMessage: 'User not found!' });
    const byCrypt = await bcrypt.compare(req.body.password, user.password);
    if (byCrypt) {
      return res.json({ failedMessage: 'Provided password is already in use' });
    }
    const hashPwd = await bcrypt.hash(req.body.password, 10);
    await UserModel.updateOne(
      { username: req.body.username },
      { password: hashPwd }
    );
    return res.json({
      successMessage: 'Password has bees successfuly changed!'
    });
  } catch (err) {
    return res.json({ failedMessage: err.message });
  }
};

exports.updateUser = async (req, res) => {
  const { errors, isValid } = addUserValidation(req.body);
  if (!isValid) return res.json({ failedMessage: { ...errors.errors } });
  try {
    const userId = req.body.id,
      roleId = req.body.role,
      userInfo =
        Object.keys(req.body.userInfo).length > 0 ? req.body.userInfo : null;
    const findUser = await UserModel.findOne({ _id: ObjectId(userId) });
    const findByNameOrMail = await UserModel.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }]
    });
    if (
      findByNameOrMail &&
      findUser.email !== findByNameOrMail.email &&
      findUser.email !== req.body.email
    ) {
      errors.errors.email = 'Email already taken';
    }
    if (
      findByNameOrMail &&
      findUser.username !== findByNameOrMail.username &&
      findUser.username !== req.body.username
    ) {
      errors.errors.username = 'Username already taken';
    }
    if (Object.keys(errors.errors).length > 0) {
      return res.json({ failedMessage: { ...errors.errors } });
    }
    const emailConfirmation = req.body.confirmed
      ? { token: '', tokenExparation: null, confirmed: true }
      : { ...findUser.emailConfirmation };
    const user = await UserModel.updateOne(
      { _id: ObjectId(userId) },
      {
        role: ObjectId(roleId),
        userInfo,
        emailConfirmation,
        name: req.body.name,
        username: req.body.username,
        email: req.body.email
      }
    );
    if (user.nModified === 0) {
      return res.json({ failedMessage: 'Nothing to update !' });
    }
    return res.json({ successMessage: 'User Updated !' });
  } catch (err) {
    return res.json({ failedMessage: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({}).select(
      'name _id username email profilePicture emailConfirmation.confirmed'
    );
    return res.json({ users });
  } catch (err) {
    return res.json({ failedMessage: err.message });
  }
};

exports.getSingleUser = async (req, res) => {
  if (req.query.profile !== 'false') {
    if (req.query.id !== req.query.id2) {
      return res.json({ error: `Please do not use other id's` });
    }
  }
  try {
    const user = await UserModel.findOne({
      _id: new ObjectId(req.query.id)
    }).select(
      'profilePicture name email role username userInfo emailConfirmation.confirmed'
    );
    if (!user) return res.json({ failedMessage: 'User not found' });
    return res.json({ user });
  } catch (err) {
    return res.json({ failedMessage: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await UserModel.deleteOne({ _id: new ObjectId(req.query.id) });
    return res.json({ successMessage: 'User successfully deleted !!!' });
  } catch (err) {
    return res.json({ failedMessage: err.message });
  }
};

exports.addNewUser = async (req, res) => {
  const { errors, isValid } = addUserValidation(req.body);
  if (!isValid) return res.json(errors);

  try {
    const user = await UserModel.find({
      $or: [{ email: req.body.email }, { username: req.body.username }]
    });
    if (user.length > 0) {
      (user[0].email || user[1].email) === req.body.email
        ? (errors.errors.email = 'Email already in use !')
        : null;
      (user[0].username || user[1].username) === req.body.username
        ? (errors.errors.username = 'Username already in use!')
        : null;
      return res.json(errors);
    }
    const password = generatePassword();
    const hash = await bcrypt.hash(password, 10);
    const jwtToken = await jwt.sign({ email: req.body.email }, secret, {
      expiresIn: 86400
    });
    const addUser = new UserModel({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      userInfo: {
        facebook: req.body.facebook,
        instagram: req.body.instagram,
        twitter: req.body.twitter,
        github: req.body.github,
        salary: req.body.salary,
        telephone: req.body.telephone,
        country: req.body.country,
        address: req.body.address,
        city: req.body.city,
        postal: req.body.postal,
        dob: req.body.dob,
        doe: req.body.doe
      },
      role: ObjectId(req.body.role),
      password: hash,
      emailConfirmation: {
        token: 'Bearer ' + jwtToken,
        tokenExparation: new Date(getTokenEXP(jwtToken)),
        confirmed: false
      }
    });
    await addUser.save();
    sendActivationEmail(addUser, `Bearer ${jwtToken}`, password);
    return res.json({ successMessage: 'User Added' });
  } catch (err) {
    return res.json({ failedMessage: err.message });
  }
};
