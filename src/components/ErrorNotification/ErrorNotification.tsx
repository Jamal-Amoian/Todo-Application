/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Error } from '../../types/error';

type Props = {
  setErrorType: (error: Error) => void;
  errorType: string;
};

export const ErrorNotification: React.FC<Props> = ({
  setErrorType,
  errorType,
}) => {
  const [isClose, setIsClose] = useState(false);

  setTimeout(() => {
    setIsClose(true);
  }, 3000);

  useEffect(() => {
    if (isClose) {
      setErrorType(Error.Ok);
      setIsClose(false);
    }
  });

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: isClose },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setIsClose(true)}
      />

      {errorType}
    </div>
  );
};
