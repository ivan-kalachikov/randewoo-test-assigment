import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ru from './ru';

const initI18n = async () => {
  const i18next = i18n.createInstance();
  await i18next
    .use(initReactI18next)
    .init({
      lng: 'ru',
      resources: {
        ru,
      },
    });
};

export default initI18n;
