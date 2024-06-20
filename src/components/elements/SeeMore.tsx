import classNames from 'classnames';
import useTranslations from '@/hooks/useTranslations';

type Props = {
  className?: string
  cursorPosition: { x: number, y: number }
  show: boolean
};

export default function SeeMore(props: Props) {
  const { t } = useTranslations();

  return (
    <div
      className={classNames('see-more-modal', props.className, {
        active: props.show,
      })}
      style={{
        position: 'fixed',
        left: props.cursorPosition.x,
        top: props.cursorPosition.y,
      }}
    >
      <span>{t('globals.see_more')}</span>
    </div>
  );
}
