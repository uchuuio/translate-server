const translator = require('./translator');

module.exports = async (req, res) => {
    if (req.url === '/') {
        return {
            error: true,
            message: 'Please use the site via: /[countrycode]/[message]'
        }
    }

    if (req.url !== '/favicon.ico') {
        const url = req.url.slice(1);
        const splitUrl = url.split('/', 2);
        const languageTo = splitUrl[0];
        if (languageTo === 'jp') {
            return {
                error: true,
                message: 'If you\'re looking to translate into japanese, you must use ja instead'
            }
        }
        const text = splitUrl[1];
        const decodedText = decodeURIComponent(text);

        return await translator(decodedText, languageTo);
    }
};
