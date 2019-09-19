const Article = require('../models/Article');
const Edit = require('../models/Edit');
const User = require('../models/User');

module.exports = {
    all: (req, res) => {
        Article
            .find({})
            .sort({ title: 'ascending' })
            .select('title')
            .then((articles) => {
                res.render('article/all-articles', { articles });
            }).catch(err => console.log(err.message));
    },

    searchArticles: (req, res) => {
        const { title } = req.body;
        Article.find()
            .sort({ title: 'ascending' })
            .select('title')
            .then((articles) => {
                articles = articles.filter(a => a.title.includes(title));
                res.render('article/all-articles', { articles });
            }).catch(err => console.log(err.message));
    },

    createGet: (req, res) => {
        res.render('article/create.hbs');
    },

    createPost: (req, res) => {
        const { title, content } = req.body;

        if (!title.length || !content.length) {
            res.locals.globalError = 'Fields cannot must be empty!';
            res.render('article/create.hbs', req.body);
            return;
        }

        const article = new Article({ title, content });
        const edit = new Edit({ title, content, author: req.user._id });

        article.edits.push(edit);
        edit.article = article;
        req.user.edits.push(edit);

        Promise.all([article.save(), edit.save(), req.user.save()])
            .then(() => {
                res.redirect('/article/all');
            })
            .catch(err => console.log(err.message));
    },

    displayArticle: (req, res) => {
        const articleId = req.params.id;
        Article.findById(articleId)
            .populate({ path: 'edits', options: { sort: { creationDate: 'descending' }, limit: 1 } })
            .then((article) => {
                //article.edits.sort((a, b) => b.creationDate - a.creationDate);
                // Implementation for article content to new paragraph!!!
                // split content by \r\n to array and take to handlebars!
                let splitedContent = article.edits[0].content.split('\r\n\r\n');
                res.render('article/article', { article, splitedContent });
            }).catch(err => console.log(err.message));
    },

    latestArticle: (req, res) => {
        Article.find({})
            .sort({ creationDate: 'descending' })
            .limit(1)
            .then((data) => {
                let splitedContent = data[0].content.split('\r\n\r\n');
                const article = data[0];
                res.render('article/article', { article, splitedContent });
            }).catch(err => console.log(err.message));
    },

    editGet: (req, res) => {
        const articleId = req.params.id;
        Article.findById(articleId)
            .populate({ path: 'edits', options: { sort: { creationDate: 'descending' }, limit: 1 } })
            .then((article) => {
                if (article.isLocked === true && !res.locals.isAdmin) {
                    res.redirect('/');
                    return;
                }

                article.lastContent = article.edits[0].content;
                res.render('article/edit', article);
            }).catch(err => console.log(err.message));
    },

    editPost: (req, res) => {
        const articleId = req.params.id;
        const userId = req.user.id;
        const { content } = req.body;

        if (!content.length) {
            res.redirect(`/article/edit/${articleId}`);
            return;
        }
        // create edit
        const edit = new Edit({ author: userId, content, article: articleId });

        Article.findById(articleId)
            .then((article) => {
                // pushed in user
                req.user.edits.push(edit._id);
                // pushed in article
                article.edits.push(edit._id);
                // saved all change date!
                return Promise.all([edit.save(), article.save(), req.user.save()]);
            })
            .then(() => {
                res.redirect(`/article/details/${articleId}`);
            }).catch(err => console.log(err.message));
    },

    lockArticle: (req, res) => {
        const articleId = req.params.id;
        Article.findById(articleId).then((article) => {
            article.isLocked = true;
            article.save();
            res.redirect('/');
        }).catch(err => console.log(err));
    },

    unlockArticle: (req, res) => {
        const articleId = req.params.id;
        Article.findById(articleId).then((article) => {
            article.isLocked = false;
            article.save();
            res.redirect('/');
        }).catch(err => console.log(err));
    },

    deleteArticle: async(req, res) => {
        const articleId = req.params.id;
        try {
            if (res.locals.isAdmin) {
                const article = await Article.findById(articleId);
                const edits = await Edit.find({ article: article._id }).populate('author');
                for (let ed of edits) {
                    const author = await User.findById(ed.author._id);
                    author.edits.remove(ed._id);
                    const removedEdit = await Edit.findByIdAndDelete(ed._id);
                    await author.save();
                }

                const removedArticle = await Article.deleteOne({ _id: articleId });
            }

            res.redirect('/article/all');
        } catch (err) {
            console.log(err.message);
        }
    }
};