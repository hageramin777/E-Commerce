import Sidebar from "./components/Sidebar"
import ProfileInfo from "./components/ProfileInfo"
import AccountInfo from "./components/AccountInfo"
import ChangePasswordForm from "./components/ChangePasswordForm"
import Addresses from "./components/Addresses"
import { getCurrentUser } from "@/lib/auth"
import { getAddresses } from "@/services/address.action"

export default async function ProfilePage() {
  const user = await getCurrentUser()

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p>User not found</p>
      </main>
    )
  }

  const addressResponse = await getAddresses()
  const addresses = addressResponse.data ?? []
  const addressError = addressResponse.ok
    ? undefined
    : addressResponse.message

  return (
    <main className="min-h-screen bg-gray-100">

      {/* Header */}
      <section className="bg-emerald-600 py-12 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-4xl font-bold">My Account</h1>

          <p className="mt-2 text-emerald-100">
            Manage your profile and account settings
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto -mt-8 grid max-w-7xl gap-6 px-6 pb-12 lg:grid-cols-[260px_1fr]">

        <Sidebar />

        <div className="space-y-6">

          <ProfileInfo
            name={user.name}
          />

          <Addresses
            addresses={addresses}
            errorMessage={addressError}
          />

          <AccountInfo
            id={user.id}
            role={user.role}
          />

          <ChangePasswordForm />

        </div>

      </section>

    </main>
  )
}
