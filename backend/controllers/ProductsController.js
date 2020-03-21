const fs = require('fs-extra');
const ObjectId = require('mongoose').Types.ObjectId;
const { addProductValidation } = require('../validation/productvalidation');
const ProductModel = require('../models/Product');
const ProductReviewModel = require('../models/ProductReview');

exports.addProduct = async (req, res) => {
  const { errors, isValid } = await addProductValidation(req.body, req.files);
  if (!isValid) return res.json(errors);

  try {
    const name = req.body.name,
      price = parseInt(req.body.price),
      year = parseInt(req.body.year),
      brand = req.body.brand,
      category = req.body.category,
      optionsDiscount = parseInt(req.body.optionsDiscount),
      published = JSON.parse(req.body.published),
      featured = JSON.parse(req.body.featured),
      dailyOffer = JSON.parse(req.body.dailyOffer),
      weeklyOffer = JSON.parse(req.body.weeklyOffer),
      description = req.body.description,
      smalldescription = req.body.smalldescription.replace(
        /<\/?[^>]+(>|$)/g,
        ''
      ),
      bluetooth = req.body.bluetooth,
      wifi = req.body.wifi,
      subcategories = JSON.parse(req.body.subcategories),
      rawOptions = JSON.parse(req.body.options),
      files = req.files.map(file => ({
        ...file,
        destination: `public/images/products/${req.body.name}`,
        path: `public/images/products/${req.body.name}/${file.filename}`
      })),
      offer = {},
      date = new Date();

    if (dailyOffer) {
      offer.active = true;
      date.setDate(date.getDate() + 1);
      date.setHours(0, 0, 0, 0);
      offer.expires = date;
      offer.discount = optionsDiscount;
    }

    if (weeklyOffer) {
      offer.active = true;
      date.setDate(date.getDate() + 7);
      date.setHours(0, 0, 0, 0);
      offer.expires = date;
      offer.discount = optionsDiscount;
    }

    await req.files.forEach(
      async file =>
        await fs.move(
          file.path,
          `public/images/products/${req.body.name}/${file.filename}`
        )
    );

    const options = rawOptions.map(opt => {
      const newOpt = { ...opt };
      if (dailyOffer || weeklyOffer) {
        newOpt.options = newOpt.options.map(opt => ({
          ...opt,
          discount: optionsDiscount
        }));
      }
      const findFeaturedPictureInFiles = files.find(
        file => file.originalname === opt.featuredPicture
      );
      if (findFeaturedPictureInFiles) {
        newOpt.featuredPicture = findFeaturedPictureInFiles.path;
      }
      newOpt.pictures = opt.pictures.map(picture => {
        const findPicture = files.find(file => file.originalname === picture);
        if (findPicture) {
          return findPicture.path;
        }
      });
      return newOpt;
    });

    const addProduct = new ProductModel({
      name,
      price,
      year,
      brand,
      category,
      published,
      featured,
      description,
      smalldescription,
      wifi,
      bluetooth,
      subcategories,
      options,
      weeklyOffer: weeklyOffer ? offer : null,
      dailyOffer: dailyOffer ? offer : null
    });

    await addProduct.save();

    return res.json({ successMessage: 'New product successfully added!' });
  } catch (err) {
    if (err.errmsg) return res.json({ failedMessage: err.errmsg });
    return res.json({ failedMessage: err.message });
  }
};

exports.getBannerProducts = async (req, res) => {
  try {
    const bannerProducts = await ProductModel.aggregate([
      {
        $match: {
          published: true,
          featured: true,
          dailyOffer: null,
          weeklyOffer: null
        }
      },
      { $sort: { createdAt: -1 } },
      { $sample: { size: 4 } }
    ]);

    return res.json({ bannerProducts });
  } catch (err) {
    if (err.errmsg) return res.json({ failedMessage: err.errmsg });
    return res.json({ failedMessage: err.message });
  }
};

exports.getFeaturedProducts = async (req, res) => {
  try {
    const featuredProducts = await ProductModel.aggregate([
      {
        $match: {
          published: true,
          featured: true,
          dailyOffer: null,
          weeklyOffer: null
        }
      },
      {
        $project: {
          name: 1,
          rating: 1,
          price: 1,
          category: 1,
          brand: 1,
          smalldescription: 1,
          createdAt: -1,
          'options.featuredPicture': 1
        }
      },
      { $sample: { size: 8 } }
    ]);

    return res.json({ featuredProducts });
  } catch (err) {
    if (err.errmsg) return res.json({ failedMessage: err.errmsg });
    return res.json({ failedMessage: err.message });
  }
};

exports.getTopSellingProducts = async (req, res) => {
  try {
    const topSellingProducts = await ProductModel.aggregate([
      { $match: { published: true, dailyOffer: null, weeklyOffer: null } },
      {
        $project: {
          name: 1,
          rating: 1,
          price: 1,
          category: 1,
          brand: 1,
          smalldescription: 1,
          createdAt: -1,
          'options.featuredPicture': 1
        }
      },
      { $sample: { size: 8 } },
      { $sort: { numberOfsales: -1 } }
    ]);

    return res.json({ topSellingProducts });
  } catch (err) {
    if (err.errmsg) return res.json({ failedMessage: err.errmsg });
    return res.json({ failedMessage: err.message });
  }
};

exports.getOurProducts = async (req, res) => {
  try {
    const ourProducts = await ProductModel.aggregate([
      { $match: { published: true, dailyOffer: null, weeklyOffer: null } },
      { $sample: { size: 36 } }
    ]);

    return res.json({ ourProducts });
  } catch (err) {
    if (err.errmsg) return res.json({ failedMessage: err.errmsg });
    return res.json({ failedMessage: err.message });
  }
};

exports.getDailyOfferProducts = async (req, res) => {
  try {
    const dailyOffer = await ProductModel.aggregate([
      { $match: { published: true, 'dailyOffer.active': true } },
      { $sample: { size: 10 } }
    ]);

    return res.json({ dailyOffer });
  } catch (err) {
    if (err.errmsg) return res.json({ failedMessage: err.errmsg });
    return res.json({ failedMessage: err.message });
  }
};

exports.getWeeklyOfferProducts = async (req, res) => {
  try {
    const weeklyOffer = await ProductModel.aggregate([
      { $match: { published: true, 'weeklyOffer.active': true } },
      { $sample: { size: 10 } }
    ]);

    return res.json({ weeklyOffer });
  } catch (err) {
    if (err.errmsg) return res.json({ failedMessage: err.errmsg });
    return res.json({ failedMessage: err.message });
  }
};

exports.getNewProducts = async (req, res) => {
  try {
    const newProducts = await ProductModel.aggregate([
      { $match: { published: true } },
      {
        $project: {
          name: 1,
          rating: 1,
          price: 1,
          category: 1,
          brand: 1,
          smalldescription: 1,
          createdAt: -1,
          'options.featuredPicture': 1
        }
      },
      { $sort: { createdAt: -1 } },
      { $sample: { size: 8 } }
    ]);

    return res.json({ newProducts });
  } catch (err) {
    if (err.errmsg) return res.json({ failedMessage: err.errmsg });
    return res.json({ failedMessage: err.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await ProductModel.findOne({
      _id: new ObjectId(req.query.id)
    });

    if (!product) {
      return res.json({ failedMessage: 'Product not found with provided ID' });
    }

    const similarProducts = await ProductModel.aggregate([
      {
        $match: {
          category: product.category,
          _id: { $ne: new ObjectId(req.query.id) }
        }
      },
      { $sample: { size: 15 } },
      { $limit: 15 },
      {
        $project: {
          name: 1,
          rating: 1,
          price: 1,
          brand: 1,
          'options.featuredPicture': 1
        }
      }
    ]);

    return res.json({ product, similarProducts });
  } catch (err) {
    console.log(err);
    if (err.errmsg) return res.json({ failedMessage: err.errmsg });
    return res.json({ failedMessage: err.message });
  }
};

exports.searchForProduct = async (req, res) => {
  const expr = new RegExp(
    req.query.query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'),
    'ig'
  );

  if (req.query.query.length === 0) return res.json({ products: [] });

  try {
    const products = await ProductModel.aggregate([
      {
        $match: {
          published: true,
          $or: [
            { name: { $regex: expr } },
            { brand: { $regex: expr } },
            { category: { $regex: expr } }
          ]
        }
      },
      { $limit: 12 },
      {
        $project: {
          name: 1,
          price: 1,
          category: 1,
          brand: 1,
          'options.featuredPicture': 1,
          first: { $arrayElemAt: ['$options.featuredPicture', 0] },
          sizeOfArray: { $size: '$options' }
        }
      }
    ]);

    return res.json({ products });
  } catch (err) {
    if (err.errmsg) return res.json({ failedMessage: err.errmsg });
    return res.json({ failedMessage: err.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.aggregate([
      { $match: {} },
      {
        $project: {
          name: 1,
          prodRating: '$rating.averageRating',
          price: 1,
          category: 1,
          brand: 1,
          year: 1,
          numberOfsales: 1,
          published: 1,
          featured: 1,
          featuredPicture: { $arrayElemAt: ['$options.featuredPicture', 0] },
          numberOfOptions: {
            $cond: {
              if: { $isArray: '$options' },
              then: { $size: '$options' },
              else: 'NA'
            }
          }
        }
      },
      { $sort: { createdAt: -1 } }
    ]);

    return res.json({ products });
  } catch (err) {
    if (err.errmsg) return res.json({ failedMessage: err.errmsg });
    return res.json({ failedMessage: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await ProductModel.deleteOne({ _id: new ObjectId(req.query.id) });
    await fs.remove(`public/images/products/${req.query.name}`);

    const dd = await ProductReviewModel.aggregate([
      {
        $match: {
          'replys.reviewId': { $exists: true },
          productId: req.query.id
        }
      },
      { $group: { _id: null, reviewIds: { $push: '$replys.reviewId' } } },
      { $project: { _id: 0, reviewIds: 1 } },
      { $limit: 1 },
      { $unwind: '$reviewIds' }
    ]);

    if (dd.length > 0) {
      await ProductReviewModel.deleteMany({ _id: { $in: dd[0].reviewIds } });
    }

    await ProductReviewModel.deleteMany({ productId: req.query.id });

    const products = await ProductModel.aggregate([
      { $match: {} },
      {
        $project: {
          name: 1,
          prodRating: '$rating.averageRating',
          price: 1,
          category: 1,
          brand: 1,
          year: 1,
          numberOfsales: 1,
          published: 1,
          featured: 1,
          featuredPicture: { $arrayElemAt: ['$options.featuredPicture', 0] },
          numberOfOptions: {
            $cond: {
              if: { $isArray: '$options' },
              then: { $size: '$options' },
              else: 'NA'
            }
          }
        }
      },
      { $sort: { createdAt: -1 } }
    ]);

    return res.json({ successMessage: 'Product Deleted', products });
  } catch (err) {
    if (err.errmsg) return res.json({ failedMessage: err.errmsg });
    return res.json({ failedMessage: err.message });
  }
};
