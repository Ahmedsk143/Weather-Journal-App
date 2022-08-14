// Personal API Key for OpenWeatherMap API
const baseURL = "https://api.openweathermap.org/data/2.5/weather?";
const apiKey = "bd4237943750b8699d9627bf2729c674";

// Global variables
const zipInput = document.getElementById("zip");
const feelingsInput = document.getElementById("feelings");
const generateBtn = document.getElementById("generate");
const requiredErr = document.querySelector(".inputs .requiredErr");
const fetchErr = document.querySelector(".inputs .fetchErr");
const output = document.getElementById("entryHolder");
const dateOutput = document.querySelector("#date span:last-child");
const tempOutput = document.querySelector("#temp span:last-child");
const contentOutput = document.querySelector("#content span:last-child");
const serverPostRoute = "http://localhost:3000/add";
const serverGetRoute = "http://localhost:3000/all";

// Event listener to add function to existing HTML DOM element
generateBtn.addEventListener("click", displayWeatherData);

/* Function called by event listener */
function displayWeatherData() {
  if (zipInput.value === "" || feelingsInput.value == "") {
    requiredErr.style.display = "block";
  } else {
    requiredErr.style.display = "none";
    const fullUrl = `${baseURL}zip=${zipInput.value},us&appid=${apiKey}&units=metric`;
    getApiData(fullUrl)
      .then((data) => {
        const currentDate = new Date();
        const weatherData = {
          date: currentDate.toDateString(),
          temp: data.main.temp,
          content: feelingsInput.value,
        };
        postData(serverPostRoute, weatherData);
        return weatherData;
      })
      .then((weatherData) => {
        const serverData = retreivedData(serverGetRoute);
        return serverData;
      })
      .then((serverData) => {
        updateUI(serverData);
      });
  }
}
/* Function to GET Web API Data*/
const getApiData = async (url) => {
  const res = await fetch(url);
  // Check if the response is not ok to display an error message
  if (!res.ok) {
    fetchErr.style.display = "block";
  }
  try {
    const resJson = await res.json();
    return resJson;
  } catch (error) {
    console.log("displayWeatherData function Error: ", error);
    fetchErr.style.display = "block";
  }
};
/* Function to POST the data to the server*/
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
  } catch (error) {
    console.log("PostData function error: ", error);
    fetchErr.style.display = "block";
  }
};
/* Function to GET the data from the server */
const retreivedData = async (url = "") => {
  const data = await fetch(url);
  try {
    const returnedData = await data.json();
    return returnedData;
  } catch (error) {
    console.log("retreivedData function error: ", error);
    fetchErr.style.display = "block";
  }
};

/* Function to update the UI */
const updateUI = (data) => {
  output.style.transform = "scale(1)";
  dateOutput.innerHTML = data.date;
  tempOutput.innerHTML = data.temp;
  contentOutput.innerHTML = data.content;
};
