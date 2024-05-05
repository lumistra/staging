import classNames from 'classnames';
import NextImage from 'next/image';

type Props = {
  className?: string,
  src: string,
  alt: string,
};

export default function Image(props: Props) {
  return (
    <div className={classNames('image-container', props.className)}>
      <NextImage src={props.src} alt={props.alt} fill />
    </div>
  );
}
