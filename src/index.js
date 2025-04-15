const express = require('express');
const app = express();
const userRoute = require('./routes/userRoute');  
const postRoute = require('./routes/PostRoute');  
const commentRoute = require('./routes/CommentRoute');
const likeRoute = require('./routes/LikeRoute');
const bookmarkRoute = require('./routes/BookmarkRoute');
const categoryRoute = require('./routes/CategoryRoute');
const tagRoute = require('./routes/TagRoute'); 
const notificationRoute = require('./routes/NotificationRoute');
const settingRoute = require('./routes/SettingRoute');
const friendRoute = require('./routes/FriendRoute');
const authRoute = require('./routes/AuthRoute'); 

// Middleware
app.use(express.json());  

// Routes
app.use('/api/users', userRoute); 
app.use('/api/posts', postRoute);  
app.use('/api/comments', commentRoute);
app.use('/api/likes', likeRoute);
app.use('/api/bookmarks', bookmarkRoute);
app.use('/api/categories', categoryRoute);
app.use('/api/tags', tagRoute); 
app.use('/api/notifications', notificationRoute);
app.use('/api/settings', settingRoute);
app.use('/api/friends', friendRoute);
app.use('/api/auth', authRoute);

const sequelize = require("./config/database"); 
const PORT = process.env.PORT || 3000;

// Database connection and server start
sequelize.authenticate()
    .then(() => {
        console.log("✅ Database connected successfully");
        app.listen(PORT, () => {
            console.log(`🚀 Server started on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error("❌ Database connection error:", err);
    });
