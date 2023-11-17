const fs = require("fs");
const path = require("path");

class Event {
  constructor(id, title, description, date, maxSeats) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.date = date;
    this.maxSeats = maxSeats;
  }

  // Metodi statici
  static getEvents() {
    const filePath = path.join(__dirname, "..", "db", "events.json");
    try {
      const fileData = fs.readFileSync(filePath);
      const eventsList = JSON.parse(fileData);
      return eventsList;
    } catch (error) {
      console.error("Something went wrong while reading events :(", error);
      return [];
    }
  }

  static saveEvents(events) {
    const filePath = path.join(__dirname, "..", "db", "events.json");
    const fileData = JSON.stringify(events, null, 2);
    try {
      fs.writeFileSync(filePath, fileData);
    } catch (error) {
      console.error("Something went wrong while saving events :(", error);
    }
  }
}

module.exports = Event;
