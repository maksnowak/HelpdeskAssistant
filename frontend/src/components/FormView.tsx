import type { FormData } from "../App";

function FormView({ data }: { data: FormData }) {
    return (
        <div className="border-l p-4 overflow-y-auto h-full">
            <h2 className="text-xl font-bold mb-4">Form Data</h2>
            <div className="flex flex-col space-y-2">
                <div>
                    <strong>First Name:</strong> {data.firstname}
                </div>
                <div>
                    <strong>Last Name:</strong> {data.lastname}
                </div>
                <div>
                    <strong>Email:</strong> {data.email}
                </div>
                <div>
                    <strong>Reason of Contact:</strong> {data.reason_of_contact}
                </div>
                <div>
                    <strong>Urgency:</strong> {data.urgency}
                </div>
            </div>
            <h4 className="text-lg font-bold mt-4">JSON output</h4>
            <div className="p-4 rounded">
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
        </div>
    );
}

export default FormView;