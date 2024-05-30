import { useRouter } from 'next/router';
import Footer from '@/components/containers/Footer';
import Navigation from '@/components/containers/navigation/Navigation';
import About from '@/components/pages/About';
import Articles from '@/components/pages/Articles';
import Contact from '@/components/pages/Contact';
import Home from '@/components/pages/Home';
import PrivacyPolicy from '@/components/pages/PrivacyPolicy';
import Services from '@/components/pages/Services';
import Work from '@/components/pages/Work';
import { generateStaticPaths, getRawPath, routes } from '@/utils';

function Main() {
  const router = useRouter();

  switch (true) {
    case getRawPath(router.asPath) === routes.privacyPolicy:
      return <PrivacyPolicy />;
    case getRawPath(router.asPath) === routes.articles:
      return <Articles />;
    case getRawPath(router.asPath) === routes.contact:
      return <Contact />;
    case getRawPath(router.asPath) === routes.about:
      return <About />;
    case getRawPath(router.asPath) === routes.services:
      return <Services />;
    case getRawPath(router.asPath) === routes.work:
      return <Work />;
    default:
      return <Home />;
  }
}

export default function Page() {
  return (
    <>
      <Navigation />
      <Main />
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}

export async function getStaticPaths() {
  return {
    paths: generateStaticPaths(),
    fallback: false,
  };
}
