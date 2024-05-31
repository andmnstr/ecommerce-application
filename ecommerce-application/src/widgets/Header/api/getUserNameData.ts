import { getApiRoot } from '../../../shared/Api/apiRoot';
import { isTokenStore } from '../../../shared/Api/Lib/isTokenStore';

export const getUserNameData = async (): Promise<string> => {
  const TOKEN_NAME = 'hardcoders_access_token';
  const storageItem: string | null = localStorage.getItem(TOKEN_NAME);
  let accessToken = '';
  let userName = '';

  if (storageItem) {
    const tokenStore: unknown = JSON.parse(storageItem);
    if (isTokenStore(tokenStore)) {
      accessToken = tokenStore.token;

      await getApiRoot()
        .me()
        .get({
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .execute()
        .then(response => {
          const name = response.body.firstName;
          const surname = response.body.lastName;

          const firstLetter = name !== undefined ? name.substring(0, 1) : '';
          const lastLetter = surname !== undefined ? surname.substring(0, 1) : '';

          userName = firstLetter + lastLetter;
        })
        .catch(error => {
          if (error instanceof Error) {
            throw new Error(error.message);
          } else {
            console.error('Error while user information getting', error);
          }
        });
    }
  }

  return userName;
};
