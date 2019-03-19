import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import DataTable from '../../components/UI/DataTable/DataTable';

import ResponseMessages from '../../../users/components/UI/ResponseMessages/ResponseMessages';

const AdminAllUsers = props => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        setUsers({...props.users.Users})
        props.getUsers();
    }, []);

    useEffect(() => {
        setUsers({
            ...props.users.Users
        })
    }, [props.users.Users]);

    const deleteUser = (e,id) => {
        e.preventDefault();
        props.deleteUser(id)
    }

    return (
        <div className={"row"}>
            {props.users.successMessage ? <ResponseMessages message={props.users.successMessage} /> : null}
            <div className={'col-12 text-white'}>
                <div className="card mb-30">
                    <div className='col-12 mt-4 pr-5 mb-4'>
                        {/* <Link to="/admindashboard/addproduct" className="btn btn-warning float-right">Add new Product</Link> */}
                    </div>
                    <DataTable usersData={users} click={deleteUser}/>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        users: state.allUsers
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUsers: () => dispatch(actions.getAllUsers()),
        deleteUser: (id) => dispatch(actions.deleteUser(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminAllUsers);