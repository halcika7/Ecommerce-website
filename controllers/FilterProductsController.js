const ObjectId = require('mongoose').Types.ObjectId;
const ProductModel = require('../models/Product');
const BrandModel = require('../models/Brand');

exports.getProductsOnLoad = async (req, res) => {
	const category = req.query.category;
	const subcategoryName = req.query.subcategoryName;
    const subcategory = req.query.subcategory;

	try {
        
        const findProducts = await ProductModel.find({ category, 'subcategories.subName': subcategoryName , 'subcategories.sub': subcategory, published: true });
        const brands = await ProductModel.aggregate([
            { $match: { category, 'subcategories.subName': subcategoryName , 'subcategories.sub': subcategory, published: true } },
            { $group: { "_id": "$brand", "count": { "$sum": 1 } }},
            {$sort: {'_id': 1}},
        ]);

        const dsf = await ProductModel.aggregate([
            { $match: { category, 'subcategories.subName': subcategoryName , 'subcategories.sub': subcategory, published: true } },
            { 
                $group: { 
                "_id": {}, 
                "minPrice": { "$min": '$price' } ,
                "maxPrice": { "$max": '$price' } 
                }
            },
            {$limit: 1}
        ]);

        const {minPrice, maxPrice} = { ...dsf[0] }

        let colors = null;

        if(subcategory !== 'Games' || subcategory !== 'Projection Screens') {
            colors = await ProductModel.aggregate([
                { $match: {  category, 'subcategories.subName': subcategoryName , 'subcategories.sub': subcategory, published: true } },
                { $group:{_id: '$options.color',"colors": {$push:{ 'color':'$options.color',"count": { "$sum": 1 }}}}},
                {$unwind:"$colors"},
                {$unwind:"$colors.color"},
                { $group: {_id: { Color: '$colors.color' },uniqueColor: { $addToSet: '$_id' },count: { $sum:1 }}},
                {$unwind:"$uniqueColor"},
                { $group: {_id: null,colors: {$push: { color: '$_id.Color', count: '$count' } } ,count: { $sum:1 }}},
                {$unwind:"$colors"},
                { $group: {_id: null,colors: { $addToSet: '$colors'} ,}},
                {$unwind:"$colors"},
                {$sort: {'colors.color': 1}},
                { $project: {_id: 0,'colors': 1 } },
            ]);

            colors = colors.map(color => ({...color.colors}))

            // console.log(JSON.stringify(colors))

            const size = await ProductModel.aggregate([
                { $match: {  category, 'subcategories.subName': subcategoryName , 'subcategories.sub': subcategory, published: true } },
                { $group:{_id: '$options.options.size',"sizes": {$push:{ 'size':'$options.options.size',"count": { "$sum": 1 }}}}},
                {$unwind:"$sizes"},
                {$unwind:"$sizes.size"},
                { $group: {_id: { Size: '$sizes.size' },uniqueSizes: { $addToSet: '$_id' },count: { $sum:1 }}},
                {$unwind:"$_id.Size"},
                { $group: {_id: null,sizes: {$push: { size: '$_id.Size', count: '$count' } } ,count: { $sum:1 }}},
                {$unwind:"$sizes"},
                { $group: {_id: { Size: '$sizes.size' },uniqueColor: { $addToSet: '$_id' },count: { $sum: '$sizes.count' }}},
                {$unwind:"$_id.Size"},
                { $group: {_id: null,sizes: {$push: { color: '$_id.Size', count: '$count' } } }},
                {$unwind:"$sizes"},
                { $project: {_id: 0,'sizes': 1} },
            ])

            console.log(JSON.stringify(size))
            // console.log(size)
            const d = await numberOfReviewsHelper(category, subcategoryName,subcategory);

        }

		return res.json({ products: findProducts, brands, colors, minPrice, maxPrice });
	} catch (err) {
		if (err.errmsg) return res.json({ failedMessage: err.errmsg });
		return res.json({ failedMessage: err.message });
	}
};


const numberOfReviewsHelper = async (category, subcategoryName, subcategory) => {
    try {
        const elem = await ProductModel.aggregate([
            { $match: { category, 'subcategories.subName': subcategoryName , 'subcategories.sub': subcategory, published: true } },
            { $group: { "_id": "$rating.averageRating", "count": { "$sum": 1 } }}
        ]);
        if(elem.findIndex(elem => elem._id === 5) === -1) { elem.push({ _id:5, count:0 })}
        if(elem.findIndex(elem => elem._id === 4) === -1) { elem.push({ _id:4, count:0 })}
        if(elem.findIndex(elem => elem._id === 3) === -1) { elem.push({ _id:3, count:0 })}
        if(elem.findIndex(elem => elem._id === 2) === -1) { elem.push({ _id:2, count:0 })}
        if(elem.findIndex(elem => elem._id === 1) === -1) { elem.push({ _id:1, count:0 })}
        elem.sort((a,b) => b._id - a._id)
        const numOfReviews = elem.reduce((acc,val) => Object.keys(acc).length ? acc.count + val.count : acc + val.count);
        const totalSumOfRatings = elem.reduce((acc, val) => Object.keys(acc).length ? (acc._id * acc.count) + (val._id * val.count) : acc + (val._id * val.count));
        const avg = parseFloat((totalSumOfRatings / numOfReviews).toFixed(2))
        const ratingsWithPercentages = elem.map(el => ({ ...el }));

        return { numOfReviews, avg, ratingsWithPercentages };
    }catch (err){
        console.log(err);
    }
}

exports.getBrands = async (req, res) => {
    try {
        const category = req.query.category;
        const brands = await BrandModel.aggregate([
            { $match: {  categories: category } },
            {$project: {
                name: 1,
                _id:0
            }}
        ]);
    } catch(err) {
        if (err.errmsg) return res.json({ failedMessage: err.errmsg });
		return res.json({ failedMessage: err.message });
    }
}

