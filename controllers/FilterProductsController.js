const ProductModel = require('../models/Product');
const { returnQuery } = require('../helpers/filterProductsHelper');

exports.filters = async (req, res) => {
	const findBy = returnQuery(req.query.options);
	const { category, subcategoryName, subcategory } = {
		...JSON.parse(req.query.options)
	};

	try {
		let filters = {};

		filters.brands = await ProductModel.aggregate([
			{ $match: findBy },
			{ $group: { _id: '$brand', count: { $sum: 1 } } },
			{ $sort: { _id: 1 } }
		]);

		if (subcategory !== 'Games' && subcategory !== 'Projection Screens') {
			let colors = await ProductModel.aggregate([
				{ $match: findBy },
				{
					$group: {
						_id: '$options.color',
						colors: { $push: { color: '$options.color', count: { $sum: 1 } } }
					}
				},
				{ $unwind: '$colors' },
				{ $unwind: '$colors.color' },
				{
					$group: {
						_id: { Color: '$colors.color' },
						uniqueColor: { $addToSet: '$_id' },
						count: { $sum: 1 }
					}
				},
				{ $unwind: '$uniqueColor' },
				{
					$group: {
						_id: null,
						colors: { $push: { color: '$_id.Color', count: '$count' } },
						count: { $sum: 1 }
					}
				},
				{ $unwind: '$colors' },
				{ $group: { _id: null, colors: { $addToSet: '$colors' } } },
				{ $unwind: '$colors' },
				{ $sort: { 'colors.color': 1 } },
				{ $project: { _id: 0, colors: 1 } }
			]);

			colors = colors.map(color => ({ ...color.colors }));
			filters.colors = colors;
		}

		if (category === 'Clothing' || category === 'Shoes') {
			let sizes = await ProductModel.aggregate([
				{ $match: findBy },
				{
					$group: {
						_id: '$options.options.size',
						sizes: {
							$push: { size: '$options.options.size', count: { $sum: 1 } }
						}
					}
				},
				{ $unwind: '$sizes' },
				{ $unwind: '$sizes.size' },
				{
					$group: {
						_id: { Size: '$sizes.size' },
						uniqueSizes: { $addToSet: '$_id' },
						count: { $sum: 1 }
					}
				},
				{ $unwind: '$_id.Size' },
				{
					$group: {
						_id: null,
						sizes: { $push: { size: '$_id.Size', count: '$count' } },
						count: { $sum: 1 }
					}
				},
				{ $unwind: '$sizes' },
				{
					$group: {
						_id: { Size: '$sizes.size' },
						uniqueSizes: { $addToSet: '$_id' },
						count: { $sum: '$sizes.count' }
					}
				},
				{ $unwind: '$_id.Size' },
				{
					$group: {
						_id: null,
						sizes: { $push: { size: '$_id.Size', count: '$count' } }
					}
				},
				{ $unwind: '$sizes' },
				{ $sort: { 'sizes.size': 1 } },
				{ $project: { _id: 0, sizes: 1 } }
			]);

			sizes = sizes.map(size => ({ ...size.sizes }));
			filters.sizes = sizes;
		}

		if (subcategory === 'Games') {
			let consoles = await ProductModel.aggregate([
				{ $match: findBy },
				{
					$group: {
						_id: '$options.console',
						consoles: {
							$push: { console: '$options.console', count: { $sum: 1 } }
						}
					}
				},
				{ $unwind: '$consoles' },
				{ $unwind: '$consoles.console' },
				{
					$group: {
						_id: { Console: '$consoles.console' },
						uniqueConsole: { $addToSet: '$_id' },
						count: { $sum: 1 }
					}
				},
				{ $unwind: '$uniqueConsole' },
				{
					$group: {
						_id: null,
						consoles: { $push: { console: '$_id.Console', count: '$count' } },
						count: { $sum: 1 }
					}
				},
				{ $unwind: '$consoles' },
				{ $group: { _id: null, consoles: { $addToSet: '$consoles' } } },
				{ $unwind: '$consoles' },
				{ $sort: { 'consoles.console': 1 } },
				{ $project: { _id: 0, consoles: 1 } }
			]);

			consoles = consoles.map(consoles => ({ ...consoles.consoles }));
			filters.consoles = consoles;
		}

		if (
			subcategory === 'Projection Screens' ||
			subcategory === 'Monitors' ||
			subcategory === 'Televisions'
		) {
			if (subcategory === 'Projection Screens') {
				let displays = await ProductModel.aggregate([
					{ $match: findBy },
					{
						$group: {
							_id: '$options.display',
							displays: {
								$push: { display: '$options.display', count: { $sum: 1 } }
							}
						}
					},
					{ $unwind: '$displays' },
					{ $unwind: '$displays.display' },
					{
						$group: {
							_id: { Display: '$displays.display' },
							uniqueDisplays: { $addToSet: '$_id' },
							count: { $sum: 1 }
						}
					},
					{ $unwind: '$uniqueDisplays' },
					{
						$group: {
							_id: null,
							displays: { $push: { display: '$_id.Display', count: '$count' } },
							count: { $sum: 1 }
						}
					},
					{ $unwind: '$displays' },
					{ $group: { _id: null, displays: { $addToSet: '$displays' } } },
					{ $unwind: '$displays' },
					{ $sort: { 'displays.display': 1 } },
					{ $project: { _id: 0, displays: 1 } }
				]);
				displays = displays.map(display => ({ ...display.displays }));
				filters.displays = [...displays];
			} else {
				let displays = await ProductModel.aggregate([
					{ $match: findBy },
					{
						$group: {
							_id: '$options.options.display',
							displays: {
								$push: {
									display: '$options.options.display',
									count: { $sum: 1 }
								}
							}
						}
					},
					{ $unwind: '$displays' },
					{ $unwind: '$displays.display' },
					{
						$group: {
							_id: { Display: '$displays.display' },
							uniqueDisplays: { $addToSet: '$_id' },
							count: { $sum: 1 }
						}
					},
					{ $unwind: '$_id.Display' },
					{
						$group: {
							_id: null,
							displays: { $push: { display: '$_id.Display', count: '$count' } },
							count: { $sum: 1 }
						}
					},
					{ $unwind: '$displays' },
					{
						$group: {
							_id: { Display: '$displays.display' },
							uniqueDisplays: { $addToSet: '$_id' },
							count: { $sum: '$displays.count' }
						}
					},
					{ $unwind: '$_id.Display' },
					{
						$group: {
							_id: null,
							displays: { $push: { display: '$_id.Display', count: '$count' } }
						}
					},
					{ $unwind: '$displays' },
					{ $sort: { 'displays.display': 1 } },
					{ $project: { _id: 0, displays: 1 } }
				]);

				displays = displays.map(display => ({ ...display.displays }));
				filters.displays = [...displays];
			}
		}

		if (subcategory === 'Desktop Computers' || subcategory === 'Laptops') {
			let rams = await ProductModel.aggregate([
				{ $match: findBy },
				{
					$group: {
						_id: '$options.options.ram',
						rams: { $push: { ram: '$options.options.ram', count: { $sum: 1 } } }
					}
				},
				{ $unwind: '$rams' },
				{ $unwind: '$rams.ram' },
				{
					$group: {
						_id: { Ram: '$rams.ram' },
						uniqueRams: { $addToSet: '$_id' },
						count: { $sum: 1 }
					}
				},
				{ $unwind: '$_id.Ram' },
				{
					$group: {
						_id: null,
						rams: { $push: { ram: '$_id.Ram', count: '$count' } },
						count: { $sum: 1 }
					}
				},
				{ $unwind: '$rams' },
				{
					$group: {
						_id: { Ram: '$rams.ram' },
						uniqueRams: { $addToSet: '$_id' },
						count: { $sum: '$rams.count' }
					}
				},
				{ $unwind: '$_id.Ram' },
				{
					$group: {
						_id: null,
						rams: { $push: { ram: '$_id.Ram', count: '$count' } }
					}
				},
				{ $unwind: '$rams' },
				{ $sort: { 'rams.ram': 1 } },
				{ $project: { _id: 0, rams: 1 } }
			]);

			rams = rams.map(ram => ({ ...ram.rams }));
			filters.rams = rams;

			let graphics = await ProductModel.aggregate([
				{ $match: findBy },
				{
					$group: {
						_id: '$options.options.graphics',
						graphics: {
							$push: {
								graphic: '$options.options.graphics',
								count: { $sum: 1 }
							}
						}
					}
				},
				{ $unwind: '$graphics' },
				{ $unwind: '$graphics.graphic' },
				{
					$group: {
						_id: { Graphic: '$graphics.graphic' },
						uniqueGraphics: { $addToSet: '$_id' },
						count: { $sum: 1 }
					}
				},
				{ $unwind: '$_id.Graphic' },
				{
					$group: {
						_id: null,
						graphics: { $push: { graphic: '$_id.Graphic', count: '$count' } },
						count: { $sum: 1 }
					}
				},
				{ $unwind: '$graphics' },
				{
					$group: {
						_id: { Graphic: '$graphics.graphic' },
						uniqueGraphics: { $addToSet: '$_id' },
						count: { $sum: '$graphics.count' }
					}
				},
				{ $unwind: '$_id.Graphic' },
				{
					$group: {
						_id: null,
						graphics: { $push: { graphic: '$_id.Graphic', count: '$count' } }
					}
				},
				{ $unwind: '$graphics' },
				{ $sort: { 'graphics.graphic': 1 } },
				{ $project: { _id: 0, graphics: 1 } }
			]);

			graphics = graphics.map(graphic => ({ ...graphic.graphics }));
			filters.graphics = graphics;

			let ssds = await ProductModel.aggregate([
				{ $match: findBy },
				{
					$group: {
						_id: '$options.options.ssd',
						ssds: { $push: { ssd: '$options.options.ssd', count: { $sum: 1 } } }
					}
				},
				{ $unwind: '$ssds' },
				{ $unwind: '$ssds.ssd' },
				{
					$group: {
						_id: { SSD: '$ssds.ssd' },
						uniqueSSD: { $addToSet: '$_id' },
						count: { $sum: 1 }
					}
				},
				{ $unwind: '$_id.SSD' },
				{
					$group: {
						_id: null,
						ssds: { $push: { ssd: '$_id.SSD', count: '$count' } },
						count: { $sum: 1 }
					}
				},
				{ $unwind: '$ssds' },
				{
					$group: {
						_id: { SSD: '$ssds.ssd' },
						uniqueSSD: { $addToSet: '$_id' },
						count: { $sum: '$ssds.count' }
					}
				},
				{ $unwind: '$_id.SSD' },
				{
					$group: {
						_id: null,
						ssds: { $push: { ssd: '$_id.SSD', count: '$count' } }
					}
				},
				{ $unwind: '$ssds' },
				{ $sort: { 'ssds.ssd': 1 } },
				{ $project: { _id: 0, ssds: 1 } }
			]);

			ssds = ssds.map(ssd => ({ ...ssd.ssds }));
			filters.ssds = ssds;

			let hdds = await ProductModel.aggregate([
				{ $match: findBy },
				{
					$group: {
						_id: '$options.options.hdd',
						hdds: { $push: { hdd: '$options.options.hdd', count: { $sum: 1 } } }
					}
				},
				{ $unwind: '$hdds' },
				{ $unwind: '$hdds.hdd' },
				{
					$group: {
						_id: { HDD: '$hdds.hdd' },
						uniqueHDD: { $addToSet: '$_id' },
						count: { $sum: 1 }
					}
				},
				{ $unwind: '$_id.HDD' },
				{
					$group: {
						_id: null,
						hdds: { $push: { hdd: '$_id.HDD', count: '$count' } },
						count: { $sum: 1 }
					}
				},
				{ $unwind: '$hdds' },
				{
					$group: {
						_id: { HDD: '$hdds.hdd' },
						uniqueHDD: { $addToSet: '$_id' },
						count: { $sum: '$hdds.count' }
					}
				},
				{ $unwind: '$_id.HDD' },
				{
					$group: {
						_id: null,
						hdds: { $push: { hdd: '$_id.HDD', count: '$count' } }
					}
				},
				{ $unwind: '$hdds' },
				{ $sort: { 'hdds.hdd': 1 } },
				{ $project: { _id: 0, hdds: 1 } }
			]);

			hdds = hdds.map(hdd => ({ ...hdd.hdds }));
			filters.hdds = hdds;
		}

		if (
			subcategory === 'Laptops' ||
			subcategory === 'Monitors' ||
			subcategory === 'Televisions'
		) {
			let resolutions = await ProductModel.aggregate([
				{ $match: findBy },
				{
					$group: {
						_id: '$options.options.resolution',
						resolutions: {
							$push: {
								resolution: '$options.options.resolution',
								count: { $sum: 1 }
							}
						}
					}
				},
				{ $unwind: '$resolutions' },
				{ $unwind: '$resolutions.resolution' },
				{
					$group: {
						_id: { Resolution: '$resolutions.resolution' },
						uniqueResolutions: { $addToSet: '$_id' },
						count: { $sum: 1 }
					}
				},
				{ $unwind: '$_id.Resolution' },
				{
					$group: {
						_id: null,
						resolutions: {
							$push: { resolution: '$_id.Resolution', count: '$count' }
						},
						count: { $sum: 1 }
					}
				},
				{ $unwind: '$resolutions' },
				{
					$group: {
						_id: { Resolution: '$resolutions.resolution' },
						uniqueResolutions: { $addToSet: '$_id' },
						count: { $sum: '$resolutions.count' }
					}
				},
				{ $unwind: '$_id.Resolution' },
				{
					$group: {
						_id: null,
						resolutions: {
							$push: { resolution: '$_id.Resolution', count: '$count' }
						}
					}
				},
				{ $unwind: '$resolutions' },
				{ $sort: { 'resolutions.resolution': 1 } },
				{ $project: { _id: 0, resolutions: 1 } }
			]);

			resolutions = resolutions.map(resolution => ({
				...resolution.resolutions
			}));
			filters.resolutions = resolutions;
		}

		if (subcategory === 'Tablets' || subcategory === 'Phones') {
			let memorys = await ProductModel.aggregate([
				{ $match: findBy },
				{
					$group: {
						_id: '$options.options.memory',
						memorys: {
							$push: { memory: '$options.options.memory', count: { $sum: 1 } }
						}
					}
				},
				{ $unwind: '$memorys' },
				{ $unwind: '$memorys.memory' },
				{
					$group: {
						_id: { Memory: '$memorys.memory' },
						uniqueMemorys: { $addToSet: '$_id' },
						count: { $sum: 1 }
					}
				},
				{ $unwind: '$_id.Memory' },
				{
					$group: {
						_id: null,
						memorys: { $push: { memory: '$_id.Memory', count: '$count' } },
						count: { $sum: 1 }
					}
				},
				{ $unwind: '$memorys' },
				{
					$group: {
						_id: { Memory: '$memorys.memory' },
						uniqueMemorys: { $addToSet: '$_id' },
						count: { $sum: '$memorys.count' }
					}
				},
				{ $unwind: '$_id.Memory' },
				{
					$group: {
						_id: null,
						memorys: { $push: { memory: '$_id.Memory', count: '$count' } }
					}
				},
				{ $unwind: '$memorys' },
				{ $sort: { 'memorys.memory': 1 } },
				{ $project: { _id: 0, memorys: 1 } }
			]);

			memorys = memorys.map(memory => ({ ...memory.memorys }));
			filters.memorys = memorys;
		}

		if (subcategoryName === 'Headphones' || subcategoryName === 'Speakers') {
			filters.wifi = await ProductModel.aggregate([
				{ $match: findBy },
				{ $group: { _id: '$wifi', count: { $sum: 1 } } },
				{ $sort: { _id: 1 } }
			]);

			filters.bluetooth = await ProductModel.aggregate([
				{ $match: findBy },
				{ $group: { _id: '$bluetooth', count: { $sum: 1 } } },
				{ $sort: { _id: 1 } }
			]);
		}

		return res.json({ ...filters });
	} catch (err) {
		if (err.errmsg) return res.json({ failedMessage: err.errmsg });
		return res.json({ failedMessage: err.message });
	}
};

