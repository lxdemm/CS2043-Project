
const path = require('path');

const studentsController = require('../controllers').students;
const coursesController = require('../controllers').courses;
const assessController = require('../controllers').assessments;
//const classesController = require('../controllers').classes;

module.exports = (app) => {
  /*app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the StudySmart API!',
  }));*/


  //student routes
  app.post('/api/students', studentsController.create);
  app.get('/api/students', studentsController.list)
  app.get('/api/students/:username', studentsController.retrieve);
  app.put('/api/students/:username', studentsController.update);
  app.delete('/api/students/:username', studentsController.destroy);
  
  //course routes
  app.post('/api/students/:username/courses', coursesController.create);
  app.get('/api/students/:username/courses', coursesController.list);
  app.get('/api/students/:username/courses/complete', coursesController.listCompleted);
  app.get('/api/students/:username/courses/:courseId', coursesController.retrieve);
  app.put('/api/students/:username/courses/:courseId', coursesController.update);
  app.delete('/api/students/:username/courses/:courseId', coursesController.destroy);

  //assessment routes
  app.post('/api/students/:username/courses/:courseId/assess', assessController.create);
  app.get('/api/students/:username/courses/:courseId/assess', assessController.list);
  app.get('/api/students/:username/courses/:courseId/assess/:assessId', assessController.retrieve);
  app.put('/api/students/:username/courses/:courseId/assess/:assessId', assessController.update);
  app.delete('/api/students/:username/courses/:courseId/assess/:assessId', assessController.destroy);

  /*//class routes
  app.post('/api/students/:username/courses/:courseId/classes', classesController.create);
  app.get('/api/students/:username/courses/:courseId/classes', classesController.list);
  app.get('/api/students/:username/courses/:courseId/classes/:type', classesController.retrieve);
  app.put('/api/students/:username/courses/:courseId/classes/:type', classesController.update);
  app.delete('/api/students/:username/courses/:courseId/classes/:type', classesController.destroy);*/
};