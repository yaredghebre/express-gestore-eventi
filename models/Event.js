const fs = require("fs");
const path = require("path");

class Event {
  constructor(title, description, date, maxSeats) {
    // this.id = id;
    this.title = title;
    this.description = description;
    this.date = date;
    this.maxSeats = maxSeats;
  }

  // Metodi statici
  static getEvents() {
    const filePath = path.resolve(__dirname, "..", "db", "events.json");
    try {
      const fileData = fs.readFileSync(filePath);
      const eventsList = JSON.parse(fileData);
      return eventsList;
    } catch (error) {
      console.error("Something went wrong while reading events :(", error);
      return [];
    }
  }

  static saveEvents(newEvent) {
    const filePath = path.resolve(__dirname, "..", "db", "events.json");
    try {
      // Leggo elenco esistente degli events
      const fileData = fs.readFileSync(filePath);
      const eventsList = JSON.parse(fileData);

      // Trovo ID più alto nel JSON e incremento
      const eventsIds = eventsList.map((event) => parseInt(event.id) || 0);
      const maxId = Math.max(0, ...eventsIds);

      const eventWithId = {
        id: (maxId + 1).toString(),
        ...newEvent,
      };

      // Pusho il nuovo event all'elenco
      eventsList.push(eventWithId);

      // Salvo elenco aggioranto nel JSON
      fs.writeFileSync(filePath, JSON.stringify(eventsList, null, 2));
      return true;
    } catch (error) {
      console.error("Something went wrong while saving events :(", error);
      return false;
    }
  }

  static getEventById(id) {
    const events = Event.getEvents();
    return events.find((event) => event.id === id);
  }

  static updateEvent(id, updatedEvent) {
    const filePath = path.resolve(__dirname, "..", "db", "events.json");
    try {
      const fileData = fs.readFileSync(filePath);
      let eventsList = JSON.parse(fileData);

      const index = eventsList.findIndex((event) => event.id === id);

      if (index === -1) {
        return false;
      }

      // Update dell'evento
      eventsList[index] = { id, ...updatedEvent };

      fs.writeFileSync(filePath, JSON.stringify(eventsList, null, 2));
      return true;
    } catch (error) {
      console.error("Qualcosa è andato storto nell'aggiornare l'evento", error);
      return false;
    }
  }
}

module.exports = Event;
