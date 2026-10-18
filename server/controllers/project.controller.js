
import Project from "../models/project.model.js";

const list = async (req, res) => {
  try {
    res.json(await Project.find());
  } catch (err) {
    res.status(500).json({ error: "Could not retrieve projects" });
  }
};

const read = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
  } catch (err) {
    res.status(400).json({ error: "Invalid project ID" });
  }
};

const create = async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: "Invalid project ID" });
  }
};

const removeAll = async (req, res) => {
  try {
    const result = await Project.deleteMany({});
    res.json({
      message: "Projects deleted",
      deletedCount: result.deletedCount
    });
  } catch (err) {
    res.status(500).json({ error: "Could not delete projects" });
  }
};

export default { list, read, create, update, remove, removeAll };
