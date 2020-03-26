// // import User from '../../src/models/User';
// const seeder = require('mongoose-seed');
// const config = require('../../config/config');
//
// // Data array containing seed data - documents organized by Model
// const data = [
//     {
//         'model': 'User',
//         'documents': [
//             {
//                 firstName: 'Arvind',
//                 lastName: 'Rawat',
//                 isAdmin: true,
//                 email: 'arvindrawat111@gmail.com',
//                 roles: ['admin'],
//                 password: 'arvwind'
//             }
//         ]
//     }
// ];
//
// // Connect to MongoDB via Mongoose
// seeder.connect(config.dbConnection, function() {
//
//     // Load Mongoose models
//     seeder.loadModels([
//         '../../src/models/User.js'
//     ]);
//
//     // Clear specified collections
//     seeder.clearModels([User], function() {
//         // Callback to populate DB once collections have been cleared
//         seeder.populateModels(data, function() {
//             seeder.disconnect();
//         });
//     });
// });
