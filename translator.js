const translate = require('@k3rn31p4nic/google-translate-api');

module.exports = async function translator(text, language) {
    return new Promise((resolve, reject) => {
        translate(text, {to: language})
            .then(resp => {
                const resJson = {
                    text: resp.text
                };
                resolve(resJson);
            }).catch(err => {
                reject(err);
            });
    });
}