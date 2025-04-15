const Post = require('../models/Post');
const User = require('../models/User');

// Create a new post
exports.createPost = async (req, res) => {
    try {
        const { user_id, title, content } = req.body;

        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const post = await Post.create({
            user_id,
            title,
            content
        });

        res.status(201).json({ message: 'Post created successfully.', post });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [{ model: User, attributes: ['id', 'username', 'email'] }],
            order: [['created_at', 'DESC']]
        });

        res.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};

// Get post by ID
exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id, {
            include: [{ model: User, attributes: ['id', 'username', 'email'] }]
        });

        if (!post) {
            return res.status(404).json({ message: 'Post not found.' });
        }

        res.json(post);
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};

// Update a post
exports.updatePost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const post = await Post.findByPk(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found.' });
        }

        post.title = title || post.title;
        post.content = content || post.content;

        await post.save();

        res.json({ message: 'Post updated successfully.', post });
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};

// Delete a post
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found.' });
        }

        await post.destroy();

        res.json({ message: 'Post deleted successfully.' });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};
