# Zuri Chat Company Sales Prospect Plugin
## Description
The sales plugin is a feature that integartes basic CRM functionalities in a particular workspace for an organization. This  helps the organization keep track of essential information, regarding it's customers and their corresponding transactions in a non bloated manner.


## <br>Installation / Configurations
The following need to be set up before you can run this project

- [Reactjs](https://reactjs.org/docs/getting-started.html)
- [Python](https://www.python.org/downloads/)
- [Django](https://www.djangoproject.com/download/)
- [Single SPA](https://single-spa.js.org/docs/ecosystem-react)
- [Centrifugo](https://centrifugal.dev/docs/getting-started/installation)


## <br>Status
The plugin is currently live 


## <br>Endpoints
### Prospects API
    https://sales.zuri.chat/api/v1/propsects/
    https://sales.zuri.chat/api/v1/propsects/create/
    https://sales.zuri.chat/api/v1/propsects/{id}/
    https://sales.zuri.chat/api/v1/propsects/update/{id}/

### Deals API
    https://sales.zuri.chat/api/v1/deals/{id}/
    https://sales.zuri.chat/api/v1/deals/create/
    https://sales.zuri.chat/api/v1/deals/list/
    https://sales.zuri.chat/api/v1/deals/update/{id}/

### Others
    https://sales.zuri.chat/api/v1/info/ <br/>
    https://sales.zuri.chat/api/v1/sidebar/


## <br>Goals
- To keep track of customer informations and their corresponding transaction in an organised manner.
- To give actionable insight on transaction based on their position in sales pipeline.
- To achieve the above listed in a workspace


## <br>Technologies Used
- React (Frontend)
- Django (Backend)


## <br>How To Setup The Project
- ### React Server
    Go to the `frontend/mainApp` directory and then run the following:

    ```sh
    yarn install
    yarn start:standalone
    ```
    The server will run on http://localhost:8080/

    To actually build run `yarn build`

- ### Django server

    Go back to the root directory and runthe following to start the django server

    Create a file names .env in the `backend` root directory of the cloned repo. <br/>
    Then store your SECREY_KEY KEY and DEBUG variables in the file

    ```
    SECRET_KEY="<YOUR_SECRET_KEY>"
    DEBUG=1
    python manage.py migrate
    python manage.py runserver
    ```
    The server will run on http://localhost:8200/

- ### Fullstack Server [not neccessarry]
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

    #### Please in `/frontend/rootApp/src/index.ejs`, it should be `isLocal` not `!isLocal`.


## <br>Guidelines On How To Contribute
Contributions are welcome!

Please read [How to contribute](./Contribution.md) which will guide you through the entire workflow of how to build the source code, how to run the tests, and how to contribute changes to the codebase. The "How to contribute" document also contains info on how the contribution process works and contains best practices for creating contributions.


## <br>Credits And Acknowledgement
We give credits to the following set of individuals that have contributed immensely to design, development and implementation of this plugin

1. Designers
   - Sopuluchukwu Nacheetah  (Product Design Lead, Deputy Team Lead) - nacheetah70@gmail.com

2. Backend Engineers
   - Mikhail Olusanya (Backend team lead) - Mikhail.olusanya@gmail.com
   - Joseph Chinedu - joseph4jubilant@gmail.com
   - Chukwunonso Unachukwu - borneanime11@gmail.com
   - Olatunji Komolafe - iamkomolafe.o.s@gmail.com
   - Ajibade Abdullah - ajibadeabd@gmail.com
   - Alashi Muyiwa - alashimuyiwa@gmail.com
   - Soladoye Elijah - shodown96@gmail.com

3. Frontend Engineers
   - Khadijah Amusat (Team Lead/ Frontend Lead)- wuraola81@gmail.com	
   - Uzochukwu Precious - p.uzor99@gmail.com
   - Aaron Sunday - aaron_asap@icloud.com
   - Maureen Anyanwu - maureenanyanwu519@gmail.com
   - Soladoye Elijah - shodown96@gmail.com
  
We also acknowledge the following resources which were helpful during the course of the plugin development
- [React](https://reactjs.org/docs/getting-started.html)
- [Django](https://docs.djangoproject.com/en/3.2/)
- [Single SPA](https://single-spa.js.org/docs/ecosystem-react)
- [Centrifugo](https://centrifugal.dev/docs/getting-started/quickstart)
- [Font Awesome](https://fontawesome.com)
- [React Icons](https://react-icons.github.io/react-icons/search)


## <br>File Manifest
1. ### Backend: base library folder for all django backend codes 
    - common: this folder contains files that are used by both the frontend and backend folders. It also contains files that are imported in the backend folder.
    - conf: this folder contains the base settings for the backend app.
    - deals: contains the setup for deals room.
        - migrations: this folder contains all the migration folders for the deals app.
        - __init__.py: this file initializes the deals app.
        - apps.py: this file configures the app.
        - serializers.py: this file serializes (converts to json) the data.
        - tests.py: the tests for the deals functions (subsequently called modules) are done here.
        - urls.py: this file contains all the url routes to the deals API endpoints.
        - views.py: all requests for deals endpoints are created in this file.
    - email_template: contains the setup for the email functionality
        - migrations: this folder contains all the migration folders for the email app.
        - __init__.py: this file initializes the email app.
        - apps.py: this file configures the app.
        - serializers.py: this file serializes (converts to json) the data.
        - tests.py: the tests for the email modules are done here.
        - urls.py: this file contains all the url routes to the email API endpoints.
        - views.py: all requests for email endpoints are created in this file.
    - onboarding:
    - prospect: contains the setup for the prospect(contact) app.
        - migrations: this folder contains all the migration folders for the email app.
        - __init__.py: this file initializes the prospect app.
        - apps.py: this file configures the app.
        - serializers.py: this file serializes (converts to json) the data.
        - tests.py: the tests for the prospect modules are done here.
        - urls.py: this file contains all the url routes to the prospect API endpoints.
        - views.py: all requests for prospect endpoints are created in this file.
    - static: contains all static files
    - sync_app:
    - .gitignore: contains all files and folders to be ignored when pushing to github
    - manage.py: Django's command-line utility for administrative tasks.
    - requirements.txt: contains all required packages to be installed for the backed app to run properly.
2. ### Frontend: contains the react frontend codes
    - mainApp
    - rootApp 


## <br>Copyright and Licensing
Check out the [Licence.md](./Licence.md)
