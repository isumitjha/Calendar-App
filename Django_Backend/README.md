# Calendar App: Django + Python

You can use this sample project to learn how to secure a simple Django API server using Auth0.

The goal is to use Auth0 to only allow requests that contain a valid access token in their authorization header to access the protected and admin data. 

## Get Started

Prerequisites:
    
* Python

Initialize a python virtual environment:

```bash
python3 -m venv venv
source ./venv/bin/activate
```

Install the project dependencies:

```bash
pip install -r requirements.txt
```

Setup virtual environments:
Copy the `.env.example` file to `.env` and edit it to populate its variables.
```bash
cp .env.example .env
```

Run the following command to generate a random secret key and add it to your `.env` file.
```bash
python manage.py generate_secret

# .env
DJANGO_SECRET_KEY=<generated_key>
```

Run DB migrations:

```bash
python manage.py migrate
```

Run the project:

```bash
gunicorn
```


## API Endpoints

The API server defines the following endpoints:


### 🔓 Get protected message

> You need to protect this endpoint using Auth0.

```bash
GET /api/messages/protected
```

#### Response

```bash
Status: 200 OK
```

```json
{
  "text": "This is a protected message.",
  "metadata" : {
    "api": "api_django_python_hello-world",
    "branch": "basic-authorization"
  }
}
```

### 🔓 Get admin message

> You need to protect this endpoint using Auth0 and Role-Based Access Control (RBAC).

```bash
GET /api/messages/admin
```

#### Response

```bash
Status: 200 OK
```

```json
{
  "text": "This is an admin message.",
  "metadata" : {
    "api": "api_django_python_hello-world",
    "branch": "basic-authorization"
  }
}
```

## Error Handling

### 400s errors

```bash
Status: Corresponding 400 status code
```

```json
{
  "message": "Not Found"
}
```

**Request without authorization header**
```bash
curl localhost:6060/api/messages/admin
```
```json
{
  "message":"Authentication credentials were not provided.",
}
```
HTTP Status: `401`

**Request with malformed authorization header**
```bash
curl localhost:6060/api/messages/admin --header "authorization: <valid_token>"
```
```json
{
  "message":"Authentication credentials were not provided.",
}
```
HTTP Status: `401`

**Request with wrong authorization scheme**
```bash
curl localhost:6060/api/messages/admin --header "authorization: Basic <valid_token>"
```
```json
{
  "message":"Authentication credentials were not provided.",
}
```
HTTP Status: `401`

**Request without token**
```bash
curl localhost:6060/api/messages/admin --header "authorization: Bearer"
```
```json
{
  "message":"Authorization header must contain two space-delimited values",
}
```
HTTP Status: `401`

**JWT validation error**
```bash
curl localhost:6060/api/messages/admin --header "authorization: Bearer asdf123"
```
```json
{
  "message":"Given token not valid for any token type",
}
```
HTTP Status: `401`

### 500s errors


```bash
Status: 500 Internal Server Error
```

```json
{
  "message": "Server Error"
}
```
