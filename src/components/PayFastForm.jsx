const PayFastForm = () => {
    return (
      <form method="POST" action="https://sandbox.payfast.co.za/eng/process">
        <input type="hidden" name="merchant_id" value="10038381" />
        <input type="hidden" name="merchant_key" value="77b7ymosd26te" />
  
        <input type="hidden" name="return_url" value="http://localhost:5173/donation/success" />
        <input type="hidden" name="cancel_url" value="http://localhost:5173/donation/cancel" />
        <input type="hidden" name="notify_url" value="http://localhost:8000/api/v1/payfast/webhook" />
  
        <input type="hidden" name="amount" value="10000.00" />
        <input type="hidden" name="item_name" value="Zakat Donation" />
        <input type="hidden" name="item_description" value="Some Description" />
        <input type="hidden" name="m_payment_id" value={`donation-${Date.now()}`} />
  
        <input type="hidden" name="custom_str1" value="Zakat" />
        <input type="hidden" name="custom_str2" value="Kutiyana-Memon-Hospital" />
        <input type="hidden" name="custom_int1" value="6801eb17f469ab4eb2d86c4f" />
        <input type="hidden" name="currency" value="ZAR" />
  
        <input type="hidden" name="email_address" value="admin@gmail.com" />
  
        <button type="submit">Pay Now</button>
      </form>
    );
  };
  
  export default PayFastForm;
  