import { sequelize } from "./connection";

sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
    .then(function () {
        return sequelize.sync({ force: true });
    })
    .then(function () {
        console.log('Database cleared.');
    }, function (err) {
        console.log(err);
    });