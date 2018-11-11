const translator = require('./../translator');

const translations = [
    {
        code: 'ja',
        text: 'こんにちは'
    },
    {
        code: 'en',
        text: 'Hello'
    },
    {
        code: 'fr',
        text: 'Bonjour'
    },
    {
        code: 'es',
        text: 'Hola'
    },
    {
        code: 'ru',
        text: 'Здравствуйте'
    }
];

for (let i = 0; i < translations.length; i++) {
    const translation = translations[i];
    test(`is able to translate ${translation.code} into en`, async () => {
        expect.assertions(1);
        const decodedText = decodeURIComponent(translation.text);
        const data = await translator(decodedText, 'en');
        expect(data.text).toBe('Hello');
    });
};

test('returns an error when trying to use jp as the lang code', async () => {
    expect.assertions(1);
    const decodedText = decodeURIComponent('Hello');
    await expect(translator(decodedText, 'jp')).rejects.toEqual("The language 'jp' is not supported.");
});

test('returns an error when trying to use an incorrect lang code', async () => {
    expect.assertions(1);
    const decodedText = decodeURIComponent('Hello');
    await expect(translator(decodedText, 'asdfhgsd')).rejects.toEqual("The language 'asdfhgsd' is not supported.");
});