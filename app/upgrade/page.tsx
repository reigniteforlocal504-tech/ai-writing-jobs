// app/upgrade/page.tsx

export default function UpgradePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">7-Day Exit Sprint</h1>
        <p className="text-2xl text-accent font-semibold mb-2">$97</p>
        <p className="text-gray-400">Land your first AI writing client in one week</p>
      </div>

      <div className="bg-card border border-accent rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6">What You Get:</h2>
        
        <ul className="space-y-4 mb-8">
          <li className="flex items-start gap-3">
            <span className="text-accent text-xl">✓</span>
            <div>
              <h3 className="font-semibold mb-1">Land your first AI writing client in 7 days</h3>
              <p className="text-gray-400 text-sm">Follow our proven daily action plan designed specifically for AI content writers</p>
            </div>
          </li>
          
          <li className="flex items-start gap-3">
            <span className="text-accent text-xl">✓</span>
            <div>
              <h3 className="font-semibold mb-1">Step-by-step daily tasks — no guessing</h3>
              <p className="text-gray-400 text-sm">Each day you'll know exactly what to do, how to do it, and why it matters</p>
            </div>
          </li>
          
          <li className="flex items-start gap-3">
            <span className="text-accent text-xl">✓</span>
            <div>
              <h3 className="font-semibold mb-1">Built on the SPEED System</h3>
              <p className="text-gray-400 text-sm">The same framework that's helped hundreds land their first paying client</p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="text-accent text-xl">✓</span>
            <div>
              <h3 className="font-semibold mb-1">Unlimited AI Prompt Access</h3>
              <p className="text-gray-400 text-sm">Full access to all our AI-powered application tools and templates</p>
            </div>
          </li>
        </ul>

        <a
          href="#"
          className="block w-full bg-accent text-black text-center font-bold text-lg px-8 py-4 rounded-lg hover:bg-[#00cc8e] transition-colors"
        >
          Get Started — $97
        </a>
      </div>

      <div className="text-center text-gray-400 text-sm">
        <p>30-day money-back guarantee. No questions asked.</p>
      </div>
    </div>
  );
}
