import Headline from '@/components/containers/articles/Headline';
import Latest from '@/components/containers/articles/Latest';
import WantToPublish from '@/components/containers/articles/WantToPublish';
import Contact from '@/components/containers/main/Contact';
import Footer from '@/components/containers/main/Footer';
import Hero from '@/components/containers/main/Hero';
import Stats from '@/components/containers/main/Stats';
import Workflow from '@/components/containers/main/Workflow';
import AboutSplit from '@/components/containers/misc/AboutSplit';
import AboutSection from '@/components/containers/misc/AboutTextarea';
import AltBackgroundSection from '@/components/containers/misc/AltBackgroundSection';
import AnimatedLineSection from '@/components/containers/misc/AnimatedLineSection';
import Navigation from '@/components/containers/navigation/Navigation';
import Sidenav from '@/components/containers/navigation/Sidenav';
import Featured from '@/components/containers/projects/Featured';
import Overview from '@/components/containers/projects/Overview';
import Selected from '@/components/containers/projects/Selected';
import Pitch from '@/components/containers/services/Pitch';
import Selection from '@/components/containers/services/Selection';
import WhatWeDo from '@/components/containers/services/WhatWeDo';
import DoubleMedia from '@/components/elements/layouts/DoubleMedia';
import SingleMedia from '@/components/elements/layouts/SingleMedia';
import Text from '@/components/elements/layouts/Text';
import TextMedia from '@/components/elements/layouts/TextMedia';
import TripleMedia from '@/components/elements/layouts/TripleMedia';
import Meta from '@/components/elements/Meta';
import Article from '@/components/pages/Article';
import News from '@/components/pages/News';
import Page from '@/components/pages/Page';
import Project from '@/components/pages/Project';
import Work from '@/components/pages/Work';

const components = {
  // Content-Type blocks
  navigation: Navigation,
  footer: Footer,
  page: Page,
  work: Work,
  news: News,
  article: Article,
  project: Project,

  // Nested blocks
  sidenav: Sidenav,
  meta: Meta,
  hero: Hero,
  featured: Featured,
  selected: Selected,
  latest: Latest,
  selection: Selection,
  workflow: Workflow,
  pitch: Pitch,
  whatWeDo: WhatWeDo,
  wantToPublish: WantToPublish,
  animatedLineSection: AnimatedLineSection,
  altBackgroundSection: AltBackgroundSection,
  aboutSection: AboutSection,
  aboutSplit: AboutSplit,
  contact: Contact,
  stats: Stats,

  // Projects & Articles blocks
  overview: Overview,
  headline: Headline,
  singleImage: SingleMedia,
  doubleImage: DoubleMedia,
  tripleImage: TripleMedia,
  textImage: TextMedia,
  text: Text,
};

export default components;
