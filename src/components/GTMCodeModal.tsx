import React from 'react';
import { X, Code, ClipboardCopy, CheckCircle2 } from 'lucide-react';

interface GTMCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  containerId: string;
  subdomain: string;
}

export function GTMCodeModal({ isOpen, onClose, containerId, subdomain }: GTMCodeModalProps) {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const headCode = `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://${subdomain}/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${containerId}');</script>
<!-- End Google Tag Manager -->`;

  const bodyCode = `<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://${subdomain}/ns.html?id=${containerId}"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->`;

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-dark-200 rounded-lg w-full max-w-3xl">
        <div className="p-6 border-b border-dark-300 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Code className="w-6 h-6 text-primary-400" />
            <h2 className="text-2xl font-bold">Container Installation Code</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium">Head Section</h3>
              <button
                onClick={() => copyCode(headCode)}
                className="flex items-center space-x-2 text-sm text-primary-400 hover:text-primary-300 transition-colors"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <ClipboardCopy className="w-4 h-4" />
                    <span>Copy code</span>
                  </>
                )}
              </button>
            </div>
            <div className="bg-dark-300 p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
                <code className="text-gray-300">{headCode}</code>
              </pre>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium">Body Section</h3>
              <button
                onClick={() => copyCode(bodyCode)}
                className="flex items-center space-x-2 text-sm text-primary-400 hover:text-primary-300 transition-colors"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <ClipboardCopy className="w-4 h-4" />
                    <span>Copy code</span>
                  </>
                )}
              </button>
            </div>
            <div className="bg-dark-300 p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
                <code className="text-gray-300">{bodyCode}</code>
              </pre>
            </div>
          </div>

          <div className="bg-dark-400 p-4 rounded-lg">
            <p className="text-sm text-gray-400">
              Add the first code snippet to your <code className="text-xs bg-dark-300 px-1 py-0.5 rounded">&lt;head&gt;</code> tag, 
              and the second code snippet immediately after the opening <code className="text-xs bg-dark-300 px-1 py-0.5 rounded">&lt;body&gt;</code> tag.
              Your container is configured to use first-party data collection through {subdomain}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}