import { useState } from 'react';

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
    <div className="mx-auto max-w-4xl bg-blue-50 p-6 text-blue-900">
      <div className="rounded-lg border border-blue-300 bg-blue-100 p-6 shadow-md">
        <h1 className="mb-4 text-3xl font-bold text-blue-700">Help Page</h1>
        <p className="mb-4">
          If you need assistance, please fill out the form below and we will get
          back to you as soon as possible.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-blue-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-blue-300 p-2"
              required
            />
          </div>
          <div>
            <label className="block text-blue-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-blue-300 p-2"
              required
            />
          </div>
          <div>
            <label className="block text-blue-700">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full rounded-lg border border-blue-300 p-2"
              required
            />
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
