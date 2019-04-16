import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import DataTable from '../../components/UI/DataTable/DataTable';

import ResponseMessages from '../../../users/components/UI/ResponseMessages/ResponseMessages';
import SmallSpinner from '../../../users/components/UI/SmallSpinner/SmallSpinner';

const TableContainer = props => {
    const [brands, setBrands] = useState(false);
    const [allCategoryIcons, setAllCategoryIcons] = useState(false);
    const [allCategories, setAllCategories] = useState(false);

    const [failedMessage, setFailedMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deleteManyRecords, setDeleteManyRecords] = useState([]);

    useEffect(() => { 
        setBrands(props.brand.allBrands); props.getBrands();
        setAllCategories(props.categories.allCategories); props.getAllCategories();
        setAllCategoryIcons(props.icons.allCategoryIcons); props.getAllCategoryIcons();
    },[]);

    useEffect(() => { setBrands(props.brand.allBrands); },[props.Brands]);
    useEffect(() => { setAllCategories(props.categories.allCategories); },[props.Categories]);
    useEffect(() => { setAllCategoryIcons(props.icons.allCategoryIcons); },[props.Icons]);

    useEffect(() => { setBrands(props.brand.allBrands); }, [props.brand.allBrands]);
    useEffect(() => { setAllCategories(props.categories); }, [props.categories.allCategories]);
    useEffect(() => { setAllCategoryIcons(props.icons.allCategoryIcons); }, [props.icons]);

    useEffect(() => { setFailedMessage(props.brand.failedMessage); },[props.brand.failedMessage]);
    useEffect(() => { setFailedMessage(props.categories.failedMessage); },[props.categories.failedMessage]);
    useEffect(() => { setFailedMessage(props.icons.failedMessage); },[props.icons.failedMessage]);

    useEffect(() => { setSuccessMessage(props.brand.successMessage); },[props.brand.successMessage]);
    useEffect(() => { setSuccessMessage(props.categories.successMessage); },[props.categories.successMessage]);
    useEffect(() => { setSuccessMessage(props.icons.successMessage); },[props.icons.successMessage]);

    useEffect(() => { setLoading(props.brand.loading); },[props.brand.loading]);
    useEffect(() => { setLoading(props.categories.loading); },[props.categories.loading]);
    useEffect(() => { setLoading(props.icons.loading); },[props.icons.loading]);

    const singleDelete = (e, id) => {
        e.preventDefault();
        if(props.Brands) { props.deleteBrand(id); }
        if(props.Categories) { props.deleteCategory(id); }
        if(props.Icons) { props.deleteCategoryIcon(id); }
    }

    const manyDelete = (e, ids) => {
        e.preventDefault();
        if(props.Brands) { props.deleteManyBrands(ids); }
        if(props.Categories) { props.deleteManyCategories(ids); }
        if(props.Icons) { props.deleteManyCategoryIcons(ids); }
        setDeleteManyRecords([]);
    }

    return (
        <React.Fragment>
            <div className="AdminProfile row">
                {successMessage ? <ResponseMessages message={successMessage} /> : null}
                {failedMessage ? <ResponseMessages ClassName="Danger" message={failedMessage} /> : null}
                <div className={'col-12 text-white'}>
                    {loading ? 
                    <div className="card mb-30 bg-white">
                        <SmallSpinner /> 
                    </div> : 
                    <div className="card mb-30">
                        <div className="card-header">
                            {props.Brands && <h4>All Brands</h4>}
                            {props.Categories && <h4>All Categories</h4>}
                            {props.Icons && <h4>All Icons</h4>}
                        </div>
                        {(deleteManyRecords.length > 0) && <div className="col-12">
                            <div className="ButtonWrapper col-12 mt-20">
                                <button className='ButtonDanger' onClick={e => manyDelete(e, deleteManyRecords)}>Delete Selected Records</button>
                            </div>
                        </div>}
                        {props.Brands && <DataTable 
                            brandsData={brands} 
                            click={singleDelete} 
                            setDeleteData={setDeleteManyRecords} 
                            selectedDeleteData={deleteManyRecords} 
                            loading={loading} />}
                        {props.Icons && <DataTable 
                            iconsData={allCategoryIcons}
                            click={singleDelete} 
                            setDeleteData={setDeleteManyRecords} 
                            selectedDeleteData={deleteManyRecords} 
                            loading={loading} />}
                        {props.Categories && <DataTable 
                            categoriesData={allCategories}
                            click={singleDelete} 
                            setDeleteData={setDeleteManyRecords} 
                            selectedDeleteData={deleteManyRecords} 
                            loading={loading} />}
                    </div> }
                </div>
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        brand: state.brand,
        categories: state.category,
        icons: state.categoryIcon
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getBrands: () => dispatch(actions.getAllBrands()),
        deleteBrand: (id) => dispatch(actions.deleteBrand(id)),
        deleteManyBrands: (ids) => dispatch(actions.deleteManyBrands(ids)),
        getAllCategories: () => dispatch(actions.getAllCategories()),
        deleteCategory: (id) => dispatch(actions.deleteCategory(id)),
        deleteManyCategories: (ids) => dispatch(actions.deleteManyCategories(ids)),
        getAllCategoryIcons: () => dispatch(actions.getAllCategoryIcons()),
        deleteCategoryIcon: (id) => dispatch(actions.deleteCategoryIcon(id)),
        deleteManyCategoryIcons: (ids) => dispatch(actions.deleteManyCategoryIcons(ids))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableContainer);