import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import DataTable from '../../components/UI/DataTable/DataTable';

import ResponseMessages from '../../../users/components/UI/ResponseMessages/ResponseMessages';
import SmallSpinner from '../../../users/components/UI/SmallSpinner/SmallSpinner';

const AllBrands = props => {
    const [brands, setBrands] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => { 
        setBrands({...props.brand.allBrands}); 
        props.getBrands();
    },[]);

    useEffect(() => { 
        setLoading(props.brand.loading);
    },[props.brand.loading]);

    useEffect(() => { 
        setBrands({ ...props.brand.allBrands });
    }, [props.brand.allBrands]);

    const deleteBrand = (e,id) => { e.preventDefault(); props.deleteBrand(id); }

    return (
        <React.Fragment>
            <div className="AdminProfile row">
                {props.brand.successMessage ? <ResponseMessages message={props.brand.successMessage} /> : null}
                {props.brand.failedMessage ? <ResponseMessages ClassName="Danger" message={props.brand.failedMessage} /> : null}
                <div className={'col-12 text-white'}>
                    {props.brand.loading ? 
                    <div className="card mb-30 bg-white">
                        <SmallSpinner /> 
                    </div> : 
                    <div className="card mb-30">
                        <DataTable brandsData={brands} click={deleteBrand} loading={loading}/>
                    </div> }
                </div>
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        brand: state.brand
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getBrands: () => dispatch(actions.getAllBrands()),
        deleteBrand: (id) => dispatch(actions.deleteBrand(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllBrands);