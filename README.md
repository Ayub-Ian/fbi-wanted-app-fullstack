# FBI Wanted Persons Explorer

This project is a web application built with Express.js on the backend and React on the frontend to fetch, display, search, and filter information about wanted persons from the FBI Wanted API. It also features a detailed view for individual records and basic caching on the backend.

## Prerequisites

Before you can run or develop this project, ensure you have the following installed on your system:

* [**Node.js**](https://nodejs.org/) (Version 18 was used)
* **npm** (comes bundled with Node.js)
* [**Docker**](https://docs.docker.com/get-docker/)
* [**Docker Compose**](https://docs.docker.com/compose/install/)
* [**Git**](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) (For cloning the repository and version control)


## Features

### 1.1. Fetching Data

* Fetches a list of wanted persons from the [FBI Wanted API](https://www.fbi.gov/wanted/api).
* Displays relevant information for each wanted person, including:
    * Name
    * Description
    * Image
* Implements **pagination** to handle a large number of results, improving initial load time and user experience.

### 1.2. Search & Filter

* **Search:** Allows users to search for wanted persons based on various parameters supported by the FBI Wanted API, such as:
    * Name
    * Keywords
    * Subjects
* **Filter:** Enables users to filter the list of wanted persons based on available data from the API, such as:
    * Gender
    * Person Classification
    * Race

### 1.3. Detailed View

* Allows users to select a wanted person from the list to view a dedicated detail page.
* The detail page displays comprehensive information, including:
    * Personal Details
    * Descriptions
    * Alerts
    * Caution Information
    * Field Offices
* Includes an **"Additional Information"** panel that displays external links provided in the API response.

### 1.4. Backend Integration

* Exposes a simple backend endpoint `/api/wanted` built with Express.js.
* This backend endpoint acts as a **proxy** to the FBI Wanted API, handling requests from the frontend.
* Implements a basic **caching mechanism** (in-memory) to store results from the FBI Wanted API for a short duration, reducing the load on the external API for repeated requests.


## Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository_url> <your-repository-directory>
    cd <your-repository-directory>
    ```

2.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

3.  **Install backend dependencies:**
    ```bash
    npm install
    ```

4.  **Start the backend server:**
    ```bash
    npm start
    ```
    The backend server will run on `http://localhost:<backend_port>` (default might be 3030).

5.  **Navigate to the frontend directory:**
    ```bash
    cd ../frontend
    ```

6.  **Install frontend dependencies:**
    ```bash
    npm install
    ```

7.  **Setup environment variables:**
    ```bash
    echo "VITE_API_BASE_URL=http://localhost:3030/api
    " > .env.local
    ```

8.  **Start the frontend development server:**
    ```bash
    npm run dev
    ```
    The frontend application will typically run on `http://localhost:5173`.



## Running the Application with Docker Compose

This guide outlines how to run the frontend (React Vite) and backend (Express) applications using Docker Compose. Docker Compose simplifies the process of setting up and running multi-container applications.

### Setup

1.  **Clone the Repository:**

    ```bash
    git clone <repository_url> <your-repository-directory>
    cd <your-repository-directory>
    ```
### Running the Application

1.  **Build and Start the Containers:**

    Navigate to the root directory of your project (where the `docker-compose.yml` file is located) and run the following command:

    ```bash
    docker-compose up -d --build
    ```

    * `-d`: Runs the containers in detached mode (in the background).
    * `--build`: Builds the Docker images if they don't exist or if the `Dockerfile` or context files have changed. This ensures you're using the latest code.

2.  **Access the Application:**

    * **Frontend:** Open your web browser and go to `http://localhost:80`.
        * **Important:** The frontend is served by Nginx within the container. Therefore, you access it on port 80, not the Vite development server's default port (5173).
    * **Backend:** The backend API will be accessible at `http://localhost:3030/api` (or any other routes you've defined in your Express application).

### Stopping the containerized application

To stop and remove the running containers, execute the following command in the project's root directory:

```bash
docker-compose down
```

## Usage

1.  Open your web browser and navigate to the frontend URL (usually `http://localhost:5173`).
2.  You will see a paginated list of wanted persons fetched from the FBI Wanted API.
3.  Use the **search bar** to look for specific individuals based on name, keywords, or other supported parameters.
4.  Use the **filter options** to narrow down the list based on criteria.
5.  Click on a wanted person's entry in the list to view their **detailed information** on a separate page.
6.  On the detail page, you can find more in-depth information and potentially external links in the "Additional Information" panel.
7.  If the API or the backend encounters an error, a meaningful error message will be displayed on the screen.

## Technologies Used

* **Frontend:**
    * React
    * [React Router](https://reactrouter.com/) (for navigation)
    * [Tailwind CSS](https://tailwindcss.com) (for styling)
* **Backend:**
    * Express.js
    * [Node.js](https://nodejs.org/)
    * [NPM](https://www.npmjs.com/) (for package management)
