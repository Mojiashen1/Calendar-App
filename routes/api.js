// REST API routes go here.

var express = require('express');
var router = express.Router();

var Event = require('../models/event');

router.get('/event', function(req, res, next) {
  Event.find(function(err, events) {
    if (err) return next(err);
    res.send(events);
  });
});

router.put('/event/:eid', function(req, res, next) {
  Event.findByIdAndUpdate(req.params.eid, {
    title: req.body.title,
    day: req.body.day,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    location: req.body.location
  }, function(error, event) {
    if (error) {
      res.status(400).send(error);
    } else {
      res.send(event);
    }
  });
});

router.post('/event', function(req, res, next) {
  console.log('hit')
  var event = new Event({
    title: req.body.title,
    day: req.body.day,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    location: req.body.location
  });
  event.save(function(error) {
    if (error) {
      console.log(error);
      res.status(400).send(error);
    } else {
      res.send(event._id)
    }
  })
});

router.delete('/event/:eid', function(req, res, next) {
  Event.findByIdAndRemove(req.params.eid, function(error, event) {
    if (error) {
      res.status(400).send(error);
    } else {
      res.send(event);
    }
  });
});

module.exports = router;
