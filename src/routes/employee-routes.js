const Knex = require('../knex');

const routes = [

    {
        path: '/api/emps',
        method: 'GET',
        config: {
            cors: true,
        },

        handler: (request, reply) => {

            const getOperation = Knex('employee')
                .select(
                    '*'
                ).leftJoin('address', 'employee.id', '=', 'address.employeeId')
                .then((results) => {

                    if (!results || results.length === 0) {

                        reply({

                            error: true,
                            errMessage: 'no  employee found',

                        });
                    } else {
                        reply({
                            data: results,

                        });
                    }

                }).catch((err) => {

                    reply('Server-side error ' + err);

                });
        }
    },

    {
        path: '/api/getEmployeeById',
        method: 'POST',
        config: {
            cors: true,
        },

        handler: (request, reply) => {
            var emp = request.payload;
            Knex('employee').select()
            .leftJoin('address', 'employee.id', '=', 'address.employeeId')
            .where('employee.id', emp.id)
            .then((res) => {
                if (res) {
                            reply({
                                data: res[0]
                            });
                        } else {
                            reply({
                                message: 'No Data for Id'+emp.id
                            });
                        }
            }).catch(function (err) {

                reply('Server-side error ' + err);

            });
        }
    },

    {
        path: '/api/emp',
        method: 'POST',
        config: {
            cors: true,
        },

        handler: (request, reply) => {
            var emp = request.payload;
            console.log(emp);
            var currentDate = new Date();


            var insertOperation = Knex('employee').insert({
                name: emp.name,
                phone: emp.phone,
            }).returning('id')
            .then((res) => {
                if (res) {
                    console.log(res);
                    const address = emp.address
                    Knex('address').insert({
                        city: address.city,
                        address_line1: address.address_line1,
                        address_line2: address.address_line2,
                        postal_code: address.postal_code,
                        employeeId: res[0]
                    }).then((res1) => {
                        if(res1) {
                            reply({
                                message: 'successfully created new Employee'
                            });
                        }
                    })
                }

            }).catch(function (err) {

                reply('Server-side error ' + err);

            });
        }
    },

    { // Updates a user by user_id
        path: '/api/emp/{emp_id}',
        method: 'PUT',
        config: {
            cors: true,
            // auth: {
            //     strategy: 'token'
            // }
        },
        handler: (request, reply) => {

            var emp = request.payload;
            console.log(emp);
            var emp_id = request.params.emp_id;
                console.log(emp_id)


            var currentDate = new Date();
            const getOperation = Knex('employee').where(

                'id', emp_id

            ).update({
                name: emp.name,
                phone: emp.phone,
            }).then((results) => {

                if (!results || results.length === 0) {

                    reply({

                        error: true,
                        errMessage: 'no employee found for that id',

                    });
                } else {
                    if (emp.address) {
                        const address = emp.address;
                        Knex('address').where(

                            'employeeId', emp_id

                        ).update({
                            address_line1: address.address_line1,
                            address_line2: address.address_line2,
                            city: address.city,
                            postal_code: address.postal_code
                        }).then(res => {
                            reply({
                                data: res,
    
                            });
                        });
                    } else {
                        reply({
                            data: results,

                        });
                    }
                }

            }).catch((err) => {

                reply('Server-side error ' + err);

            });
        }
    },
    {
        path: '/api/emp/{emp_id}',
        method: 'DELETE',
        config: {
            cors: true,
        },
        handler: (request, reply) => {
            var emp_id = request.params.emp_id;

            var currentDate = new Date();

            const getOperation = Knex('employee').where(

                'emp_id', emp_id

            )
                .delete()
                .then((results) => {

                    if (!results || results.length === 0) {

                        reply({

                            error: true,
                            errMessage: 'no employee found for that id',

                        });
                    } else {
                        reply({
                            data: results,
                            comment: 'Employee was deleted',
                        });
                    }

                }).catch((err) => {

                    reply('Server-side error ' + err);

                });
        }
    },
];

module.exports = routes;