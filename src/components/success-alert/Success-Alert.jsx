import Icon from '@mdi/react';
import { mdiCheckCircle } from '@mdi/js';
import './Success-Alert.scss';

const loginAlert = ({ theMsg }) => {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          right: 0,
          animation: 'bounce 1.3s ease',
        }}
        className="success-alert-container bounce"
      >
        <p className="alert-message">
          <Icon className="check-icon" path={mdiCheckCircle} size={1} />{' '}
          {theMsg}
        </p>
      </div>
    </>
  );
};

export default loginAlert;
