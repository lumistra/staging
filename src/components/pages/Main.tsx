import About from '@/components/pages/About';
import Contact from '@/components/pages/Contact';
import Home from '@/components/pages/Home';
import News from '@/components/pages/News';
import PrivacyPolicy from '@/components/pages/PrivacyPolicy';
import Services from '@/components/pages/Services';
import Work from '@/components/pages/Work';
import NotFound from '@/pages/404';
import { getRawPath, routes } from '@/utils';

type Props = {
  slug: string
};

export default function Main(props: Props) {
  const rawPath = getRawPath(props.slug);

  switch (true) {
    case rawPath === routes.articles:
      return <News />;
    case rawPath === routes.work:
      return <Work />;
    case rawPath === routes.privacyPolicy:
      return <PrivacyPolicy />;
    case rawPath === routes.contact:
      return <Contact />;
    case rawPath === routes.about:
      return <About />;
    case rawPath === routes.services:
      return <Services />;
    case rawPath === routes.home:
      return <Home />;
    default:
      return <NotFound />;
  }
}
