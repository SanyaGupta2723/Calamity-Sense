"use client";

export default function ReportPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">
          Report Disaster
        </h1>

        <form className="space-y-5">

          <div>
            <label className="block mb-2 font-medium">
              Title
            </label>

            <input
              type="text"
              className="w-full border rounded-lg p-3"
              placeholder="Flood Near SRMU"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
              rows={4}
              className="w-full border rounded-lg p-3"
              placeholder="Describe the disaster..."
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Disaster Type
            </label>

            <select className="w-full border rounded-lg p-3">
              <option>Select Disaster</option>
              <option>Flood</option>
              <option>Earthquake</option>
              <option>Cyclone</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Severity
            </label>

            <select className="w-full border rounded-lg p-3">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Address
            </label>

            <input
              type="text"
              className="w-full border rounded-lg p-3"
              placeholder="Lucknow, Uttar Pradesh"
            />
          </div>

          <button
            className="bg-black text-white w-full py-3 rounded-lg hover:bg-gray-800"
          >
            Submit Report
          </button>

        </form>
      </div>
    </div>
  );
}