interface Address {
  _id: string
  name: string
  details: string
  city: string
  phone: string
}

interface Props {
  addresses: Address[]
  errorMessage?: string
}

export default function Addresses({
  addresses,
  errorMessage,
}: Props) {
  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-semibold">
        My Addresses
      </h2>

      {errorMessage ? (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {errorMessage}
        </p>
      ) : addresses.length === 0 ? (
        <p className="text-gray-500">
          No addresses found.
        </p>
      ) : (
        <div className="space-y-4">
          {addresses.map((address) => (
            <div
              key={address._id}
              className="rounded-lg border p-4"
            >
              <h3 className="font-semibold">
                {address.name}
              </h3>

              <p className="text-gray-600">
                {address.details}
              </p>

              <p className="text-gray-500">
                {address.city}
              </p>

              <p className="text-gray-500">
                {address.phone}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
