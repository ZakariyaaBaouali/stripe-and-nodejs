export const createOrder = async (customer: any, data: any) => {
  //
  const paymentData = {
    id: data.customer,
    email: data.customer_details.email,
    name: data.customer_details.name,
    invoice_prefix: customer.invoice_prefix,
    userId: customer.metadata.userId,
    products: JSON.parse(customer.metadata.cart),
    paymentId: data.id,
    subTotal: data.amount_subtotal,
    total: data.amount_total,
    currency: data.currency,
    address: data.customer_details.address,
    payment_intent: data.payment_intent,
    payment_status: data.payment_status,
    status: data.status,
    payment_method_types: data.payment_method_types,
  };
  return paymentData;
};
