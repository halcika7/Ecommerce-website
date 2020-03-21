/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../../store/actions';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import './Products.css';
import Breadcrumb from '../../components/UI/Breadcrumb/Breadcrumb';
import Categories from './Categories/Categories';
import Filters from './Filters/Filters';

import { helperForChoosenValues } from '../../../helpers/product';
import ProductBox from '../../components/UI/ProductBox/ProductBox';
import Pagination from '../../components/UI/Pagination/Pagination';
import ProductBoxHorizontal from '../../components/UI/ProductBox/ProductBoxHorizontal';
import FluidIcons from '../../components/UI/FluidIcons/FluidIcons';
import SmallSpinner from '../../components/UI/SmallSpinner/SmallSpinner';

const Name = props => {
	const [subcategoryName, setSubcategoryName] = useState('');
	const [category, setCategory] = useState('');
	const [subcategory, setSubcategory] = useState('');
	const [products, setproducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [filtersApplyed, setFiltersApplyed] = useState(false);
	// filters
	const [brands, setBrands] = useState([]);
	const [colors, setColors] = useState([]);
	const [sizes, setSizes] = useState([]);
	const [graphics, setGraphics] = useState([]);
	const [ssds, setSSDS] = useState([]);
	const [hdds, setHDDS] = useState([]);
	const [rams, setRams] = useState([]);
	const [resolutions, setResolutions] = useState([]);
	const [memorys, setMemorys] = useState([]);
	const [displays, setDisplays] = useState([]);
	const [wifi, setWifi] = useState([]);
	const [bluetooth, setBluetooth] = useState([]);
	const [consoles, setConsoles] = useState([]);
	// choosen filters
	const [choosenBrands, setChoosenBrands] = useState([]);
	const [choosenColors, setChoosenColors] = useState([]);
	const [choosenSizes, setChoosenSizes] = useState([]);
	const [choosenGraphics, setChoosenGraphics] = useState([]);
	const [choosenSSDS, setChoosenSSDS] = useState([]);
	const [choosenHDDS, setChoosenHDDS] = useState([]);
	const [choosenRams, setChoosenRams] = useState([]);
	const [choosenResolutions, setChoosenResolutions] = useState([]);
	const [choosenMemorys, setChoosenMemorys] = useState([]);
	const [choosenDisplays, setChoosenDisplays] = useState([]);
	const [choosenConsoles, setChoosenConsoles] = useState([]);
	const [choosenWifi, setChoosenWifi] = useState([]);
	const [choosenBluetooth, setChoosenBluetooth] = useState([]);
	// pagination
	const [pageNum, setPageNum] = useState(1);
	const [showPerPage, setShowPerPage] = useState(12);
	const [numberOfProducts, setNumberOfProducts] = useState(0);
	const [sortBy, setSortBy] = useState('price asc');

	useEffect(() => {
		setOptions();
	}, []);
	useEffect(() => {
		setOptions();
	}, [props.location.search]);
	useEffect(() => {
		setCategories(props.categories);
	}, [props.categories]);
	useEffect(() => {
		setproducts(props.products);
	}, [props.products]);
	// set filters
	useEffect(() => {
		helperForChoosenValues(
			choosenBrands,
			props.brands,
			setChoosenBrands,
			'_id',
			setBrands
		);
	}, [props.brands, brands]);
	useEffect(() => {
		helperForChoosenValues(
			choosenColors,
			props.allColors,
			setChoosenColors,
			'color',
			setColors
		);
	}, [props.allColors, colors]);
	useEffect(() => {
		helperForChoosenValues(
			choosenSizes,
			props.sizes,
			setChoosenSizes,
			'size',
			setSizes
		);
	}, [props.sizes, sizes]);
	useEffect(() => {
		helperForChoosenValues(
			choosenGraphics,
			props.graphics,
			setChoosenGraphics,
			'graphic',
			setGraphics
		);
	}, [props.graphics, graphics]);
	useEffect(() => {
		helperForChoosenValues(
			choosenSSDS,
			props.ssds,
			setChoosenSSDS,
			'ssd',
			setSSDS
		);
	}, [props.ssds, ssds]);
	useEffect(() => {
		helperForChoosenValues(
			choosenHDDS,
			props.hdds,
			setChoosenHDDS,
			'hdd',
			setHDDS
		);
	}, [props.hdds, hdds]);
	useEffect(() => {
		helperForChoosenValues(
			choosenRams,
			props.rams,
			setChoosenRams,
			'ram',
			setRams
		);
	}, [props.rams, rams]);
	useEffect(() => {
		helperForChoosenValues(
			choosenResolutions,
			props.resolutions,
			setChoosenResolutions,
			'resolution',
			setResolutions
		);
	}, [props.resolutions, resolutions]);
	useEffect(() => {
		helperForChoosenValues(
			choosenMemorys,
			props.memorys,
			setChoosenMemorys,
			'memory',
			setMemorys
		);
	}, [props.memorys, memorys]);
	useEffect(() => {
		helperForChoosenValues(
			choosenDisplays,
			props.displays,
			setChoosenDisplays,
			'display',
			setDisplays
		);
	}, [props.displays, displays]);
	useEffect(() => {
		helperForChoosenValues(
			choosenConsoles,
			props.consoles,
			setChoosenConsoles,
			'console',
			setConsoles
		);
	}, [props.consoles, consoles]);
	useEffect(() => {
		helperForChoosenValues(
			choosenWifi,
			props.wifi,
			setChoosenWifi,
			'_id',
			setWifi
		);
	}, [props.wifi, wifi]);
	useEffect(() => {
		helperForChoosenValues(
			choosenBluetooth,
			props.bluetooth,
			setChoosenBluetooth,
			'_id',
			setBluetooth
		);
	}, [props.bluetooth, bluetooth]);

	useEffect(() => {
		setNumberOfProducts(props.pages.numberOfProducts);
	}, [props.pages]);

	useEffect(() => {
		applyFilters();
	}, [pageNum]);
	useEffect(() => {
		applyFilters();
	}, [showPerPage]);
	useEffect(() => {
		applyFilters();
	}, [sortBy]);

	const setOptions = () => {
		setSubcategoryName('');
		setFiltersApplyed(false);
		setPageNum(1);
		setNumberOfProducts(0);
		setBrands(brands.splice(0, brands.length));
		setSizes(sizes.splice(0, sizes.length));
		setColors(colors.splice(0, colors.length));
		setGraphics(graphics.splice(0, graphics.length));
		setSSDS(ssds.splice(0, ssds.length));
		setHDDS(hdds.splice(0, hdds.length));
		setRams(rams.splice(0, rams.length));
		setResolutions(resolutions.splice(0, resolutions.length));
		setMemorys(memorys.splice(0, memorys.length));
		setDisplays(displays.splice(0, displays.length));
		setConsoles(consoles.splice(0, consoles.length));
		setWifi(wifi.splice(0, wifi.length));
		setBluetooth(bluetooth.splice(0, bluetooth.length));
		setChoosenBrands(choosenBrands.splice(0, choosenBrands.length));
		setChoosenColors(choosenColors.splice(0, choosenColors.length));
		setChoosenSizes(choosenSizes.splice(0, choosenSizes.length));
		setChoosenGraphics(choosenGraphics.splice(0, choosenGraphics.length));
		setChoosenSSDS(choosenSSDS.splice(0, choosenSSDS.length));
		setChoosenHDDS(choosenHDDS.splice(0, choosenHDDS.length));
		setChoosenRams(choosenRams.splice(0, choosenRams.length));
		setChoosenResolutions(
			choosenResolutions.splice(0, choosenResolutions.length)
		);
		setChoosenMemorys(choosenMemorys.splice(0, choosenMemorys.length));
		setChoosenDisplays(choosenDisplays.splice(0, choosenDisplays.length));
		setChoosenConsoles(choosenConsoles.splice(0, choosenConsoles.length));
		setChoosenBluetooth(choosenBluetooth.splice(0, choosenBluetooth.length));
		setChoosenWifi(choosenWifi.splice(0, choosenWifi.length));
		setSubcategoryName(
			new URLSearchParams(props.location.search).get('subcategoryName')
		);
		setCategory(new URLSearchParams(props.location.search).get('category'));
		setSubcategory(
			new URLSearchParams(props.location.search).get('subcategory')
		);
		setCategories(props.categories);
		applyFilters();
		props.getBannerProducts();
	};

	const filterChange = (e, choosenValues, setChoosenValues, boolean = null) => {
		const name = e.currentTarget.name,
			newChoosenValues = [...choosenValues];
		if (e.currentTarget.checked) {
			const value = boolean
				? JSON.parse(name)
				// eslint-disable-next-line eqeqeq
				: parseInt(name) == name
				? parseInt(name)
				: name;
			newChoosenValues.push(value);
		} else {
			const findIndex = newChoosenValues.findIndex(value => value === name);
			newChoosenValues.splice(findIndex, 1);
		}
		setChoosenValues(newChoosenValues);
	};

	const applyFilters = (e = null) => {
		if (e) {
			e.preventDefault();
			setFiltersApplyed(true);
		}
		const obj = {
			category: new URLSearchParams(props.location.search).get('category'),
			subcategoryName: new URLSearchParams(props.location.search).get(
				'subcategoryName'
			),
			subcategory: new URLSearchParams(props.location.search).get(
				'subcategory'
			),
			brand: choosenBrands,
			color: choosenColors,
			size: choosenSizes,
			consoles: choosenConsoles,
			displays: choosenDisplays,
			ram: choosenRams,
			graphics: choosenGraphics,
			ssd: choosenSSDS,
			hdd: choosenHDDS,
			resolution: choosenResolutions,
			memory: choosenMemorys,
			wifi: choosenWifi,
			bluetooth: choosenBluetooth,
			page: pageNum,
			showPerPage,
			sortBy
		};
		props.filterProducts(obj);
		props.getFilters(obj);
	};

	const clearFilters = e => {
		e.preventDefault();
		setOptions();
	};
	const changePage = pageNum => setPageNum(pageNum);
	const perPageNumber = e => {
		setPageNum(1);
		setShowPerPage(e.target.value);
	};
	const sortChange = e => {
		setPageNum(1);
		setSortBy(e.target.value);
		setShowPerPage(12);
	};

	return (
		<React.Fragment>
			<Breadcrumb
				links={[
					{ link: '/', value: 'Home' },
					{
						link: `/products?category=${category}&subcategoryName=${subcategoryName}&subcategory=${subcategory}`,
						value: category
					},
					{
						link: `/products?category=${category}&subcategoryName=${subcategoryName}&subcategory=${subcategory}`,
						value: subcategoryName
					},
					{
						link: `/products?category=${category}&subcategoryName=${subcategoryName}&subcategory=${subcategory}`,
						value: subcategory
					}
				]}
			/>
			<div className="container products">
				<div className="row">
					<div className="col-lg-3 col-md-4">
						<Categories categories={categories} />
						{brands.length > 0 && (
							<Filters
								values={brands}
								choosenValues={choosenBrands}
								setChoosenValues={setChoosenBrands}
								filterChange={filterChange}
								property="_id"
								label="Brand"
							/>
						)}
						{colors.length > 0 && (
							<Filters
								values={colors}
								choosenValues={choosenColors}
								setChoosenValues={setChoosenColors}
								filterChange={filterChange}
								property="color"
								label="Color"
							/>
						)}
						{sizes.length > 0 && (
							<Filters
								values={sizes}
								choosenValues={choosenSizes}
								setChoosenValues={setChoosenSizes}
								filterChange={filterChange}
								property="size"
								label="Size"
							/>
						)}
						{graphics.length > 0 && (
							<Filters
								values={graphics}
								choosenValues={choosenGraphics}
								setChoosenValues={setChoosenGraphics}
								filterChange={filterChange}
								property="graphic"
								label="Graphics"
							/>
						)}
						{memorys.length > 0 && (
							<Filters
								values={memorys}
								choosenValues={choosenMemorys}
								setChoosenValues={setChoosenMemorys}
								filterChange={filterChange}
								property="memory"
								label="Memory"
							/>
						)}
						{displays.length > 0 && (
							<Filters
								values={displays}
								choosenValues={choosenDisplays}
								setChoosenValues={setChoosenDisplays}
								filterChange={filterChange}
								property="display"
								label="Display"
							/>
						)}
						{consoles.length > 0 && (
							<Filters
								values={consoles}
								choosenValues={choosenConsoles}
								setChoosenValues={setChoosenConsoles}
								filterChange={filterChange}
								property="console"
								label="Consoles"
							/>
						)}
						{ssds.length > 0 && (
							<Filters
								values={ssds}
								choosenValues={choosenSSDS}
								setChoosenValues={setChoosenSSDS}
								filterChange={filterChange}
								property="ssd"
								label="SSD"
							/>
						)}
						{hdds.length > 0 && (
							<Filters
								values={hdds}
								choosenValues={choosenHDDS}
								setChoosenValues={setChoosenHDDS}
								filterChange={filterChange}
								property="hdd"
								label="HDD"
							/>
						)}
						{rams.length > 0 && (
							<Filters
								values={rams}
								choosenValues={choosenRams}
								setChoosenValues={setChoosenRams}
								filterChange={filterChange}
								property="ram"
								label="Ram"
							/>
						)}
						{resolutions.length > 0 && (
							<Filters
								values={resolutions}
								choosenValues={choosenResolutions}
								setChoosenValues={setChoosenResolutions}
								filterChange={filterChange}
								property="resolution"
								label="Resolution"
							/>
						)}
						{bluetooth.length > 0 && (
							<Filters
								values={bluetooth}
								choosenValues={choosenBluetooth}
								setChoosenValues={setChoosenBluetooth}
								filterChange={filterChange}
								property="_id"
								label="Bluetooth"
							/>
						)}
						<div className="col-12">
							<button
								type="button"
								className="mt-4 apply-filters"
								onClick={applyFilters}>
								Apply Filters
							</button>
						</div>
						{filtersApplyed && (
							<div className="col-12">
								<button
									type="button"
									className="mt-4 apply-filters"
									onClick={clearFilters}>
									Clear Filters
								</button>
							</div>
						)}
					</div>
					<div className="col-lg-9 col-md-8">
						<div className="col-12 d-none d-md-block mt-4">
							{props.banner.length > 0 ? (
								<OwlCarousel
									className="owl-carousel-main owl-carousel owl-theme"
									loop
									margin={10}
									dotsEach={true}
									dots={true}
									items={1}
									animateIn={true}
									lazyLoad={true}>
									{props.banner.map((product, index) => (
										<div className="product" key={index}>
											<div className="left-part">
												<h1>
													<Link to={`/product?id=${product._id}`}>
														{product.name}
													</Link>
												</h1>
												<div className="row">
													<div className="old-price">
														Starting from: ${product.price}
													</div>
												</div>
											</div>
											<div className="right-part">
												<img
													className="owl-lazy"
													data-src={product.options[0].featuredPicture}
													alt={product.name}
												/>
											</div>
										</div>
									))}
								</OwlCarousel>
							) : (
								<div className="card">
									<SmallSpinner />
								</div>
							)}
						</div>
						<div className="col-12 heading">
							<h5>{subcategoryName}</h5>
						</div>
						<div className="col-12 products">
							<div className="nav-search">
								<div className="row">
									<div className="col-12 col-sm-3 col-md-4 col-lg-3">
										<ul
											className="nav nav-tabs products"
											id="myTab"
											role="tablist">
											<li className="nav-item">
												<a
													className="nav-link active"
													id="home-tab"
													data-toggle="tab"
													href="#home">
													<i className="fas fa-list" />
												</a>
											</li>
											<li className="nav-item">
												<a
													className="nav-link"
													id="profile-tab"
													data-toggle="tab"
													href="#profile">
													<i className="fas fa-ellipsis-h" />
												</a>
											</li>
										</ul>
									</div>
									<div className="col-12 col-sm-9 col-md-8 col-lg-9">
										<div className="popularity">
											<select className="" onChange={sortChange}>
												<option value="price asc">Sort By Price Asc</option>
												<option value="price desc">Sort By Price Desc</option>
												<option value="year asc">Year Release Asc</option>
												<option value="year desc">Year Release Desc</option>
												<option value="popularity asc">
													Sort by number of sales Asc
												</option>
												<option value="popularity desc">
													Sort by number of sales Desc
												</option>
												<option value="rating asc">
													Sort by average rating Asc
												</option>
												<option value="rating desc">
													Sort by average rating Desc
												</option>
											</select>
										</div>
										<div className="popularity">
											<select className="" onChange={perPageNumber}>
												<option value={12}>12</option>
												<option value={15}>15</option>
												<option value={20}>20</option>
												<option value={25}>25</option>
											</select>
										</div>
									</div>
								</div>
							</div>
							<div className="tab-content" id="myTabContent">
								<div
									className="tab-pane fade show active"
									id="home"
									role="tabpanel"
									aria-labelledby="home-tab">
									<div className="row">
										{products.length === 0 ? (
											<h3>No products found</h3>
										) : !props.loading ? (
											<ProductBox products={products} larger />
										) : (
											<SmallSpinner />
										)}
									</div>
								</div>
								<div
									className="tab-pane fade"
									id="profile"
									role="tabpanel"
									aria-labelledby="profile-tab">
									<div className="row">
										{products.length === 0 ? (
											<h3>No products found</h3>
										) : !props.loading ? (
											<ProductBoxHorizontal products={products} />
										) : (
											<SmallSpinner />
										)}
									</div>
								</div>
							</div>
						</div>
						<Pagination
							numberOfProducts={numberOfProducts}
							pageNum={pageNum}
							showPerPage={showPerPage}
							changePage={changePage}
						/>
					</div>
				</div>
			</div>
			<FluidIcons />
		</React.Fragment>
	);
};

const mapStateToProps = state => ({
	products: state.filteredProducts.products,
	brands: state.filteredProducts.brands,
	allColors: state.filteredProducts.colors,
	sizes: state.filteredProducts.sizes,
	graphics: state.filteredProducts.graphics,
	hdds: state.filteredProducts.hdds,
	rams: state.filteredProducts.rams,
	ssds: state.filteredProducts.ssds,
	resolutions: state.filteredProducts.resolutions,
	memorys: state.filteredProducts.memorys,
	displays: state.filteredProducts.displays,
	wifi: state.filteredProducts.wifi,
	bluetooth: state.filteredProducts.bluetooth,
	consoles: state.filteredProducts.consoles,
	pages: state.filteredProducts.pages,
	categories: state.category.allCategories,
	banner: state.product.bannerProducts,
	loading: state.filteredProducts.loading
});

const mapDispatchToProps = dispatch => ({
	filterProducts: obj => dispatch(actions.filterProducts(obj)),
	getFilters: obj => dispatch(actions.getFilters(obj)),
	getBannerProducts: () => dispatch(actions.getBannerProducts())
});

export default React.memo(connect(
	mapStateToProps,
	mapDispatchToProps
)(Name));
