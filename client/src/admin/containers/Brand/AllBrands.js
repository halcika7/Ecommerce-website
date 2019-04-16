import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import DataTable from '../../components/UI/DataTable/DataTable';

import ResponseMessages from '../../../users/components/UI/ResponseMessages/ResponseMessages';
import SmallSpinner from '../../../users/components/UI/SmallSpinner/SmallSpinner';

const AllBrands = props => {
    const [brands, setBrands] = useState([]);
    const [deleteManyRecords, setDeleteManyRecords] = useState([]);
    const [loading, setLoading] = useState(false)
    useEffect(() => { 
        setBrands({...props.brand.allBrands}); 
        props.getBrands();
        const table = document.querySelector('table');
        console.log(table)
    },[]);

    useEffect(() => { 
        setLoading(props.brand.loading);
    },[props.brand.loading]);

    useEffect(() => { 
        setBrands({ ...props.brand.allBrands });
    }, [props.brand.allBrands]);

    const deleteBrand = (e,id) => { e.preventDefault(); props.deleteBrand(id); }
    const deleteManyBrands = (e,ids) => { e.preventDefault(); props.deleteManyBrands(ids); setDeleteManyRecords([]); }

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
                        <div className="card-header">
                            <h4>All Brands</h4>
                        </div>
                        {(deleteManyRecords.length > 0) && <div className="col-12">
                            <div className="ButtonWrapper col-12 mt-20">
                                <button className='ButtonDanger' onClick={e => deleteManyBrands(e, deleteManyRecords)}>Delete Selected Records</button>
                            </div>
                        </div>}
                        <DataTable brandsData={brands} click={deleteBrand} loading={loading} selectedDeleteData={deleteManyRecords} setDeleteData={setDeleteManyRecords}/>
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
        deleteBrand: (id) => dispatch(actions.deleteBrand(id)),
        deleteManyBrands: (ids) => dispatch(actions.deleteManyBrands(ids))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllBrands);