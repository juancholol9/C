import { useState, useEffect } from "react";
import api from "../api";
import Report from "../components/Report";
import "../styles/Home.css";

function Home() {
    const [reports, setReports] = useState([]);
    const [student, setStudent] = useState("");
    const [reason, setReason] = useState("");
    const [notes, setNotes] = useState("");
    const [signed, setSigned] = useState(false);

    useEffect(() => {
        getReports();
    }, []);

    const getReports = () => {
        api
            .get("/api/reports/")
            .then((res) => res.data)
            .then((data) => {
                setReports(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const deleteReport = (id) => {
        api
            .delete(`/api/reports/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Report deleted!");
                else alert("Failed to delete report.");
                getReports();
            })
            .catch((error) => alert(error));
    };

    const createReport = (e) => {
        e.preventDefault();
        api
            .post("/api/reports/", { student, reason, notes, signed })
            .then((res) => {
                if (res.status === 201) alert("Report created!");
                else alert("Failed to create report.");
                getReports();
            })
            .catch((err) => alert(err));
    };

    return (
        <div>
            <div>
                <h2>Reports</h2>
                {reports.map((report) => (
                    <Report report={report} onDelete={deleteReport} key={report.id} />
                ))}
            </div>
            <h2>Create a Report</h2>
            <form onSubmit={createReport}>
                <label htmlFor="student">Student:</label>
                <br />
                <input
                    type="text"
                    id="student"
                    name="student"
                    required
                    onChange={(e) => setStudent(e.target.value)}
                    value={student}
                />
                <br />
                <label htmlFor="reason">Reason:</label>
                <br />
                <input
                    type="text"
                    id="reason"
                    name="reason"
                    required
                    onChange={(e) => setReason(e.target.value)}
                    value={reason}
                />
                <br />
                <label htmlFor="notes">Notes to Parent:</label>
                <br />
                <textarea
                    id="notes"
                    name="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                ></textarea>
                <br />
                <label htmlFor="signed">Signed:</label>
                <input
                    type="checkbox"
                    id="signed"
                    name="signed"
                    checked={signed}
                    onChange={(e) => setSigned(e.target.checked)}
                />
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default Home;
