import Navigation from '@/components/navigation/Navigation';
import { generateStaticPaths, routes } from '@/utils';

export default function Home() {
  return (
    <div>
      <Navigation />
      <section style={{ height: '100vh' }} />
    </div>
  );
}

export async function getStaticProps() {
  return { props: {} };
}

export async function getStaticPaths() {
  return {
    paths: generateStaticPaths(routes.home),
    fallback: false,
  };
}
