import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';

import {
	Route,
	NavLink,
	BrowserRouter,
	Redirect
} from "react-router-dom";

import SplineChart from "./SplineChart";
import LineChart from "./LineChart";
import StepLineChart from "./StepLineChart";


class Template extends Component {

	render() {
		return (
			<div>
				<Navbar bg="dark" variant="dark">
					<button className="d-lg-none toggle-sidebar"><span className="navbar-toggler-icon"></span></button>
					<Navbar.Brand href="/">Live Data</Navbar.Brand><span className="hidden-xs text-muted">Charts</span>
				</Navbar>
				<BrowserRouter>
					<Row>

						<Nav to="/" className="flex-sm-column" id="sidebar">
							<ListGroup className="nav nav-sidebar flex-sm-column">
								<ListGroup.Item> <NavLink exact to="/spline-chart">Spline Chart</NavLink></ListGroup.Item>
								<ListGroup.Item> <NavLink exact to="/line-chart">Line Chart</NavLink></ListGroup.Item>
								<ListGroup.Item> <NavLink exact to="/step-line-chart">Step Line Chart</NavLink></ListGroup.Item>
							</ListGroup>
						</Nav>

						<Col xl={{ span: 7, offset: 3 }} lg={{ span: 8, offset: 3 }} xs={{ span: 8, offset: 2 }}>
							<Container>
								<div className="content">
									<Route exact path="/">
										<Redirect to="/spline-chart" />
									</Route>
									<Route path="/line-chart" component={LineChart} />
									<Route path="/spline-chart" component={SplineChart} />
									<Route path="/step-line-chart" component={StepLineChart} />
								</div>
							</Container>
						</Col>
					</Row>
				</BrowserRouter>
			</div>
		);
	}
}

export default Template;