import deepmerge from 'deepmerge';

import i18n from '@/i18n-config.js';

export async function completeMessagesTree(locale, file) {
    //load default messages
    let defaultMessages = {};
    defaultMessages.global = (await import(`@/messages/${i18n.defaultLocale}/global.json`)).default;
    if (file) defaultMessages[`${file}`] = (await import(`@/messages/${i18n.defaultLocale}/${file}.json`)).default;
     
    // if is default locale, return message tree
    if (locale == i18n.defaultLocale) return defaultMessages;

    //load locale messages
    let messages = {}
    messages.global = (await import(`@/messages/${locale}/global.json`)).default;
    if (file) messages[`${file}`] = (await import(`@/messages/${locale}/${file}.json`)).default;
    
    return deepmerge(defaultMessages, messages);
}