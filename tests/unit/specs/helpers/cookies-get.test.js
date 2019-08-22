import setCookie from '@/helpers/cookie-set';
import getCookie from '@/helpers/cookie-get';

describe('helpers | cookie-set', () => {
  const cookieName = 'testCookieGet';
  const cookieValue = '#testCookieValue#';

  it('Cookie exists', () => {
    setCookie(`${cookieName}1`);

    expect(getCookie(`${cookieName}1`)).not.toBeNull();
  });

  it('Cookie has a value', () => {
    setCookie(`${cookieName}2`, cookieValue);

    expect(getCookie(`${cookieName}2`)).toBe(cookieValue);
  });

  it('Cookie has a value', () => {
    setCookie(`${cookieName}3`, cookieValue, 10);

    expect(getCookie(`${cookieName}3`)).toBe(cookieValue);
  });

  it('Cookie does not exist because deleted', () => { // The expire information is not available to JavaScript. Because of that we test if the cookie is removed when 0 is used.
    setCookie(`${cookieName}4`, cookieValue, 0);

    expect(getCookie(`${cookieName}4`)).toBeNull();
  });
});
