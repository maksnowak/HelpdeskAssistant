# HelpdeskAssistant

## Prerequisites

- Python 3.13 or higher
- Docker
- Docker Compose
- [Google AI Studio API key](https://aistudio.google.com/apikey)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/maksnowak/HelpdeskAssistant.git
   ```
2. Change to the project directory:

   ```bash
    cd HelpdeskAssistant
   ```
3. Create an `.env` file in the root directory and add your Google AI Studio API key:

   ```bash
   echo "GEMINI_API_KEY=your_api_key" > .env
   ```
4. Build the Docker images:

   ```bash
    docker-compose build
   ```

### Building the app without Docker
If you prefer to run the app without Docker, you can do so by following these steps:
1. Make sure you have [`uv`](https://docs.astral.sh/uv/) and [`node`](https://nodejs.org/en) installed on your system.
2. Clone the repository:

```bash
git clone https://github.com/maksnowak/HelpdeskAssistant.git
```
3. Change to the project directory:

```bash
cd HelpdeskAssistant
```
4. Set up the Python project using `uv`:

```bash
uv sync 
```
5. Run the backend:

```bash
uv run helpdeskassistant
```
6. Change to the frontend directory:

```bash
cd frontend
```
7. Install the frontend dependencies:
```bash
npm install
```
8. Build the frontend project:

```bash
npm run build
```
9. Start the frontend server:

```bash
npm run preview
```
10. Open your web browser and navigate to `http://localhost:4173` to access the Helpdesk Assistant.
---
Alternatively, you can launch the frontend server in development mode:

```bash
npm run dev
```

## Usage

1. Start the Docker containers:

   ```bash
   docker-compose up
   ```
2. Open your web browser and navigate to `http://localhost:4173` to access the Helpdesk Assistant.

## License

This project is licensed under the terms of the GNU General Public License Version 3.
