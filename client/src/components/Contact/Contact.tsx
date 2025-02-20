import React, { useState } from "react";
import axios, { AxiosError } from "axios"; // Import AxiosError for type checking

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(""); // Status for success/error message
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoading) return; // Prevent multiple submissions

    setIsLoading(true); // Set loading state to true
    setStatus(""); // Clear previous status

    try {
      console.log("Sending form data:", formData); // Log form data for debugging

      const response = await axios.post(
        "http://localhost:5000/send-message",
        formData,
        {
          headers: {
            "Content-Type": "application/json", // Ensure JSON content type
          },
        }
      );

      console.log("Response from backend:", response.data); // Log response for debugging

      if (response.data.success) {
        setStatus("Your message has been sent successfully!");
        setFormData({ name: "", email: "", message: "" }); // Clear form fields
      } else {
        setStatus("Failed to send the message. Please try again.");
      }
    } catch (error) {
      console.error("Error sending message:", error);

      // Type-check the error object
      if (axios.isAxiosError(error)) {
        // Handle Axios-specific errors
        setStatus(
          `Error: ${
            error.response?.data?.message || "Failed to send the message."
          }`
        );
      } else if (error instanceof Error) {
        // Handle generic errors
        setStatus(`Error: ${error.message}`);
      } else {
        // Handle unknown errors
        setStatus("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <section
      id="contact"
      className="h-screen flex flex-col justify-center items-center bg-gray-950 text-white"
    >
      <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
        Contact
      </h2>
      <form
        onSubmit={handleSubmit}
        className="mt-8 w-full max-w-2xl bg-gray-800/50 p-8 rounded-lg shadow-lg"
      >
        <div className="mb-6">
          <label htmlFor="name" className="block text-gray-300 mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="message" className="block text-gray-300 mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-blue-500"
            rows={5}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? "Sending..." : "Send Message"}
        </button>
        {/* Display Status Message */}
        {status && (
          <div
            className={`mt-4 text-center text-lg ${
              status.includes("successfully")
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            <p>{status}</p>
          </div>
        )}
      </form>
    </section>
  );
};

export default Contact;
