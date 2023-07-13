import apiUrls from '@/setup/api-urls.json';

interface UrlKeyValues {
  [key: string]: string;
}

/**
 * Gets the url for the given 'urlKey'. The method also accepts an Object of interpolation values.
 */
export default function getApiUrl(urlKey: keyof typeof apiUrls, values: UrlKeyValues): string {
  let url = apiUrls[urlKey];

  if (!url) {
    throw new Error(`Unable to find an API url with the identifier ${urlKey}.`);
  }

  if (values) {
    Object.entries(values).forEach(([key, value]) => {
      url = url.replace(`{${key}}`, value);
    });
  }

  return url;
}
