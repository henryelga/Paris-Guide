// Scroll to Top Function

var scrollToTopBtn = document.querySelector(".scrollToTopBtn");
var rootElement = document.documentElement;

function handleScroll() {
  if (rootElement.scrollTop > 300) {
    scrollToTopBtn.classList.add("showBtn");
  } else {
    scrollToTopBtn.classList.remove("showBtn");
  }
}

function scrollToTop() {
  rootElement.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
scrollToTopBtn.addEventListener("click", scrollToTop);
document.addEventListener("scroll", handleScroll);

// Hotels API

document.addEventListener("DOMContentLoaded", function () {
  const hotelsURL =
    "https://serpapi.com/search?engine=google_hotels&q=Paris&check_in_date=2024-07-23&check_out_date=2024-10-12&adults=2&currency=EUR&gl=us&hl=en&api_key=cde9815a478bd22457922ddd15304b441b8774ee5084546b9e1fd1705a434590";

  let hotelsData = []; // Hotel Data

  const hotelListDiv = document.getElementById("hotelList");

  // Function to generate star rating
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

  // Filter Hotels
  function displayHotels() {
    const searchInput = document
      .getElementById("searchInput")
      .value.toLowerCase();
    const sortByRating = document.getElementById("sortByRating").value;
    const filterByStar = document.getElementById("filterByStar").value;

    const filteredHotels = hotelsData.filter((hotel) => {
      const hotelName = hotel.name.toLowerCase();
      const hotelRating = hotel.overall_rating;
      const hotelStars = hotel.extracted_hotel_class;
      return (
        hotelName.includes(searchInput) &&
        (filterByStar === "all" || hotelStars === parseInt(filterByStar))
      );
    });

    // Sort by rating
    filteredHotels.sort((a, b) => {
      const ratingA = a.overall_rating;
      const ratingB = b.overall_rating;
      return sortByRating === "asc" ? ratingA - ratingB : ratingB - ratingA;
    });

    hotelListDiv.innerHTML = "";

    // Display filtered hotels
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
      imgElement.classList.add("hotelImage");
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

  // Fetch data from JSON url
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

// News API

const newsURL =
  "https://serpapi.com/search?engine=google_news&q=france%20olympics&api_key=cde9815a478bd22457922ddd15304b441b8774ee5084546b9e1fd1705a434590";

fetch(newsURL)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    var newsListDiv = document.getElementById("newsList");

    for (let i = 0; i < 6; i++) {
      const news = data.news_results[i];

      // Create a new div element for each news item
      var newsBox = document.createElement("div");

      // Split the date string to display only the date part
      const dateString = news.date;
      const dateparts = dateString.split(", ")[0];

      // Construct HTML content for news box
      var htmlContent = `
    <div class="newsContent">
    <div>
      <p class="newsTitle subHead">${news.title}</p>
      <p class="newsSource">Source: ${news.source.name}</p>
      <p class="newsAuthor textSmall">Author(s): ${news.source.authors}</p>
      <p class="newsDate">Date: ${dateparts}</p>
      <p>Read More <a href="${news.link}" target="_blank">here</a></p></div>
      <div class="iconDiv">
      <img src="${news.source.icon}" class="newsIcon" alt="Thumbnail"></div>
    </div>
  `;

      // Append news box content to the news box element
      newsBox.innerHTML = htmlContent;

      // Append news box element to the news container
      newsListDiv.appendChild(newsBox);
    }
  })
  // })
  .catch((error) => {
    console.error("Error fetching news data:", error);
  });

// Google Maps

let service;
let map;

function loadMap() {
  let services_centre_location = { lat: 48.856614, lng: 2.3522219 }; // Paris

  map = new google.maps.Map(document.getElementById("map"), {
    mapId: "MY_MAP_ID",
    zoom: 17,
    center: new google.maps.LatLng(services_centre_location),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControlOptions: {
      mapTypeIds: ["roadmap", "hide_poi"],
    },
  });

  hidePointsOfInterest(map);

  service = new google.maps.places.PlacesService(map);

  service.nearbySearch(
    {
      location: services_centre_location, // centre of the search
      radius: 500, // radius (in metres) of the search
      type: "hotel",
    },
    getNearbyServicesMarkers
  );
}

function getNearbyServicesMarkers(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    results.forEach((result) => {
      createMarker(result);
    });
  }
}

let infoWindow = null;
function createMarker(place) {
  let icon = document.createElement("img");
  icon.src = place.icon;
  icon.style.width = "20px";
  icon.style.height = "20px";

  let marker = new google.maps.marker.AdvancedMarkerElement({
    map: map,
    content: icon,
    position: place.geometry.location,
  });

  if (infoWindow === null) {
    infoWindow = new google.maps.InfoWindow();
  }

  google.maps.event.addListener(marker, "click", () => {
    request = {
      placeId: place.place_id,
      fields: [
        "name",
        "formatted_address",
        "international_phone_number",
        "icon",
        "geometry",
      ],
    };
    service.getDetails(request, (placeDetails) =>
      infoWindow.setContent(
        "<p><strong>" +
          placeDetails.name +
          "</strong><br>" +
          placeDetails.formatted_address +
          "</br>" +
          placeDetails.international_phone_number +
          "</p>"
      )
    );

    infoWindow.open(map, marker);
  });
}

function hidePointsOfInterest(map) {
  let styles = [
    {
      featureType: "poi",
      stylers: [{ visibility: "off" }],
    },
  ];

  let styledMapType = new google.maps.StyledMapType(styles, {
    name: "POI Hidden",
    alt: "Hide Points of Interest",
  });
  map.mapTypes.set("hide_poi", styledMapType);

  map.setMapTypeId("hide_poi");
}
