"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _httpStatusCodes = require("http-status-codes");

var _require = require("sequelize"),
    Sequelize = _require.Sequelize,
    DataTypes = _require.DataTypes;

var AdminController = _express["default"].Router();

function main() {
  return _main.apply(this, arguments);
}

function _main() {
  _main = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var sequelize, Teacher, Student, Subject, Class, testTeacher1, testStudent, testSubject, testClass, getAllTeachers, association;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
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
              freezeTableName: true // Model tableName (`user`) will be the same as the model name

            }); //Student model

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

            _context2.next = 18;
            return sequelize.sync({
              force: true
            });

          case 18:
            _context2.next = 20;
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

          case 20:
            testTeacher1 = _context2.sent;
            _context2.next = 23;
            return Student.create({
              name: "Student Test",
              email: "studenttest@gmail.com"
            });

          case 23:
            testStudent = _context2.sent;
            _context2.next = 26;
            return Subject.create({
              subjectCode: "TEST",
              name: "TestSubject"
            });

          case 26:
            testSubject = _context2.sent;
            _context2.next = 29;
            return Class.create({
              classCode: "T1-1",
              name: "T1 Test"
            });

          case 29:
            testClass = _context2.sent;
            _context2.next = 32;
            return Teacher.findAll({
              include: [Class]
            });

          case 32:
            getAllTeachers = _context2.sent;
            getAllTeachers.forEach(function (Teacher) {
              console.log(Teacher.Class[0].TeacherClass.toJSON());
            });
            _context2.next = 36;
            return TeacherClass.findOne({
              where: {
                TeacherId: 1,
                ClassId: 1
              }
            });

          case 36:
            association = _context2.sent;
            console.log(association.toJSON());

          case 38:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _main.apply(this, arguments);
}

main();

var adminHandler = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", res.sendStatus(_httpStatusCodes.OK));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function adminHandler(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

AdminController.get("/reports/workload", adminHandler);
var _default = AdminController;
exports["default"] = _default;