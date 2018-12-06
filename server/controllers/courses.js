const Course = require('../models').Course;

module.exports = {
  create(req, res) {
    return Course
      .create({
        Course_ID: req.body.Course_ID,
        Course_Name: req.body.Course_Name,
        Credit_Hours: req.body.Credit_Hours,
        Section_ID: req.body.Section_ID,
        Instructor: req.body.Instructor,
        Assignments: req.body.Assignments,
        Labs: req.body.Labs,
        Quizzes: req.body.Quizzes,
        Midterms: req.body.Midterms,
        username: req.params.username
      })
      .then(course => res.status(201).send(course))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Course
      .findAll({
        where: {
            username: req.params.username,
        },
      })
      .then(courses => res.status(200).send(courses))
      .catch(error => res.status(400).send(error));
  },  
  listCompleted(req, res) {
    return Course
      .findAll({
        where: {
            username: req.params.username,
            Complete: true,
        },
      })
      .then(courses => res.status(200).send(courses))
      .catch(error => res.status(400).send(error));
  },  
  retrieve(req, res) {
    return Course
      .findAll({
        where: {
            username: req.params.username,
            Course_ID: req.params.courseId,
        },
      })
    .then(course => {
      if (!course) {
        return res.status(404).send({
          message: 'Course Not Found',
        });
      }
      return res.status(200).send(course);
    })
    .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return Course
      .find({
        where: {
          Course_ID: req.params.courseId,
          username: req.params.username,
        },
      })
      .then(course => {
        if (!course) {
          return res.status(404).send({
            message: 'Course Not Found',
          });
        }
        return course
          .update({
            Course_ID: req.body.Course_ID || course.Course_ID,
            Course_Name: req.body.Course_Name || course.Course_Name,
            Credit_Hours: req.body.Credit_Hours || course.Credit_Hours,
            Section_ID: req.body.Section_ID || course.Section_ID,
            Instructor: req.body.Instructor || course.Instructor
          })
          .then(() => res.status(200).send(course))  // Send back the updated course.
          .catch((error) => res.status(400).send(error));
        })
        .catch((error) => res.status(400).send(error));
  },
      destroy(req, res) {
        return Course
          .find({
              where: {
                Course_ID: req.params.courseId,
                username: req.params.username,
              },
            })
          .then(course => {
            if (!course) {
              return res.status(404).send({
                message: 'Course Not Found',
              });
            }
      
            return course
              .destroy()
              .then(() => res.status(204).send())
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      },
};