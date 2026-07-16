import React, { useState, useEffect, useRef } from 'react';

/**
 * PaymentModal Component
 * 
 * A premium React modal component designed for Malawian Mobile Money (Airtel Money & TNM Mpamba).
 * Dynamically detects carriers using live user inputs (099, 098, 097 -> Airtel; 088, 089 -> TNM).
 * Manages push payments, polling, timeouts, and detailed manual USSD fallbacks.
 * 
 * @param {Object} props
 * @param {number} props.amount - Payment amount in MWK
 * @param {string} props.description - Payment description/context (e.g. Session Booking)
 * @param {function} props.onSuccess - Callback triggered with payment details on verification success
 * @param {function} props.onCancel - Callback triggered if modal is exited
 */
export default function PaymentModal({ amount, description, onSuccess, onCancel }) {
  const [step, setStep] = useState(1); // Steps: 1 = Input, 2 = Authorizing/Push instructions, 3 = Verifying/Spinner, 4 = Result (Success/Failure)
  const [phone, setPhone] = useState('');
  const [provider, setProvider] = useState(''); // 'airtel_money' or 'tnm_mpamba' or ''
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Transaction State
  const [transactionId, setTransactionId] = useState('');
  const [reference, setReference] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('pending'); // 'pending' | 'completed' | 'failed' | 'timeout'
  const [countdown, setCountdown] = useState(120); // 2-minute timeout countdown
  
  const pollIntervalRef = useRef(null);
  const timerRef = useRef(null);

  // Helper to format currency in MWK (Malawian Kwacha)
  const formatMWK = (value) => {
    return new Intl.NumberFormat('en-MW', {
      style: 'currency',
      currency: 'MWK',
      minimumFractionDigits: 0
    }).format(value).replace('MWK', 'MK'); // Standard Malawi format abbreviation
  };

  // Auto-detect carrier provider from Malawian phone numbers
  useEffect(() => {
    const clean = phone.replace(/\D/g, '');
    const nationalNumber = clean.length >= 9 ? clean.slice(-9) : clean;

    if (/^(99|98|97)/.test(nationalNumber)) {
      setProvider('airtel_money');
    } else if (/^(88|89)/.test(nationalNumber)) {
      setProvider('tnm_mpamba');
    } else {
      setProvider('');
    }
  }, [phone]);

  // Clean intervals and timers on unmount
  useEffect(() => {
    return () => {
      clearInterval(pollIntervalRef.current);
      clearInterval(timerRef.current);
    };
  }, []);

  // Initiate Push Payment
  const handleInitiatePayment = async (e) => {
    e.preventDefault();
    if (!provider) {
      setError('Please enter a valid Malawian Airtel (099, 098, 097) or TNM (088, 089) number.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Determine session/subscription payment route based on description
      const isSubscription = description.toLowerCase().includes('subscription');
      const endpoint = isSubscription ? '/api/payments/subscription' : '/api/payments/session';
      
      const payload = isSubscription 
        ? { phone, plan: 'premium' }
        : { phone, counsellorId: 'default-counsellor', sessionType: 'standard', scheduledAt: new Date().toISOString() };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('basm_token') || ''}`
        },
        body: JSON.stringify(payload)
      });

      const resData = await response.json();

      if (!response.ok || !resData.success) {
        throw new Error(resData.message || resData.error || 'Initiation failed');
      }

      // Transition states
      setTransactionId(resData.data.transactionId);
      setReference(resData.data.reference);
      setStep(2); // Go to payment instruction/approval page
      startCountdownTimer();

    } catch (err) {
      setError(err.message || 'Network error initiating mobile payment.');
    } finally {
      setLoading(false);
    }
  };

  // Start polling verification and Countdown timeout timer
  const startCountdownTimer = () => {
    // 1. Start Countdown decrement
    setCountdown(120);
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // 2. Start polling status checks every 5 seconds
    pollIntervalRef.current = setInterval(checkStatus, 5000);
  };

  // Check payment verification status with API backend
  const checkStatus = async () => {
    try {
      const endpointId = transactionId || reference;
      const response = await fetch(`/api/payments/${endpointId}/status`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('basm_token') || ''}`
        }
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        if (resData.status === 'completed') {
          resolvePayment('completed', resData);
        } else if (resData.status === 'failed') {
          resolvePayment('failed', resData);
        }
      }
    } catch (err) {
      console.warn('Error polling status:', err);
    }
  };

  // Resolves the pending status loop
  const resolvePayment = (finalStatus, details) => {
    clearInterval(pollIntervalRef.current);
    clearInterval(timerRef.current);
    setPaymentStatus(finalStatus);
    setStep(4); // Display success/failure screen

    if (finalStatus === 'completed' && onSuccess) {
      onSuccess(details);
    }
  };

  // Handle timeout after 2 minutes
  const handleTimeout = () => {
    clearInterval(pollIntervalRef.current);
    clearInterval(timerRef.current);
    setPaymentStatus('timeout');
    setStep(4);
  };

  const handleRetry = () => {
    clearInterval(pollIntervalRef.current);
    clearInterval(timerRef.current);
    setStep(1);
    setPaymentStatus('pending');
    setError('');
  };

  // Render Provider Badge/Tags
  const renderProviderBadge = () => {
    if (provider === 'airtel_money') {
      return (
        <span style={{ backgroundColor: '#E11900', color: '#FFF', padding: '4px 10px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>
          Airtel Money MW
        </span>
      );
    }
    if (provider === 'tnm_mpamba') {
      return (
        <span style={{ backgroundColor: '#0054A6', color: '#FFF', padding: '4px 10px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>
          TNM Mpamba
        </span>
      );
    }
    return null;
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.65)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 1000,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        backgroundColor: '#FFF', borderRadius: '12px', padding: '28px',
        width: '100%', maxWidth: '440px', boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
        position: 'relative'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: '#111' }}>Mobile Money Payment</h3>
          <button 
            onClick={onCancel}
            style={{ border: 'none', background: 'transparent', fontSize: '22px', cursor: 'pointer', color: '#999' }}
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {/* Amount Card */}
        <div style={{ backgroundColor: '#F5F7FA', padding: '16px', borderRadius: '8px', marginBottom: '24px', textAlign: 'center' }}>
          <span style={{ fontSize: '13px', color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Amount to Pay</span>
          <h2 style={{ margin: '4px 0 0 0', fontSize: '28px', color: '#27AE60', fontWeight: '800' }}>{formatMWK(amount)}</h2>
          <span style={{ fontSize: '12px', color: '#888' }}>{description}</span>
        </div>

        {/* STEP 1: Number Input and Carrier Auto-Detection */}
        {step === 1 && (
          <form onSubmit={handleInitiatePayment}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#333' }}>
                Malawian Mobile Money Number
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder="e.g. 0995123456 or 0888123456"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={loading}
                  style={{
                    width: '100%', padding: '12px 14px', borderRadius: '6px',
                    border: '1px solid #CCC', fontSize: '15px', outline: 'none'
                  }}
                  required
                />
                <div style={{ position: 'absolute', right: '10px' }}>
                  {renderProviderBadge()}
                </div>
              </div>
              <small style={{ display: 'block', color: '#666', marginTop: '6px', fontSize: '11px' }}>
                Supports Airtel Money (099, 098, 097) and TNM Mpamba (088, 089).
              </small>
            </div>

            {error && (
              <div style={{ color: '#C0392B', backgroundColor: '#FDEDEC', padding: '10px 14px', borderRadius: '6px', fontSize: '13px', marginBottom: '20px' }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !provider}
              style={{
                width: '100%', padding: '14px', backgroundColor: provider ? '#27AE60' : '#BDC3C7',
                color: '#FFF', border: 'none', borderRadius: '6px', fontWeight: 'bold',
                cursor: provider && !loading ? 'pointer' : 'not-allowed', fontSize: '15px',
                transition: 'background-color 0.2s'
              }}
            >
              {loading ? 'Initiating Transaction...' : 'Pay with Mobile Money'}
            </button>
          </form>
        )}

        {/* STEP 2: Mobile Money push instructions */}
        {step === 2 && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ margin: '20px 0' }}>
              <div className="spinner" style={{
                border: '4px solid #F3F3F3', borderTop: '4px solid #27AE60',
                borderRadius: '50%', width: '40px', height: '40px',
                animation: 'spin 1s linear infinite', margin: '0 auto 16px auto'
              }} />
              <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
              
              <h4 style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#333' }}>Authorize Payment Request</h4>
              
              <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.5' }}>
                A push payment request of <strong>{formatMWK(amount)}</strong> has been sent to your {provider === 'airtel_money' ? 'Airtel Money' : 'TNM Mpamba'} line at <strong>{phone}</strong>.
              </p>
              <p style={{ fontSize: '14px', color: '#27AE60', fontWeight: 'bold' }}>
                Please approve it on your phone prompt now.
              </p>
            </div>

            {/* USSD Fallback Block for TNM / general network failure */}
            <div style={{ backgroundColor: '#FFF9E6', border: '1px solid #FFE0B2', padding: '14px', borderRadius: '6px', textAlign: 'left', marginTop: '20px' }}>
              <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#E65100', display: 'block', marginBottom: '4px' }}>
                USSD MANUAL FALLBACK DIRECTIONS
              </span>
              <p style={{ margin: 0, fontSize: '12px', color: '#5D4037', lineHeight: '1.4' }}>
                {provider === 'tnm_mpamba' ? (
                  `Dial *444# on your TNM phone -> Select Pay Merchant -> Enter BASM Merchant Code -> Enter Amount ${formatMWK(amount)} -> Use Reference: ${reference}.`
                ) : (
                  `Dial *211# on your Airtel phone -> Select Pay Merchant -> Choose Airtel Money -> Enter Amount ${formatMWK(amount)} -> Use Reference: ${reference}.`
                )}
              </p>
            </div>

            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: '#777' }}>
                Waiting for prompt... <strong>{countdown}s</strong>
              </span>
              <button
                onClick={() => setStep(3)}
                style={{
                  padding: '8px 14px', backgroundColor: '#3498DB', color: '#FFF',
                  border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px'
                }}
              >
                Manually Verify
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Manual polling/Verifying stage */}
        {step === 3 && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{
              border: '4px solid #F3F3F3', borderTop: '4px solid #3498DB',
              borderRadius: '50%', width: '40px', height: '40px',
              animation: 'spin 1s linear infinite', margin: '0 auto 16px auto'
            }} />
            <h4 style={{ margin: '0 0 8px 0', color: '#333' }}>Verifying Transaction Status</h4>
            <p style={{ fontSize: '14px', color: '#666' }}>
              We are connecting with {provider === 'airtel_money' ? 'Airtel Money' : 'TNM Mpamba'} to verify your transaction reference:
            </p>
            <code style={{ display: 'block', backgroundColor: '#F1F1F1', padding: '6px', borderRadius: '4px', fontSize: '13px', margin: '12px 0' }}>
              {reference}
            </code>
            <button
              onClick={checkStatus}
              style={{
                padding: '8px 16px', backgroundColor: '#3498DB', color: '#FFF',
                border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold'
              }}
            >
              Force Status Check Now
            </button>
          </div>
        )}

        {/* STEP 4: Terminal screens (Success / Failure / Timeout) */}
        {step === 4 && (
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            {paymentStatus === 'completed' && (
              <div>
                <div style={{ fontSize: '50px', color: '#27AE60', marginBottom: '16px' }}>✓</div>
                <h3 style={{ margin: '0 0 10px 0', color: '#27AE60', fontSize: '22px' }}>Payment Complete!</h3>
                <p style={{ fontSize: '14px', color: '#555', margin: '0 0 20px 0' }}>
                  Your support booking / subscription is now fully active.
                </p>
                <div style={{ backgroundColor: '#F9F9F9', padding: '12px', borderRadius: '6px', fontSize: '12px', textAlign: 'left', color: '#555' }}>
                  <div><strong>Transaction ID:</strong> {transactionId || 'N/A'}</div>
                  <div style={{ marginTop: '4px' }}><strong>Reference:</strong> {reference}</div>
                  <div style={{ marginTop: '4px' }}><strong>Provider:</strong> {provider === 'airtel_money' ? 'Airtel Money' : 'TNM Mpamba'}</div>
                </div>
                <button
                  onClick={onCancel}
                  style={{
                    width: '100%', marginTop: '24px', padding: '12px', backgroundColor: '#27AE60',
                    color: '#FFF', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer'
                  }}
                >
                  Return to Dashboard
                </button>
              </div>
            )}

            {paymentStatus === 'failed' && (
              <div>
                <div style={{ fontSize: '50px', color: '#C0392B', marginBottom: '16px' }}>✗</div>
                <h3 style={{ margin: '0 0 10px 0', color: '#C0392B', fontSize: '22px' }}>Payment Failed</h3>
                <p style={{ fontSize: '14px', color: '#555', margin: '0 0 20px 0' }}>
                  The carrier rejected this transaction or experienced processing errors.
                </p>
                <button
                  onClick={handleRetry}
                  style={{
                    width: '100%', padding: '12px', backgroundColor: '#34495E',
                    color: '#FFF', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer'
                  }}
                >
                  Try Again
                </button>
              </div>
            )}

            {paymentStatus === 'timeout' && (
              <div>
                <div style={{ fontSize: '50px', color: '#F39C12', marginBottom: '16px' }}>⚠</div>
                <h3 style={{ margin: '0 0 10px 0', color: '#F39C12', fontSize: '20px' }}>Request Timed Out</h3>
                <p style={{ fontSize: '14px', color: '#555', margin: '0 0 20px 0' }}>
                  No authorization confirmation was received within the 2-minute safety window.
                </p>
                <div style={{ backgroundColor: '#F9F9F9', padding: '12px', borderRadius: '6px', fontSize: '12px', textAlign: 'left', color: '#555', marginBottom: '20px' }}>
                  <strong>Manual Action:</strong> If you dialed the USSD code on your phone and completed the transfer, click "Verify" below to poll final status.
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={handleRetry}
                    style={{
                      flex: 1, padding: '12px', backgroundColor: '#BDC3C7',
                      color: '#333', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer'
                    }}
                  >
                    Restart
                  </button>
                  <button
                    onClick={() => {
                      setStep(3);
                      checkStatus();
                    }}
                    style={{
                      flex: 1, padding: '12px', backgroundColor: '#3498DB',
                      color: '#FFF', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer'
                    }}
                  >
                    Verify
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
