interface Props {
  name: string
}

export default function ProfileInfo({ name }: Props) {
  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        Profile Information
      </h2>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="text-sm text-gray-500">
            Full Name
          </label>

          <input
            value={name}
            disabled
            className="mt-2 w-full rounded-lg border p-3 bg-gray-50"
          />
        </div>

        <div>
          <label className="text-sm text-gray-500">
            Email
          </label>

          <input
            value="Not Available"
            disabled
            className="mt-2 w-full rounded-lg border p-3 bg-gray-50"
          />
        </div>

        <div>
          <label className="text-sm text-gray-500">
            Phone
          </label>

          <input
            value="Not Available"
            disabled
            className="mt-2 w-full rounded-lg border p-3 bg-gray-50"
          />
        </div>
      </div>

      <button
        disabled
        className="mt-6 rounded-lg bg-gray-300 px-6 py-2 text-white"
      >
        Save Changes
      </button>
    </section>
  )
}