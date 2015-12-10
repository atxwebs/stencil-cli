var _ = require('lodash'),
    Fs = require('fs'),
    Hoek = require('hoek'),
    parser = require('accept-language-parser');


module.exports.getPreferredTranslation = function(acceptLanguageHeader, translations) {
    // default the preferred translation
    var preferredTranslation = translations['en'],
        preferredLang = parser.parse(acceptLanguageHeader);
    // march down the preferred languages and use the first translatable locale
    _.each(preferredLang, function(acceptedLang) {
        var suitableLang = acceptedLang.code;

        if (_.isString(acceptedLang.region)) {
            suitableLang += '-' + acceptedLang.region;
        }

        if (translations[suitableLang]) {
            preferredTranslation = translations[suitableLang];
            return false;
        }
    });

    return preferredTranslation;
};
