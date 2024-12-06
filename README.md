# Meeting Room Booking System for Co-working spaces Server

## Features:

It's a server for managing meeting room booking system. Features based on the following models:

1. **User Model**
2. **Room Model**
3. **Slot Model**
4. **Booking Model**

## Live URL

Live URL = **[MBooking Server](https://meeting-room-booking-system-topaz.vercel.app)**

## Models:

### User Model:

- `name`: The name of the user.
- `email`: The contact email address.
- `password`: The account password.
- `phone`: The contact phone number.
- `address`: The physical address.
- `role`: The role of the user, can be `user` or `admin`.

### Room Model:

- `name`: The name of the meeting room.
- `roomNo` : The unique number of the room.
- `floorNo` : The level of the meeting room where it is located.
- `capacity`: The maximum number of people the room can accommodate.
- `pricePerSlot`: The individual cost of a single slot.
- `amenities`: An array of amenities available in the room (e.g., "Projector", "Whiteboard"). Don't use enum.
- `isDeleted`: Boolean to indicates whether the room has been marked as deleted (false means it is not deleted).

### Slot Model

- `room` : Reference to the specific room being booked.
- `date`: Date of the booking.
- `startTime`: Start time of the slot.
- `endTime`: End time of the slot.
- `isBooked`: Boolean to indicate whether the slot has been marked as booked (false means it is not booked).

### Booking Model:

- `room`: Identifier for the booked room (a reference to room model).
- `slots`: An array containing the slot IDs (a reference to the booking slots).
- `user`: Identifier for the user who booked the room (a reference to the user model).
- `date`: Date of the booking.
- `totalAmount` : The total amount of the bill is calculated based on the selected number of slots.
- `isConfirmed`: Indicates the booking status, whether it's `confirmed`, `unconfirmed`, or `canceled`.
- `isDeleted`: Boolean to indicates whether the booking has been marked as deleted (false means it is not deleted).

## 🛠️ Main technology that used in this project:

- **Backend Development:**
  - Node.js
  - Express.js
  - Mongoose
  - TypeScript

## Uses:

### User Routes

1. **User Sign Up**

- _*Route:*_ `/api/auth/signup` (POST)
- **Request Body:**

```json
{
  "name": "Programming Hero",
  "email": "web@programming-hero.com",
  "password": "ph-password",
  "phone": "1234567890",
  "role": "admin", //role can be user or admin
  "address": "123 Main Street, City, Country"
}
```

- **Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "User registered successfully",
  "data": {
    "_id": "60629b8e8cfcd926384b6e5e",
    "name": "Programming Hero",
    "email": "web@programming-hero.com",
    "phone": "1234567890",
    "role": "admin",
    "address": "123 Main Street, City, Country"
  }
}
```

**2\. User Login**

- _*Route:*_ `/api/auth/login` (POST)
- **Request Body:**

```json
{
  "email": "web@programming-hero.com",
  "password": "ph-password"
}
```

- Response:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "User logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MDYyOWI4ZThjZmNkOTI2Mzg0YjZlNWUiLCJuYW1lIjoiUHJvZ3JhbW1pbmcgSGVyb3MiLCJlbWFpbCI6IndlYkBwcm9ncmFtbWluZy1oZXJvLmNvbSIsInBob25lIjoiMTIzNDU2Nzg5MCIsInJvbGUiOiJhZG1pbiIsImFkZHJlc3MiOiIxMjMgTWFpbiBTdHJlZXQsIENpdHksIENvdW50cnkiLCJpYXQiOjE2MjQ1MTY2MTksImV4cCI6MTYyNDUyMDYxOX0.kWrEphO6lE9P5tvzrNBwx0sNogNuXpdyG-YoN9fB1W8",
  "data": {
    "_id": "60629b8e8cfcd926384b6e5e",
    "name": "Programming Hero",
    "email": "web@programming-hero.com",
    "phone": "1234567890",
    "role": "admin",
    "address": "123 Main Street, City, Country"
  }
}
```

###

### Room Routes

**3\. Create Room (Only Accessible by Admin)**

- _*Route:*_ `/api/rooms` (POST)
- **Request Headers:**

