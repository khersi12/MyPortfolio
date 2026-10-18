
import Education from "../models/education.model.js";

const list = async (req, res) => {
  try {
    res.json(await Education.find());
  } catch (err) {
    res.status(500).json({ error: "Could not retrieve education records" });
  }
};

const read = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);

    if (!education) {
      return res.status(404).json({ error: "Education record not found" });
    }

    res.json(education);
  } catch (err) {
    res.status(400).json({ error: "Invalid education ID" });
  }
};

const create = async (req, res) => {
  try {
    const education = new Education(req.body);
    await education.save();
    res.status(201).json(education);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const education = await Education.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!education) {
      return res.status(404).json({ error: "Education record not found" });
    }

    res.json(education);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const education = await Education.findByIdAndDelete(req.params.id);

    if (!education) {
      return res.status(404).json({ error: "Education record not found" });
    }

    res.json({ message: "Education record deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: "Invalid education ID" });
  }
};

const removeAll = async (req, res) => {
  try {
    const result = await Education.deleteMany({});
    res.json({
      message: "Education records deleted",
      deletedCount: result.deletedCount
    });
  } catch (err) {
    res.status(500).json({ error: "Could not delete education records" });
  }
};

export default { list, read, create, update, remove, removeAll };
