'use client';
import PaymentWrapper from '../../components/Home/PaymentWrapper';

export default function TestPaymentPage() {
  return (
    <div className="p-10">
      <h1 className="text-3xl mb-4">Test Payment</h1>
      <PaymentWrapper
        amount={200}
        pickup="Some pickup"
        dropoff="Some dropoff"
        carType="Mini"
      />
    </div>
  );
}
