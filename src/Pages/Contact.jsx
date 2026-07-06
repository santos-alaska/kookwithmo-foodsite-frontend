import Header from "@/components/Header";
import heroBg from "@/assets/hero-bg.jpg";

const Contact = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Header />

        <main className="pt-32 pb-16 px-6">
          <div className="max-w-2xl mx-auto">
            <div className="glass-card rounded-3xl p-12 text-center">
              <h1 className="text-5xl font-serif mb-6 text-foreground tracking-wider">
                Contact Us
              </h1>
              <p className="text-foreground/90 text-lg">
                Get in touch with Kook and Mo for inquiries about our menu and meal plans.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Contact;
