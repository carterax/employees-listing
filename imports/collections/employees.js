import { Mongo } from 'meteor/mongo';

// create a collection called employees
export const Employees = new Mongo.Collection('employees');