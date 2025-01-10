import axios from 'axios';
import { generateHmacSha256Hash, safeStringify } from '../utils/crypto.js';
import esewaConfig from '../config/esewaConfig.js';

/**
 * Controller to handle payment initiation
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const initiatePayment = async (req, res) => {
  const { amount, productId } = req.body;

  if (!amount || !productId) {
    return res.status(400).json({
      message: 'Amount and productId are required to initiate payment.',
    });
  }

  // Prepare payment data
  let paymentData = {
    amount,
    failure_url: esewaConfig.failureUrl,
    product_delivery_charge: "0",
    product_service_charge: "0",
    product_code: esewaConfig.merchantId,
    signed_field_names: "total_amount,transaction_uuid,product_code",
    success_url: esewaConfig.successUrl,
    tax_amount: "0",
    total_amount: amount,
    transaction_uuid: productId,
  };

  const dataString = `total_amount=${paymentData.total_amount},transaction_uuid=${paymentData.transaction_uuid},product_code=${paymentData.product_code}`;
  const signature = generateHmacSha256Hash(dataString, esewaConfig.secret);

  paymentData = { ...paymentData, signature };

  try {
    // Make the POST request to eSewa's API
    const response = await axios.post(esewaConfig.esewaPaymentUrl, null, {
      params: paymentData,
    });

    // Parse the response
    const parsedResponse = JSON.parse(safeStringify(response.data));

    if (response.status === 200) {
      return res.status(200).json({
        url: parsedResponse.request.res.responseUrl,
      });
    } else {
      return res.status(500).json({
        message: 'Failed to initiate payment with eSewa.',
        error: parsedResponse,
      });
    }
  } catch (error) {
    console.error('Error initiating payment:', error.message);
    return res.status(500).json({
      message: 'An error occurred while initiating the payment.',
      error: error.message,
    });
  }
};
