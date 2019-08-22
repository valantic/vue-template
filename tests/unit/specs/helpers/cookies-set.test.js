import setCookie from '@/helpers/cookie-set';

describe('helpers | cookie-set', () => {
  const cookieName = 'testCookieSet';
  const cookieValue = '#testCookieValue#';

  it('Cookie exists', () => {
    setCookie(`${cookieName}1`);

    expect(document.cookie.includes(`${cookieName}1`)).toBeTruthy();
  });

  it('Cookie has a value', () => {
    setCookie(`${cookieName}2`, cookieValue);

    expect(document.cookie.includes(`${cookieName}2=${cookieValue}`)).toBeTruthy();
  });

  it('Cookie has a value', () => {
    setCookie(`${cookieName}3`, cookieValue, 10);

    expect(document.cookie.includes(`${cookieName}3=${cookieValue}`)).toBeTruthy();
  });

  it('Cookie has a max-age', () => { // The expire information is not available to JavaScript. Because of that we test if the cookie is removed when 0 is used.
    setCookie(`${cookieName}4`, cookieValue, 0);

    expect(document.cookie.includes(`${cookieName}4`)).toBeFalsy();
  });
});
