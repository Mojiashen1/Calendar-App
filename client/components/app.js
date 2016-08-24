// Entry point for your React app.

var React = require('react');
var Actions = require('../actions');
var addEvent = require('../actions').addEvent;
var deleteEvent = require('../actions').deleteEvent;
var selectEvent = require('../actions').selectEvent;
var $ = require('jquery');

const App = React.createClass({
  // This is just a placeholder, replace with your code!

  // React's prop types give us a nice way to validate all of the data that
  // comes into our components via props. See
  // https://facebook.github.io/react/docs/reusable-components.html#prop-validation.
  propTypes: {
    title: React.PropTypes.string,
    onClick: React.PropTypes.func
  },
  componentDidMount() {
    var self = this;
    $.ajax({
      url: '/api/event',
      success: function (data) {
        data.map(function(event) {
          self.props.store.dispatch(addEvent(event._id, event.title, event.day, event.startTime, event.endTime, event.location));
          // this puts the html in store
        })
      }
    });
  },
  render() {
    console.log("App state upon render: ", this.props.data);
    return (
      <div className="app">
        <Users store={this.props.store} users={this.props.data.users}></Users>
        <Calendar store={this.props.store} days={this.props.data.days}>
        </Calendar>
        <EditPanel store={this.props.store}/>
      </div>
    );
  }
});

var Event = React.createClass({
  onSelect(ev) {
    ev.preventDefault();
    var action = selectEvent(this.props.id)
    this.props.store.dispatch(action);
  },
  render() {
    return (
      <div className="event" onClick={this.onSelect}>
        <strong>{this.props.title}</strong>
        <p>{this.props.location}</p>
        <p>{this.props.startTime} - {this.props.endTime}</p>
      </div>
    )
  }
});

var Day = React.createClass({
  render() {
    var self = this;
    return (
      <div className="day">
        <strong className='dayDisplay'>{this.props.day}</strong>
        {this.props.events.map(function(event) {
          return <Event id={event.id} title={event.title} location={event.location} startTime={event.startTime} endTime={event.endTime} store={self.props.store}></Event>
        })}
      </div>
    )
  }
});

var Calendar = React.createClass({
  render() {
    var self = this;
    return (
      <div className="cal">
        {Object.keys(this.props.days).map(function(dayName) {
          var events = this.props.days[dayName];
          return <Day day={dayName} events={events} store={self.props.store}></Day>
        }.bind(this))}
      </div>
    )
  }
});

var EditPanel = React.createClass({
  getInitialState() {
    return {
      title: '',
      day: '',
      startTime: '',
      endTime: '',
      location: ''}
  },
  update(e) {
    var obj = {};
    obj[e.target.id] = e.target.value;
    this.setState(obj)
  },
  onSave(ev) {
    ev.preventDefault();
    console.log(this.state);
    var self = this;
    // var action = addEvent(
    //   0,
    //   this.state.title,
    //   this.state.day,
    //   this.state.startTime,
    //   this.state.endTime,
    //   this.state.location);
    // this.props.store.dispatch(action);
    //dispatch sends the action to the store
    // step 1
    $.ajax({
      url: '/api/event',
      method: 'POST',
      data: this.state,
      success: function (data) {
        var action = addEvent(
          data.id, // The ID of the newly-created object in the database.
          self.state.title,
          self.state.day,
          self.state.startTime,
          self.state.endTime,
          self.state.location);
        self.props.store.dispatch(action);
      },
      error: function(err){
        console.log(err)
      }
    });
  },
  onDelete(ev) {
    ev.preventDefault();
    // var action = deleteEvent(0);
    // this.props.store.dispatch(action);
    var self = this;
    $.ajax({
      url: '/api/event/',
      method: 'DELETE',
      data: this.state,
      success: function (data) {
        var action = deleteEvent(data.id);
        self.props.store.dispatch(action);
      },
      error: function(err){
        console.log(err)
      }
    });
  },
  render() {
    return (
      <div>
        <form>
          <div className="form-group">
            <label>Event name </label>
            <input type="title" className="form-control" id="title" value={this.state.title} onChange={this.update}></input>
          </div>
          <div className="form-group">
            <label>Day: </label>
            <input type="title" className="form-control" id="day" value={this.state.day} onChange={this.update}></input>
          </div>
          <div className="form-group">
            <label>Start: </label>
            <input type="time" className="form-control" id="startTime" value={this.state.startTime} onChange={this.update}></input>
          </div>
          <div className="form-group">
            <label>End: </label>
            <input type="time" className="form-control" id="endTime" value={this.state.endTime} onChange={this.update}></input>
          </div>
          <div className="form-group">
            <label>Location </label>
            <input type="title" className="form-control" id="location" value={this.state.location} onChange={this.update}></input>
          </div>
          <button className="btn btn-default" onClick={this.onSave}>Add to Calender</button>
          <button className="btn btn-default" onClick={this.onDelete}>Delete</button>
          <div className="form-group">
            <p>Attendees:
            <ul></ul></p>
            <input type="text" placeholder='username' className="form-control" value={this.state.user} onChange={this.update}></input>
            <button className="btn btn-default">Add</button>
          </div>
        </form>
      </div>
    )
  }
});

var Users = React.createClass({
  render() {
    return (
      <div className='users'>
        {this.props.users.map(function(user) {
          return <User name={this.props.users.name} store={self.props.store}></User>
        }, this)}
        <button className="btn btn-default">Create</button>
      </div>
    )
  }
})

var User = React.createClass({
  render() {
    return (
      <div className='user'>
        {this.props.name} Calender
      </div>
    )
  }
})



module.exports = App;