```javascript
Authorization:
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

You must include "Bearer" at the beginning of the token!
```

- _*Request Body:*_

```json
{
  "name": "Conference Room",
  "roomNo": 201,
  "floorNo": 1,
  "capacity": 20,
  "pricePerSlot": 100,
  "amenities": ["Projector", "Whiteboard"]
}
```

- _*Response:*_

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Room added successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c5",
    "name": "Conference Room",
    "roomNo": 201,
    "floorNo": 1,
    "capacity": 20,
    "pricePerSlot": 100,
    "amenities": ["Projector", "Whiteboard"],
    "isDeleted": false
  }
}
```

**4\. Get a Room**

- _*Route:*_ `/api/rooms/:id` (GET)
- _*Response:*_

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Room retrieved successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c5",
    "name": "Conference Room",
    "roomNo": 201,
    "floorNo": 1,
    "capacity": 20,
    "pricePerSlot": 100,
    "amenities": ["Projector", "Whiteboard"],
    "isDeleted": false
  }
}
```

**5\. Get All Rooms**

- _*Route:*_ `/api/rooms` (GET)
- **Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Rooms retrieved successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c5",
      "name": "Conference Room",
      "roomNo": 201,
      "floorNo": 1,
      "capacity": 20,
      "pricePerSlot": 100,
      "amenities": ["Projector", "Whiteboard"],
      "isDeleted": false
    },
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c6",
      "name": "Meeting Room",
      "roomNo": 301,
      "floorNo": 2,
      "capacity": 10,
      "pricePerSlot": 200,
      "amenities": ["Whiteboard"],
      "isDeleted": false
    }
    // Other available rooms
  ]
}
```

**6\. Update Room (Only Accessible by Admin)**

- _*Route:*_ `/api/rooms/:id` (PUT)
- **Request Headers:**

```javascript
Authorization:
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

You must include "Bearer" at the beginning of the token!
```

- **Request Body:**

```json
{
  "pricePerSlot": 200 //we can update any field dynamically, (e.g., name, roomNo, floorNo, capacity, pricePerSlot, amenities)..
}
```

- **Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Room updated successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c5",
    "name": "Conference Room",
    "roomNo": 201,
    "floorNo": 1,
    "capacity": 20,
    "pricePerSlot": 200,
    "amenities": ["Projector", "Whiteboard"],
    "isDeleted": false
  }
}
```

**7\. Delete a Room (Soft Delete, Only Accessible by Admin)**

- _*Route:*_ `/api/rooms/:id` (DELETE)
- **Request Headers:**

```javascript
Authorization:
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

You must include "Bearer" at the beginning of the token!
```

- **Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Room deleted successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c5",
    "name": "Conference Room",
    "roomNo": 201,
    "floorNo": 1,
    "capacity": 20,
    "pricePerSlot": 200,
    "amenities": ["Projector", "Whiteboard"],
    "isDeleted": true
  }
}
```

###

### Slot Routes

8\. **Create Slot (Only Accessible by Admin)**

- _*Route:*_ `/api/slots`(**POST**)

**Request Headers:**

```javascript
Authorization:
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

You must include "Bearer" at the beginning of the token!
```

**Request Body:**

```json
{
  "room": "60d9c4e4f3b4b544b8b8d1c5",
  "date": "2024-06-15",
  "startTime": "09:00",
  "endTime": "14:00",
  "durationPerSlot": 60 // in minutes
}
```

**Response Body:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Slots created successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c6",
      "room": "60d9c4e4f3b4b544b8b8d1c5",
      "date": "2024-06-15",
      "startTime": "09:00",
      "endTime": "10:00",
      "isBooked": false
    },
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c7",
      "room": "60d9c4e4f3b4b544b8b8d1c5",
      "date": "2024-06-15",
      "startTime": "10:00",
      "endTime": "11:00",
      "isBooked": false
    },
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c8",
      "room": "60d9c4e4f3b4b544b8b8d1c5",
      "date": "2024-06-15",
      "startTime": "11:00",
      "endTime": "12:00",
      "isBooked": false
    },
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c9",
      "room": "60d9c4e4f3b4b544b8b8d1c5",
      "date": "2024-06-15",
      "startTime": "12:00",
      "endTime": "13:00",
      "isBooked": false
    },
    {
      "_id": "60d9c4e4f3b4b544b8b8d1ca",
      "room": "60d9c4e4f3b4b544b8b8d1c5",
      "date": "2024-06-15",
      "startTime": "13:00",
      "endTime": "14:00",
      "isBooked": false
    }
  ]
}
```

