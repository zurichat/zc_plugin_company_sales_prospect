# zc_plugin_company_sales_prospect
# PLEASE DO NOT TOUCH `frontend/rootApp`
## Running the App locally

## React Server
Go to the `frontend/mainApp` directory and then run the following:
```
yarn install
yarn start:standalone
```
The server will run on http://localhost:8080/
<!-- To build the application so that the frontend application can be integrated into the backend to form a fullstack application, go to package.json and change the build script:

```
From:
"build": "node build-plugin"

To:
"build" : "craco build"
``` -->

To actually build run `yarn build`

## Django server

Go back to the root directory and run the following to start the django server

Create a file names .env in the `backend` root directory of the cloned repo. <br/>
Then store your SECREY_KEY KEY and DEBUG variables in the file

```
SECRET_KEY="<YOUR_SECRET_KEY>"
DEBUG=1
python manage.py migrate
python manage.py runserver
```
The server will run on http://localhost:8200/

All API endpoints must end with a  `/` (e.g `/propscts/` unless they'll be pointing to the frontend 's react routing). <br/>

The link to the documenation of APIs can be found in `https://sales.zuri.chat/docs/`


## Fullstack Server [not neccessarry]
There are 2 root directories, backend and frontend
In the `/frontend/` root directory, the rootApp and mainApp. <br/>
Firstly in `/frontend/rootApp/`<br/>


1. Go to `/frontend/rootApp/src/index.ejs`
2. Go to line 33 and change `isLocal` to `!isLocal` PLEASE SWITCH IT BACK BEFORE PUSHING, IT SHOULD BE `isLocal`.
3. Then go back to `/frontend/rootApp/` and run `yarn relocate`
4. Then go to `/frontend/mainApp/` and run `yarn relocate`
5. Then you move to the `/backend/` root directory, run: <br/>
`python manage.py collectstatic --noinput` <br/>
6. Then run `python manage.py runserver`.

## Please in `/frontend/rootApp/src/index.ejs`, it should be `isLocal` not `!isLocal`.
## Prospects API
https://sales.zuri.chat/api/v1/propsects/
https://sales.zuri.chat/api/v1/propsects/create/
https://sales.zuri.chat/api/v1/propsects/{id}/
https://sales.zuri.chat/api/v1/propsects/update/{id}/

## Deals API
https://sales.zuri.chat/api/v1/deals/{id}/
https://sales.zuri.chat/api/v1/deals/create/
https://sales.zuri.chat/api/v1/deals/list/
https://sales.zuri.chat/api/v1/deals/update/{id}/

## OTHERS
https://sales.zuri.chat/api/v1/info/ <br/>
https://sales.zuri.chat/api/v1/sidebar/


<!-- Always toggle isLocal to be the opposite  -->
<!-- isLocal should be !isLocal when in local -->

<!-- cd frontend/main/ --- yarn relocate
cd ../../frontend/root/ --- yarn relocate
cd ../../backend/ --- python manage.py collectstatic --noinput -->
