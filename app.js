const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 9876;
const WINDOW_SIZE = 21; 

let windowPrevState = [];
let windowCurrState = [];

const fetchNumbers = async (numberId) => {
  try {
    const response = await axios.get(`http://20.244.56.144/test/${numberId}`);
    return response.data.numbers;
  } catch (error) {
    console.error(`Error fetching numbers: ${error}`);
    return [];
  }
};



const calculateAverage = (numbers) => {
  return numbers.length
    ? numbers.reduce((sum, num) => sum + num, 0) / numbers.length
    : 0;
};

app.get("/numbers/:numberId", async (req, res) => {
  const numberId = req.params.numberId;
  const validIds = ["p", "f", "e", "r"];

  if (!validIds.includes(numberId)) {
    return res.status(400).json({ detail: "Invalid number ID" });
  }else{
//     ...even ->/e
//     ...prime ->/p
//     ...fibb ->/f
// ...rand->/r


  }

  const numbers = await fetchNumbers(numberId);
  updateWindow(numbers);
  const avg = calculateAverage(windowCurrState);

  res.json({
    numbers,
    windowPrevState,
    windowCurrState,
    avg,
  });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

