To use this API:
    - install dotenv and create a .env file with the following:
        - PORT
        - DB_URL
        - SALTROUNDS
    -Using postman, test the following routes:
        - POST http://localhost:3000/registeruser : user sign up
        - GET http://localhost:3000/allusers : returns all users
        - GET http://localhost:3000/allusers/*@*.* : returns user with email *@*.*
        - PUT http://localhost:3000/updatepassword/*@*.* : updates password for user with email *@*.*
            {"password": "new_password"} as json in the body
        - POST http://localhost:3000/userlogin : user login 
            {"email": "*@*.*", "password": "userpasword"}
        - DELETE http://localhost:3000/closeaccount/*@*.* : closes user account or deletes the user with email *@*.*

        