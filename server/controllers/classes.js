const Class = require('../models').Class;

module.exports = {
  create(req, res) {
    return Class
      .create({
        Type: req.body.Type,
        Days: req.body.Days,
        Start_Time: req.body.Start_Time,
        End_Time: req.body.End_Time,
        courseId: req.params.courseId
      })
      .then(classc => res.status(201).send(classc))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Class
      .findAll({
        where: {
            courseId: req.params.courseId,
        },
      })
      .then(classc => res.status(200).send(classc))
      .catch(error => res.status(400).send(error));
    },  
    retrieve(req, res) {
      return Class
      .findAll({
        where: {
            courseId: req.params.courseId,
            Type: req.params.type,
        },
      })
    .then(classc => {
      if (!classc) {
        return res.status(404).send({
          message: 'Class Not Found',
        });
      }
      return res.status(200).send(classc);
    })
    .catch(error => res.status(400).send(error));
  },
   update(req, res) {
      return Class
      .find({
        where: {
            courseId: req.params.courseId,
            Type: req.params.type,
        },
      })
        .then(classc => {
          if (!classc) {
            return res.status(404).send({
              message: 'Class Not Found',
            });
          }
          return classc
            .update({
                Type: req.body.Type || classc.Type,
                Days: req.body.Days || classc.Days,
                Start_Time: req.body.Start_Time || classc.Start_Time,
                End_Time: req.body.End_Time || classc.End_Time,
            })
            .then(() => res.status(200).send(classc))  // Send back the updated course.
            .catch((error) => res.status(400).send(error));
          })
          .catch((error) => res.status(400).send(error));
      },
      destroy(req, res) {
        return Class
          .find({
            where: {
                courseId: req.params.courseId,
                Type: req.params.type,
            },
            })
          .then(classc => {
            if (!classc) {
              return res.status(404).send({
                message: 'Class Not Found',
              });
            }
      
            return classc
              .destroy()
              .then(() => res.status(204).send())
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      },
};