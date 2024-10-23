# Django Project Management Commands

## Migrations
Run the following command after any changes to your Django models:

```bash
python manage.py makemigrations
python manage.py migrate
```

## Start the Server
Then, run this command to start the development server:

```bash
python manage.py runserver
```


## To Start the project
1. Running the Django Backend
Make sure you are in the Django backend directory (usually backend/), and follow these commands:

Apply Migrations (if needed): Run the following command to make sure your database is up-to-date.

```bash
python manage.py migrate
```
Start the Django Development Server: This command will start the server at http://localhost:8000/.

```bash
python manage.py runserver
```
Check the Admin Panel: Access the Django admin panel (if needed) at http://localhost:8000/admin/.

2. Running the React Frontend
In a separate terminal, navigate to the React frontend directory (usually frontend/) and run these commands:

Install Dependencies (if it's your first time running the frontend or if you've added new packages):

```bash
npm install
```
Start the React Development Server: This will start the frontend app on http://localhost:3000/.

```bash
npm start
```
3. Interacting Between Backend and Frontend
Ensure that your backend API (Django) is running on http://localhost:8000 and your frontend React app on http://localhost:3000.
Your frontend will send requests to the backend using relative URLs like http://localhost:8000/api/.
