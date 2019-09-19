const Edit = require('../models/Edit');

module.exports = {
    history: async(req, res) => {
        const articleId = req.params.id;
        try {
            let edits = await Edit.find({ article: articleId }).populate('author');
            //01:14, 31 May 2018 format
            edits.map(e => {
                e.date = '';
                e.date += `${e.creationDate.toString().substring(15, 21)}, `;
                e.date += `${e.creationDate.getDay()} `;
                e.date += `${e.creationDate.toString().substring(3, 7)} `;
                e.date += `${e.creationDate.getFullYear()}`;
            });
            const title = edits[0].title;
            res.render('edit/history', { edits, title });
        } catch (err) {
            console.log(err.message);
        }
    },

    editDetails: (req, res) => {
        const editId = req.params.id;
        Edit.findById(editId)
            .populate('article')
            .then((edit) => {
                edit.articleId = edit.article._id;
                let splitedContent = edit.content.split('\r\n\r\n');
                res.render('edit/edit-details', { edit, splitedContent });
            }).catch(err => console.log(err.message));
    }
};