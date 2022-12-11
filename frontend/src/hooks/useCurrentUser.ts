import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserProvider';

const useCurrentUser = () => {
  const currentUser = React.useContext(CurrentUserContext);

  return currentUser;
};

export default useCurrentUser;
