import React from 'react';
import Widget from '../../components/UI/Widget/Widget';
import TodoList from '../../components/UI/TodoList/TodoList';
import WeatherWidget from '../../components/UI/WeatherWidget/WeatherWidget';
import LatestOrders from '../../components/UI/LatestOrders/LatestOrder';
import BestSellingWidget from '../../components/UI/BestSellingWidget/BestSellingWidget';
import EmployeesTable from '../../components/UI/EmployeesTable/EmployeesTable';
import UsersWidget from '../../components/UI/UsersWidget/UsersWidget';

const AdminDashboard = props => {
    
    return (
        <React.Fragment>
            <div className="row">
                <Widget />
                <Widget />
                <Widget />
                <Widget />
            </div>
            <div className="row">
                <TodoList />
                <WeatherWidget />
            </div>
            <div className="row">
                <LatestOrders />
                <BestSellingWidget />
            </div>
            <div className="row">
                <UsersWidget />
                <EmployeesTable />
            </div>
        </React.Fragment>
    );
}

export default AdminDashboard;