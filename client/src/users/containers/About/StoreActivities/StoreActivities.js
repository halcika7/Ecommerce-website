import React from 'react';
import StoreActivity from './StoreActivity/StoreActivity';
import c from './StoreActivities.module.css';

const storeActivities = (props) => {
    const activities = props.activities.map( (activity, index) => {
        return <StoreActivity activity={activity} key={index} />;
    });
    return(
        <React.Fragment>
            <div className={c.storeactivities}>
                <div className={c.container + " container"}>
                    <h5>Our Store Activities</h5>
                    <div className="row">
                        {activities}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default storeActivities;