import Image from 'next/image'

export default function Logo() {
  return (
    <div className="flex items-center gap-2 mb-6">
      <Image
        src="/logo.jpg"
        alt="PipPal Logo"
        width={70}
        height={70}
        className="rounded-md"
      />
      <h2 className="text-3xl font-bold text-white">
        PipPal
      </h2>
    </div>
  )
}