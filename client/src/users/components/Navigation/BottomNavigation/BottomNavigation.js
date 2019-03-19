import React, {Component} from 'react';

import CategorySearchList from './CategorySearchList/CategorySearchList';
import NavItem from './NavItem/NavItem';
import DropdownMenu from './DropdownMenu/DropdownMenu';

import c from '../Navigation.module.css';

class BottomNavigation extends Component {
    state = {
        navItems: [
            {name: 'Home', link: '/',classes: {first:c.navItem, second:c.navLink, third: c.active}},
            {name: 'Contact', link: '/contact', classes: {first:c.navItem, second:c.navLink, third: c.active}},
            {name: 'About', link: '/about',classes: {first:c.navItem, second:c.navLink, third: c.active}},
            {name: 'Blog', link: '/blog',classes: {first:c.navItem, second:c.navLink, third: c.active}},
            {name: 'Weekly Deals', link: '/weeklydeals',classes: {first:c.navItem, second:c.navLink, third: c.active}},
            {name: 'Daily Deals', link: '/dailydeals',classes: {first:c.navItem, second:c.navLink, third: c.active}}
        ],
    }
    
    dropdwonToggler = (event) => {
        event.currentTarget.parentElement.children[2].classList.toggle(c.active);

        let height = null, autoHeight = null;
        let s = event.currentTarget.parentElement.children[2];

        if(s.classList.contains('show')){
            autoHeight = s.offsetHeight;
            height = s.offsetHeight;
            let animate = setInterval(() => {
                height -= (autoHeight / 17);
                s.style.height = height + 'px';
                if(height <= 1){
                    clearInterval(animate);
                    s.style = '';
                    s.classList.remove('show');
                }
            },20);
        }else {
            s.classList = 'navbar-collapse collapse show';
            autoHeight = s.offsetHeight;
            s.style.height = '0px';
            s.classList = 'navbar-collapse collapsing';
            height = 0;
            let animate = setInterval(() => {
                height += (autoHeight / 17);
                s.style.height = height + 'px';
                if(height >= autoHeight){
                    clearInterval(animate);
                    s.style = '';
                }
            },20);
            
            s.classList = 'navbar-collapse collapse show';
        }
    }

    categoryDrop = (event) => {
        event.currentTarget.parentElement.children[1].classList.toggle(c.active)
    }
    
    render() {
        const navItems = this.state.navItems.map((item,index) => {
            return <NavItem item={item} key={index} />
        });
        const navbar = [c.navbar,c.navbarexpandlg,c.navbarDark,c.bgDark];
        const btn = [c.btn,c.btnPrimary,c.btnMd,c.dropdownToggle];
        return (
            <React.Fragment>
                <nav className={navbar.join(" ") + " navbar navbar-expand-lg navbar-dark bg-dark"}>
                    <div className={c.container + " container"}>
                        <div className={c.dropdown + " dropdown d-none d-lg-block"}>
                            <div className={c.container + " container"}>
                                <button style={{padding: '0'}} className={btn.join(' ') + " btn btn-primary btn-md dropdown-toggle d-none d-lg-block"}
                                onClick={this.categoryDrop} aria-label="categories">
                                All Categories
                                </button>
                                <div className={c.dropdownMenu + " dropdown-menu"}>
                                    <ul>
                                        <li>
                                            <img src="https://png.icons8.com/office/30/000000/clothes.png" alt=""/> Clothing
                                            <DropdownMenu />
                                        </li>
                                        <li>
                                            <img src="https://png.icons8.com/color/30/000000/mens-shoe.png" alt=""/> Shoes
                                        </li>
                                        <li>
                                            <img src="https://png.icons8.com/office/30/000000/windows-client.png" alt=""/> PC
                                        </li>
                                        <li>
                                            <img src="https://png.icons8.com/office/30/000000/laptop.png" alt=""/> Laptops
                                        </li>
                                        <li>
                                            <img src="https://png.icons8.com/doodle/30/000000/saxophone.png" alt=""/> Musical Equipment
                                        </li>
                                        <li>
                                            <img src="https://png.icons8.com/dusk/30/000000/collectibles.png" alt=""/> Collective
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <button className="navbar-toggler" aria-label="toggler" onClick={this.dropdwonToggler}>
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse">
                            <ul className={c.navbarNav + " navbar-nav"}>
                                {navItems}
                                <li className={c.navItem + " nav-item d-lg-none"}>
                                    <p className={c.navLink + " nav-link " + c.dropdownNavCategoryLinks}>Categories<i className="fas fa-angle-right"></i></p>
                                    <div className={c.categoryNavSearchList}>
                                        <CategorySearchList />
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </React.Fragment>
        );
    }
}

export default BottomNavigation;