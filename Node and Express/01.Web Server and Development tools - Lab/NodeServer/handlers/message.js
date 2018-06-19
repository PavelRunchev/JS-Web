function messageHandler(req, res) {
    if(req.path == '/message.html') {
        res.sendHtml('./message.html');
    } else {
        return true;
    }
}

module.exports = messageHandler;