

module.exports = {
    index: (req, res) => {
        res.status(200).render('home/index');
    }, 

    about: (req, res) => {
        res.status(200).render('home/about');
    },

    pageNotFound: (req, res) => {
        res.status(200).render('error/pageNotFound');
    }
}