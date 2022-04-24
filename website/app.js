/* Global Variables */
const base_url = "https://api.openweathermap.org/data/2.5/weather?zip=";
const api_key = "&appid=757607da7e7c55684b4dfe20d61303e0&units=metric";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

//Generate  button
document.getElementById("generate").addEventListener("click", button);

function button() {
  const newZip = document.getElementById("zip").value;
  const feeling = document.getElementById("feelings").value;
  fetch(base_url + newZip + api_key)
    .then((data) => data.json())
    .then(function (data) {
      console.log(data);
      projectData("/add", {
        date: d,
        temperature: data.main.temp,
        content: feeling,
        pressure: data.main.pressure,
        humidity: data.main.humidity,
      }).then(() => updateUI());
    });
}

// User interface
const updateUI = async () => {
  const request = await fetch("/all");
  try {
    const projectData = await request.json();
    document.getElementById("date").innerHTML = `Date: ${projectData.date}`;
    document.getElementById( "temp").innerHTML = `Temperature: ${projectData.temp}`;
    document.getElementById("content").innerHTML = `I feel: ${projectData.content}`;
    document.getElementById("pressure").innerHTML = `Today's Pressure: ${projectData.pressure}`;
    document.getElementById("humidity").innerHTML = `Today's Humidity: ${projectData.humidity}`;
  } catch (error) {
    console.log("error", error);
  }
};

const projectData = async (url = "", data = {}) => {
  console.log(url);
  console.log(data);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error ", error);
  }
};
