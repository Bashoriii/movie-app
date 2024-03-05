import Icon from '@mdi/react';
import { mdiCloseCircle } from '@mdi/js';
import './Remove-Alert.scss';

const loginAlert = ({ theMsg }) => {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          right: 0,
          animation: 'bounce 1.3s ease',
        }}
        className="remove-alert-container bounce"
      >
        <p className="alert-message">
          <Icon className="remove-icon-alert" path={mdiCloseCircle} size={1} />{' '}
          {theMsg}
        </p>
      </div>
    </>
  );
};

export default loginAlert;
