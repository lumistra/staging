import { useRouter } from 'next/router';
import Footer from '@/components/containers/Footer';
import Navigation from '@/components/containers/navigation/Navigation';
import Home from '@/components/pages/Home';
import PrivacyPolicy from '@/components/pages/PrivacyPolicy';
import Work from '@/components/pages/Work';
import { generateStaticPaths, getRawPath, routes } from '@/utils';

function Main() {
  const router = useRouter();

  switch (true) {
    case getRawPath(router.asPath) === routes.privacyPolicy:
      return <PrivacyPolicy />;
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
