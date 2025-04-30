import React from 'react';

interface ApplyButtonProps {
  onApply: () => void;
  className: string;
}

export default function ApplyButton({
  onApply,
  className,
}: ApplyButtonProps): React.ReactElement {
  return (
    <button className={className} onClick={onApply}>
      Search
    </button>
  );
}
