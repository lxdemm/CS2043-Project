const Assessment = require('../models').Assessment;

module.exports = {
  create(req, res) {
    return Assessment
      .create({
        Title: req.body.Title,
        Type: req.body.Type,
        Complete: req.body.Complete,
        Due_Date: req.body.Due_Date,
        Grade: req.body.Grade,
        courseId: req.params.courseId
      })
      .then(assess => res.status(201).send(assess))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Assessment
      .findAll({
        where: {
            courseId: req.params.courseId
        },
      })
      .then(assess => res.status(200).send(assess))
      .catch(error => res.status(400).send(error));
    },  
    retrieve(req, res) {
      return Assessment
      .findAll({
        where: {
            courseId: req.params.courseId,
            Title: req.params.assessId            
        },
    })
    .then(assess => {
      if (!assess) {
        return res.status(404).send({
          message: 'Assessment Not Found',
        });
      }
      return res.status(200).send(assess);
    })
    .catch(error => res.status(400).send(error));
  },
   update(req, res) {
      return Assessment
      .find({
        where: {
            courseId: req.params.courseId,
            Title: req.params.assessId            
        },
      })
        .then(assess => {
          if (!assess) {
            return res.status(404).send({
              message: 'Assessment Not Found',
            });
          }
          return assess
            .update({
                Title: req.body.Title || assess.Title,
                Type: req.body.Type || assess.Type,
                Complete: req.body.Complete || assess.Complete,
                Due_Date: req.body.Due_Date || assess.Due_Date,
                Grade: req.body.Grade || assess.Grade
            })
            .then(() => res.status(200).send(assess))  // Send back the updated course.
            .catch((error) => res.status(400).send(error));
          })
          .catch((error) => res.status(400).send(error));
      },
      destroy(req, res) {
        return Assessment
          .find({
            where: {
                courseId: req.params.courseId,
                Title: req.params.assessId            
            },
            })
          .then(assess => {
            if (!assess) {
              return res.status(404).send({
                message: 'Assessment Not Found',
              });
            }
      
            return assess
              .destroy()
              .then(() => res.status(204).send())
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      },
};