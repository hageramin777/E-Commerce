import logo from "@/assets/images/logo.png"
import {
  Camera,
  CreditCard,
  Mail,
  MapPin,
  Phone,
  Play,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const shopLinks = [
  { label: "All Products", href: "/Products" },
  { label: "Categories", href: "/categories" },
  { label: "Brands", href: "/brands" },
  { label: "Electronics", href: "/categories" },
  { label: "Men's Fashion", href: "/categories" },
  { label: "Women's Fashion", href: "/categories" },
]

const accountLinks = [
  { label: "My Account", href: "/profile" },
  { label: "Order History", href: "/orders" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "Shopping Cart", href: "/cart" },
  { label: "Sign In", href: "/login" },
  { label: "Create Account", href: "/login/signup" },
]

const supportLinks = [
  { label: "Contact Us", href: "#" },
  { label: "Help Center", href: "#" },
  { label: "Shipping Info", href: "#" },
  { label: "Returns & Refunds", href: "#" },
  { label: "Track Order", href: "/orders" },
]

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Cookie Policy", href: "#" },
]

interface FooterColumnProps {
  title: string
  links: Array<{ label: string; href: string }>
}

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h2 className="text-lg font-bold text-white">{title}</h2>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-slate-400 transition hover:text-emerald-400"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="mt-auto bg-[#0f1a2d] text-slate-400">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-9 md:grid-cols-2 xl:grid-cols-[1.8fr_repeat(4,1fr)]">
        <div>
          <div className="inline-flex rounded-lg bg-white px-4 py-2">
            <Image
              src={logo}
              alt="FreshCart"
              width={220}
              height={56}
              className="h-auto w-40"
            />
          </div>

          <p className="mt-5 max-w-lg text-sm leading-6">
            FreshCart is your one-stop destination for quality products.
            From fashion to electronics, we bring you the best brands at
            competitive prices with a seamless shopping experience.
          </p>

          <address className="mt-5 space-y-3 text-sm not-italic">
            <a
              href="tel:+18001234567"
              className="flex items-center gap-4 hover:text-emerald-400"
            >
              <Phone className="size-5 text-emerald-500" />
              +1 (800) 123-4567
            </a>
            <a
              href="mailto:support@freshcart.com"
              className="flex items-center gap-4 hover:text-emerald-400"
            >
              <Mail className="size-5 text-emerald-500" />
              support@freshcart.com
            </a>
            <p className="flex items-center gap-4">
              <MapPin className="size-5 shrink-0 text-emerald-500" />
              123 Commerce Street, New York, NY 10001
            </p>
          </address>

          <div className="mt-5 flex gap-3">
            <a
              href="#"
              aria-label="Facebook"
              className="flex size-9 items-center justify-center rounded-full bg-slate-800 text-lg font-bold transition hover:bg-emerald-600 hover:text-white"
            >
              f
            </a>
            <a
              href="#"
              aria-label="X"
              className="flex size-9 items-center justify-center rounded-full bg-slate-800 text-base transition hover:bg-emerald-600 hover:text-white"
            >
              𝕏
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="flex size-9 items-center justify-center rounded-full bg-slate-800 transition hover:bg-emerald-600 hover:text-white"
            >
              <Camera className="size-4" />
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="flex size-9 items-center justify-center rounded-full bg-slate-800 transition hover:bg-emerald-600 hover:text-white"
            >
              <Play className="size-4 fill-current" />
            </a>
          </div>
        </div>

        <FooterColumn title="Shop" links={shopLinks} />
        <FooterColumn title="Account" links={accountLinks} />
        <FooterColumn title="Support" links={supportLinks} />
        <FooterColumn title="Legal" links={legalLinks} />
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 text-sm md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} FreshCart. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-6">
            {["Visa", "Mastercard", "PayPal"].map((method) => (
              <span key={method} className="flex items-center gap-2">
                <CreditCard className="size-4" />
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
