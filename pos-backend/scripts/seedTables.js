require("dotenv").config();

const mongoose = require("mongoose");
const Table = require("../models/tableModel");

const seedTables = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    await Table.deleteMany({});

    const tables = [
      { tableNo: 1, status: "Available", seats: 2 },
      { tableNo: 2, status: "Available", seats: 4 },
      { tableNo: 3, status: "Available", seats: 4 },
      { tableNo: 4, status: "Available", seats: 6 },
      { tableNo: 5, status: "Available", seats: 2 },
      { tableNo: 6, status: "Available", seats: 4 },
      { tableNo: 7, status: "Available", seats: 6 },
      { tableNo: 8, status: "Available", seats: 8 },
      { tableNo: 9, status: "Available", seats: 4 },
      { tableNo: 10, status: "Available", seats: 2 },
    ];

    await Table.insertMany(tables);

    console.log("Tables added successfully!");

    process.exit();
  } catch (error) {
    console.error("Error adding tables:", error);
    process.exit(1);
  }
};

seedTables();