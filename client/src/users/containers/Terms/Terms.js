import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';
import ContainerIcons from '../../components/UI/ContainerIcons/ContainerIcons';
import Term from './Term/Term';

import c from './Terms.module.css';

const state = {
    terms: [
        {heading: 'What are Terms and Conditions', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in accumsan dui. Donec imperdiet, nisl non pharetra convallis, nunc sapien laoreet massa, ac elementum arcu neque vitae enim. Praesent convallis leo est, scelerisque tincidunt magna ultricies eu. Ut placerat est a eros faucibus feugiat. Nullam a urna sit amet sem porttitor quis nibh. In hac habitasse platea dictumst. Donec sit amet auctor leo. Sed venenatis posuere risus quis dictum. Vivamus ullamcorper orci vitae eros tincidunt, a aliquet lacus Sed consectetur, est vel tincidunt imperdiet, justo est dignissim lorem, nec tincidunt lacus lacus ac risus. Cras pretium enim nec vestibulum aliquam. Vestibulum ante ipsum faucibus orci luctus et ultrices posuere cubilia Curae;'},
        {heading: 'What are Terms and Conditions', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in accumsan dui. Donec imperdiet, nisl non pharetra convallis, nunc sapien laoreet massa, ac elementum arcu neque vitae enim. Praesent convallis leo est, scelerisque tincidunt magna ultricies eu. Ut placerat est a eros faucibus feugiat. Nullam a urna sit amet sem porttitor quis nibh. In hac habitasse platea dictumst. Donec sit amet auctor leo. Sed venenatis posuere risus quis dictum. Vivamus ullamcorper orci vitae eros tincidunt, a aliquet lacus Sed consectetur, est vel tincidunt imperdiet, justo est dignissim lorem, nec tincidunt lacus lacus ac risus. Cras pretium enim nec vestibulum aliquam. Vestibulum ante ipsum faucibus orci luctus et ultrices posuere cubilia Curae;'}
    ],
}
const Terms = props => {

    useEffect(() => {
        document.title = "Terms";
    }, []);

    const terms = state.terms.map((term,index) => {
        return <Term term={term} key={index} />
    });
    
    return(
        <React.Fragment>
            <div className="container-fluid breadcrum">
                <div className="container">
                    <div className="inline-nav">
                        <Link to="/">Home</Link>
                        <i className="fas fa-long-arrow-alt-right"></i>
                        <a className="prevent-click" href="/">Terms & Conditions</a>
                    </div>
                </div>
            </div>
    
            <div className={c.container + " container " + c.conditions}>
                <div className={c.conditions}>
                    {terms}
                </div>
            </div>
    
            <ContainerIcons />
        </React.Fragment>
    );
}

export default Terms;