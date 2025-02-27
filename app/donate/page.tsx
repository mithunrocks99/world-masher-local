import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function DonatePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Support Us</h1>
      <p className="text-lg text-center mb-4">
        Scan the QR code below to donate and support World-Masher!
      </p>
      <Image
        src="/qr.png"
        alt="Donation QR Code"
        width={250}
        height={250}
        className="rounded-lg shadow-lg"
      />
      <Button className="mt-6 px-6 py-2 text-lg">
        Donate Now
      </Button>
    </div>
  );
}
