const Article = require('../models/Article');

module.exports = {
    index: (req, res) => {
        Article.find({})
            .sort({ creationDate: 'descending' })
            .limit(3)
            .then((articles) => {
                let latestArticle = {};
                if (articles.length === 0)
                    latestArticle = { title: 'No Article in DataBase!', content: 'Empty' };
                else
                    latestArticle = articles[0];

                latestArticle.content = latestArticle.content
                    .split(' ')
                    .slice(0, 50)
                    .join(' ');
                latestArticle.content += ' ...';
                res.render('home/index', { latestArticle, articles });
            }).catch(err => console.log(err.message));
    }
};