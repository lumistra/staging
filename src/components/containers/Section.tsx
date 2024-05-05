import classNames from 'classnames';

type Props = {
  className?: string,
  containerClassName?: string,
  id?: string,
  children: any
};

export default function Section(props: Props) {
  return (
    <section
      id={props.id}
      className={classNames('max-content-wrapper', props.className)}
    >
      <div className={classNames('max-content-container', props.containerClassName)}>
        {props.children}
      </div>
    </section>
  );
}
