// // Define the hotelsURL with query parameters
// const hotelsURL =
//   "https://serpapi.com/search?engine=google_hotels&q=Paris&check_in_date=2024-07-23&check_out_date=2024-10-12&adults=2&currency=EUR&gl=us&hl=en&api_key=cde9815a478bd22457922ddd15304b441b8774ee5084546b9e1fd1705a434590";

// // Fetch data from the hotelsURL using fetch
// fetch(hotelsURL)
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//     console.log(data.properties);

//     var hotelListDiv = document.getElementById("hotelList");

//     // Function to generate star based on rating
//     function generateStarRating(rating) {
//       const maxStars = 5; // Maximum number of stars
//       const fullStar = "★";
//       const emptyStar = "☆";

//       const fullStarsCount = Math.floor(rating);

//       let starsHtml = "";

//       // Append full stars
//       for (let i = 0; i < fullStarsCount; i++) {
//         starsHtml += fullStar;
//       }

//       // Append empty stars to complete the rating to 5 stars
//       const remainingStars = maxStars - Math.floor(rating); // Remaining empty stars
//       for (let i = 0; i < remainingStars; i++) {
//         starsHtml += emptyStar;
//       }

//       return starsHtml;
//     }

//     for (let i = 0; i < Math.min(6, data.properties.length); i++) {
//       var hotelName = data.properties[i].name;
//       var type = data.properties[i].type;
//       var link = data.properties[i].link;
//       var description = data.properties[i].description;
//       var hotelClass = data.properties[i].hotel_class;
//       var amenities = data.properties[i].amenities;
//       var images = data.properties[i].images;
//       var rating = data.properties[i].overall_rating;
//       var price = data.properties[i].prices;

//       console.log(price);

//       var hotelBox = document.createElement("div");
//       hotelBox.classList.add("hotelBox");

//       var amenitiesHtml = '<div class="amenitiesList">';
//       for (let j = 0; j < Math.min(amenities.length, 5); j++) {
//         amenitiesHtml +=
//           '<div><span class="amenityBox">' + amenities[j] + "</span></div>";
//       }

//       if (amenities.length > 5) {
//         amenitiesHtml += '<div><span class="amenityBox">More...</span></div>';
//       }

//       amenitiesHtml += "</div>";

//       // Construct HTML content for hotel box
//       var htmlContent = `
//       <div class="hotelContent">
//           <p class="subHeading">${hotelName}</p>
//           <p class="textSmall">${hotelClass}</p>
//           <p><strong>Rating:</strong> ${rating} ${generateStarRating(
//         rating
//       )}</p>
//           <p>${description}</p>
//           <p><strong>Type:</strong> ${type}</p>
//           ${amenitiesHtml}</div>
//       `;

//       // Append hotel box content to the hotel box element
//       hotelBox.innerHTML = htmlContent;

//       // Append hotel box element to the hotel list container
//       hotelListDiv.appendChild(hotelBox);

//       var imageDiv = document.createElement("div");
//       imageDiv.classList.add("imageDiv");

//       // Add images to the hotel box
//       for (var j = 0; j < Math.min(1, images.length); j++) {
//         var imgElement = document.createElement("img");
//         imgElement.src = images[j].thumbnail;
//         imgElement.classList.add("hotel-image");
//         imageDiv.appendChild(imgElement);
//       }
//       var moreInfoLink = document.createElement("a");
//       moreInfoLink.href = link;
//       moreInfoLink.target = "_blank";
//       moreInfoLink.textContent = "More Info";
//       moreInfoLink.classList.add("buttonLink");

//       // Append the "More Info" link (button) to the imageDiv
//       imageDiv.appendChild(moreInfoLink);
//       hotelBox.appendChild(imageDiv);
//     }
//   })
//   .catch((error) => {
//     console.error("Error fetching data:", error);
//   });

