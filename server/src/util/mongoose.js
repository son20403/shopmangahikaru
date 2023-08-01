module.exports = {
  MutipleMongooseToObject: (mongooses) => {
    return mongooses.map((mongoose) => mongoose.toObject());
  },
  MongooesToObject: (mongoose) => {
    return mongoose ? mongoose.toObject() : mongoose;
  },
};
