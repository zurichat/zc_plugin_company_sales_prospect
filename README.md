# zc_plugin_company_sales_prospect
## Running the App locally


Create a file names .env in the root directory of the cloned repo. <br/>
Then store your SECREY_KEY KEY and DEBUG variables in the file

```
SECRET_KEY="<YOUR_SECRET_KEY>"
DEBUG=1
```

## React Server
Go to the `frontend/epictetus` directory and then run the following:
```
yarn install
yarn start
```

To build the application so that the frontend application can be integrated into the backend to form a fullstack application, go to package.json and change the build script:

```
From:
"build": "node build-plugin"

To:
"build" : "craco build"
```

To actually build run `yarn build`

## Django server

Go back to the root directory and runthe following to start the django server
```
python manage.py migrate
python manage.py runserver
```
At this point, your react application has been integrated with your backend to form a fullstack application.

All API endpoints must end with a  `/` (e.g `/propscts/` unless they'll be pointing to the frontend 's react routing). <br/>

The link to the documenation of APIs can be found in `https://sales.zuri.chat/swagger_docs/`


## Prospects API
https://sales.zuri.chat/propsects/
https://sales.zuri.chat/propsects/create/
https://sales.zuri.chat/propsects/{id}/
https://sales.zuri.chat/propsects/update/{id}/

## Deals API
https://sales.zuri.chat/deals/{id}/
https://sales.zuri.chat/deals/create/
https://sales.zuri.chat/deals/list/
https://sales.zuri.chat/deals/update/{id}/

## OTHERS
https://sales.zuri.chat/api/info/ <br/>
https://sales.zuri.chat/sidebar


<!-- Always toggle isLocal to be the opposite  -->
<!-- isLocal should be !isLocal when in local -->