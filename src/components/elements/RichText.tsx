import { render } from 'storyblok-rich-text-react-renderer';
import type { ISbRichtext } from '@storyblok/react';

type Props = {
  className?: string
  children: ISbRichtext
};

export default function RichText(props: Props) {
  return <div className={props.className}>{render(props.children)}</div>;
}
