import React from 'react';

const Pagination = () => {
  return (
    <div className="flex justify-end mt-4">
      <button className="border border-gray-300 text-gray-500 hover:bg-gray-200 px-3 py-1 rounded-l">
        &lt;
      </button>
      <span className="border-t border-b border-gray-300 text-gray-500 px-3 py-1">
        1
      </span>
      <button className="border border-gray-300 text-gray-500 hover:bg-gray-200 px-3 py-1 rounded-r">
        &gt;
      </button>
    </div>
  );
};

export default Pagination;