// components/JobDetailModal.tsx
import React from "react";
import { FaEnvelope, FaCalendarAlt, FaTimes } from "react-icons/fa";
import { Entry } from "@/utils/api";
interface JobDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Entry | null;
}

const JobDetailModal: React.FC<JobDetailModalProps> = ({
  isOpen,
  onClose,
  job,
}) => {
  if (!isOpen || !job) return null;

  const fieldLabels: { [key: string]: string } = {
    sender_email: "Sender Mail",
    created_at: "Created At",
    id: "ID",
    message_id: "Message ID",
    position: "Position",
    status: "Status",
    company: "Company",
    summary: "Summary",
    suggested_action: "AI Suggested Action",
    updated_at: "Updated At",
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[500px] relative">
        <div className="bg-gray-100 m-[-30px] p-4 rounded mb-4 relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
          >
            <FaTimes />
          </button>
          <h4 className="font-semibold text-gray-800 text-xl">{job.position}</h4>
          <p className="text-sm text-gray-600">{job.company}</p>
          <p className="text-xs text-gray-500 mt-1">Date: {job.created_at}</p>
        </div>

        <div className="mt-4 space-y-2">
          {Object.entries(job).map(([key, value]) => (
            <p key={key} className="text-sm text-gray-700">
              <strong>{fieldLabels[key] || key}:</strong> {value}
            </p>
          ))}
        </div>

        <div className="flex space-x-4 mt-6 justify-between">
          <button
            className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => {
              window.open(
                `https://mail.google.com/mail/u/0/#inbox/${job.message_id}`,
                "_blank"
              );
            }}
          >
            <FaEnvelope />
            <span>Open in Mail</span>
          </button>
          <button
            className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={() => {
              window.open(
                `https://calendar.google.com/calendar/r/eventedit?text=${job.position}&dates=${job.created_at}`,
                "_blank"
              );
            }}
          >
            <FaCalendarAlt />
            <span>Add to Calendar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailModal;
