import { Icon } from '@iconify/react/dist/iconify.js';
import cx from 'classnames';

interface Props {
  className?: string;
  label?: string;
  value?: string;
  isCategory?: boolean;
  checked?: boolean;
  onCheck?: React.Dispatch<string | number | boolean>;
}

const style =
  'flex h-5 w-5 items-center justify-center border border-gray-600 rounded-md';

const Checkbox: React.FC<Props> = ({
  className,
  label,
  value,
  isCategory,
  checked = false,
  onCheck = () => null,
}) => {
  if (isCategory)
    return (
      <div
        className={cx(
          'flex w-fit cursor-pointer items-center gap-1.5',
          className,
        )}
      >
        <div
          className={
            !checked ? style : style + ' border-red-400 bg-red-500 text-white'
          }
          onClick={() => onCheck(value as string)}
        >
          {checked && <Icon icon='mdi:check-bold' />}
        </div>
        <p className='whitespace-nowrap pt-px'>{label}</p>
      </div>
    );
  return (
    <div
      className={cx(
        'flex w-fit cursor-pointer items-center gap-1.5',
        className,
      )}
      onClick={() => onCheck(value as string)}
    >
      <div
        className={
          !checked ? style : style + ' border-red-400 bg-red-500 text-white'
        }
      >
        {checked && <Icon icon='mdi:check-bold' />}
      </div>
      <p className='whitespace-nowrap pt-px'>{label}</p>
    </div>
  );
};

export default Checkbox;