exports.filterProducts = async (req, res) => {
	const { page } = { ...JSON.parse(req.query.options) } || 1; // Page
	const { showPerPage } = { ...JSON.parse(req.query.options) } || 12; // Page
	const { sortBy } = { ...JSON.parse(req.query.options) } || 'price asc'; // Page
	const sortProducts =
		sortBy === 'price asc'
			? { price: 1 }
			: sortBy === 'price desc'
			? { price: -1 }
			: sortBy === 'year asc'
			? { year: 1 }
			: sortBy === 'year desc'
			? { year: -1 }
			: sortBy === 'popularity asc'
			? { numberOfsales: 1 }
			: sortBy === 'popularity desc'
			? { numberOfsales: -1 }
			: sortBy === 'rating asc'
			? { 'rating.averageRating': 1 }
			: { 'rating.averageRating': -1 };

	const findBy = returnQuery(req.query.options);
	try {
		const getNumberOfProducts = await ProductModel.find(
			findBy
		).countDocuments();
		const limit =
			showPerPage > getNumberOfProducts && getNumberOfProducts > 0
				? getNumberOfProducts
				: showPerPage;
		const skip = showPerPage * page - showPerPage;
		const findProducts = await ProductModel.aggregate([
			{ $match: findBy },
			{ $sort: sortProducts },
			{ $skip: parseInt(skip) },
			{ $limit: parseInt(limit) },
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
			}
		]);

		const numberOfPages = Math.ceil(getNumberOfProducts / showPerPage);
		return res.json({
			products: findProducts,
			pages: { numberOfProducts: getNumberOfProducts, numberOfPages }
		});
	} catch (err) {
		console.log(err);
		if (err.errmsg) return res.json({ failedMessage: err.errmsg });
		return res.json({ failedMessage: err.message });
	}
};
