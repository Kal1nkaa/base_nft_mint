'use client';

import { useEffect, useState } from 'react';

export function ApiKeyValidator() {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateApiKey = async () => {
      const apiKey = process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY;
      
      if (!apiKey) {
        setIsValid(false);
        setLoading(false);
        return;
      }

      try {
        // Test the API key by making a simple request
        const response = await fetch(`https://api.developer.coinbase.com/rpc/v1/ethereum/${apiKey}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            jsonrpc: '2.0',
            method: 'eth_blockNumber',
            params: [],
            id: 1
          })
        });

        if (response.ok) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      } catch (error) {
        console.error('API Key validation error:', error);
        setIsValid(false);
      } finally {
        setLoading(false);
      }
    };

    validateApiKey();
  }, []);

  if (loading) {
    return (
      <div className="fixed top-4 right-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
        Validating API key...
      </div>
    );
  }

  if (!isValid) {
    return (
      <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-sm">
        <strong>API Key Issue:</strong> Your OnchainKit API key appears to be invalid or expired. 
        Please check your .env.local file and get a new key from the Coinbase Developer Platform.
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
      ✅ API Key is valid
    </div>
  );
}
