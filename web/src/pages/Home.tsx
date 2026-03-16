export function Home() {
  return (
    <>
      <section className="hero" aria-label="Business Link overview">
        <h1>Discover, compare, and connect—faster.</h1>
        <p>
          Business Link is a marketplace-style app that helps people and businesses find opportunities and services in
          one place—rental/lease listings, transport for hire, financial products, quick jobs, business directory,
          recommendations, vacancies, tenders, and smart shopping tools.
        </p>
        <div className="cta-row" role="group" aria-label="Quick links">
          <a className="btn primary" href="/privacy">
            Read the Privacy Policy
          </a>
          <a className="btn" href="/terms">
            Read the Terms of Service
          </a>
        </div>
      </section>

      <section className="grid" aria-label="Key features">
        <div className="card span6">
          <h2>Rentals &amp; property advertising</h2>
          <p>Discover properties available for rent/lease and connect with advertisers or agents.</p>
        </div>
        <div className="card span6">
          <h2>Transport for hire</h2>
          <p>Find vehicles for hire (short-distance, shuttles, or delivery needs) and reach out to providers.</p>
        </div>
        <div className="card span6">
          <h2>Finance product discovery</h2>
          <p>Compare financial products from multiple institutions (availability varies by region and partner).</p>
        </div>
        <div className="card span6">
          <h2>Jobs: quick gigs &amp; worker profiles</h2>
          <p>Create quick jobs for informal workers and explore simple skilled/unprofessional worker profiles.</p>
        </div>
        <div className="card span6">
          <h2>Business directory &amp; recommendations</h2>
          <p>Browse a directory of businesses and get recommendations for places and services you may like.</p>
        </div>
        <div className="card span6">
          <h2>Vacancies &amp; tenders</h2>
          <p>See advertised vacancies and tenders from available sources within the platform.</p>
        </div>
        <div className="card span12">
          <h2>Smart shopping views</h2>
          <p>Compare prices and build budgets using a digital shopping planner to support better decisions.</p>
        </div>
      </section>

      <section className="grid" aria-label="Phone verification note">
        <div className="split">
          <div className="card">
            <h2>Phone verification (Firebase)</h2>
            <p>
              Business Link can use phone number verification to protect accounts and reduce spam. When enabled, we may
              send one-time codes via SMS for sign-in and account security.
            </p>
            <ul>
              <li>We use your phone number for authentication and account safety.</li>
              <li>We don’t sell your personal information.</li>
              <li>See details in the Privacy Policy.</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}

