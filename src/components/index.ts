import Overview from '@/components/containers/projects/Overview';
import DoubleImage from '@/components/elements/layouts/DoubleImage';
import SingleImage from '@/components/elements/layouts/SingleImage';
import Text from '@/components/elements/layouts/Text';
import TextImage from '@/components/elements/layouts/TextImage';
import TripleImage from '@/components/elements/layouts/TripleImage';
import Meta from '@/components/elements/Meta';
import Article from '@/components/pages/Article';
import Main from '@/components/pages/Main';
import Project from '@/components/pages/Project';

const components = {
  page: Main,
  article: Article,
  project: Project,
  meta: Meta,
  text: Text,
  textImage: TextImage,
  singleImage: SingleImage,
  doubleImage: DoubleImage,
  tripleImage: TripleImage,
  overview: Overview,
};

export default components;