document.addEventListener("DOMContentLoaded", function () {
  const hotelsURL =
    "https://serpapi.com/search?engine=google_hotels&q=Paris&check_in_date=2024-07-23&check_out_date=2024-10-12&adults=2&currency=EUR&gl=us&hl=en&api_key=cde9815a478bd22457922ddd15304b441b8774ee5084546b9e1fd1705a434590";

  let hotelsData = []; // Variable to hold the fetched hotel data

  const hotelListDiv = document.getElementById("hotelList");

  // Function to generate star rating HTML
  function generateStarRating(rating) {
    const maxStars = 5;
    const fullStar = "★";
    const emptyStar = "☆";
    const fullStarsCount = Math.floor(rating);
    let starsHtml = "";
    for (let i = 0; i < fullStarsCount; i++) {
      starsHtml += fullStar;
    }
    for (let i = 0; i < maxStars - fullStarsCount; i++) {
      starsHtml += emptyStar;
    }
    return starsHtml;
  }

  // Function to display hotels based on filtered criteria
  function displayHotels() {
    const searchInput = document
      .getElementById("searchInput")
      .value.toLowerCase();
    const sortByRating = document.getElementById("sortByRating").value;
    const filterByStar = document.getElementById("filterByStar").value;

    // Filter and sort hotels based on user selections
    const filteredHotels = hotelsData.filter((hotel) => {
      const hotelName = hotel.name.toLowerCase();
      const hotelRating = hotel.overall_rating;
      const hotelStars = hotel.extracted_hotel_class;
      return (
        hotelName.includes(searchInput) &&
        (filterByStar === "all" || hotelStars === parseInt(filterByStar))
      );
    });

    // Sort filtered hotels by rating
    filteredHotels.sort((a, b) => {
      const ratingA = a.overall_rating;
      const ratingB = b.overall_rating;
      return sortByRating === "asc" ? ratingA - ratingB : ratingB - ratingA;
    });

    // Clear previous hotel listings
    hotelListDiv.innerHTML = "";

    // Generate HTML for each hotel and append to the hotelListDiv
    filteredHotels.slice(0, 6).forEach((hotel) => {
      const hotelBox = document.createElement("div");
      hotelBox.classList.add("hotelBox");

      const amenitiesHtml = hotel.amenities
        .slice(0, 5)
        .map(
          (amenity) => `<div><span class="amenityBox">${amenity}</span></div>`
        )
        .join("");

      const htmlContent = `
          <div class="hotelContent">
            <p class="subHeading">${hotel.name}</p>
            <p class="textSmall">${hotel.hotel_class}</p>
            <p><strong>Rating:</strong> ${
              hotel.overall_rating
            } ${generateStarRating(hotel.overall_rating)}</p>
            <p>${hotel.description}</p>
            <p><strong>Type:</strong> ${hotel.type}</p>
            <div class="amenitiesList">${amenitiesHtml}</div>
          </div>
        `;

      hotelBox.innerHTML = htmlContent;

      const imageDiv = document.createElement("div");
      imageDiv.classList.add("imageDiv");

      const imgElement = document.createElement("img");
      imgElement.src = hotel.images[0].thumbnail;
      imgElement.classList.add("hotel-image");
      imageDiv.appendChild(imgElement);

      const moreInfoLink = document.createElement("a");
      moreInfoLink.href = hotel.link;
      moreInfoLink.target = "_blank";
      moreInfoLink.textContent = "More Info";
      moreInfoLink.classList.add("buttonLink");

      imageDiv.appendChild(moreInfoLink);
      hotelBox.appendChild(imageDiv);

      hotelListDiv.appendChild(hotelBox);
    });
  }

  // Fetch hotel data and store in hotelsData array
  fetch(hotelsURL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      hotelsData = data.properties;
      displayHotels();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  // Event listeners for search input and dropdowns
  document
    .getElementById("searchInput")
    .addEventListener("input", displayHotels);
  document
    .getElementById("sortByRating")
    .addEventListener("change", displayHotels);
  document
    .getElementById("filterByStar")
    .addEventListener("change", displayHotels);
});
