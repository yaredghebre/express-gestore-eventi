const Event = require("../models/Event");

function index(req, res) {
  const { title } = req.query;
  const events = Event.getEvents();

  let filteredEvents = events;

  if (title) {
    filteredEvents = events.filter((event) => event.title === title);
  }

  if (title && filteredEvents.length === 0) {
    return res.status(404).send("Non ci sono eventi con questi parametri!");
  }

  res.json(filteredEvents);
}

function store(req, res) {
  const { title, description, date, maxSeats } = req.body;

  const addEvent = new Event(title, description, date, maxSeats);
  const savedEvent = Event.saveEvents(addEvent);

  if (savedEvent) {
    res.json({ message: "Evento aggiunto!" });
  } else {
    res.status(500).send("Oops! Qualcosa è andato storto!");
  }
}

function show(req, res) {
  const id = req.params.id;
  const event = Event.getEventById(id);
  if (event) {
    res.json(event);
  } else {
    res.status(404).send("Event not found!");
  }
}

function update(req, res) {
  res.send();
}

module.exports = {
  index,
  store,
  show,
  update,
};