**9\. Get available slots**

**Route:** `/api/slots/availability`(**GET**)

**Query Parameters:**

- `date`: The specific date for which available slots are requested (format: YYYY-MM-DD).
- `roomId`: ID of the room for which available slots are requested.

**Request endpoint example**

`/api/slots/availability?date=2024-06-15&roomId=60d9c4e4f3b4b544b8b8d1c5`

or

`/api/slots/availability`

**Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Available slots retrieved successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c6",
      "room": {
        "_id": "60d9c4e4f3b4b544b8b8d1c5",
        "name": "Conference Room",
        "roomNo": 201,
        "floorNo": 1,
        "capacity": 20,
        "pricePerSlot": 100,
        "amenities": ["Projector", "Whiteboard"],
        "isDeleted": false
      },
      "date": "2024-06-15",
      "startTime": "09:00",
      "endTime": "10:00",
      "isBooked": false
    },
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c7",
      "room": {
        "_id": "60d9c4e4f3b4b544b8b8d1c5",
        "name": "Conference Room",
        "roomNo": 201,
        "floorNo": 1,
        "capacity": 20,
        "pricePerSlot": 100,
        "amenities": ["Projector", "Whiteboard"],
        "isDeleted": false
      },
      "date": "2024-06-15",
      "startTime": "10:00",
      "endTime": "11:00",
      "isBooked": false
    }
  ]
}
```

###

### Booking Routes

**10\. Create a Booking (Only Accessible by Authenticated User)**

- _*Route:*_ `/api/bookings` (POST)
- **Request Headers:**

```javascript
Authorization:
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

You must include "Bearer" at the beginning of the token!
```

- **Request Body:**

```json
{
  "date": "2024-06-15",
  "slots": ["60d9c4e4f3b4b544b8b8d1c6", "60d9c4e4f3b4b544b8b8d1c7"],
  "room": "60d9c4e4f3b4b544b8b8d1c5",
  "user": "60d9c4e4f3b4b544b8b8d1c4"
}
```

- **Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Booking created successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c9",
    "date": "2024-06-15",
    "slots": [
      {
        "_id": "60d9c4e4f3b4b544b8b8d1c6",
        "room": "60d9c4e4f3b4b544b8b8d1c5",
        "date": "2024-06-15",
        "startTime": "09:00",
        "endTime": "10:00",
        "isBooked": true
      },
      {
        "_id": "60d9c4e4f3b4b544b8b8d1c7",
        "room": "60d9c4e4f3b4b544b8b8d1c5",
        "date": "2024-06-15",
        "startTime": "10:00",
        "endTime": "11:00",
        "isBooked": true
      }
    ],
    "room": {
      "_id": "60d9c4e4f3b4b544b8b8d1c5",
      "name": "Conference Room",
      "roomNo": 201,
      "floorNo": 1,
      "capacity": 20,
      "pricePerSlot": 100,
      "amenities": ["Projector", "Whiteboard"],
      "isDeleted": false
    },
    "user": {
      "_id": "60d9c4e4f3b4b544b8b8d1c4",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone": "1234567890",
      "address": "123 Main St, Anytown, USA",
      "role": "user"
    },
    "totalAmount": 200,
    "isConfirmed": "unconfirmed",
    "isDeleted": false
  }
}
```

**11\. Get All Bookings (Only Accessible by Admin)**

- _*Route:*_ `/api/bookings` (GET)
- **Request Headers:**

```javascript
Authorization:
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

You must include "Bearer" at the beginning of the token!
```

