#  Advanced URL Shortener API

A scalable **Custom URL Shortener API** with **Google Sign-In authentication, rate limiting, analytics tracking, and Redis caching**. The system allows users to create short URLs, track analytics, and group links by topics for better management.
- **Deployed URL:**  [Advanced URL Shortener](https://advanced-url-shortener-2fav.onrender.com/)
##  Features

✅ **User Authentication** (Google Sign-In)  
✅ **Short URL Creation** with custom alias & topic grouping  
✅ **Redirect API** with analytics tracking  
✅ **Detailed URL Analytics** (total clicks, unique users, OS & device insights)  
✅ **Topic-Based Analytics** (performance tracking for grouped URLs)  
✅ **Overall Analytics** (comprehensive insights for all user-created URLs)  
✅ **Rate Limiting** to prevent abuse  
✅ **Caching with Redis** for faster performance  
✅ **Dockerized & Cloud Deployable**

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Authentication:** Google OAuth  
- **Caching:** Redis  
- **Deployment:** Docker, AWS ECR/ECS  
- **Documentation:** Swagger  
- **Version Control:** Git, GitHub  

---

## ⚡ Setup & Installation

### 1️⃣ Clone the Repository  
```sh
git clone https://github.com/yourusername/url-shortener.git
cd url-shortener
```
### 2️⃣ Install dependencies
``` sh
npm install
```
### 3️⃣ Configure .env file
```sh
MONGO_URI=mongodb+srv://nikhil:nikhil123456@cluster0.9omcb.mongodb.net/advanced-url_shortener?retryWrites=true&w=majority&appName=Cluster0
REDIS_URL=rediss://red-cum30lggph6c73dadp30:rdxBWMVEEyR5YUolbB9a9RrFzW0QZMQe@oregon-redis.render.com:6379
JWT_SECRET=yourSecret
GOOGLE_CLIENT_ID=527473349005-rem8qb0mb44dvroohpoue098ebchog3t.apps.googleusercontent.com
PORT=3000
```
### 4️⃣ Run the project
```sh
npm start
```

##  API Endpoints

### 1️⃣ User Authentication  
**`POST /api/auth/google`** - Authenticate users via Google Sign-In  

#### Request:
```json
{
  "token": "enter your token here"
}
```
#### Response:
```json
    {
      "userId": "67ac4b6876254b86ab893935",
      "email": "nikhvar.coord@gmail.com",
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2FjNGI2ODc2MjU0Yjg2YWI4OTM5MzUiLCJpYXQiOjE3Mzk0NDMyMjQsImV4cCI6MTczOTQ0NjgyNH0.z9h_Kf6uRXAB_BSFVaUrhnXZQSLEiM7-IvVD9EynIbU"
    }
```

### 2️⃣ Create Short URL  
**`POST /api/shorten`**  
**Description:** Create a short URL (requires JWT token).  

#### Headers:
- `Content-Type: application/json`
- `Authorization: Bearer YOUR_JWT_TOKEN`

#### Request:
```json
{
  "longUrl": "https://example.com/very-long-url",
  "customAlias": "myalias", // Optional
  "topic": "marketing" // Optional
}
```
#### Response:
```json
{
  "shortUrl": "http://localhost:3000/api/shorten/myalias",
  "createdAt": "2023-10-01T12:00:00Z"
}

```
### 3️⃣ Redirect Short URL  
**`GET /api/shorten/myalias`**  
**Description:** Redirect to the original URL.  

#### Request:  
No headers or body needed.  

#### Response:  
- **Status:** `302 Found`  
- **Headers:**  
  ```http
  Location: https://example.com/very-long-url

### 4️⃣ URL Analytics  
- **`GET /api/analytics/myalias`**
  **Description:** Get analytics for a specific short URL (requires JWT token).  
   #### Response:
  ```json
  {
  "totalClicks": 100,
  "uniqueUsers": 50,
  "clicksByDate": [
    { "date": "2023-10-01", "clicks": 20 },
    { "date": "2023-10-02", "clicks": 80 }
  ],
  "osType": [
    { "osName": "Windows", "uniqueClicks": 30, "uniqueUsers": 15 },
    { "osName": "iOS", "uniqueClicks": 20, "uniqueUsers": 10 }
  ],
  "deviceType": [
    { "deviceName": "mobile", "uniqueClicks": 40, "uniqueUsers": 20 },
    { "deviceName": "desktop", "uniqueClicks": 60, "uniqueUsers": 30 }
  ]
  }
  ```

### 5️⃣ Topic-Based Analytics  
 **`GET /api/analytics/topic/marketing`**  
  **Description** : Get analytics for a specific short URL (requires JWT token).

#### Response:
```json
{
  "totalClicks": 500,
  "uniqueUsers": 200,
  "clicksByDate": [
    { "date": "2023-10-01", "clicks": 100 },
    { "date": "2023-10-02", "clicks": 400 }
  ],
  "urls": [
    {
      "shortUrl": "http://localhost:3000/api/shorten/myalias",
      "totalClicks": 100,
      "uniqueUsers": 50
    }
  ]
}

```

### 6️⃣ Overall Analytics  
- **`GET /api/analytics/overall`**  
  - Provides a complete analytics report for all user-created URLs
#### Response
```json
{
  "totalUrls": 5,
  "totalClicks": 1000,
  "uniqueUsers": 300,
  "clicksByDate": [
    { "date": "2023-10-01", "clicks": 200 },
    { "date": "2023-10-02", "clicks": 800 }
  ],
  "osType": [
    { "osName": "Windows", "uniqueClicks": 400, "uniqueUsers": 100 },
    { "osName": "iOS", "uniqueClicks": 300, "uniqueUsers": 80 }
  ],
  "deviceType": [
    { "deviceName": "mobile", "uniqueClicks": 600, "uniqueUsers": 200 },
    { "deviceName": "desktop", "uniqueClicks": 400, "uniqueUsers": 100 }
  ]
}
```

---



