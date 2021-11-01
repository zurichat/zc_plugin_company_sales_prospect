# Sales Endpoints

# Getting Started
Our API is organised around using HTTP verbs and REST. Our API accepts and returns JSON formatted payload

# Authorization
User must be authenticated to use the API
## Base URL:
```
https://sales.zuri.chat/api/v1/
```
# Prospects


## Create Prospects

Method: Post

Description: Fetches data from the Zuri core API and creates a new prospect.

Example:
```
https://sales.zuri.chat/api/v1/prospects/create/
```

Request Body:
```
{
  "name": "John Doe",
  "email": "example@mail.com",
  "phone_number": "+2348012345678",
  "deal_stage": "proposal"
}
```
Response:

```
{
  "status": 200,
  "message": "success",
  "data": {
    "insert_count": 1,
    "object_id": "614e8de3f31a74e068e4d7fc"
  }
}
```

## Getting a List Of Prospects

Method: Get

Description: Fetches data from the Zuri core API and displays the list of all prospects.

Example:
```
https://sales.zuri.chat/api/v1/prospects/
```
Sample Response:

```
{
  "status": 200,
  "message": "success",
  "data": [
    {
    "_id": "123abc456def",
    "name": "John Doe",
    "phone_number": "+2348012345678",
    "email": "example@mail.com",
    "deal_stage": "proposal"
    }
  ]
}
```

## Getting a Particular Prospect
Method: Get

Description: Fetches data from the Zuri core API and displays the details of one prospect.

Example:
```
https://sales.zuri.chat/api/v1/prospects/{id}/
```


Sample Request:
```
https://sales.zuri.chat/api/v1/prospects/614e8de3f31a74e068e4d7fc
```

Response:
```
{
  "status": 200,
  "message": "success",
  "data":
    {
    "_id": "123abc456def",
    "name": "John Doe",
    "phone_number": "+2348012345678",
    "email": "example@mail.com",
    "deal_stage": "proposal"
    }
}
```

## Updating a Particular Prospect
Method: Put

Description: Fetches data from the Zuri core API and updates the details of a particular prospect.

Example:
```
https://sales.zuri.chat/api/v1/prospects/update/{id/}
```

Request body:
```
{
    "_id": "123abc456def",
    "name": "John Doe",
    "phone_number": "+2348012345678",
    "email": "example@mail.com",
    "deal_stage": "proposal"
    }
```

Response:

```
{
  "status": 200,
  "message": "success",
  "data": {
    "matched_documents": 1,
    "modified_documents": 1
  }
}
```


## Delete a Particular Prospect
Method: Delete

Description: Deletes a particular prospect from the Zuri Core API.

Example:
```
https://sales.zuri.chat/api/v1/prospects/delete/{id/}
```

Response:
```
{
  "status": 200,
  "message": "success",
  "data": {
    "deleted_count": 1
  }
}
```


# Deals

## Create Deals
Method: Post

Description: Fetches data from the Zuri core API to create a new deal for a prospect.

Example:
```
https://sales.zuri.chat/api/v1/prospects/deals/
```

Request Body:
```

{
  "_id": "123abc456def",
  "name": "John Doe",
  "deal_stage": "Prospect",
  "amount": "$123456",
  "close_date": "dd-mm-yyyy",
  "description": "Deliver 10, 000 bags of cement"
}
```
Response:

```
{
  "status": 200,
  "message": "success",
  "data": {
    "insert_count": 1,
    "object_id": "614e8de3f31a74e068e4d7fc"
  }
}
```

## Getting a List Of Deals

Method: Get

Description: Fetches data from the Zuri core API and displays the list of deals.

Example:

```
https://sales.zuri.chat/api/v1/deals/
```
Response:

```
{
  "status": 200,
  "message": "success",
  "data": [
    {
    "_id": "123abc456def",
    "name": "John Doe",
    "deal_stage": "Prospect",
    "amount": "$123456",
    "close_date": "dd-mm-yyyy",
    "description": "Deliver 10, 000 bags of cement"
    }
  ]
}
```

## Getting a Particular Deal

Method: Get

Description: Fetches data from the Zuri core API and displays the details of a particular deal.

Example:

```
https://sales.zuri.chat/api/v1/deals/{id}/
```

Sample Request:
```
https://sales.zuri.chat/api/v1/deals/614e8de3f31a74e068e4d7fc
```

Response:
```
{
  "status": 200,
  "message": "success",
  "data":
    {
    "_id": "123abc456def",
    "name": "John Doe",
    "deal_stage": "Prospect",
    "amount": "$123456",
    "close_date": "dd-mm-yyyy",
    "description": "Deliver 10, 000 bags of cement"
    }
}
```

## Updating a Particular Deal

Method: Put

Description: Fetches data from the Zuri core API and updates the details of a particular deal.

Example:

```
https://sales.zuri.chat/api/v1/deals/update/{id/}
```


Request body:
```
{
    ""_id": "123abc456def",
    "name": "John Doe",
    "deal_stage": "Prospect",
    "amount": "$123456",
    "close_date": "dd-mm-yyyy",
    "description": "Deliver 10, 000 bags of cement"
    }
```

Response:

```
{
  "status": 200,
  "message": "success",
  "data": {
    "matched_documents": 1,
    "modified_documents": 1
  }
}
```


## Delete a Particular Deal
Method: Delete

Description: Deletes a particular deal from the Zuri Core API.

Example:
```
https://sales.zuri.chat/api/v1/deals/delete/{id/}
```

Response
```
{
  "status": 200,
  "message": "success",
  "data": {
    "deleted_count": 1
  }
}
```

# Rooms

## Add users to a room
Method: Post

Description: Fetches data from the Zuri core API and adds a user to a room.

Example:
```
https://sales.zuri.chat/api/v1/add-to-room/
```

Request body:
```
{
user:"2345"
}
```

Response:
```
{
  "user": 2345,
  "room_name": "prospects"
}
```



## Getting a list of rooms
Method: Get

Description: Fetches data from the Zuri core API and displays the list of rooms available to a user.

Example:

```
https://sales.zuri.chat/api/v1/room/
```

Response:

```
{
      "_id": "614e65b2f31a74e068e4d6dd",
      "icon": "icon.png",
      "name": "Deals",
      "users": [
        "333434"
      ]
    },
    {
      "_id": "614e670af31a74e068e4d6e4",
      "icon": "icon.png",
      "name": "Prospects",
      "users": [
        "334353"
      ]
    }
```



## Sidebar
Method: Get

Description: Fetches data from the Zuri core API and displays a sidebar containing all rooms available to the user.

Example:
```
https://sales.zuri.chat/api/v1/sidebar/
```

Response:

```
{
    "Public rooms": [
        {
            "_id": "614e65b2f31a74e068e4d6dd",
            "icon": "icon.png",
            "name": "Deals",
            "users": [
                "benshi"
            ]
        },
        {
            "_id": "614e670af31a74e068e4d6e4",
            "icon": "icon.png",
            "name": "Prospects",
            "users": [
                "elijah"
            ]
        }
    ],
    "Joined rooms": []
}
```
