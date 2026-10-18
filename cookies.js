/* Gestion des cookies (tarteaucitron.js) et Google Analytics */
const GA_ID = 'G-FCYEC5SS5D'; // remplacez par l'identifiant de mesure de votre flux Google Analytics 4

if (window.tarteaucitron) {
  tarteaucitron.init({
    "privacyUrl": "confidentialite.html",
    "hashtag": "#tarteaucitron",
    "cookieName": "tarteaucitron",
    "orientation": "bottom",
    "groupServices": false,
    "showAlertSmall": false,
    "cookieslist": true,
    "showIcon": true,
    "iconPosition": "BottomLeft",
    "adblocker": false,
    "AcceptAllCta": true,
    "DenyAllCta": true,
    "highPrivacy": true,
    "handleBrowserDNTRequest": false,
    "removeCredit": false,
    "moreInfoLink": true,
    "useExternalCss": false,
    "useExternalJs": false,
    "readmoreLink": "confidentialite.html"
  });

  tarteaucitron.user.gtagUa = GA_ID;
  tarteaucitron.user.gtagMore = function () { /* options Google Analytics supplémentaires */ };
  (tarteaucitron.job = tarteaucitron.job || []).push('gtag');
}
