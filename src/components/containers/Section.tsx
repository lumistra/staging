import { forwardRef } from 'react';
import classNames from 'classnames';

type Props = {
  id?: string,
  componentId?: string,
  className?: string,
  containerClassName?: string,
  children: any
  parentChildren?: any
  storyblokEditable?: any
};

const Section = forwardRef((props: Props, ref?: any) => (
  <section
    ref={ref}
    id={props.id}
    className={classNames('max-content-wrapper', props.className)}
    data-component-id={props.componentId}
    {...props.storyblokEditable}
  >
    {props.parentChildren}
    <div className={classNames('max-content-container', props.containerClassName)}>
      {props.children}
    </div>
  </section>
));

export default Section;
