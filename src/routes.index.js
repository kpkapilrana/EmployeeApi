'use strict';

const routesEmployee = require('./routes/employee-routes');


module.exports = [].concat(
    routesEmployee
);

// This file is where we can add all the routes into a single array
// Routes will be broken out into the different businss secitons,
// Organizations, Opportunities, Activities, Contacts, etc.
// Routes can also be broken up for the periferals as well
// Phone, email, addresses, DBS etc.