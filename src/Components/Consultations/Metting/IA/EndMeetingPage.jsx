import React from 'react';

const EndMeetingPage = () => {
    const handleRejoinMeeting = () => {
        window.history.back(); // Revenir en arrière dans l'historique de navigation
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl dark:text-white">
                You Left The Meeting! 
            </h1>
            <div style={{ marginTop: '20px' }}>
                <button
                    onClick={handleRejoinMeeting}
                    className="bg-transparent hover:bg-orange-500 text-orange-700 font-semibold hover:text-white py-2 px-4 border border-orange-500 hover:border-transparent rounded"
                    style={{ marginRight: '10px' }}
                >
                    Reintegrate The Meeting
                </button>
                <button
                    onClick={() => window.location.href = '/'}
                    className="bg-transparent hover:bg-orange-500 text-orange-700 font-semibold hover:text-white py-2 px-4 border border-orange-500 hover:border-transparent rounded"
                >
                    Go Back To Home Page
                </button>
            </div>
        </div>
    );
};

export default EndMeetingPage;
