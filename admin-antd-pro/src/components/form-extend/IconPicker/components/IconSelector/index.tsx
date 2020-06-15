import React from 'react';
import classNames from 'classnames/bind';
import styles from './index.less';

const classNamesBind = classNames.bind(styles);

interface IconSelectorProps {
  icon: React.ReactNode;
  active?: boolean;
  onClick: () => void;
}

const IconSelector: React.FC<IconSelectorProps> = ({ icon, active, onClick }) => {
  const classes = classNamesBind({
    'icon-selector-wrapper': true,
    active,
  });

  // render
  return React.createElement(
    'div',
    {
      className: classes,
      style: {
        fontSize: '1.5rem',
      },
      onClick,
    },
    icon,
  );
};

// default props
IconSelector.defaultProps = {
  active: false,
};

export default IconSelector;
