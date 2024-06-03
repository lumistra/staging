import { includes, map } from 'lodash';
import { useRouter } from 'next/router';
import Footer from '@/components/containers/Footer';
import Navigation from '@/components/containers/navigation/Navigation';
import PageTransition from '@/components/elements/PageTransition';
import About from '@/components/pages/About';
import Article from '@/components/pages/Article';
import Contact from '@/components/pages/Contact';
import Home from '@/components/pages/Home';
import News from '@/components/pages/News';
import PrivacyPolicy from '@/components/pages/PrivacyPolicy';
import Project from '@/components/pages/Project';
import Services from '@/components/pages/Services';
import Work from '@/components/pages/Work';
import useArticles from '@/content/articles';
import useProjects from '@/content/projects';
import { generateStaticPaths, getRawPath, routes } from '@/utils';
import NotFound from './404';

function Main() {
  const router = useRouter();
  const { articles } = useArticles();
  const { projects } = useProjects();
  const articleSlugs = map(articles, (article) => routes.article(article.slug));
  const projectSlugs = map(projects, (project) => routes.project(project.slug));
  const rawPath = getRawPath(router.asPath);

  switch (true) {
    case includes(articleSlugs, rawPath):
      return <Article path={rawPath} articles={articles} />;
    case includes(projectSlugs, rawPath):
      return <Project path={rawPath} projects={projects} />;
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

export default function Page() {
  return (
    <>
      <Navigation />
      <Main />
      <Footer />
      <PageTransition />
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
