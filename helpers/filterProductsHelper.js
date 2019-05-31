exports.returnQuery = obj => {
    const { category, subcategoryName, subcategory, min, max, brand, color, size, consoles, displays, ram, graphics, ssd, hdd, resolution, memory, wifi, bluetooth } = {...JSON.parse(obj)};
    const findBy = { category, 'subcategories.subName': subcategoryName, 'subcategories.sub': subcategory,  published: true }

    if(min !== undefined && max !== undefined) { findBy.price = { $gte: min, $lte: max  } }
    if(brand && brand.length > 0) { findBy.brand = { $in: brand } }
    if(subcategory !== 'Games' && subcategory !== 'Projection Screens' && color && color.length > 0) { findBy['options.color'] = { $in: color } }
    if((category === 'Clothing' || category === 'Shoes') && size && size.length > 0) { findBy['options.options.size'] = { $in: size } }
    if(subcategory === 'Games' && consoles && consoles.length > 0) { findBy['options.console'] = { $in: consoles }  }
    if((subcategory === 'Projection Screens' || subcategory === 'Monitors' || subcategory === 'Televisions') && displays && displays.length > 0) {
        const slug = subcategory === 'Projection Screens' ? 'options.display' : 'options.options.display';
        findBy[slug] = { $in: displays };
    }
    if((subcategory === 'Desktop Computers' || subcategory === 'Laptops') && ram && ram.length > 0) { findBy['options.options.ram'] = { $in: ram } }
    if((subcategory === 'Desktop Computers' || subcategory === 'Laptops') && graphics && graphics.length > 0) { findBy['options.options.graphics'] = { $in: graphics } }
    if((subcategory === 'Desktop Computers' || subcategory === 'Laptops') && ssd && ssd.length > 0) { findBy['options.options.ssd'] = { $in: ssd } }
    if((subcategory === 'Desktop Computers' || subcategory === 'Laptops') && hdd && hdd.length > 0) { findBy['options.options.hdd'] = { $in: hdd } }
    if((subcategory === 'Laptops' || subcategory === 'Monitors' || subcategory === 'Televisions') && resolution && resolution.length > 0) { findBy['options.options.resolution'] = { $in: resolution } }
    if((subcategory === 'Tablets' || subcategory === 'Phones') && memory && memory.length > 0) { findBy['options.options.memory'] = { $in: memory } }
    if((subcategoryName === 'Headphones' || subcategoryName === 'Speakers') && wifi && wifi.length > 0) { findBy.wifi = { $in: wifi} }
    if((subcategoryName === 'Headphones' || subcategoryName === 'Speakers') && bluetooth && bluetooth.length > 0) { findBy.bluetooth = { $in: bluetooth} }
    return findBy;
}