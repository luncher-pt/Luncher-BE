# BE Heroku URL
    http://luncher-lambda-buildweek.herokuapp.com

# Models
    const schoolTemplate = {
        name: 'High School',
        address: 'Some Street',
        funds_required: 500,
        funds_donated: 0,
        admin_id: 1 
    }

    const userTemplate = {
        name: 'Jean-Luc Picard',
        email: 'enterprise@gmail.com',
        password: 'password',
        admin: true,
        donations: 100
    }

# DB Interaction
## Register New User
- URL = http://luncher-lambda-buildweek.herokuapp.com/register

- Accepted Shape:
```
{
    name: "Billy",
    email: "Bill@Billy.com",
    password: "TacoMan",
    admin: false,
    donations: 0 **
}

** NOT required --> Migrations default to 0 if no input
```

## User Login
- URL = http://luncher-lambda-buildweek.herokuapp.com/login 

- NOTES: This will return a JWT which will be used through the app to authenticate the user 

- Accepted Shape:
```
    {
        email: "Bill@Billy.com",
        password: "TacoMan"
    }
```

## Individual User Routes
- URL = - URL = http://luncher-lambda-buildweek.herokuapp.com/users/{id}
- Notes: MUST have jwt passed as Authentication header to access ALL /users/{id} routes



