import { redirect } from "next/navigation"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function OldProductPage({ params }: PageProps) {
  const { id } = await params
  redirect(`/Products/${id}`)
}
