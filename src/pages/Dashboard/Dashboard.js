import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import './../../components/Map/Map';
import DetailCard from '../../components/DashboardDetailCard/DetailCard';
import Map from './../../components/Map/Map';
import Card from '../../components/DashboardDetailCard/Card/Card';
import StagePieChar from '../../components/DashboardCharts/StagePieChart/StagePieChar';
import DatesLineChart from '../../components/DashboardCharts/DatesLineChart/DatesLineChart';
import StateBarChart from '../../components/DashboardCharts/StateWiseBarChart/StateBarChart';
import { DashboardData } from './../../api/api';
import { updatedashboarddata } from './../../actions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

function Dashboard() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.DashboardData);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const data = await DashboardData();
      dispatch(updatedashboarddata(data.data));
    } catch (err) {
      console.log(err);
    }
  };

  console.log(data);

  return (
    <div className="dashboard">
      <div className="flexbox">
        <Map />
        <DetailCard />
      </div>
      <div className="small-data-card">
        <Card
          title="Total Requests"
          value={data.totalrequest}
          type="requests"
        />
        <Card title="Total Admins" value={data.totaladmin} type="admins" />
        <Card
          title="Accepted Requests"
          value={data.acceptedreq}
          type="accepted"
        />
      </div>
      <div className="charts-section">
        <StagePieChar />
        <DatesLineChart />
      </div>
      <div className="state-chart-section">
        <StateBarChart />
      </div>
    </div>
  );
}

export default Dashboard;