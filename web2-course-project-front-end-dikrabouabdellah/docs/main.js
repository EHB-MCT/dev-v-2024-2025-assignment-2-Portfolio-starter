// Check if the page is moreInfo.html and extract the anime ID from the URL
if (window.location.pathname.includes("moreInfo.html")) {
	const urlParams = new URLSearchParams(window.location.search);
	const animeId = urlParams.get("id");

	// Fetch data from the API using ID
	fetch(`https://courseproject-web-2-dikra-bouabdellah.onrender.com/gemRec?id=${animeId}`)
		.then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return response.json();
		})
		.then((data) => {
			console.log(data);

			// Update HTML elements with data
			const animeInfoImage = document.querySelector(".animeInfoImage img");
			const animeInfoText = document.querySelector(".animeInfoText h3");
			const scoreFillInElement = document.querySelector(".score .fillIn");
			const airedElement = document.querySelector(".aired .fillIn");
			const genreElement = document.querySelector(".genre .fillIn");
			const episodeElement = document.querySelector(".episode .fillIn");
			const summaryElement = document.querySelector(".summary .fillIn");
			const watchElement = document.querySelector(".watch a");

			// Check if elements exist before updating
			if (animeInfoImage && animeInfoText && airedElement && genreElement && episodeElement && summaryElement && watchElement && scoreFillInElement) {
				animeInfoImage.src = data.image;
				// check if it is a gemRec or not
				if (data.GemRec === "yes") {
					animeInfoText.innerText = `${data.name}: GemRec of ${data.date}`;
				} else {
					animeInfoText.innerText = `${data.name}`;
				}
				scoreFillInElement.innerHTML = `<img src="./favicon (1).ico" alt="" />`.repeat(parseInt(data.score));
				airedElement.innerText = data.aired;
				genreElement.innerText = data.genre;
				episodeElement.innerText = data.episode;
				summaryElement.innerHTML = data.summary.replace(/\n/g, "<br />");
				watchElement.href = data.watch;
			} else {
				console.error("One or more HTML elements not found");
			}
		})
		.catch((error) => console.error("Error fetching data:", error));
}

//get anime in general
document.addEventListener("DOMContentLoaded", function () {
	// Fetch data from the API
	fetch("https://courseproject-web-2-dikra-bouabdellah.onrender.com/gemRecs")
		.then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return response.json();
		})
		.then((data) => {
			console.log(data);

			// Get the container where to add the anime divs
			const animeContainer = document.getElementById("animeContainer");

			// Use map to create an array of HTML strings for each anime
			const animeHTML = data.map(
				(anime) => `
      <div class="oneAnime">
        <a href="./moreInfo.html?id=${anime.grid}">
          <div class="anime">
            <img src="${anime.image}" height="250" />
            <p>${anime.name}</p>
          </div>
        </a>
      </div>
    `
			);

			// Join the array of HTML strings and append to the container
			animeContainer.innerHTML = animeHTML.join("");
		})
		.catch((error) => console.error("Error fetching data:", error));
});

//GemRec for the allGemrecs page
if (window.location.pathname.includes("allGemRecs.html")) {
	document.addEventListener("DOMContentLoaded", function () {
		fetch("https://courseproject-web-2-dikra-bouabdellah.onrender.com/gemRecs")
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				return response.json();
			})
			.then((data) => {
				// Filter GemRecs with "yes"
				const gemRecsYes = data.filter((gemRec) => gemRec.GemRec === "yes");

				const otherGemRecsContainer = document.querySelector(".carousel-container");

				const gemRecsHTML = gemRecsYes.map(
					(gemRec) => `
                <div class="carousel-slide">
                    <h3>${gemRec.date}</h3>
                    <a href="./moreInfo.html?id=${gemRec.grid}">
                        <div class="carouselImage">
                            <img src="${gemRec.image}" height="350" />
                            <p>${gemRec.name}</p>
                        </div>
                    </a>
                </div>
                `
				);

				otherGemRecsContainer.innerHTML = gemRecsHTML.join("");
			})
			.catch((error) => console.error("Error fetching data:", error));
	});
}

//filter anime on home page and search function
document.addEventListener("DOMContentLoaded", function () {
	// Fetch data from the API
	fetch("https://courseproject-web-2-dikra-bouabdellah.onrender.com/gemRecs")
		.then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return response.json();
		})
		.then((data) => {
			console.log(data);

			const animeContainer = document.getElementById("animeContainer");

			// Function to filter anime based on user selections
			const filterAnime = () => {
				const genreFilterValue = document.querySelector("#genreFilterForm .activeFilter");
				const genreValue = genreFilterValue ? genreFilterValue.id : "everything";
				console.log("Genre Filter Value:", genreFilterValue);

				// Get search input value
				const searchInput = document.querySelector(".searchbar input[name='search']").value.toLowerCase();
				console.log("Search Input:", searchInput);

				// Filter the data based on user selections and search input
				const filteredData = data.filter((anime) => {
					// Check if Genre matches or Genre filter is set to "everything"
					const genreCondition = genreValue === "everything" || anime.genre.includes(genreValue);

					// Check if anime name contains the search input (case-insensitive)
					const searchCondition = searchInput === "" || anime.name.toLowerCase().includes(searchInput);

					return genreCondition && searchCondition;
				});

				const animeHTML = filteredData.map(
					(anime) => `
                        <div class="oneAnime">
                            <a href="./moreInfo.html?id=${anime.grid}">
                                <div class="anime">
                                    <img src="${anime.image}" height="250" />
                                    <p>${anime.name}</p>
                                </div>
                            </a>
                        </div>
                    `
				);

				// Update the container with filtered anime
				animeContainer.innerHTML = animeHTML.join("");
			};

			document.querySelectorAll("#genreFilterForm input").forEach((button) => {
				button.addEventListener("click", () => {
					document.querySelectorAll("#genreFilterForm input").forEach((b) => b.classList.remove("activeFilter"));
					button.classList.add("activeFilter");
					filterAnime();
				});
			});

			// Reset filters when the "Everything" button is clicked
			document.getElementById("resetFiltersButton").addEventListener("click", () => {
				document.querySelectorAll("#gemRecFilterForm input, #genreFilterForm input, .episodesFilterForm input").forEach((b) => b.classList.remove("activeFilter"));
				filterAnime();
			});

			// Listen for input changes in the search bar
			document.querySelector(".searchbar input[name='search']").addEventListener("input", filterAnime);

			filterAnime();
		})
		.catch((error) => console.error("Error fetching data:", error));
});
