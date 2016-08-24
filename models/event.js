var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  day: {
    type: String,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: false
  },
  attendees: {
    type: Array
  }
});

var userSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: String
})

module.exports = {
  Event: mongoose.model('Event', eventSchema),
  User: mongoose.model('User', userSchema)
}
