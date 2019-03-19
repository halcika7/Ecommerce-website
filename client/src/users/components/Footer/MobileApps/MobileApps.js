import React from 'react';
import c from './MobileApps.module.css';

const mobileApps = (props) => {
    return (
        <div className={c.mobileapps + " col-12"}>
            <h5>Mobile Apps</h5>
            <div className={c.row + " row"}>
                <a href="/">
                    <div className={c.mobilelinks}>
                    <i className="fas fa-mobile-alt"></i>
                        <div className={c.text}>
                            <h5>App Store</h5>
                            <p>Available now on the</p>
                        </div>
                    </div>
                </a>
                <a href="/">
                    <div className={c.mobilelinks}>
                        <i className="fab fa-android"></i>
                        <div className={c.text}>
                            <h5>Google Play</h5>
                            <p>Get it on</p>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    );
}

export default mobileApps;