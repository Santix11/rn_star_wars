import i18n from 'i18n-js';
import en from './en';
import es from './es';
import fr from './fr';
import simpleStore from 'react-native-simple-store';


i18n.fallbacks = true;
i18n.translations = { es, en, fr };
i18n.locale = 'en';

simpleStore.get('language').then(data => {
    console.log("Got language!!!", data);
    i18n.locale = data;
});


export default i18n;