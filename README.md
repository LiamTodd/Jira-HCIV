# JHCIV
This repository implements a Jira plugin using Atlassian's Forge framework. The plugin classifies a project's issues into human-centric categories using a tool created by Khalajzadeh et al. (2022), and provides a dashboard and issue panel to visualise the project and its issues from a human-centric perspective.

## Development Environment Setup
Running a development environment is resource intensive, as two React apps must be running, as well as a Flask API for the classifier, an ngrok tunnel for the classifier, and the Docker engine for the Forge tunnel.

In addition, each time the ngrok tunnel is restarted, the steps for 'Connecting to the Classifier API' must be followed again, along with the 'Deploying the app' instructions
### Custom UIs
The issue panel and dashboard are implemented as Forge Custom UIs, using React. Essentially, there are two React apps within the `static` directory, and these need to be built in order to deploy or run the app.
1. Build the issue panel

    ```cd .\static\issue-panel```

    ```npm run build```

    ```cd ..\..```
2. Build the dashboard

    ```cd .\static\dashboard```

    ```npm run build```

### Connecting to the Classifier API
The classifier is located in a separate repository: https://github.com/LiamTodd/hci-classifier-api
Follow the instructions in the README of the repository to set up the dev environment and get the server running locally on port 5000.

In order for the forge app to be able to make requests to the local server, an ngrok tunnel must be used to expose the local server to the web.

1. Install ngrok from https://ngrok.com/download.
2. Start a tunnel on port 5000.

    ```ngrok http 5000```
3. Copy the temporary URL which is displayed in the terminal.
4. In `.\manifest.yml`, replace the external>fetch>backend field with the temporary URL, suffixed with `/*` to allow all endpoints of the classifier API to be reached from the forge app.
5. In `.\src\constants.js`, replace the constant URL_BASE with the temporary URL.
### Deploying the app
1. Run ```forge deploy``` from the root directory.
2. Run ```forge install``` and follow the prompts, entering the details of your Jira dev site.

## Tunneling
Ensure that the app has been installed on your Jira dev site prior to these instructions.

In addition, the classifier API is running and is exposed to the web using an ngrok tunnel, and the temporary URL has been updated in `.\manifest.yml` and `.\src`.

1. Install Docker Desktop from https://www.docker.com/products/docker-desktop/.
2. Run Docker.
3. Run the Custom UIs on ports 3000 and 3001. The two apps are configured to run on these ports already, so just ensure that they are available.

    ```cd .\static\issue-panel```

    ```npm start```

    ```cd ..\..```

    ```cd .\static\dashboard```

    ```npm start```

    ```cd ..\..```
4. Start the Forge tunnel.
    ```forge tunnel```

A common issue which occurs when starting a tunnel (which I encountered frequently) was 

    error: {"__tunnel_error__":true,"name":"NgrokError","attributes":{}}

To resolve this issue, I found that I needed to open my ngrok config file (which can be found using ```ngrok config check```), and either:
- Add the line ```region: us``` if it was not there already
- OR, removing the line ```region: us``` if it was there.

This issue occurred on a daily basis, and could only be prevented by toggling this setting, strangely.

# References
Khalajzadeh, H., Shahin, M., Obie, H. O., Agrawal, P., & Grundy, J. (2022). Supporting developers in addressing human-centric issues in mobile apps. IEEE Transactions on Software Engineering, 49(4), 2149-2168.