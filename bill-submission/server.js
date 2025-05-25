const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());

// Serve static files from ../public
app.use(express.static(path.join(__dirname, "..", "public")));

let lastSubmit = null;

app.get("/submit", (req, res) => {
  res.status(200).json(lastSubmit);
    
});

let allBills = [];
app.post("/api/bills", (req, res) => {
  const { grandTotal } = req.body;

  if (typeof grandTotal !== "number") {
    return res.status(400).json({ message: "Invalid grandTotal" });
  }
  const timestamp = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  bill = { grandTotal, timestamp };
  lastSubmit = bill;

  allBills.push(bill); // Save to array
  console.log("Bill saved:", bill);

  console.log(`Grand total received: ${grandTotal} at ${timestamp}`);
  res.status(200).json({ message: "Bill submitted successfully", bill });
});

app.get("/api/bills", (req, res) => {
  res.status(200).json(allBills);
});

app.get("/bills", (req, res) => {
  let html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Submitted Bills</title>
      <style>
        body { font-family: Arial; padding: 20px; }
        table { border-collapse: collapse; width: 40%; margin-top: 20px; }
        th, td { border: 1px solid #ccc; padding: 8px; text-align: center; }
        th { background-color: #f2f2f2; }
      </style>
    </head>
    <body>
      <h2>All Submitted Bills</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Time</th>
            <th>Grand Total</th>
          </tr>
        </thead>
        <tbody>
  `;

  allBills.forEach((bill, index) => {
    html += `
      <tr>
        <td>${index + 1}</td>
        <td>${bill.timestamp}</td>
        <td>${bill.grandTotal.toFixed(2)}</td>
      </tr>
    `;
  });

  res.send(html);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
