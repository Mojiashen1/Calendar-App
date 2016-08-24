var Actions = require('../actions');

// This is just a placeholder; replace with your code.
const DEFAULT_STATE = {
  days: {
    'Monday': [],
    'Tuesday': [],
    'Wednesday': [],
    'Thursday': [],
    'Friday': []
  },
  selectedEvent: {},
  users: [{id: 1, name: "Lando"},
  {id: 2, name: "Moose"},
  {id: 3, name: "Lane"},
  {id: 4, name: "Josh"},
  {id: 5, name: "Darwish"}]
};

// Note: You may have more than one reducer! If you do, combine them into
// a single reducer using Redux.combineReducers. See
// http://redux.js.org/docs/api/combineReducers.html and
// http://redux.js.org/docs/basics/Reducers.html for more info.

//reducers takes an old state and an action and return a new state

//step two
const reducer = function(state, action) {
  if (typeof state === "undefined")
    return DEFAULT_STATE;

  // This is just a placeholder, replace it with your code.
  if (action.type === Actions.ADD_EVENT) {
    var update = {};
    update[action.day] = state.days[action.day].concat({
      id: action.id,
      title: action.title,
      startTime: action.startTime,
      endTime: action.endTime,
      location: action.location
    });

    update = Object.assign({}, state.days, update);

    return Object.assign({}, state, { days : update});
    //create a new object and put in the old state, and modify the new updates
  }
  else if (action.type === Actions.SELECT_EVENT) {

    return Object.assign({}, state, { selectedEvent : { id: action.id } });
  }
  else if (action.type === Actions.DELETE_EVENT) {
    var deleted = {};
    deleted[action.day] = state.days[action.day].concat({
      id: action.id
    });

    return Object.assign({}, state, { deleteEvent : { id: action.id } });
  }
  return DEFAULT_STATE;
};

module.exports = reducer;
