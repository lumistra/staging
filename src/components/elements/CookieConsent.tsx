import { useEffect } from 'react';
import Script from 'next/script';
import { acceptedService, run, setLanguage } from 'vanilla-cookieconsent';
import useTranslations from '@/hooks/useTranslations';
import 'vanilla-cookieconsent/dist/cookieconsent.css';

enum Categories {
  necessary = 'necessary',
  analytics = 'analytics',
  advertisement = 'advertisement',
  functionality = 'functionality',
  security = 'security',
}

enum Services {
  ad_storage = 'ad_storage',
  ad_user_data = 'ad_user_data',
  ad_personalization = 'ad_personalization',
  analytics_storage = 'analytics_storage',
  functionality_storage = 'functionality_storage',
  personalization_storage = 'personalization_storage',
  security_storage = 'security_storage',
}

export default function CookieConsent() {
  const { currentLocale, t } = useTranslations();

  useEffect(() => {
    if (window.location !== window.parent.location) return;
    window.dataLayer = window.dataLayer || [];

    function gtag() { window.dataLayer?.push(arguments); }
    window.gtag = gtag;

    const updateConsent = (type: 'default' | 'update') => {
      if (!window.gtag) return;

      window.gtag('consent', type, {
        [Services.analytics_storage]: acceptedService(Services.analytics_storage, Categories.analytics) ? 'granted' : 'denied',
        [Services.ad_storage]: acceptedService(Services.ad_storage, Categories.advertisement) ? 'granted' : 'denied',
        [Services.ad_user_data]: acceptedService(Services.ad_user_data, Categories.advertisement) ? 'granted' : 'denied',
        [Services.ad_personalization]: acceptedService(Services.ad_personalization, Categories.advertisement) ? 'granted' : 'denied',
        [Services.functionality_storage]: acceptedService(Services.functionality_storage, Categories.functionality) ? 'granted' : 'denied',
        [Services.personalization_storage]: acceptedService(Services.personalization_storage, Categories.functionality) ? 'granted' : 'denied',
        [Services.security_storage]: acceptedService(Services.security_storage, Categories.security) ? 'granted' : 'denied',
        ...(type === 'default' && { wait_for_update: 500 }),
      });

      if (type === 'update') {
        window.gtag('event', 'gtm.consent_update');
      }
    };

    updateConsent('default');

    run({
      onConsent: () => { updateConsent('update'); },
      onChange: () => { updateConsent('update'); },
      categories: {
        [Categories.necessary]: {
          enabled: true,
          readOnly: true,
        },
        [Categories.analytics]: {
          services: {
            [Services.analytics_storage]: {
              label: t('cookies.analytics_storage'),
            },
          },
        },
        [Categories.advertisement]: {
          services: {
            [Services.ad_storage]: {
              label: t('cookies.ad_storage'),
            },
            [Services.ad_user_data]: {
              label: t('cookies.ad_user_data'),
            },
            [Services.ad_personalization]: {
              label: t('cookies.ad_personalization'),
            },
          },
        },
        [Categories.functionality]: {
          services: {
            [Services.functionality_storage]: {
              label: t('cookies.functionality_storage'),
            },
            [Services.personalization_storage]: {
              label: t('cookies.personalization_storage'),
            },
          },
        },
        [Categories.security]: {
          services: {
            [Services.security_storage]: {
              label: t('cookies.security_storage'),
            },
          },
        },
      },
      guiOptions: {
        consentModal: {
          layout: 'bar',
          position: 'bottom',
          equalWeightButtons: false,
        },
        preferencesModal: {
          layout: 'bar',
          position: 'right',
          equalWeightButtons: false,
        },
      },
      language: {
        default: 'en',
        autoDetect: 'document',
        translations: {
          en: '/locales/en.cookies.json',
          hr: '/locales/hr.cookies.json',
        },
      },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setLanguage(currentLocale, true);
  }, [currentLocale]);

  if (!process.env.gtmId) return null;

  return (
    <>
      <Script id="gtag">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:''; j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); })(window,document,'script','dataLayer','${process.env.gtmId}');`}
      </Script>
      <noscript>
        <iframe
          title="gtag"
          src={`https://www.googletagmanager.com/ns.html?id=${process.env.gtmId}`}
          style={{ display: 'none', visibility: 'hidden' }}
          height="0"
          width="0"
        />
      </noscript>
    </>
  );
}
