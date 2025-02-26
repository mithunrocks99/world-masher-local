import Image from "next/image";

export default function DonatePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5">
      <h1 className="text-3xl font-bold mb-4">Support Our Work</h1>
      <p className="text-lg mb-6">Scan the QR code below to donate:</p>

      {/* Display the QR Code from the public folder */}
      <Image
        src="/images/qr-code.png"
        alt="Donate QR Code"
        width={250}
        height={250}
      />

      <p className="text-md mt-4">Or visit: 
        <a href="https://your-donation-link.com" target="_blank" className="text-blue-500 underline ml-1">
          your-donation-link.com
        </a>
      </p>
    </div>
  );
}
