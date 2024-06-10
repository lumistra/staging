import classNames from 'classnames';
import NextImage from 'next/image';

type Props = {
  className?: string,
  src: string,
  alt: string,
  storyblokEditable?: any
};

export default function Image(props: Props) {
  const basePath = (process.env.basePath || '');
  const src = `${basePath}${props.src}`;

  return (
    <div className={classNames('image-container', props.className)} {...props.storyblokEditable}>
      <NextImage src={src} alt={props.alt} fill />
    </div>
  );
}
