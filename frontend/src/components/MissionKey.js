import React from 'react';

export default function MissionKey() {
  return (
    <div className="my-3">
      <p style={{ float: 'left', marginRight: '2em' }}>
        <span className="px-3 mr-2 bg-success" />= Success
      </p>
      <p>
        <span className="px-3 mr-2 bg-warning" />= Failed
      </p>
    </div>
  );
}
