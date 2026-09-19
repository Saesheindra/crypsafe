import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Shield, ShoppingBag, Calendar, Menu, MessageCircle, CreditCard, Settings, Package, BookOpen, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import Logo from "./components/branding/Logo";
import { base44 } from "@/api/base44Client";

const navigationItems = [
  { title: "Home", url: createPageUrl("Home"), icon: Shield },
  { title: "Shop Tangem", url: createPageUrl("Shop"), icon: ShoppingBag },
  { title: "Shop OneKey", url: createPageUrl("OneKey"), icon: ShoppingBag },
  { title: "Shop Keystone", url: createPageUrl("Keystone"), icon: ShoppingBag },
  { title: "Compare Wallets", url: createPageUrl("Compare"), icon: Shield },
  { title: "Education", url: createPageUrl("Education"), icon: BookOpen },
  { title: "Safety Notice", url: createPageUrl("Safety"), icon: Shield },
  { title: "How to Pay", url: createPageUrl("Payment"), icon: CreditCard },
  { title: "About Us", url: createPageUrl("About"), icon: Users },
  { title: "Contact", url: createPageUrl("Contact"), icon: MessageCircle },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    base44.auth.me().then(setUser).catch(() => setUser(null));
  }, []);

  // Google Ads Tag
  React.useEffect(() => {
    // Add gtag.js script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=AW-17809681045';
    document.head.appendChild(script1);

    // Add gtag config script
    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'AW-17809681045');
    `;
    document.head.appendChild(script2);

    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);

  // Scroll to top when location changes
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // Update page title and meta tags
  React.useEffect(() => {
    const getPageMeta = () => {
      const baseTitle = "CrypSafe Malaysia";
      
      if (currentPageName === "Shop") {
        return {
          title: `Shop Tangem Wallets - ${baseTitle}`,
          description: "Buy authentic Tangem cold wallets in Malaysia. Official reseller with warranty, local support, and fast shipping. Secure your Bitcoin, Ethereum & crypto."
        };
      }
      
      if (currentPageName === "Booking") {
        return {
          title: `Book Crypto Consultation - ${baseTitle}`,
          description: "Expert guidance to safely transfer crypto from exchanges to your cold wallet. 1-on-1 consultation with local Malaysian crypto experts."
        };
      }

      if (currentPageName === "Payment") {
        return {
          title: `Secure Payment Options - ${baseTitle}`,
          description: "Multiple secure payment methods: Stripe (FPX/Card), Coinbase Commerce (Crypto), Shopee. Safe and trusted payment processing."
        };
      }

      if (currentPageName === "Education") {
        return {
          title: `Crypto Security Education - ${baseTitle}`,
          description: "Learn about cold wallets, blockchain technology, seed phrases, and crypto security best practices. Complete guide to protecting your digital assets."
        };
      }

      return {
        title: `${baseTitle} - Official Tangem Reseller | Secure Crypto Cold Wallets`,
        description: "Official Tangem reseller in Malaysia. Secure your crypto with cold wallets, expert consultation, and local support. Shop Tangem, OneKey & Keystone hardware wallets."
      };
    };

    const pageMeta = getPageMeta();
    document.title = pageMeta.title;
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = pageMeta.description;

    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.content = pageMeta.title;

    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (!ogDescription) {
      ogDescription = document.createElement('meta');
      ogDescription.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescription);
    }
    ogDescription.content = pageMeta.description;

  }, [currentPageName]);

  const isAdmin = user?.role === 'admin';

  return (
    <div className="min-h-screen bg-[#071018] text-[#e6fff5]">
      {/* Free Shipping Banner */}
      <div className="bg-gradient-to-r from-[#00ffc6] to-[#00d9a8] py-2 px-4 text-center">
        <p className="text-[#071018] text-sm md:text-base font-bold">
          🎉 <span className="animate-pulse">FREE SHIPPING</span> on All Orders Across Malaysia
        </p>
      </div>

      <style>{`
        :root {
          --primary: #00ffc6;
          --primary-dark: #00d9a8;
          --bg-dark: #071018;
          --bg-card: #0b2221;
          --text-primary: #e6fff5;
          --text-secondary: #bfeee0;
        }
        
        body {
          font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif;
          background: var(--bg-dark);
        }

        .glass-card {
          background: rgba(11, 34, 33, 0.6);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(0, 255, 198, 0.1);
        }

        .glow-effect {
          box-shadow: 0 0 30px rgba(0, 255, 198, 0.15);
        }

        .hero-gradient {
          background: linear-gradient(180deg, #071018 0%, #071a1d 100%);
        }
      `}</style>

      {/* Sticky Header */}
      <header className="sticky top-0 z-50 glass-card border-b border-[#00ffc6]/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to={createPageUrl("Home")}>
              <Logo size="default" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.url;
                return (
                  <Link
                    key={item.title}
                    to={item.url}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      isActive 
                        ? 'bg-[#00ffc6] text-[#071018] font-bold' 
                        : 'text-[#bfeee0] hover:text-[#00ffc6] hover:bg-[#0b2221]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.title}
                  </Link>
                );
              })}
              {isAdmin && (
                <>
                  <Link
                    to={createPageUrl("AdminOrders")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      location.pathname === createPageUrl("AdminOrders")
                        ? 'bg-[#00ffc6] text-[#071018] font-bold' 
                        : 'text-[#bfeee0] hover:text-[#00ffc6] hover:bg-[#0b2221]'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Orders
                  </Link>
                  <Link
                    to={createPageUrl("AdminShipping")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      location.pathname === createPageUrl("AdminShipping")
                        ? 'bg-[#00ffc6] text-[#071018] font-bold' 
                        : 'text-[#bfeee0] hover:text-[#00ffc6] hover:bg-[#0b2221]'
                    }`}
                  >
                    <Settings className="w-4 h-4" />
                    Shipping
                  </Link>
                  <Link
                    to={createPageUrl("AdminInventory")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      location.pathname === createPageUrl("AdminInventory")
                        ? 'bg-[#00ffc6] text-[#071018] font-bold' 
                        : 'text-[#bfeee0] hover:text-[#00ffc6] hover:bg-[#0b2221]'
                    }`}
                  >
                    <Package className="w-4 h-4" />
                    Inventory
                  </Link>

                  </>
                  )}
                  {user && (
                  <Link
                  to={createPageUrl("MyOrders")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    location.pathname === createPageUrl("MyOrders")
                      ? 'bg-[#00ffc6] text-[#071018] font-bold' 
                      : 'text-[#bfeee0] hover:text-[#00ffc6] hover:bg-[#0b2221]'
                  }`}
                  >
                  <Package className="w-4 h-4" />
                  My Orders
                  </Link>
                  )}
                  <a
                  href="https://wa.me/601166736549"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#25D366] text-white font-bold hover:bg-[#20ba5a] transition-all"
                  >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                  </a>
            </nav>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="w-6 h-6 text-[#00ffc6]" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-[#071018] border-[#00ffc6]/20">
                <div className="mt-8">
                  <Logo size="default" />
                </div>
                <nav className="flex flex-col gap-4 mt-8">
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.title}
                        to={item.url}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#bfeee0] hover:bg-[#0b2221] hover:text-[#00ffc6] transition-all"
                      >
                        <Icon className="w-5 h-5" />
                        {item.title}
                      </Link>
                    );
                  })}
                  {isAdmin && (
                    <>
                      <Link
                        to={createPageUrl("AdminOrders")}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#bfeee0] hover:bg-[#0b2221] hover:text-[#00ffc6] transition-all"
                      >
                        <ShoppingBag className="w-5 h-5" />
                        Orders
                      </Link>
                      <Link
                        to={createPageUrl("AdminShipping")}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#bfeee0] hover:bg-[#0b2221] hover:text-[#00ffc6] transition-all"
                      >
                        <Settings className="w-5 h-5" />
                        Shipping Manager
                      </Link>
                      <Link
                        to={createPageUrl("AdminInventory")}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#bfeee0] hover:bg-[#0b2221] hover:text-[#00ffc6] transition-all"
                      >
                        <Package className="w-5 h-5" />
                        Inventory Manager
                      </Link>

                      </>
                      )}
                      {user && (
                      <Link
                      to={createPageUrl("MyOrders")}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#bfeee0] hover:bg-[#0b2221] hover:text-[#00ffc6] transition-all"
                      >
                      <Package className="w-5 h-5" />
                      My Orders
                      </Link>
                      )}
                      <a
                      href="https://wa.me/601166736549"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#25D366] text-white font-bold"
                      >
                      <MessageCircle className="w-5 h-5" />
                      WhatsApp Support
                      </a>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-[calc(100vh-200px)]">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#00ffc6]/10 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="mb-4">
                <Logo size="default" />
              </div>
              <p className="text-sm text-[#bfeee0] mb-2">
                <strong className="text-[#00ffc6]">Official Tangem Reseller</strong>
              </p>
              <p className="text-sm text-[#bfeee0]">
                Authorized OneKey Reseller • Authorized Keystone Reseller • Educational resources • Secure checkout
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-white">Quick Links</h4>
              <div className="space-y-2">
                {navigationItems.map(item => (
                  <Link
                    key={item.title}
                    to={item.url}
                    className="block text-sm text-[#bfeee0] hover:text-[#00ffc6] transition-colors"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-white">Trust & Legal</h4>
              <div className="space-y-2 mb-4">
                <Link
                  to={createPageUrl("About")}
                  className="block text-sm text-[#bfeee0] hover:text-[#00ffc6] transition-colors"
                >
                  About Us
                </Link>
                <Link
                  to={createPageUrl("Contact")}
                  className="block text-sm text-[#bfeee0] hover:text-[#00ffc6] transition-colors"
                >
                  Contact Us
                </Link>
                <Link
                  to={createPageUrl("Legal")}
                  className="block text-sm text-[#bfeee0] hover:text-[#00ffc6] transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  to={createPageUrl("Legal")}
                  className="block text-sm text-[#bfeee0] hover:text-[#00ffc6] transition-colors"
                >
                  Terms of Service
                </Link>
                <Link
                  to={createPageUrl("Legal")}
                  className="block text-sm text-[#bfeee0] hover:text-[#00ffc6] transition-colors"
                >
                  Refund & Returns
                </Link>
              </div>
              <a
                href="https://shopee.com.my/harvin5979"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 rounded-lg bg-[#EE4D2D] hover:bg-[#d43d1f] text-white text-sm font-bold transition-all"
              >
                🛍️ Shop on Shopee
              </a>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-white">Contact</h4>
              <div className="space-y-2 mb-3">
                <p className="text-sm text-[#bfeee0]">
                  <strong className="text-white">Email:</strong> crypsafe.my@gmail.com
                </p>
                <p className="text-sm text-[#bfeee0]">
                  <strong className="text-white">WhatsApp:</strong> +60 11 6673 6549
                </p>
              </div>
              <a
                href="https://wa.me/601166736549"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 rounded-lg bg-[#25D366] text-white text-sm font-bold hover:bg-[#20ba5a] transition-all mb-3"
              >
                Chat Now
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-[#00ffc6]/10 text-center">
            <p className="text-sm text-[#bfeee0] mb-2">
              <strong className="text-white">CrypSafe</strong> - A brand of <strong className="text-white">SANDRIAR ENTERPRISE</strong>
            </p>
            <p className="text-xs text-[#bfeee0] mb-2">
              Authorized Tangem Reseller • Authorized OneKey Reseller • Authorized Keystone Reseller
            </p>
            <p className="text-xs text-[#bfeee0]">
              © {new Date().getFullYear()} All rights reserved (202103048249)
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/601166736549"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-lg hover:bg-[#20ba5a] hover:scale-110 transition-all duration-300 group"
        aria-label="Chat on WhatsApp"
      >
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7 fill-white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        {/* Tooltip */}
        <span className="absolute right-16 bg-[#071018] text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-[#00ffc6]/30">
          Chat with us!
        </span>
      </a>
    </div>
  );
}