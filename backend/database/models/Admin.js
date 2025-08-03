const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  email: { type: String, required: true, unique: true },
});

adminSchema.statics.createAdmin = async function (data) {
  let isUnique = false;
  let randomId;

  while (!isUnique) {
    randomId = Math.floor(1000 + Math.random() * 9000);
    const exists = await this.exists({ id: randomId });
    if (!exists) isUnique = true;
  }

  data.id = randomId;
  return this.create(data);
};

module.exports = adminSchema;
