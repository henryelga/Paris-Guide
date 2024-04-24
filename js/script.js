// Define the hotelsURL with query parameters
const hotelsURL =
  "https://serpapi.com/search?engine=google_hotels&q=Paris&check_in_date=2024-07-23&check_out_date=2024-10-12&adults=2&currency=EUR&gl=us&hl=en&api_key=cde9815a478bd22457922ddd15304b441b8774ee5084546b9e1fd1705a434590";

// Fetch data from the hotelsURL using fetch
fetch(hotelsURL)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
    console.log(data.properties);

    var hotelListDiv = document.getElementById("hotelList");

    for (let i = 0; i < Math.min(6, data.properties.length); i++) {
      var hotelName = data.properties[i].name;
      var type = data.properties[i].type;
      var link = data.properties[i].link;
      var description = data.properties[i].description;
      var hotelClass = data.properties[i].hotel_class;
      var amenities = data.properties[i].amenities;
      var images = data.properties[i].images;
      var rating = data.properties[i].overall_rating;

      console.log(`Hotel Name: ${hotelName}`);
      console.log(`Type: ${type}`);
      console.log(`Link: ${link}`);
      console.log(`Description: ${description}`);
      console.log(`Hotel Class: ${hotelClass}`);
      console.log(`Amenities: ${amenities.join(", ")}`);
      console.log(`Rating: ${rating}`);

      var hotelBox = document.createElement("div");
      hotelBox.classList.add("hotelBox");

      // Construct HTML content for hotel box
      var htmlContent = `
          <h2>${hotelName}</h2>
          <p><strong>Type:</strong> ${type}</p>
          <p><strong>Description:</strong> ${description}</p>
          <p><strong>Hotel Class:</strong> ${hotelClass}</p>
          <p><strong>Amenities:</strong> ${amenities.join(", ")}</p>
          <p><strong>Rating:</strong> ${rating}</p>
          <a href="${link}" target="_blank">More Info</a>
      `;

      // Append hotel box content to the hotel box element
      hotelBox.innerHTML = htmlContent;

      // Append hotel box element to the hotel list container
      hotelListDiv.appendChild(hotelBox);

      // Add images to the hotel box
      for (var j = 0; j < Math.min(3, images.length); j++) {
        var imgElement = document.createElement('img');
        imgElement.src = images[j].thumbnail;
        imgElement.classList.add('hotel-image');
        hotelBox.appendChild(imgElement);
    }
    }
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
