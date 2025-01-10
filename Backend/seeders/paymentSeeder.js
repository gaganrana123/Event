import axios from 'axios'; // For HTTP requests
import crypto from 'crypto'; // For generating secure HMAC hashes
import Payment from '../model/paymentModel.js'; // Import your Payment schema

/**
 * Seed a payment and initiate a transaction with a payment gateway.
 *
 * @param {string} userId - The ID of the user making the payment.
 * @param {number} amount - The amount to be paid.
 * @param {string} paymentMethod - The selected payment method (e.g., Esewa).
 * @returns {Promise<Object>} - The result of the payment initialization.
 */
const seedPayment = async (userId, amount, paymentMethod) => {
  // Configuration for payment gateways
  const paymentConfigs = {
    Esewa: {
      paymentUrl: 'https://rc-epay.esewa.com.np/api/epay/main/v2/form', // Payment URL
      merchantId: 'EPAYTEST', // Merchant ID for eSewa
      successUrl: 'http://localhost:5173/payment-success', // Success redirection URL
      failureUrl: 'http://localhost:5173/payment-failure', // Failure redirection URL
      secret: '8gBm/:&EnhH.1/q', // Secret key for generating signatures
    },
    // Add additional payment gateways like PayPal, Khalti, etc., here.
  };

  // Check if the selected payment method is supported
  const selectedConfig = paymentConfigs[paymentMethod];
  if (!selectedConfig) {
    throw new Error(`Unsupported payment method: ${paymentMethod}`);
  }

  // Generate a unique transaction ID
  const transactionId = crypto.randomUUID();

  // Create a new payment record in the database
  const payment = new Payment({
    userId,
    amount,
    paymentMethod,
    transactionId,
    status: 'Pending',
  });

  try {
    // Save the payment record
    await payment.save();

    // Prepare the payment data for the request
    const paymentData = {
      amount,
      product_code: selectedConfig.merchantId,
      failure_url: selectedConfig.failureUrl,
      success_url: selectedConfig.successUrl,
      transaction_uuid: transactionId,
      total_amount: amount,
    };

    // Create the signature for the payment data
    const dataString = `total_amount=${amount},transaction_uuid=${transactionId},product_code=${selectedConfig.merchantId}`;
    const signature = crypto
      .createHmac('sha256', selectedConfig.secret)
      .update(dataString)
      .digest('base64');

    // Add the signature to the payment data
    paymentData.signature = signature;

    // Send the payment request to the gateway
    const response = await axios.post(selectedConfig.paymentUrl, null, {
      params: paymentData,
    });

    if (response.status === 200) {
      // If successful, return the payment ID and redirect URL
      return {
        success: true,
        paymentId: payment._id,
        redirectUrl: response.request.res.responseUrl,
      };
    } else {
      throw new Error('Failed to initiate payment.');
    }
  } catch (error) {
    // Update payment status to 'Failed' in case of errors
    payment.status = 'Failed';
    await payment.save();

    // Re-throw the error for the caller to handle
    throw error;
  }
};

export default seedPayment;
