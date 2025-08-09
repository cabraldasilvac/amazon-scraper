# Amazon Product Scraper

This project is a simple web application that scrapes product listings from the first page of Amazon search results for a given keyword. It consists of a backend API built with Bun, Express, and JSDOM, and a frontend built with Vanilla JavaScript, HTML, and CSS using Vite.

## Features

- **Backend API:** An endpoint `/api/scrape` that takes a `keyword` and returns a JSON array of product details.
- **Frontend:** A user-friendly interface to input a keyword, initiate the scraping, and display the results.
- **Error Handling:** Graceful error handling on both the server and client sides.

## Project Structure

amazon-scraper
/backend
package.json
index.ts
tsconfig.json
/frontend
index.html
main.js
style.css
package.json
vite.config.js
README.md

## Setup and Running Instructions

### Prerequisites

- [Bun](https://bun.sh/) installed on your machine.
- Node.js and npm (Vite uses npm for package management).

### 1. Backend Setup

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Install the dependencies using Bun:
    ```bash
    bun install
    ```
3.  Start the Bun server:
    ```bash
    bun run start
    ```
    The server will run on `http://localhost:3000`.

### 2. Frontend Setup

1.  Open a new terminal and navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install the dependencies using npm:
    ```bash
    npm install
    ```
3.  Start the Vite development server:
    ```bash
    npm run dev
    ```
    The frontend will be available at `http://localhost:5173` (or another port specified by Vite).

### 3. Usage

1.  Open your browser and navigate to the frontend URL (e.g., `http://localhost:5173`).
2.  Enter a search keyword in the input field (e.g., "bluetooth headphones").
3.  Click the "Scrape" button.
4.  The application will make a request to the backend API, which will scrape Amazon and display the results on the page.

---

### Considerations

- **Amazon's Anti-Scraping Measures:** Be aware that Amazon may block frequent scraping requests. For a production-level application, you would need to use a proxy service, handle CAPTCHAs, or use a dedicated scraping API. This script is intended for educational purposes and light usage.
- **Selector Changes:** Amazon's HTML structure can change at any time. The CSS selectors used in `backend/index.ts` (`.s-result-item`, `h2 a span`, etc.) may become outdated, requiring updates to the code.
- **Robustness:** The current implementation is a simplified example. A more robust solution would involve more complex error handling, retries, and better data sanitization.
