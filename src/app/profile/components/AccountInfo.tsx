interface Props {
  id: string
  role: string
}

export default function AccountInfo({
  id,
  role,
}: Props) {
  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-semibold">
        Account Information
      </h2>

      <div className="space-y-4">

        <div className="flex justify-between">
          <span className="text-gray-500">
            User ID
          </span>

          <span className="font-medium">
            {id}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">
            Role
          </span>

          <span className="rounded bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
            {role}
          </span>
        </div>

      </div>
    </section>
  )
}