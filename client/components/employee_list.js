import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Employees } from '../../imports/collections/employees';
import EmployeeDetail from './employee_detail';

const PER_PAGE = 20;

class EmployeeList extends Component {

	componentWillMount() {
		this.page = 1;
	}

	handleButtonClick() {
		Meteor.subscribe('employees', PER_PAGE * (this.page + 1));
		this.page += 1;
	}

	render() {
		return (
			<div>
				<div className="employee-list">
					{ this.props.employees.map(
					  employee => <EmployeeDetail key={employee._id}
				      employee={employee} /> ) 
					}
				</div>
				<button onClick={ this.handleButtonClick.bind(this) }
					className="btn btn-primary">
						Load More...
				</button>
			</div>
		);
	}
};

export default createContainer(() => {
	// make a subscription to the employees container
	Meteor.subscribe('employees', PER_PAGE);

	// return whatever data was sent from the collection
	// whatever that will be returned will be sent to our 
	// EmployeeList component as a prop
	return { employees: Employees.find({}).fetch() };
}, EmployeeList);