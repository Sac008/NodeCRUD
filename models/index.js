const {Sequelize , DataTypes} = require('sequelize');
const sequelize = new Sequelize('nodeDB' , 'root' , 'root@123' ,{
    host : 'localhost',
    dialect : 'mysql',
});

const Student  = sequelize.define('Student' , {
    name: {
        type: DataTypes.STRING,
        allowNull : false
    },
});

const Course = sequelize.define('Course' ,{
    title : {
        type : DataTypes.STRING,
        allowNull : false,
    },
});

const Enrollment = sequelize.define('Enrollment' , {});
Student.belongsToMany(Course , {through : Enrollment , onDelete : 'CASCADE'});
Course.belongsToMany(Student , {through : Enrollment , onDelete : 'CASCADE'});

module.exports = {sequelize , Student , Course , Enrollment};