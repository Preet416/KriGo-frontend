import dynamic from "next/dynamic";

// Load the client-only Payment component
const PaymentPageClient = dynamic(() => import("./PaymentPageClient"), {
  ssr: false, // disables server-side rendering
});

export default function Page() {
  return <PaymentPageClient />;
}
