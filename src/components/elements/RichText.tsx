import { render } from 'storyblok-rich-text-react-renderer';
import classNames from 'classnames';
import type { ISbRichtext } from '@storyblok/react';

type Props = {
  className?: string
  children: ISbRichtext | undefined
};

export default function RichText(props: Props) {
  return (
    <div className={classNames('rich-text-wrapper', props.className)}>
      {render(props.children)}
    </div>
  );
}
