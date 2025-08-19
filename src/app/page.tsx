// app/page.tsx
import Image from "next/image";
import Link from "next/link";
import https from "https";
import Particles from "@/components/Particles";
import ThemeProvider from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";
import InteractiveElements from "@/components/InteractiveElements";

const FALLBACK_IMG = "https://via.placeholder.com/600x400.png?text=Image+Unavailable";

const checkImage = async (url: string) =>
  new Promise<boolean>((resolve) => {
    https
      .get(url, (res) => resolve(res.statusCode === 200))
      .on("error", () => resolve(false));
  });

export default async function Home() {
  const imgUrl = "https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/a2390567-d04c-4210-9c81-f693f14c5364.png";
  const isValid = await checkImage(imgUrl);
  const dashboardImage = isValid ? imgUrl : FALLBACK_IMG;

  return (
    <ThemeProvider>
      <Particles />
      <InteractiveElements />
      
      {/* Navigation */}
      <nav className="navbar" id="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <h2>Convex</h2>
            <span className="tagline">Where Leads Converge</span>
          </div>
          
          <ul className="nav-menu" id="nav-menu">
            <div className="nav-menu-links" id="nav-menu-links">
              <li><Link href="#features" className="nav-link">Features</Link></li>
              <li><Link href="#pricing" className="nav-link">Pricing</Link></li>
              <li><Link href="#faq" className="nav-link">FAQ</Link></li>
              <li><button className="btn btn--primary btn--sm">Start Free Trial</button></li>
            </div>
            
            <ThemeToggle />
          </ul>
          
          <button className="nav-toggle" id="nav-toggle" aria-label="Toggle navigation">
            <span className="hamburger"></span>
            <span className="hamburger"></span>
            <span className="hamburger"></span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="hero">
        <div
          className="hero-bg"
          style={{
            backgroundImage: "url('https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/8352916b-3239-426f-929f-08721fb4a692.png')",
          }}
        ></div>
        <div className="hero-content">
          <div className="container">
            <div className="hero-card">
              <h1 className="hero-title">Turn Conversations Into Revenue</h1>
              <p className="hero-subtitle">
                Convex automates inbound & outbound sales via AI on WhatsApp and
                voice calls. Never miss a lead again.
              </p>
              <form className="hero-form" id="email-form" method="POST" action="/api/subscribe">
                <div className="email-input-group">
                  <input
                    type="email"
                    id="hero-email"
                    name="email"
                    className="form-control email-input"
                    placeholder="Enter your work email"
                    required
                  />
                  <button type="submit" className="btn btn--primary">
                    Start Free Trial
                  </button>
                </div>
              </form>
              <p className="hero-note">
                14-day free trial • No credit card required
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="social-proof">
        <div className="container">
          <p className="social-proof-text">Trusted by 1000+ companies</p>
          <div className="social-logos">
            {["TechFlow Inc", "GrowthLab", "Innovate Co", "ScalePro", "FutureSync"].map((name) => (
              <div className="social-logo" key={name}>
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="container">
          <div className="features-header">
            <h2 className="section-title">AI Chat Automation That Actually Works</h2>
            <p className="section-subtitle">
              Handle unlimited conversations while your team focuses on closing deals
            </p>
          </div>
          <div className="features-grid">
            <div className="features-content">
              <div className="feature-card">
                <div className="feature-icon">🤖</div>
                <div className="feature-content">
                  <h3>AI Chat Automation</h3>
                  <p>Handle unlimited conversations across WhatsApp, phone, and web chat with intelligent AI agents.</p>
                </div>
              </div>
              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <div className="feature-content">
                  <h3>24/7 Lead Qualification</h3>
                  <p>Qualify prospects instantly while your team sleeps. Never lose another lead to slow response times.</p>
                </div>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔄</div>
                <div className="feature-content">
                  <h3>Smart CRM Sync</h3>
                  <p>Automatically sync qualified leads to your CRM with complete conversation history and sentiment analysis.</p>
                </div>
              </div>
            </div>
            <div className="features-image">
              <div className="dashboard-frame">
                <Image
                  src={dashboardImage}
                  alt="AI dashboard preview"
                  width={600}
                  height={400}
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGZpbHRlciBpZD0iYSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJ0dXJidWxlbmNlIiBhc3BlY3RSYXRpbz0iMSIgYmFzZUZyZXF1ZW5jeT0iMC41IiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiNlZWUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg=="
                  className="feature-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-icon">⚡</div>
              <h3>Connect Channels</h3>
              <p>Link WhatsApp Business and phone systems in minutes</p>
            </div>
            <div className="step-connector"></div>
            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-icon">🧠</div>
              <h3>Train Your AI</h3>
              <p>Describe your business and ideal customers</p>
            </div>
            <div className="step-connector"></div>
            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-icon">💰</div>
              <h3>Generate Revenue</h3>
              <p>Watch qualified leads flow into your CRM automatically</p>
            </div>
          </div>
        </div>
      </section>

      <section className="dashboard-preview">
        <div className="container">
          <h2 className="section-title">See Convex in Action</h2>
          <p className="section-subtitle">Real-time insights and conversation analytics</p>
          <div className="dashboard-showcase">
            <div className="stats-row">
              <div className="stat-card">
                <div className="stat-number">500K+</div>
                <div className="stat-label">Leads Processed</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">400%</div>
                <div className="stat-label">Avg Increase</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">&lt; 30s</div>
                <div className="stat-label">Response Time</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">What Our Customers Say</h2>
          <div className="testimonials-showcase"></div>
          <div className="testimonial-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p className="testimonial-quote">&quot;Convex increased our lead response rate by 400% and freed up 20 hours per week for our sales team.&quot;</p>
                <div className="testimonial-author">
                  <div className="author-avatar">SC</div>
                  <div className="author-info">
                    <h4>Sarah Chen</h4>
                    <p>VP Sales, TechFlow Inc</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p className="testimonial-quote">&quot;The AI understands our business perfectly. It&apos;s like having a sales rep that never sleeps.&quot;</p>
                <div className="testimonial-author">
                  <div className="author-avatar">MR</div>
                  <div className="author-info">
                    <h4>Michael Rodriguez</h4>
                    <p>Founder, GrowthLab</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p className="testimonial-quote">&quot;ROI was positive within the first month. Best investment we&apos;ve made in sales automation.&quot;</p>
                <div className="testimonial-author">
                  <div className="author-avatar">ET</div>
                  <div className="author-info">
                    <h4>Emma Thompson</h4>
                    <p>Marketing Director, Innovate Co</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pricing" id="pricing">
        <div className="pricing-showcase"></div>
        <div className="container">
          <h2 className="section-title">Simple, Transparent Pricing</h2>
          <p className="section-subtitle">Choose the perfect plan for your business</p>
          <div className="pricing-grid">
            <div className="pricing-card">
              <div className="pricing-header">
                <h3>Starter</h3>
                <div className="price">$49<span>/month</span></div>
                <p className="price-desc">Perfect for small teams</p>
              </div>
              <ul className="pricing-features">
                <li>Up to 500 conversations/month</li>
                <li>Basic AI responses</li>
                <li>Email support</li>
                <li>1 team member</li>
              </ul>
              <button className="btn btn--outline btn--full-width">Start Free Trial</button>
            </div>
            <div className="pricing-card featured">
              <div className="popular-badge">Most Popular</div>
              <div className="pricing-header">
                <h3>Growth</h3>
                <div className="price">$149<span>/month</span></div>
                <p className="price-desc">Best for growing businesses</p>
              </div>
              <ul className="pricing-features">
                <li>Up to 5,000 conversations/month</li>
                <li>Advanced AI with custom training</li>
                <li>CRM integrations</li>
                <li>Priority support</li>
                <li>Up to 5 team members</li>
              </ul>
              <button className="btn btn--primary btn--full-width">Start Free Trial</button>
            </div>
            <div className="pricing-card">
              <div className="pricing-header">
                <h3>Enterprise</h3>
                <div className="price">Custom<span>/month</span></div>
                <p className="price-desc">For large organizations</p>
              </div>
              <ul className="pricing-features">
                <li>Unlimited conversations</li>
                <li>Dedicated AI model</li>
                <li>Custom integrations</li>
                <li>Dedicated success manager</li>
                <li>Unlimited team members</li>
              </ul>
              <button className="btn btn--outline btn--full-width">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>

      <section className="faq" id="faq">
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-list">
            <div className="faq-item">
              <button className="faq-question" aria-expanded="false">
                <span>How quickly can I get started?</span>
                <span className="faq-icon">+</span>
              </button>
              <div className="faq-answer">
                <p>You can be up and running in under 10 minutes. Our guided setup wizard connects your channels and trains your AI with just a few clicks.</p>
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-question" aria-expanded="false">
                <span>Does the AI understand my specific business?</span>
                <span className="faq-icon">+</span>
              </button>
              <div className="faq-answer">
                <p>Yes! During setup, you provide details about your business, products, and ideal customers. Our AI learns your unique context and improves over time.</p>
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-question" aria-expanded="false">
                <span>What channels does Convex support?</span>
                <span className="faq-icon">+</span>
              </button>
              <div className="faq-answer">
                <p>We support WhatsApp Business, phone calls, web chat, and SMS. More channels are added regularly based on customer demand.</p>
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-question" aria-expanded="false">
                <span>Is there a free trial?</span>
                <span className="faq-icon">+</span>
              </button>
              <div className="faq-answer">
                <p>Yes! Try Convex free for 14 days with no credit card required. Experience the full platform and see results before you commit.</p>
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-question" aria-expanded="false">
                <span>How secure is my customer data?</span>
                <span className="faq-icon">+</span>
              </button>
              <div className="faq-answer">
                <p>We use bank-level encryption (AES-256) and are SOC 2 compliant. Your data is stored in secure AWS data centers with regular security audits.</p>
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-question" aria-expanded="false">
                <span>Can I cancel anytime?</span>
                <span className="faq-icon">+</span>
              </button>
              <div className="faq-answer">
                <p>Absolutely. Cancel your subscription anytime directly from your dashboard. No questions asked, no hidden fees.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="footer" id="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Convex</h3>
              <p>Turn conversations into customers with AI-powered sales automation that works 24/7.</p>
              <div className="social-links">
                <a href="#" target="_blank">Twitter</a>
                <a href="#" target="_blank">LinkedIn</a>
                <a href="#" target="_blank">GitHub</a>
              </div>
            </div>
            <div className="footer-section">
              <h4>Product</h4>
              <ul>
                <li><a href="#features">Features</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#">Documentation</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Company</h4>
              <ul>
                <li><a href="#" target="_blank">About</a></li>
                <li><a href="#" target="_blank">Careers</a></li>
                <li><a href="#" target="_blank">Contact</a></li>
                <li><a href="#" target="_blank">Blog</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Legal</h4>
              <ul>
                <li><a href="#" target="_blank">Privacy Policy</a></li>
                <li><a href="#" target="_blank">Terms of Service</a></li>
                <li><a href="#" target="_blank">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Convex AI. All rights reserved.</p>
            <div className="footer-stats">
              <span>SOC 2 Certified</span>
              <span>GDPR Compliant</span>
              <span>99.9% Uptime</span>
            </div>
          </div>
        </div>
      </footer>
    </ThemeProvider>
  );
}
