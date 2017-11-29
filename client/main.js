import React from 'react';
import ReactDOM from 'react-dom';
import EmployeeList from './components/employee_list.js';


const App = () => {
	return (
		<EmployeeList />
	);
};


Meteor.startup(() => {
	ReactDOM.render( <App />, document.querySelector(".container"));
});