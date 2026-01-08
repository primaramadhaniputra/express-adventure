import app from "./app.ts";
import {checkDatabaseConnection} from "./config/db.ts";

const port = process.env.PORT || 3000;

// Hubungkan database dulu, baru nyalakan server
app.listen(port, async () => {
  await checkDatabaseConnection();
  console.log(`Server jalan di http://localhost:${port}`);
});
