import {
  MapPin,
  Settings,
  UserRound,
  Plus,
} from "lucide-react"
import Link from "next/link"
import { getAddresses } from "@/services/address.action"
import DeleteAddressButton from "./DeleteAddressButton"

export default async function AddressesPage() {
  const result = await getAddresses()
  const addresses = result.data

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Header */}
      <section className="bg-emerald-600 text-white px-8 py-10">
        <div className="max-w-6xl mx-auto">

          <div className="flex items-center gap-2 text-sm opacity-90">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>My Account</span>
          </div>


          <div className="flex items-center gap-4 mt-5">
            <div className="size-14 rounded-full bg-white/20 flex items-center justify-center">
              <UserRound className="size-7" />
            </div>

            <div>
              <h1 className="text-3xl font-bold">
                My Account
              </h1>

              <p className="text-sm text-emerald-100">
                Manage your addresses and account settings
              </p>
            </div>

          </div>

        </div>
      </section>


      <section className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-4 gap-8">


        {/* Sidebar */}

        <aside className="bg-white rounded-xl border p-4 h-fit">

          <Link
            href="/profile/addresses"
            className="
            flex items-center gap-3
            bg-emerald-100
            text-emerald-700
            rounded-lg
            px-4 py-3
            font-medium
            "
          >
            <MapPin className="size-5" />
            My Addresses
          </Link>


          <Link
            href="/profile"
            className="
            flex items-center gap-3
            px-4 py-3
            mt-2
            rounded-lg
            hover:bg-gray-100
            "
          >
            <Settings className="size-5" />
            Settings
          </Link>


        </aside>



        {/* Content */}

        <div className="md:col-span-3">


          <div className="flex items-center justify-between mb-6">

            <div>
              <h2 className="text-2xl font-bold">
                My Addresses
              </h2>

              <p className="text-gray-500 text-sm">
                Manage your saved delivery addresses
              </p>
            </div>



            <Link
              href="/profile/addresses/add"
              className="
              flex items-center gap-2
              bg-emerald-600
              hover:bg-emerald-700
              text-white
              px-5 py-2.5
              rounded-lg
              font-semibold
              "
            >

              <Plus className="size-5" />

              Add Address

            </Link>


          </div>



          {/* Address Card */}

          {addresses.length > 0 ? (

            addresses.map((address)=>(
              
              <div
                key={address._id}
                className="
                bg-white
                border
                rounded-xl
                p-6
                flex
                justify-between
                items-center
                mb-4
                "
              >

                <div className="flex gap-4">

                  <div
                    className="
                    size-12
                    rounded-full
                    bg-emerald-100
                    text-emerald-600
                    flex
                    items-center
                    justify-center
                    "
                  >
                    <MapPin />
                  </div>


                  <div>

                    <h3 className="font-bold text-lg">
                      {address.name}
                    </h3>

                    <p className="mt-1 text-gray-600">
                      {address.details}
                    </p>

                    <p className="mt-1 text-gray-500">
                      {address.city}
                    </p>

                    <p className="text-gray-500 mt-1">
                      Phone: {address.phone}
                    </p>


                  </div>

                </div>



                <div className="flex gap-3">

                  <DeleteAddressButton id={address._id} />


                </div>


              </div>

            ))

          ) : !result.ok ? (

            <div className="
            bg-red-50
            border border-red-200
            rounded-xl
            p-6
            text-center
            text-red-600
            ">
              {result.message ?? "Unable to load addresses"}
            </div>

          ) : (

            <div className="
            bg-white
            border
            rounded-xl
            p-10
            text-center
            text-gray-500
            ">
              No addresses found
            </div>

          )}


        </div>


      </section>


    </main>
  )
}
