import React from 'react'

export const getAdornmentChildren = (adornment: React.ReactNode) => {
  if (React.isValidElement(adornment)) {
    return adornment.props.children;
  }
  return [];
};