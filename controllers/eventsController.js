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

  try {
    const addEvent = new Event(title, description, date, maxSeats);
    const savedEvent = Event.saveEvents(addEvent);

    if (savedEvent) {
      res.json({ message: "Evento aggiunto!" });
    } else {
      throw new Error("Non è stato possibile salvare l'evento");
    }
  } catch (err) {
    next(err);
  }
}

function show(req, res) {
  const id = req.params.id;
  const event = Event.getEventById(id);
  if (event) {
    res.json(event);
  } else {
    res.status(404).json({
      message: "Non qui!",
    });
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
