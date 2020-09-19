import React from 'react';
import HomePane from './HomePane';

const ContentPane = () => {
  return (
    <div className="px-8 pb-6 overflow-y-auto content-spotify">
      <HomePane />
    </div>
  );
};

export default ContentPane;
