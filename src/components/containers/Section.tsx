import { forwardRef } from 'react';
import classNames from 'classnames';
import first from 'lodash/first';
import type { StyleData } from '@/types/shared';

type Props = {
  id?: string,
  componentId?: string,
  className?: string,
  containerClassName?: string,
  style?: [StyleData],
  children: any
  parentChildren?: any
  storyblokEditable?: any
};

const Section = forwardRef((props: Props, ref?: any) => {
  const style = first(props.style) || { css: '' };
  const componentId = style._uid ? 'section-' + style._uid : undefined;

  return (
    <section
      ref={ref}
      id={classNames(props.id, componentId)}
      className={classNames('max-content-wrapper', props.className)}
      data-component-id={props.componentId}
      {...props.storyblokEditable}
    >
      {componentId && style.css && (
        <style>{style.css.replaceAll('section_id', `#${componentId}`)}</style>
      )}
      {props.parentChildren}
      <div className={classNames('max-content-container', props.containerClassName)}>
        {props.children}
      </div>
    </section>
  );
});

export default Section;
