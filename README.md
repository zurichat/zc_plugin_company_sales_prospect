# zc_plugin_company_sales_prospect

## Company Sales Plugin Architecture

The image below shows our current architecture.
![Company Sales Plugin Architecture](architecture.png?raw=true "Company Sales Plugin Architecture")

Running the App locally

- Clone the repo 
- Cd into the project
- Setup a Virtual environment
- Install the requirements using the code “pip install -r requirements.txt
- Make a new file on the project directory called “.env” and add this details into it:
 
SECRET_KEY='o)5b=mg-3q9z=^ysp8$oq45krd-39%un6@i@j2yk0_jvkyq$_2'
DEBUG=1

- Navigate into the front-end folder and then run *npm install* and npm *run build*

- Then navigate out to the project directory and run *python manage.py migrate* and then *python manage.py runserver*



