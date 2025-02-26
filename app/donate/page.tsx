import Image from "next/image";

export default function DonatePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Support World Masher</h1>
      <p className="text-lg text-gray-700 mb-6">
        Help us keep the content flowing! Scan the QR code below to donate.
      </p>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <Image
          src="/qr-code.png" // Replace with your actual QR code image
          alt="Donate via QR Code"
          width={200}
          height={200}
        />
      </div>
      <p className="text-gray-600 mt-4">Thank you for your support! 🚀</p>
    </div>
  );
}
