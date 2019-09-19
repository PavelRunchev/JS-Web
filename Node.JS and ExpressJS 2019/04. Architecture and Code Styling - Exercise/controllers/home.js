const Article = require('../models/Article');

module.exports = {
  home: async (req, res) => {
    try {
      const articles = await Article.find().populate('author').sort('-date');
      res.render('home/index', { articles });
    }
    catch(e) { console.log(e.message); }
  }
}
