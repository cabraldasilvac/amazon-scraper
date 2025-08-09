import express from "express";
import axios from "axios";
import { JSDOM } from "jsdom";

const app = express();
const port = 3000;

app.use(express.json());

// Enable CORS for frontend requests
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  next();
});

app.get("/api/scrape", async (req, res) => {
  const { keyword } = req.query;

  if (!keyword) {
    return res.status(400).json({ error: "Keyword is required" });
  }

  try {
    // Construct Amazon search URL
    const url = `https://www.amazon.com/s?k=${encodeURIComponent(keyword as string)}`;

    // Set a User-Agent to mimic a real browser request
    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    const dom = new JSDOM(response.data);
    const document = dom.window.document;
    const products: any[] = [];

    // Select all product listing elements
    const productListings = document.querySelectorAll(".s-result-item");

    productListings.forEach((item) => {
      // Skip sponsored and other non-product items
      if (
        item.classList.contains("s-sponsored-card-container") ||
        item.id === "nav-search-bar-form"
      ) {
        return;
      }

      const titleElement = item.querySelector("h2 a span");
      const ratingElement = item.querySelector(
        ".a-icon-star-small .a-icon-alt",
      );
      const reviewsElement = item.querySelector(".a-size-small .a-size-base");
      const imageElement = item.querySelector(".s-image");

      if (titleElement) {
        const title = titleElement.textContent?.trim() || "N/A";
        const rating = ratingElement
          ? ratingElement.textContent?.trim().split(" ")[0]
          : "N/A";
        const numberOfReviews = reviewsElement
          ? reviewsElement.textContent?.trim().replace(",", "")
          : "N/A";
        const imageUrl = imageElement
          ? (imageElement as HTMLImageElement).src
          : "N/A";

        products.push({
          title,
          rating,
          numberOfReviews,
          imageUrl,
        });
      }
    });

    res.json({ products });
  } catch (error: any) {
    console.error("Scraping error:", error.message);
    res
      .status(500)
      .json({ error: "Failed to scrape Amazon", details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Backend server listening on http://localhost:${port}`);
});
