import Express from "express";
import { OK } from "http-status-codes";

const { Sequelize, DataTypes } = require("sequelize");
const AdminController = Express.Router();

async function main() {
  const sequelize = new Sequelize("sqlite::memory:", {
    logging: false,
  });

  //Teacher Model
  const Teacher = sequelize.define(
    "Teacher",
    {
      // Teacher's model attributes are defined here
      name: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
        unique: true,
        isEmail: true,
      },
    },
    {
      freezeTableName: true, // Model tableName (`user`) will be the same as the model name
    }
  );

  //Student model
  const Student = sequelize.define(
    "Student",
    {
      // Student model attributes are defined here
      name: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
        unique: true,
        isEmail: true,
      },
    },
    {
      freezeTableName: true, // Model tableName (`Student`) will be the same as the model name
    }
  );

  //Subject model
  const Subject = sequelize.define(
    "Subject",
    {
      // Subject model attributes are defined here
      subjectCode: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
      },
    },
    {
      freezeTableName: true, // Model tableName (`Subject`) will be the same as the model name
    }
  );

  //Class model
  const Class = sequelize.define(
    "Class",
    {
      // Class model attributes are defined here
      classCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true, // Model tableName (`Class`) will be the same as the model name
    }
  );

  //M-M
  TeacherClass = sequelize.define("TeacherClass", {
    numberOfClasses: Sequelize.INTEGER,
    defaultValue: 1,
  });

  //Joint Table between Teacher and Class
  Teacher.belongsToMany(Class, { through: "TeacherClass" });
  Class.belongsToMany(Teacher, { through: "TeacherClass" });

  //Joint Table between Teacher and Class
  Student.belongsToMany(Class, { through: "StudentClass" });
  Class.belongsToMany(Student, { through: "StudentClass" });

  //Joint Table between Teacher and Student
  Teacher.belongsToMany(Student, { through: "TeacherStudent" });
  Student.belongsToMany(Teacher, { through: "TeacherStudent" });

  //Joint Table between Teacher and Subject
  Teacher.belongsToMany(Subject, { through: "TeacherSubject" });
  Subject.belongsToMany(Teacher, { through: "TeacherSubject" });

  //Joint Table between Student and Subject
  Student.belongsToMany(Subject, { through: "StudentSubject" });
  Subject.belongsToMany(Student, { through: "StudentSubject" });

  //to syncronize models and associations with the database
  await sequelize.sync({ force: true });

  //dummy data
  const testTeacher1 = await Teacher.create({
    name: "Teacher Test",
    email: "teachertest@gmail.com",
  })
    .then((Teacher) => {
      // Send created teacher data
      return Teacher.TeacherId;
    })
    .catch(function (err) {
      console.log("create teacher failed with error: " + err);
      return 0;
    });

  const testStudent = await Student.create({
    name: "Student Test",
    email: "studenttest@gmail.com",
  });

  const testSubject = await Subject.create({
    subjectCode: "TEST",
    name: "TestSubject",
  });

  const testClass = await Class.create({
    classCode: "T1-1",
    name: "T1 Test",
  });

  //Query the M to M association

  const getAllTeachers = await Teacher.findAll({
    include: [Class],
  });

  getAllTeachers.forEach((Teacher) => {
    console.log(Teacher.Class[0].TeacherClass.toJSON());
  });

  const association = await TeacherClass.findOne({
    where: {
      TeacherId: 1,
      ClassId: 1,
    },
  });
  console.log(association.toJSON());
}

main();

const adminHandler = async (req, res) => {
  // main.Teacher.findAll().then((teachers) => {
  //   return res.json(teachers);
  // });
  return res.sendStatus(OK);
};

AdminController.get("/reports/workload", adminHandler);

export default AdminController;
