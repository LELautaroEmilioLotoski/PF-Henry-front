import { CommentsFormProps } from "@/interfaces/Types";
import React from "react";

const CommentsForm: React.FC<CommentsFormProps> = ({ comments, handleChange }) => (
  <div>
    <label htmlFor="comments" className="block text-sm font-medium text-black mb-1">Additional Comments</label>
    <textarea
      id="comments"
      name="comments"
      rows={3}
      value={comments}
      onChange={handleChange}
      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
      placeholder="Add any special instructions for your order..."
    />
  </div>
);

export default CommentsForm;
