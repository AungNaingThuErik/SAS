"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _require = require("sequelize"),
    Sequelize = _require.Sequelize,
    DataTypes = _require.DataTypes; //main function to do all the code


function main() {
  return _main.apply(this, arguments);
}

function _main() {
  _main = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var sequelize, Teacher, Student, Subject, Class, testTeacher1, testTeacher, testStudent, testSubject, testClass, getAllTeachers, association;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            sequelize = new Sequelize("sqlite::memory:", {
              logging: false
            }); //Teacher Model

            Teacher = sequelize.define("Teacher", {
              // Teacher's model attributes are defined here
              name: {
                type: DataTypes.STRING,
                required: true,
                allowNull: false
              },
              email: {
                type: DataTypes.STRING,
                required: true,
                allowNull: false,
                unique: true,
                isEmail: true
              }
            }, {
              freezeTableName: true // Model tableName (`Teacher`) will be the same as the model name

            });
            console.log(Teacher === sequelize.models.Teacher); //Student model

            Student = sequelize.define("Student", {
              // Student model attributes are defined here
              name: {
                type: DataTypes.STRING,
                required: true,
                allowNull: false
              },
              email: {
                type: DataTypes.STRING,
                required: true,
                allowNull: false,
                unique: true,
                isEmail: true
              }
            }, {
              freezeTableName: true // Model tableName (`Student`) will be the same as the model name

            }); //Subject model

            Subject = sequelize.define("Subject", {
              // Subject model attributes are defined here
              subjectCode: {
                type: DataTypes.STRING,
                required: true,
                allowNull: false,
                unique: true
              },
              name: {
                type: DataTypes.STRING,
                required: true,
                allowNull: false
              }
            }, {
              freezeTableName: true // Model tableName (`Subject`) will be the same as the model name

            }); //Class model

            Class = sequelize.define("Class", {
              // Class model attributes are defined here
              classCode: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
              },
              name: {
                type: DataTypes.STRING,
                allowNull: false
              }
            }, {
              freezeTableName: true // Model tableName (`Class`) will be the same as the model name

            }); //M-M

            TeacherClass = sequelize.define("TeacherClass", {
              numberOfClasses: Sequelize.INTEGER,
              defaultValue: 1
            }); //Joint Table between Teacher and Class

            Teacher.belongsToMany(Class, {
              through: "TeacherClass"
            });
            Class.belongsToMany(Teacher, {
              through: "TeacherClass"
            }); //Joint Table between Teacher and Class

            Student.belongsToMany(Class, {
              through: "StudentClass"
            });
            Class.belongsToMany(Student, {
              through: "StudentClass"
            }); //Joint Table between Teacher and Student

            Teacher.belongsToMany(Student, {
              through: "TeacherStudent"
            });
            Student.belongsToMany(Teacher, {
              through: "TeacherStudent"
            }); //Joint Table between Teacher and Subject

            Teacher.belongsToMany(Subject, {
              through: "TeacherSubject"
            });
            Subject.belongsToMany(Teacher, {
              through: "TeacherSubject"
            }); //Joint Table between Student and Subject

            Student.belongsToMany(Subject, {
              through: "StudentSubject"
            });
            Subject.belongsToMany(Student, {
              through: "StudentSubject"
            }); //to syncronize models and associations with the database

            _context.next = 19;
            return sequelize.sync({
              force: true
            });

          case 19:
            _context.next = 21;
            return Teacher.create({
              name: "Teacher Test",
              email: "teachertest@gmail.com"
            }).then(function (Teacher) {
              // Send created teacher data
              return Teacher.TeacherId;
            })["catch"](function (err) {
              console.log("create teacher failed with error: " + err);
              return 0;
            });

          case 21:
            testTeacher1 = _context.sent;
            _context.next = 24;
            return Teacher.create({
              name: "Teacher Test",
              email: "teachertest@gmail.com"
            });

          case 24:
            testTeacher = _context.sent;
            _context.next = 27;
            return Student.create({
              name: "Student Test",
              email: "studenttest@gmail.com"
            });

          case 27:
            testStudent = _context.sent;
            _context.next = 30;
            return Subject.create({
              subjectCode: "TEST",
              name: "TestSubject"
            });

          case 30:
            testSubject = _context.sent;
            _context.next = 33;
            return Class.create({
              classCode: "T1-1",
              name: "T1 Test"
            });

          case 33:
            testClass = _context.sent;
            _context.next = 36;
            return Teacher.findAll({
              include: [Class]
            });

          case 36:
            getAllTeachers = _context.sent;
            getAllTeachers.forEach(function (Teacher) {
              console.log(Teacher.Class[0].TeacherClass.toJSON());
            });
            _context.next = 40;
            return TeacherClass.findOne({
              where: {
                TeacherId: 1,
                ClassId: 1
              }
            });

          case 40:
            association = _context.sent;
            console.log(association.toJSON()); // const id = await association.destory();
            // console.log(id);
            // const association1 = await TeacherClass.findOne({
            //   where:{
            //     TeacherId: 1,
            //     ClassId: 1
            //   }
            // });
            // console.log(association1.toJSON());

          case 42:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _main.apply(this, arguments);
}

main();