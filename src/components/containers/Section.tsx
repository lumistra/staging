import classNames from 'classnames';

type Props = {
  id?: string,
  className?: string,
  containerClassName?: string,
  children: any
  parentChildren?: any
};

export default function Section(props: Props) {
  return (
    <section
      id={props.id}
      className={classNames('max-content-wrapper', props.className)}
    >
      {props.parentChildren}
      <div className={classNames('max-content-container', props.containerClassName)}>
        {props.children}
      </div>
    </section>
  );
}
