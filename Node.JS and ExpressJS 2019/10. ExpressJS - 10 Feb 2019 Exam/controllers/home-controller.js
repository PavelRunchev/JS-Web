module.exports = {
    index: (req, res) => {
        res.render('home/index');
    },

    pageNotFound: (req, res) => {
        //res.status(404);
        res.render('error/pageNotFound');
    }
};