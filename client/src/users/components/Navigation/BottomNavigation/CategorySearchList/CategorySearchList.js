import React, {Component} from 'react';
import SubCategory from './SubCategory/SubCategory';

import c from '../../Navigation.module.css';

class CategorySearchList extends Component {
    state = {
        categories: [
            {
                name:'Clothing',
                index: 1,
                subCategories: [
                    {
                        name: 'Man',
                        index: 1234567,
                        subCategories: [
                            {
                                name:'Monitors', link: '/', index: 123
                            },
                            {
                                name: 'Software', link: '/', index: 1234
                            }
                        ] 
                    },
                    {
                        name: 'Monitors', link: '/', index: 12345
                    },
                    {
                        name: 'Software', link: '/', index: 123456
                    }
                ]
            },
            {
                name: 'Accessories',
                index: 2,
                subCategories: [
                    {name: 'TV', link: '/',index:198},
                    {name: 'Monitors', link: '/',index:19},
                    {name: 'Software', link: '/',index:110}
                ]
            },
            {
                name: 'Accessories',
                index: 3,
                subCategories: [
                    {name: 'TV', link: '/',index:120},
                    {name: 'Monitors', link: '/',index:230},
                    {name: 'Software', link: '/', index:340}
                ]
            },
            {
                name: 'Accessories',
                index: 4,
                subCategories: [
                    {name: 'TV', link: '/',index:450},
                    {name: 'Monitors', link: '/',index:560},
                    {name: 'Software', link: '/',index:670}
                ]
            }
        ],
    }
    render () {
        const categories = this.state.categories.map( (category) => {
            const subCateg = category.subCategories.map(categ => {
                return <SubCategory categ={categ} key={categ.index}/>
            })
            return(
                <li className={c.navItemm} key={Date.now() * Math.random()}>
                    <span className={c.dropdownNavCategoryLinks}><i className="fas fa-angle-right"></i>{category.name} ({category.subCategories.length})</span>
                    <div className={c.categoryNavSearchList + " " +c.sub}>
                        <ul className={c.catChild}>
                            {subCateg}
                        </ul>
                    </div>
                </li>
            );
        });
        return (
            <ul>
                {categories}
            </ul>
        );
    }
}

export default CategorySearchList;