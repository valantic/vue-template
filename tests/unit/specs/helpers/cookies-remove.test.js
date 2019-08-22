import setCookie from '@/helpers/cookie-set';
import removeCookie from '@/helpers/cookie-remove';

describe('helpers | cookie-set', () => {
  const cookieName = 'testCookieRemove';
  const cookieValue = '#testCookieValue#';

  it('Cookie with name only was removed', () => {
    setCookie(`${cookieName}1`);
    removeCookie(`${cookieName}1`);

    expect(document.cookie.includes(`${cookieName}1`)).toBeFalsy();
  });

  it('Cookie with name and value was removed', () => {
    setCookie(`${cookieName}2`, cookieValue);
    removeCookie(`${cookieName}2`);

    expect(document.cookie.includes(`${cookieName}2=${cookieValue}`)).toBeFalsy();
  });

  it('Cookie with max-age was removed', () => {
    setCookie(`${cookieName}3`, cookieValue, 100);
    removeCookie(`${cookieName}3`);

    expect(document.cookie.includes(`${cookieName}3=${cookieValue}`)).toBeFalsy();
  });

  it('Non related cookies are not deleted', () => {
    setCookie(`${cookieName}4`, cookieValue, 100);
    removeCookie(`${cookieName}0`);

    expect(document.cookie.includes(`${cookieName}4`)).toBeTruthy();
  });
});
