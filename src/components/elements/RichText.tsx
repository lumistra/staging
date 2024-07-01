import { MARK_LINK, render } from 'storyblok-rich-text-react-renderer';
import classNames from 'classnames';
import Link from './Link';
import type { ISbRichtext } from '@storyblok/react';

type Props = {
  className?: string
  children: ISbRichtext | undefined
};

export default function RichText(props: Props) {
  return (
    <div className={classNames('rich-text-wrapper', props.className)}>
      {render(props.children, {
        markResolvers: {
          // eslint-disable-next-line react/no-unstable-nested-components
          [MARK_LINK]: (children, componentProps) => {
            const { linktype, href } = componentProps;

            if (linktype === 'email') {
              // Email links: add `mailto:` scheme and map to <a>
              return <a href={`mailto:${href}`} target="_blank">{children}</a>;
            }

            if (href?.match(/^(https?:)?\/\//)) {
              // External links: map to <a>
              return <a href={href} target="_blank">{children}</a>;
            }

            // Internal links: map to <Link>
            return <Link href={href}>{children}</Link>;
          },
        },
      })}
    </div>
  );
}
