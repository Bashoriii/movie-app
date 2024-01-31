import Icon from '@mdi/react';
import { mdiLoading } from '@mdi/js';
import './loading.scss';

const handleLoading = () => {
  return (
    <div className="loading-container">
      <Icon className="loading-icon" path={mdiLoading} size={2} />
      <p>Loading...</p>
    </div>
  );
};

export default handleLoading;
