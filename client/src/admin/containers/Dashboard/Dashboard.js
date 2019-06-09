import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { getDashboard } from '../../../store/actions'
import Widget from "../../components/UI/Widget/Widget";
import TodoList from "../../components/UI/TodoList/TodoList";
import WeatherWidget from "../../components/UI/WeatherWidget/WeatherWidget";
import LatestOrders from "../../components/UI/LatestOrders/LatestOrder";
import BestSellingWidget from "../../components/UI/BestSellingWidget/BestSellingWidget";
import EmployeesTable from "../../components/UI/EmployeesTable/EmployeesTable";
import UsersWidget from "../../components/UI/UsersWidget/UsersWidget";

const Dashboard = props => {

  useEffect(() => {
    props.getDashboard();
  }, []);

  return (
    <React.Fragment>
      <div className="row">
        <Widget label="Total Products" value={props.dashboard.numberOfProducts} />
        <Widget label="Total Active Coupons" value={props.dashboard.numberOfActiveCoupons} icon='fas fa-tag' />
        <Widget label="Total Number of Orders" value={props.dashboard.numberOfOrders} icon='fas fa-folder-open' />
        <Widget label="Sold Products" value={props.dashboard.numberOfSoldProducts} icon='fas fa-paper-plane' />
      </div>
      <div className="row">
        <TodoList />
        <WeatherWidget />
      </div>
      <div className="row">
        <LatestOrders orders={props.dashboard.latestTransactions}/>
        <BestSellingWidget products={props.dashboard.bestSellingProducts}/>
      </div>
      <div className="row">
        <UsersWidget />
        <EmployeesTable />
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  dashboard: state.dashboard
});

const mapDispatchToProps = dispatch => ({
  getDashboard: () => dispatch(getDashboard())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
