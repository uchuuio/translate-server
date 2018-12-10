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

test('A more complicated string', async () => {
    expect.assertions(1);
    const decodedText = decodeURIComponent('커뮤니티 여러분, 안녕하세요.클래식 게임의 지속적인 지원을 위하여 아시아에서 활용중인 데이터 센터를 화요일에 이전할 예정입니다. 이로 인한 서버 다운이 1시간 정도 예상 됩니다.공지: 데이터센터 이전 시간 2018.12.04 화요일 오전 06시 (한국시간)영향:스타크래프트 리마스터: 사용자들이 채팅에서 강제퇴장 되지만 다시 접속할 수 있습니다.워크래프트 III: 사용자들이 채팅에서 강제퇴장 되지만 다시 접속할 수 있습니다.디아블로 II: 서버 다운 직전 모든 게임들이 종료될 것이며, 한 시간 이후에 다시 접속할 수 있습니다.감사합니다.');
    const successText = 'Dear Community, We are planning to relocate the data center in use in Asia for the continued support of classical games on Tuesday. Notice: Data Center Migration Time Tuesday, August 20, 2016 at 06:00 AM (UTC) Impact: StarCraft Remaster: Users are forced to leave the chat but can log back in. Warcraft III: Users Diablo II: All games will end before the server is down, and you will be able to reconnect after an hour.';
    const data = await translator(decodedText, 'en');
    await expect(data.text).toEqual(successText);
});