# JSON Translate - React / Express / ClaudeSDK - Automatic translation of JSON formatted files (for example files used by i18n).
A Web App built with React as a Frontend and Express as a Backend. It uses the Anthropic [Claude SDK](https://docs.anthropic.com/en/api/client-sdks) for translating the phrases in a translations JSON file.

## Frontend: [json-translator React Frontend](https://github.com/ivaaak/json-translator/tree/main/frontend)
## Backend: [json-translator Express Backend](https://github.com/ivaaak/json-translator/tree/main/backend)

**Screenshots:**
<img src="https://github.com/ivaaak/JSON-Translator/blob/main/frontend/public/screenshots/1.png?raw=true"></img>

### Getting Started:
You need the following API keys to add to a .env file in the `backend` folder:
```cmd
ANTHROPIC_API_KEY=your_api_key_here
```

You can run the below commands from the base directory and start the project:
```cmd
npm i
npm start
```
This installs and starts both the FE and BE using the npm tool 'concurrently'. Or you can run the commands separately in the frontend / backend folders to have them running in separate instances/terminals.

### Built With:
-  [**✔**]  `React (Vite, Typescript)`
-  [**✔**]  `Express API`
-  [**✔**]  `Claude SDK / API`
