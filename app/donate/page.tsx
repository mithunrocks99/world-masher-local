import Image from "next/image";

export default function DonatePage() {
  return (
    <div className="flex flex-col items-center min-h-screen p-6">
      <h1 className="text-4xl font-bold mb-6 text-white">Support Us with a Donation</h1>

      {/* ✅ QR Code Centered WITHOUT Changing Anything Else */}
      <div className="flex justify-center mt-6">
        <Image 
          src="/qr-code.png" 
          alt="QR Code" 
          width={200} 
          height={200} 
          className="border-4 border-white shadow-lg rounded-lg"
          priority
        />
      </div>

      <p className="mt-6 text-lg text-white">
        Scan the QR code to donate and support our platform!
      </p>
    </div>
  );
}
