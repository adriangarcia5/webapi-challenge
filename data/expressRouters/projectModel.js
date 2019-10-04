const express = require("express");
const actionDB = require("../helpers/actionModel");
const projectDB = require("../helpers/projectModel");

const router = express.Router();

router.get("/", (req, res) => {
  projectDB
    .get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => {
      res.status(500).json({
        error: error,
        message: "500 ErRor getting projects"
      });
    });
});

router.post("/", (req, res) => {
  const project = req.body;

  projectDB
    .insert(project)
    .then(newProject => {
      res.status(201).json(newProject);
    })
    .catch(error => {
      res.status(500).json({
        error: error,
        message: "500 ErRor posting projects"
      });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  projectDB
    .get(id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(error => {
      res.status(500).json({
        error: error,
        message: "500 ErRor getting project ID's"
      });
    });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  projectDB
    .update(id, changes)
    .then(updated => {
      res.status(200).json(updated);
    })
    .catch(error => {
      res.status(500).json({
        error: error,
        message: "500 ErRor editing project ID's"
      });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  projectDB
    .remove(id)
    .then(deleted => {
      res.status(204).json(deleted);
    })
    .catch(error => {
      res.status(500).json({
        error: error,
        message: "500 ErRor deleting project ID's"
      });
    });
});

router.get("/:id/actions", (req, res) => {
  const id = req.params.id;

  projectDB
    .getProjectActions(id)
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      res.status(500).json({
        error: error,
        message: "500 ErRor deleting project ID's"
      });
    });
});

module.exports = router;