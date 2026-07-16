# Mobile Money Payment Integration Guide
## Betting Addiction Support Malawi (BASM)

This document contains instructions for configuring, managing, testing, and developing the mobile money integrations for the BASM platform supporting Malawian Kwacha (MWK) payments via Airtel Money and TNM Mpamba.

---

## 1. Malawi Phone Number Formats
The system supports both Airtel Malawi and TNM Mpamba. The numbers must be normalized correctly to guarantee compatibility with carrier SMS/USSD gateways.

- **Country Prefix:** `265`
- **Carrier Prefixes:**
  - **Airtel Malawi:** `099`, `098`, `097` (or national `99`, `98`, `97` with 7 digits)
  - **TNM Mpamba:** `088`, `089` (or national `88`, `89` with 7 digits)
- **Normalization Routine:**
  - Converts numbers like `0995123456` into standard E.164 MSISDN representation format `265995123456`.

---

## 2. Airtel Money API Integration (Airtel Africa Open API)

### A. Registering Credentials
Airtel Money API integration is built on the official **Airtel Africa Open API v1 standard**. To obtain credentials:
1. Navigate to the [Airtel Africa Developer Portal](https://openapi.airtel.africa/).
2. Create an account and register your "Betting Addiction Support Malawi (BASM)" App.
3. Obtain your Sandbox Client ID and Client Secret.
4. Set the credentials in your backend environment variables:
   ```env
   AIRTEL_MONEY_BASE_URL=https://openapi.airtel.africa
   AIRTEL_MONEY_CLIENT_ID=your_client_id_here
   AIRTEL_MONEY_CLIENT_SECRET=your_client_secret_here
   ```

### B. Sandbox Mode and Live Modes
- **Sandbox URL:** `https://openapi-sandbox.airtel.africa`
- **Live URL:** `https://openapi.airtel.africa`

### C. Testing in Sandbox (Airtel)
For sandbox testing, use the following numbers to trigger specific response flows:
- `265991000001` - Triggers **Success** push payment response.
- `265991000002` - Triggers **Insufficient Funds** (`DP00900001002`) failure.
- `265991000006` - Triggers **Invalid Subscriber Number** (`DP00900001006`) failure.

---

## 3. TNM Mpamba Integration Status and Timeline

The TNM Mpamba carrier API requires custom manual requests to TNM Headquarters in Blantyre, Malawi, and is not available via an open self-service developer portal. 

### Current Status:
- The system includes a fully developed **Simulation and USSD Fallback Stub** in `tnmMpamba.js` to avoid blocking clinical deployments or testing.
- The interface strictly matches the Airtel API, returning correct transaction IDs and structured pending details.
- Proactive polling works out-of-the-box in development.

### USSD Dial String Sequence:
If the automated TNM push API fails, the user is presented with the standard Malawi USSD manual payment route:
1. Dial **`*444#`** on the TNM line.
2. Select Option **`5` (Pay Merchant)**.
3. Enter the **BASM Merchant Code** (e.g. `123456`).
4. Enter the Amount in **MWK** (e.g. `15000` for clinical session).
5. Enter the unique reference (e.g. `SES-XXXXXX`).
6. Enter Mpamba PIN to confirm.

---

## 4. Webhook Setup Instructions

To receive real-time status updates when a customer authorizes the transaction on their mobile handset:
1. Log in to your Airtel Africa Developer portal.
2. Set the Webhook/IPN URL pointing to your BASM server callback endpoint:
   - **Callback URL:** `https://api.yourdomain.org/api/payments/webhook`
3. The server processes these payload triggers inside the `paymentController.paymentWebhook` function, updating the database status of the corresponding `Payment` record and instantly unlocking clinical features or sessions.

---

## 5. Security Protocols
- **API Tokens:** Token auth credentials are cached locally in memory inside `airtelMoney.js` for efficiency and are automatically renewed upon expiry.
- **Sensitive Logs:** Never log plain text `Client Secret`, user `PIN` codes, or payment verification secrets.
