/*
 * action types
 */

const ADD_EVENT = "ADD_EVENT";
const DELETE_EVENT = 'DELETE_EVENT'
const SELECT_EVENT = 'SELECT_EVENT'

//an object as a function
function addEvent(id, title, day, startTime, endTime, location) {
  return {
    type: ADD_EVENT,
    id: id,
    title: title,
    day: day,
    startTime: startTime,
    endTime: endTime,
    location: location,
    attendees: []
  }
}

function deleteEvent(id) {
  return {
    type: DELETE_EVENT,
    id: id
  }
}

function selectEvent(id) {
  return {
    type: SELECT_EVENT,
    id: id
  }
}

module.exports = {
  ADD_EVENT: ADD_EVENT,
  DELETE_EVENT: 'DELETE_EVENT',
  addEvent: addEvent,
  deleteEvent: deleteEvent,
  SELECT_EVENT: 'SELECT_EVENT',
  selectEvent: selectEvent
};
