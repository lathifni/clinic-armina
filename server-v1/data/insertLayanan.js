import Layanan from "../src/models/layanan.js";
import fs from "fs";

const insertLayanan = async () => {
  try {
    const jsonData = fs.readFileSync("./data/layanan.json", "utf8");

    const dataLayanan = JSON.parse(jsonData);

    await Layanan.bulkCreate(dataLayanan, {
      validate: true, // Memvalidasi setiap entry sesuai dengan model
    });

    console.log("Data layanan berhasil dimasukkan ke database.");
  } catch (error) {
    console.error("Gagal memasukkan data layanan:", error);
  }
};

insertLayanan();
