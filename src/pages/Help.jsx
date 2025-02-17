import { useState } from 'react';
import InputField from '../components/form/InputField';

export default function HelpPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = `mailto:rahmetovedil@gmail.com?subject=Help Request&body=Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0AMessage: ${formData.message}`;
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-6 text-blue-900">
      <div className="w-full max-w-2xl rounded-lg border border-blue-300 bg-blue-100 bg-white p-6 shadow-md">
        <h1 className="mb-4 text-3xl font-bold text-blue-700">Help Page</h1>
        <p className="mb-4">
          If you need assistance, please fill out the form below and we will get
          back to you as soon as possible.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            id="name"
            name="name"
            type="text"
            label="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <InputField
            id="email"
            name="email"
            type="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {/* <InputField
            id="message"
            name="message"
            type="text"
            label="Message"
            value={formData.message}
            onChange={handleChange}
            required
          /> */}

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              className="mt-1 w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="cursor-pointer rounded-lg bg-blue-700 px-4 py-2 text-white"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
