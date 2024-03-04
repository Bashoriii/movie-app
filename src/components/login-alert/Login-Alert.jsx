import './Login-Alert.scss';
import Icon from '@mdi/react';
import { mdiCheckCircle } from '@mdi/js';

const loginAlert = () => {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          right: 0,
          animation: 'bounce 1.3s ease',
        }}
        className="alert-modal-container bounce"
      >
        <p className="alert-message">
          <Icon className="check-icon" path={mdiCheckCircle} size={1} /> Login
          Successful!
        </p>
      </div>
    </>
  );
};

export default loginAlert;
