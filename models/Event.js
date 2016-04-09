/*
* Event.js
*
* Model for an Event
*/

var db = require("../db");

/*
 * Returns all events of current semester
 * If no events yet for current semester, return last semester's events
 *
 * cb called as cb(err, allRecentEvents) returning array of Events
*/
exports.findMostRecentSemester = function(cb) {
	// Get all events in descending order first
	db.query(
		'SELECT * FROM Event ORDER BY start_time DESC',
		function(err, eventList) {
			if (err) console.error(err);

			// Pull year and month information from this element
			var mostRecentEvent = eventList[0];
			var currentYear     = mostRecentEvent['start_time'].substring(0, 4);

			var allRecentEvents = [];

			// Filter out all elements not in the given year
			for (e in eventList) {
				if (eventList[e]['start_time'].indexOf(currentYear) > -1) {
					allRecentEvents.push(eventList[e]);
				}
			}

			cb(err, allRecentEvents);
		}
	);
};