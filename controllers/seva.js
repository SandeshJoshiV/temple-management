const Seva = require("../models/Seva");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getAllSevas = asyncWrapper(async (req, res) => {
  const sevas = await Seva.find({});
  res.status(200).json({ sevas });
});

const createSeva = asyncWrapper(async (req, res) => {
  const seva = await Seva.create(req.body);
  res.status(201).json({ seva });
});

const getSeva = asyncWrapper(async (req, res, next) => {
  const { id: sevaID } = req.params;
  const seva = await Seva.findOne({ _id: sevaID });
  if (!seva) {
    return next(createCustomError(`No seva with id : ${sevaID}`, 404));
  }

  res.status(200).json({ seva });
});

const deleteSeva = asyncWrapper(async (req, res, next) => {
  const { id: sevaID } = req.params;
  const seva = await Seva.findOneAndDelete({ _id: sevaID });
  if (!seva) {
    return next(createCustomError(`No seva with id : ${sevaID}`, 404));
  }
  res.status(200).json({ seva });
});

const updateSeva = asyncWrapper(async (req, res, next) => {
  const { id: sevaID } = req.params;

  const seva = await Seva.findOneAndUpdate({ _id: sevaID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!seva) {
    return next(createCustomError(`No seva with id : ${sevaID}`, 404));
  }

  res.status(200).json({ seva });
});

module.exports = {
  getAllSevas,
  createSeva,
  getSeva,
  updateSeva,
  deleteSeva,
};
