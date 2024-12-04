export default function ContactForm() {
  return (
    <form className="max-sm:max-w-lg max-sm:mx-auto max-sm:p-4 shadow-md">
      <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
        <div>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full p-3 border border-gray-300 rounded-md text-sm md:text-base"
            placeholder="Nama"
          />
        </div>
        <div>
          <input
            type="text"
            id="wa"
            name="wa"
            className="w-full p-3 border border-gray-300 rounded-md text-sm md:text-base"
            placeholder="No WA"
          />
        </div>
      </div>
      <div className="mb-4">
        <input
          type="text"
          id="subject"
          name="subject"
          className="w-full p-3 border border-gray-300 rounded-md text-sm md:text-base"
          placeholder="Subjek"
        />
      </div>
      <div className="mb-4">
        <textarea
          id="message"
          name="message"
          className="w-full p-3 border border-gray-300 rounded-md text-sm md:text-base"
          placeholder="Pesan"
          rows={5}
        ></textarea>
      </div>
      <div>
        <button
          type="submit"
          className="w-full bg-gray-400 text-gray-700 p-3 rounded-md hover:bg-gray-300 transition"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
