import { find, reject, sample } from 'lodash';
import Head from 'next/head';
import useProjects from '@/content/projects';
import useTranslations from '@/hooks/useTranslations';
import style from '@/styles/project.module.scss';
import { routes } from '@/utils';
import Section from '../containers/Section';
import CtaLink from '../elements/CtaLink';
import Image from '../elements/Image';
import DoubleImage from '../elements/layouts/DoubleImage';
import SingleImage from '../elements/layouts/SingleImage';
import Text from '../elements/layouts/Text';
import TextImage from '../elements/layouts/TextImage';
import TripleImage from '../elements/layouts/TripleImage';
import Link from '../elements/Link';

type Props = {
  path: string
};

export default function Project(props: Props) {
  const { t } = useTranslations();
  const { projects } = useProjects();
  const project = find(projects, (p) => routes.project(p.slug) === props.path);
  const recommended = sample(reject(projects, (p) => routes.article(p.slug) === props.path));

  if (!project || !recommended) return null;

  return (
    <>
      <Head>
        <title>Lumistra - {project.title}</title>
      </Head>
      <Section containerClassName={style.heroWrapper}>
        <Image
          className={style.heroCover}
          src={project.cover}
          alt={project.title}
        />
        <div className={style.heroContentWrapper}>
          <span className={style.heroLabel}>{t('projects.overview')}</span>
          <div className={style.heroContent}>
            <h1 className={style.heroTitle}>{project.title}</h1>
            <p className={style.heroParagraph}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</p>
          </div>
        </div>
      </Section>

      <Section containerClassName={style.projectWrapper}>
        <SingleImage src="/assets/svg/placeholder.svg" alt="placeholder" />
        <DoubleImage images={[
          { src: '/assets/svg/placeholder.svg', alt: 'placeholder' },
          { src: '/assets/svg/placeholder.svg', alt: 'placeholder' },
        ]}
        />
        <Text align="left" text="Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi." />
        <SingleImage src="/assets/svg/placeholder.svg" alt="placeholder" />
        <TripleImage images={[
          { src: '/assets/svg/placeholder.svg', alt: 'placeholder' },
          { src: '/assets/svg/placeholder.svg', alt: 'placeholder' },
          { src: '/assets/svg/placeholder.svg', alt: 'placeholder' },
        ]}
        />
        <TextImage align="right" text="Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi." image={{ src: '/assets/svg/placeholder.svg', alt: 'placeholder' }} />
        <SingleImage src="/assets/svg/placeholder.svg" alt="placeholder" />
      </Section>

      <Section containerClassName={style.recommendedWrapper}>
        <div className={style.recommendedHeader}>
          <span className={style.recommendedTitle}>{recommended.title}</span>
          <CtaLink className={style.recommendedCTA} href={routes.project(recommended.slug)}>
            {t('globals.read_next')}
          </CtaLink>
        </div>
        <Link href={routes.project(recommended.slug)}>
          <Image
            className={style.recommendedCover}
            src={recommended.cover}
            alt={recommended.title}
          />
        </Link>
      </Section>
    </>
  );
}
