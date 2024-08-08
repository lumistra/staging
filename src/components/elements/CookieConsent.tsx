import { useEffect, useState } from 'react';
import { includes } from 'lodash';
import Script from 'next/script';
import { acceptedCategory, run, setLanguage } from 'vanilla-cookieconsent';
import useTranslations from '@/hooks/useTranslations';
import 'vanilla-cookieconsent/dist/cookieconsent.css';

export default function CookieConsent() {
  const { currentLocale } = useTranslations();
  const [addTrackers, setAddTrackers] = useState(false);

  useEffect(() => {
    if (window.location !== window.parent.location) return;

    run({
      categories: {
        necessary: {
          enabled: true,
          readOnly: true,
        },
        analytics: {
          enabled: true,
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
      onConsent: () => {
        setAddTrackers(acceptedCategory('analytics'));
      },
      onChange: ({ changedCategories }) => {
        if (includes(changedCategories, 'analytics')) {
          setAddTrackers(acceptedCategory('analytics'));
        }
      },
    });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setLanguage(currentLocale, true);
  }, [currentLocale]);

  if (!process.env.gtmId || !addTrackers) return null;

  return (
    <>
      <Script id="gtag" data-category="analytics">
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
