import * as SI from 'react-icons/si';

// This file is just to check what icons are available in the react-icons/si package
const TestIcons = () => {
  // Log all available icons from SI
  console.log('Available SI icons:', Object.keys(SI));
  
  return (
    <div>
      <h1>Test Icons</h1>
      <p>Check the console for available icons</p>
    </div>
  );
};

export default TestIcons;
