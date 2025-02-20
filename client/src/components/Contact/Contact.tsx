import React, { useState } from "react";
import axios, { AxiosError } from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoading) return;

    setIsLoading(true);
    setStatus("");

    try {
      console.log("Sending form data:", formData);

      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/send-message`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response from backend:", response.data);

      if (response.data.success) {
        setStatus("Your message has been sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Failed to send the message. Please try again.");
      }
    } catch (error) {
      console.error("Error sending message:", error);

      if (axios.isAxiosError(error)) {
        setStatus(
          `Error: ${
            error.response?.data?.message || "Failed to send the message."
          }`
        );
      } else if (error instanceof Error) {
        setStatus(`Error: ${error.message}`);
      } else {
        setStatus("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
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
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Send Message"}
        </button>
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
