const express = require("express");
const router = express.Router();
const eventsController = require("../controllers/eventsController");

router.get("/", eventsController.index);
router.get("/:id", eventsController.show);
router.post("/", eventsController.store);
router.put("/:id", eventsController.update);

module.exports = router;
