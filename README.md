## Dev Environment Setup

- activate virtual env
- run classifier api
- expose localhost to web with ngrok
- replace temporary url in manifest.yml and constants.js
- forge deploy
- forge install --upgrade

### Tunnelling
- forge tunnel
    - error: {"__tunnel_error__":true,"name":"NgrokError","attributes":{}}
        - toggle 'region: us' in ngrok config file
- npm start
    - for custom UI
    - ensure tunnel port is specified in manifest.yml
    - no need to reload pages; just save custom UI code
