# User API Specification

## Login API

-   Endpoint: POST /api/auth/login
-   Request Body:

```json
{
    "username": "username",
    "password": "password"
}
```

-   Response Sukses:

```json
{
    "errors": [],
    "message": "Login successfully",
    "data": {
        "name": "name",
        "username": "username"
    },
    "acessToken": "accestoken",
    "refreshToken": "refreshtoken"
}
```

-   Response Error (field is empty):

```json
{
    "errors": ["username is required", "password is required"],
    "message": "Login Failed",
    "data": null
}
```

-   Response Error (wrong username or password)

```json
{
    "errors": ["Username or password is incorrect"],
    "message": "Login Failed",
    "data": null
}
```

## Change Password API

-   Endpoint : /api/user/password
-   Header : Authorization : Bearer <acess_token>
-   Request Body:

```json
{
    "currentPassword": "current_password",
    "password": "newpassword",
    "confirmPassword": "newpassword"
}
```

-   Response Success:

```json
{
    "errors": [],
    "message": "User password updated successfully"
}
```

-   Response Error (Current Password Wrong)

```json
{
    "errors": ["CurrentPassword is incorrect"],
    "message": "Update Failed",
    "data": null
}
```

-   Response Error (New Password and Password Doesn't Match)

```json
{
    "errors": ["ConfirmPassword does not match"],
    "message": "Update Failed",
    "data": null
}
```
