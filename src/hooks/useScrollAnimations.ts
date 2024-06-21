import { useEffect, useRef } from 'react';
import {
  first, forEach, inRange, isEmpty, reduce,
} from 'lodash';

export enum AnimationType {
  fadeIn = 'fade-in',
  fadeUp = 'fade-up',
  fadeDown = 'fade-down',
}

type ClassList = {
  [key: string]: {
    query: string,
    offset: number,
    animation?: AnimationType,
  }
};

type AnimationItem = {
  element: Element,
  offset: number,
  animation: AnimationType | '',
};

type AnimationsList = { [key: string]: AnimationItem };

export const elementInView = (win: Window, element: AnimationItem): boolean => {
  if (!element.element) return false;
  const el = element.element.getBoundingClientRect().top;

  return inRange(win.scrollY + el + element.offset, 0, win.scrollY + win.innerHeight);
};

const useScrollAnimations = (classList: ClassList, callback?: () => void) => {
  const animationList = useRef(classList);
  const firstLoad = useRef(true);

  useEffect(() => {
    const list: AnimationsList = reduce(animationList.current, (res: AnimationsList, val, key) => {
      const elements = document.querySelectorAll(val.query);
      const isMultiple = elements.length > 1;
      if (isMultiple) {
        forEach(elements, (element, index) => {
          res[key + index] = {
            element,
            offset: val.offset,
            animation: val.animation || '',
          };
        });
      } else {
        const element = first(elements);
        if (element) {
          res[key] = {
            element,
            offset: val.offset,
            animation: val.animation || '',
          };
        }
      }

      return res;
    }, {});

    const handleAnimation = () => {
      if (callback) callback();
      if (isEmpty(list)) return;

      forEach(list, (val) => {
        if (val.animation) val.element.classList.add(`animation-${val.animation}`);
        if (!elementInView(window, val)) return;

        val.element.classList.add('animate-in');
      });
    };

    if (firstLoad.current) {
      firstLoad.current = false;
      handleAnimation();
    }
    window.addEventListener('scroll', handleAnimation);

    return () => {
      window.removeEventListener('scroll', handleAnimation);
    };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useScrollAnimations;
