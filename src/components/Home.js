import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

// Sample data for featured packages. In a real app, this would be fetched from an API.
const featuredPackages = [
  {
    id: 1,
    name: 'Himalayan Adventure',
    description: 'Trek to the base of the world\'s tallest peak.',
    imageUrl: 'https://img.freepik.com/premium-photo/climbers-summit-mount-everest-himalayas-nepal_1111504-923.jpg?w=2000'
  },
  {
    id: 2,
    name: 'Kerala Backwater Escape',
    description: 'Relax on a traditional houseboat cruise.',
    imageUrl: 'https://wallpaperaccess.com/full/5181071.jpg'
  },
  {
    id: 3, // Assuming a third package exists
    name: 'Seven Wonders of India Tour',
    description: 'Discover India’s most iconic monuments and architectural wonders.',
    imageUrl: 'https://th.bing.com/th/id/R.cd4e3222c4c377b6f5861122fa32d157?rik=RW7yHo0Fj9JoPw&riu=http%3a%2f%2fwallsdesk.com%2fwp-content%2fuploads%2f2016%2f05%2fTaj-Mahal-hd-wallpaper.jpg&ehk=G3E2taDiylVySeNhP6YFHCAX0%2b1uK0gLSVftckJzNDI%3d&risl=1&pid=ImgRaw&r=0'
  }
];

function Home() {
  return (
    <div className="home-page">
      {/* --- HERO SECTION --- */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Your Journey Begins Here</h1>
          <p>Discover and book amazing travel packages and hotels worldwide.</p>
          <Link to="/packages" className="hero-button">Explore Packages</Link>
        </div>
      </section>

      {/* --- FEATURED PACKAGES SECTION --- */}
      <section className="featured-section">
        <h2 className="section-title">Featured Travel Packages</h2>
        <div className="featured-grid">
          {featuredPackages.map(pkg => (
            <Link to={`/packages/${pkg.id}`} key={pkg.id} className="featured-card-link">
              <div className="featured-card">
                <img src={pkg.imageUrl} alt={pkg.name} className="featured-card-image" />
                <div className="featured-card-content">
                  <h3>{pkg.name}</h3>
                  <p>{pkg.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* --- WHY CHOOSE US SECTION --- */}
      <section className="why-us-section">
        <h2 className="section-title">Why TravelWise?</h2>
        <div className="why-us-grid">
          <div className="why-us-item">
            {/* AI Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect x="4" y="12" width="16" height="8" rx="2"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="M12 12v-2a2 2 0 0 0-2-2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            <h3>AI-Powered Planning</h3>
            <p>Get custom itineraries and local tips from our advanced AI assistant.</p>
          </div>
          <div className="why-us-item">
            {/* Secure Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            <h3>Secure Payments</h3>
            <p>Book with confidence using our secure, industry-leading payment system.</p>
          </div>
          <div className="why-us-item">
            {/* Support Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            <h3>24/7 Emergency Support</h3>
            <p>Our SOS feature and AI assistant are here to help you anytime, anywhere.</p>
          </div>
        </div>
      </section>

       {/* --- FINAL CTA SECTION --- */}
       <section className="cta-section">
            <h2>Ready to Plan Your Perfect Trip?</h2>
            <p>Use our AI Itinerary Planner to create a custom travel plan in seconds.</p>
            <Link to="/plan-trip" className="hero-button">Plan My Trip</Link>
       </section>

    </div>
  );
}

export default Home;
