import React from 'react';

function FormattedDate({ dateStr }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);

        // Format date and time separately
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        const formattedTime = date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });

        // Combine formatted date and time
        return `${formattedDate} at ${formattedTime}`;
    };

    return <span>{formatDate(dateStr)}</span>;
}

export default FormattedDate;