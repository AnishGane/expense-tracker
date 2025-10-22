import React from 'react';
import { getInitials } from '../../utils/helper';

const CharAvatar = ({ fullName, width, height, style }) => {
  return (
    <div
      className={`${width || 'w-12'} ${height || 'h-12'} ${style || ''} flex items-center justify-center rounded-full border-2 border-primary bg-gray-100 font-medium text-gray-900`}
    >
      {getInitials(fullName || '')}
    </div>
  );
};

export default CharAvatar;
