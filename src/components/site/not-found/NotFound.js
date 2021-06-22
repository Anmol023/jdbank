import React from 'react';

function NotFound() {
    return (
        <div className="container my-5">
            <div className="alert alert-danger text-center">
                <i className="material-icons">cancel</i> Bad Request! You are unauthorized to view this page.
            </div>
        </div>
    )
}

export default NotFound;