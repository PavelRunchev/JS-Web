const Article = require('../models/Article');
const User = require('../models/User');

module.exports = {
    createGet: (req, res) => {
        res.render('article/create.hbs');
    },

    createPost: async (req, res) => {
        const author = req.user.id;
        const { title, content } = req.body;

        if(!title.length || !content.length) {
            req.body.error = ('Please fill all fields');
            res.render('article/create', req.body);
            return;
        }
        try {
            const newArticle = await Article.create({ title, content, author });
            req.user.articles.push(newArticle._id);
            await req.user.save();
            res.redirect('/');
        } catch(e) {
            console.log(e.message);
        }
    },

    details: async (req, res) => {
        const articleId = req.params.id;
        const article = await Article.findById(articleId).populate('author');
        //date convert to date/month/year/time
        const month = article.date.toString().substring(3, 8);
        const yearTime = article.date.toString().substring(10, 24);
        article.dateFormated = `${article.date.getDate()} ${month} ${yearTime}`;
        let isAuthor = false;
        if(req.user) 
            isAuthor = req.user.isAuthor(article);

        res.render('article/details.hbs', { article, isAuthor });
    },

    editGet: (req, res) => {
        const articleId = req.params.id;
        Article.findById(articleId).then((article) => {
            res.render('article/edit', article);
        }).catch(err => console.log(err.message));
    },

    editPost: async (req, res) => {
        const articleId = req.params.id;
        const { title, content } = req.body;

        if(!title.length || !content.length) {
            req.body.error = ('Please fill all fields');
            res.render('article/create', req.body);
            return;
        }
        try {
            const article = await Article.findById(articleId).populate('author');
            article.title = title;
            article.content = content;
            await article.save();
            res.redirect('/');
        } catch(e) {
            console.log(e.message);
        }
    },

    deleteGet: (req, res) => {
        const articleId = req.params.id;
        Article.findById(articleId).then((article) => {
            res.render('article/delete', article);
        }).catch(err => console.log(err.message));
    },

    deletePost: async (req, res) => {
        const articleId = req.params.id;
        try {
            const article = await Article.findById(articleId).populate('author');
            const author = await User.findById(article.author._id);
    
            const removedArticle = await Article.deleteOne({ _id: articleId});
            author.articles.remove(articleId);
            await author.save();
            res.redirect('/');
        }catch(err) { console.log(err.message); }
    }
}