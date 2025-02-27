"use client"; // This makes the file a client component

export default function DonatePage() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-yellow-300">Support World-Masher</h1>
      <p className="text-lg mt-4">Anything between Rs 1/- and Rs 1 crore/- is gladly accepted 😊</p>
      
      <div className="flex justify-center mt-6">
        <img src="/qr-code.png" alt="QR Code" className="w-40 h-40 border-4 border-white shadow-lg" />
      </div>
      
      <p className="mt-6 text-lg">Scan the QR code to donate and support our platform!</p>
    </div>
  );
}
