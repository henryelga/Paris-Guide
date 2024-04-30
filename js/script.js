// Hamburger Menu

$(document).ready(function () {
  $(".navbarToggler").click(function () {
    $(".navbarNav").toggleClass("show");
  });
});

// Footer DropDown

document.addEventListener("DOMContentLoaded", function () {
  const textHeaders = document.querySelectorAll(".textHeader");

  textHeaders.forEach((header) => {
    header.addEventListener("click", function () {
      // Remove active class from all textHeaders
      textHeaders.forEach((header) => {
        header.classList.remove("activeFooter");
      });

      // Toggle active class on clicked textHeader
      this.classList.toggle("activeFooter");
    });
  });
});

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

// Countdown Timer

// Set the date we're counting down to
var countDownDate = new Date("Jul 26, 2024").getTime();

// Update the count down every 1 second
var x = setInterval(function () {
  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Output the result in the corresponding elements
  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;

  // If the count down is over, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("days").innerHTML = "00";
    document.getElementById("hours").innerHTML = "00";
    document.getElementById("minutes").innerHTML = "00";
    document.getElementById("seconds").innerHTML = "00";
  }
}, 1000);

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

// const newsURL =
//   "https://serpapi.com/search?engine=google_news&q=france%20olympics&api_key=cde9815a478bd22457922ddd15304b441b8774ee5084546b9e1fd1705a434590";

const newsURL = `https://serpapi.com/search?engine=google&q=france+olympics&google_domain=google.com&location=Austin,+TX,+Texas,+United+States&tbm=nws&hl=en&gl=us&api_key=cde9815a478bd22457922ddd15304b441b8774ee5084546b9e1fd1705a434590`;

fetch(newsURL)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    var newsListDiv = document.getElementById("newsList");
    console.log(data.news_results[0].stories);

    for (let i = 0; i < 6; i++) {
      const news = data.news_results[i];

      // Create a new div element for each news item
      var newsBox = document.createElement("div");

      // Construct HTML content for news box
      var htmlContent = `
    <div class="newsContent">
    <div>
      <p class="newsTitle subHead">${news.title}</p>
      <p class="newsAuthor textSmall">Source: ${news.source}</p>
      <p class="newsSource">${news.snippet}</p>
      <p>Read More <a href="${news.link}" target="_blank">here</a></p></div>
      <div class="iconDiv">
      <img src="${news.thumbnail}" class="newsIcon" alt="Thumbnail"></div>
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
let directionsRenderer = null;

function loadMap() {
  new google.maps.places.Autocomplete(start);
  new google.maps.places.Autocomplete(end);
  let waypointInputs = document.querySelectorAll(".waypointInput");
  waypointInputs.forEach((input) => {
    new google.maps.places.Autocomplete(input);
  });

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

  directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);

  directionsRenderer.setPanel(document.getElementById("directions"));

  calculateRoute("DRIVING");
}

// function calculateRoute(travelMode = "DRIVING") {
//   document.getElementById("transport-mode").innerHTML = travelMode;
//   let start = document.getElementById("start").value;
//   let end = document.getElementById("end").value;

//   let request = { origin: start, destination: end, travelMode: travelMode };

//   directionsService = new google.maps.DirectionsService();
//   directionsService.route(request, (route, status) => {
//     if (status === google.maps.DirectionsStatus.OK) {
//       directionsRenderer.setDirections(route);
//     }
//   });
// }

function calculateRoute(travelMode = "DRIVING") {
  document.getElementById("transport-mode").innerHTML = travelMode;
  let start = document.getElementById("start").value;
  let end = document.getElementById("end").value;

  let waypoints = [];
  let waypointInputs = document.querySelectorAll(".waypointInput");

  waypointInputs.forEach((input) => {
    if (input.value.trim() !== "") {
      waypoints.push({
        location: input.value,
        stopover: true,
      });
    }
  });

  let request = {
    origin: start,
    destination: end,
    waypoints: waypoints,
    travelMode: travelMode,
  };

  directionsService = new google.maps.DirectionsService();
  directionsService.route(request, (route, status) => {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsRenderer.setDirections(route);
    }
  });
}

function getNearbyServicesMarkers(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    results.forEach((result) => {
      // console.log(result);
      createMarker(result);
    });
  }
}

let infoWindow = null;
function createMarker(place) {
  console.log(place.types);
  let icon = document.createElement("img");
  // icon.src = place.icon;
  if (place.types.includes("lodging")) {
    icon.src = "images/hotel.png";
  } else {
    icon.src = place.icon;
  }
  icon.style.width = "25px";
  icon.style.height = "25px";

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
        "photos",
        "rating",
        "opening_hours",
      ],
    };
    service.getDetails(request, (placeDetails) => {
      let openingHoursHtml = "";
      if (placeDetails.opening_hours) {
        if (placeDetails.opening_hours.isOpen()) {
          openingHoursHtml += "<p>Open now</p>";
        } else {
          openingHoursHtml += "<p>Closed now</p>";
        }
      } else {
        openingHoursHtml = "<p>Opening hours not available</p>";
      }
      let infoContent = `
  <div class="custom-info-window">
    <div class="custom-info-window-image">
      <img src="${place.photos[0].getUrl()}" alt="${
        placeDetails.name
      } thumbnail">
    </div>
    <div class="custom-info-window-content">
      <h3>${placeDetails.name}</h3>
      ${
        placeDetails.rating !== undefined
          ? `<p class="rating textSmall">Rating: ${placeDetails.rating}</p>`
          : ""
      }
      ${openingHoursHtml ? `<p class="hours">${openingHoursHtml}</p>` : ""}
      ${
        placeDetails.formatted_address
          ? `<p>${placeDetails.formatted_address}</p>`
          : ""
      }
      ${
        placeDetails.international_phone_number
          ? `<p>${placeDetails.international_phone_number}</p>`
          : ""
      }
    </div>
  </div>
`;

      infoWindow.setContent(infoContent);
      infoWindow.open(map, marker);
    });
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
