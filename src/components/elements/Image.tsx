import classNames from 'classnames';
import NextImage from 'next/image';

type Props = {
  className?: string,
  src: string,
  alt: string,
  storyblokEditable?: any
  onClick?: () => void
};

export default function Image(props: Props) {
  const basePath = (process.env.basePath || '');
  const src = `${basePath}${props.src}`;

  return (
    <div
      className={classNames('image-container', props.className)}
      {...props.storyblokEditable}
      onClick={props.onClick}
    >
      <NextImage src={src} alt={props.alt} fill />
    </div>
  );
}
