'use client';

import { useEffect, useState } from 'react';

export function DebugInfo() {
  const [apiKey, setApiKey] = useState<string>('');
  const [projectId, setProjectId] = useState<string>('');

  useEffect(() => {
    setApiKey(process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY || '');
    setProjectId(process.env.NEXT_PUBLIC_PROJECT_ID || '');
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-lg text-xs max-w-xs">
      <h3 className="font-bold mb-2">Debug Info:</h3>
      <div className="space-y-1">
        <div>
          <strong>API Key:</strong> {apiKey ? `${apiKey.substring(0, 8)}...` : 'NOT SET'}
        </div>
        <div>
          <strong>Project ID:</strong> {projectId ? `${projectId.substring(0, 8)}...` : 'NOT SET'}
        </div>
        <div>
          <strong>Environment:</strong> {process.env.NODE_ENV}
        </div>
      </div>
    </div>
  );
}
