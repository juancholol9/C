import React from "react";
import "../styles/Note.css";

function Report({ report, onDelete }) {
    const formattedDate = new Date(report.created_at).toLocaleDateString("en-US");

    return (
        <div className="report-container">
            <p className="report-student"><strong>Student:</strong> {report.student}</p>
            <p className="report-reason"><strong>Reason:</strong> {report.reason}</p>
            {report.notes && (
                <p className="report-notes"><strong>Notes to Parent:</strong> {report.notes}</p>
            )}
            <p className="report-signed">
                <strong>Status:</strong> {report.signed ? "Signed" : "Not Signed"}
            </p>
            <p className="report-date"><strong>Date:</strong> {formattedDate}</p>
            <button className="delete-button" onClick={() => onDelete(report.id)}>
                Delete
            </button>
        </div>
    );
}

export default Report;