- **Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "All bookings retrieved successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c9",
      "date": "2024-06-15",
      "slots": [
        {
          "_id": "60d9c4e4f3b4b544b8b8d1c6",
          "room": "60d9c4e4f3b4b544b8b8d1c5",
          "date": "2024-06-15",
          "startTime": "09:00",
          "endTime": "10:00",
          "isBooked": true
        },
        {
          "_id": "60d9c4e4f3b4b544b8b8d1c7",
          "room": "60d9c4e4f3b4b544b8b8d1c5",
          "date": "2024-06-15",
          "startTime": "10:00",
          "endTime": "11:00",
          "isBooked": true
        }
      ],
      "room": {
        "_id": "60d9c4e4f3b4b544b8b8d1c5",
        "name": "Conference Room",
        "roomNo": 201,
        "floorNo": 1,
        "capacity": 20,
        "pricePerSlot": 100,
        "amenities": ["Projector", "Whiteboard"],
        "isDeleted": false
      },
      "user": {
        "_id": "60d9c4e4f3b4b544b8b8d1c4",
        "name": "John Doe",
        "email": "john.doe@example.com",
        "phone": "1234567890",
        "address": "123 Main St, Anytown, USA",
        "role": "user"
      },
      "totalAmount": 200,
      "isConfirmed": "unconfirmed",
      "isDeleted": false
    }
    // other bookings ( If any )
  ]
}
```

**12\. Get User's Bookings (Only Accessible by Authenticated User)**

- _*Route:*_ `/api/my-bookings`(**GET**)
- **Request Headers:**

```javascript
Authorization:
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

You must include "Bearer" at the beginning of the token!
```

- **Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "User bookings retrieved successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1ca",
      "date": "2024-06-15",
      "slots": [
        {
          "_id": "60d9c4e4f3b4b544b8b8d1c6",
          "room": "60d9c4e4f3b4b544b8b8d1c5",
          "date": "2024-06-15",
          "startTime": "09:00",
          "endTime": "10:00",
          "isBooked": true
        },
        {
          "_id": "60d9c4e4f3b4b544b8b8d1c7",
          "room": "60d9c4e4f3b4b544b8b8d1c5",
          "date": "2024-06-15",
          "startTime": "10:00",
          "endTime": "11:00",
          "isBooked": true
        }
      ],
      "room": {
        "_id": "60d9c4e4f3b4b544b8b8d1c5",
        "name": "Conference Room",
        "roomNo": 201,
        "floorNo": 1,
        "capacity": 20,
        "pricePerSlot": 100,
        "amenities": ["Projector", "Whiteboard"],
        "isDeleted": false
      },
      "totalAmount": 200,
      "isConfirmed": "unconfirmed",
      "isDeleted": false
    }
  ]
}
```

**13\. Update Booking (Only Accessible by Admin)**

- _*Route:*_ `/api/bookings/:id` (PUT)
- **Request Headers:**

```javascript
Authorization:
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

You must include "Bearer" at the beginning of the token!
```

- **Request Body:**

```json
{
  "isConfirmed": "confirmed"
}
```

**Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Booking updated successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1ca",
    "date": "2024-06-15",
    "slots": ["60d9c4e4f3b4b544b8b8d1c6", "60d9c4e4f3b4b544b8b8d1c7"],
    "totalAmount": 200,
    "room": "60d9c4e4f3b4b544b8b8d1c5",
    "user": "60d9c4e4f3b4b544b8b8d1c4",
    "isConfirmed": "confirmed",
    "isDeleted": false
  }
}
```

**14\. Delete Booking (Soft Delete, Only Accessible by Admin)**

- _*Route:*_ `/api/bookings/:id` (DELETE)
- **Request Headers:**

```javascript
Authorization:
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

You must include "Bearer" at the beginning of the token!
```

- **Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Booking deleted successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1ca",
    "date": "2024-06-15",
    "slots": ["60d9c4e4f3b4b544b8b8d1c6", "60d9c4e4f3b4b544b8b8d1c7"],
    "totalAmount": 200,
    "room": "60d9c4e4f3b4b544b8b8d1c5",
    "user": "60d9c4e4f3b4b544b8b8d1c4",
    "isConfirmed": "confirmed",
    "isDeleted": true
  }
}
```
