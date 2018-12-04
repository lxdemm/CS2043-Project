const Student = require('../models').Student;

module.exports = {
  create(req, res) {
    return Student
      .create({
        Username: req.body.Username,
        Password: req.body.Password,
      })
      .then(student => res.status(201).send(student))
      .catch(error => res.status(400).send(error));
    },
    
    list(req, res) {
      return Student
        .findAll()
        .then(students => res.status(200).send(students))
        .catch(error => res.status(400).send(error));
      },
    retrieve(req, res) {
      return Student
      .findAll({
        where: {
            Username: req.params.username,
        },
      })
      .then(student => {
        if (!student) {
          return res.status(404).send({
              message: 'Student Not Found',
          });
        }
        return res.status(200).send(student);
      })
      .catch(error => res.status(400).send(error));
    },
    update(req, res) {
      return Student
      .find({
        where: {
          Username: req.params.username
        },
      })
        .then(student => {
          if (!student) {
            return res.status(404).send({
              message: 'Student Not Found',
            });
          }
          return student
            .update({
              First_Name: req.body.First_Name || student.First_Name,
              Last_Name: req.body.Last_Name || student.Last_Name,
              Student_Email: req.body.Student_Email || student.Student_Email,
              Student_ID: req.body.Student_ID || student.Student_ID,
              Username: req.body.Username || student.Username,
              Password: req.body.Password || student.Password,
            })
            .then(() => res.status(200).send(student))  // Send back the updated student.
            .catch((error) => res.status(400).send(error));
          })
          .catch((error) => res.status(400).send(error));
      },
    destroy(req, res) {
      return Student
        .findById(req.params.username)
        .then(student => {
          if (!student) {
            return res.status(400).send({
              message: 'Student Not Found',
            });
          }
        return student
          .destroy()
          .then(() => res.status(200).send({ message: 'Student deleted successfully.' }))
          .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    },
};