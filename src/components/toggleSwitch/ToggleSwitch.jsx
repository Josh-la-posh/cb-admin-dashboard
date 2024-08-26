import React, { useState } from 'react';
import './ToggleSwitch.css';

function ToggleSwitch({handleToggle, isOn}) {
  return (
    <div className="toggle-switch">
      <input
        type="checkbox"
        checked={isOn}
        onChange={handleToggle}
        className="toggle-switch-checkbox"
        id="toggleSwitch"
      />
      <label
        className="toggle-switch-label"
        htmlFor="toggleSwitch"
      >
        <span className="toggle-switch-inner" />
        <span className="toggle-switch-switch" />
      </label>
    </div>
  );
}

export default ToggleSwitch;
