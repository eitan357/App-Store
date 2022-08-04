const getAllData = function (collection) {
  return new Promise((resolve, reject) => {
    collection
      .find({}, (err, data) => {
        if (err) reject(err);
        else resolve(data);
      })
      .clone();
  });
};

const getOneData = function (collection, _id) {
  return new Promise(async (resolve, reject) => {
    await collection
      .findById(_id, (err, data) => {
        if (err) reject(err);
        else resolve(data);
      })
      .clone();
  });
};

const createData = function (collection, obj) {
  return new Promise((resolve, reject) => {
    let res = collection(obj);
    res.save(function (err, data) {
      if (err) reject(err);
      else resolve(res._id);
    });
  });
};

const updateData = function (collection, _id, obj) {
  return new Promise((resolve, reject) => {
    collection.findByIdAndUpdate(_id, obj, (err, data) => {
      if (err) reject(err);
      else resolve("Updated!");
    });
  });
};

const deleteData = function (collection, itemId, deleteBy) {
  return new Promise((resolve, reject) => {
    collection.deleteMany({ [deleteBy]: itemId }, function (err, data) {
      if (err) reject(err);
      else resolve("Deleted!");
    });
  });
};

module.exports = {
  getAllData,
  getOneData,
  updateData,
  createData,
  deleteData,
};
