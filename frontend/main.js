const keywordInput = document.getElementById("keyword-input");
const scrapeButton = document.getElementById("scrape-button");
const loadingElement = document.getElementById("loading");
const resultsContainer = document.getElementById("results-container");

// Base URL for the backend API
const API_URL = "http://localhost:3000/api/scrape";

scrapeButton.addEventListener("click", async () => {
  const keyword = keywordInput.value.trim();
  if (!keyword) {
    alert("Please enter a search keyword.");
    return;
  }

  // Clear previous results and show loading indicator
  resultsContainer.innerHTML = "";
  loadingElement.classList.remove("hidden");

  try {
    const response = await fetch(
      `${API_URL}?keyword=${encodeURIComponent(keyword)}`,
    );

    if (!response.ok) {
      // Handle HTTP errors
      const errorData = await response.json();
      throw new Error(
        errorData.error || `HTTP error! status: ${response.status}`,
      );
    }

    const data = await response.json();

    if (data.products && data.products.length > 0) {
      displayProducts(data.products);
    } else {
      resultsContainer.innerHTML = "<p>No products found for this keyword.</p>";
    }
  } catch (error) {
    console.error("Scraping failed:", error);
    resultsContainer.innerHTML = `<p>Error: Failed to fetch data. ${error.message}</p>`;
  } finally {
    // Hide loading indicator
    loadingElement.classList.add("hidden");
  }
});

function displayProducts(products) {
  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p><strong>Rating:</strong> ${product.rating || "N/A"}</p>
            <p><strong>Reviews:</strong> ${product.numberOfReviews || "N/A"}</p>
        `;

    resultsContainer.appendChild(card);
  });
}
