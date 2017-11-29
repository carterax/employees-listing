// Only runs on the server
import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import { Employees } from '../imports/collections/employees';
import { image, helpers } from 'faker';


Meteor.startup(() => {
	//Code to run immediately after meteor boots up

	//check to see if data exists in our collection
	// check to see number of all employees record in our employees collection (No filter)
	const numberRecords = Employees.find({}).count();
	console.log(numberRecords);
	if(!numberRecords) {
		//generate data with faker.js
		_.times(5000, () => {
			const { name, email, phone } = helpers.createCard();
			/*const name = helpers.createCard().name;
			const email = helpers.createCard().email;
			const phone = helpers.createCard().phone;*/

			//Insert Data generated from faker into our Employees collection
			Employees.insert({
				name, email, phone,
				avatar: image.avatar()
			});
		});
	}
	// Meteor Publication
	Meteor.publish('employees', function(per_page) {
		return Employees.find({}, {limit: per_page});
	});
});
