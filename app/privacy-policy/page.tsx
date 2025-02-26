export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-center mb-8">
          Liberum Browser Extension Privacy Policy
        </h1>

        <div className="text-sm text-muted-foreground">
          <strong>Last Updated:</strong> 26th February 2025
        </div>

        <p>
          Liberum is a browser extension that enables users to resolve and
          access .lib domains. We prioritize user privacy and collect only the
          minimal data required for the extension to function properly.
        </p>

        <section>
          <h2 className="text-xl font-semibold mb-3">1. Data Collected</h2>
          <p>The Liberum extension may collect the following data:</p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              <strong>Browsing History:</strong> Required to detect visits to
              .lib domains and perform necessary redirections.
            </li>
            <li>
              <strong>User Activity:</strong> Necessary for detecting searches
              containing .lib domains and ensuring accurate navigation.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. Use of Data</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Liberum uses collected data solely for detecting .lib domain
              requests and performing domain resolution.
            </li>
            <li>
              <strong>
                No personal data is stored, shared, or analyzed by third
                parties.
              </strong>
            </li>
            <li>
              Data is processed locally within the browser and is not
              transmitted to any external servers.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            3. Third-Party Services
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              The extension interacts with{" "}
              <strong>blockchain smart contracts</strong> to retrieve .lib
              domain content.
            </li>
            <li>
              <strong>
                No data is transmitted to external servers or centralized
                databases.
              </strong>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. User Rights</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Users can uninstall the extension at any time from their browser
              settings.
            </li>
            <li>
              The extension operates entirely within the browser and does not
              store any personal information.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            5. Permissions and Security
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Browsing history and user activity permissions</strong>{" "}
              are required only for .lib domain detection and processing.
            </li>
            <li>
              The extension does not access third-party sites or transmit data
              outside the browser.
            </li>
          </ul>
        </section>

        <div className="mt-12 text-center text-muted-foreground">
          For any questions regarding this privacy policy, please contact us at
          <a href="mailto:h.kutay.1@gmail.com"> h.kutay.1@gmail.com</a>.
        </div>
      </div>
    </div>
  );
}
