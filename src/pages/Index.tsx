import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Zap, FileCheck, ArrowRight, CheckCircle } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "AI-Powered Compliance",
      description: "Advanced AI algorithms scan your content for regulatory compliance issues."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning Fast",
      description: "Get compliance reviews in minutes, not days or weeks."
    },
    {
      icon: <FileCheck className="h-6 w-6" />,
      title: "Multi-Format Support",
      description: "Support for images, videos, documents, and more file types."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="absolute inset-0 bg-gradient-glow" />
      
      {/* Header */}
      <header className="relative z-10 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-brand" />
              <span className="text-xl font-bold">GetCleared.ai</span>
            </div>
            <Button 
              onClick={() => navigate('/new-review')}
              variant="hero"
              className="shadow-brand"
            >
              Upload Content
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10">
        <section className="container mx-auto px-4 py-24 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-2">
              AI-Powered Compliance Platform
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-brand bg-clip-text text-transparent leading-tight">
              AI-powered compliance review for marketing content
            </h1>
            
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Upload your marketing materials and get instant AI-powered compliance analysis. 
              Identify potential issues before they become problems.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button 
                onClick={() => navigate('/new-review')}
                variant="hero"
                size="lg"
                className="text-lg px-8 py-6 h-auto shadow-glow"
              >
                Upload a File
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 h-auto">
                Learn More
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center justify-center space-x-8 text-muted-foreground">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>GDPR Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>SOC 2 Type II</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>99.9% Uptime</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose GetCleared.ai?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our platform combines cutting-edge AI with regulatory expertise to ensure your content meets all compliance requirements.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="p-8 shadow-card border-border bg-card/50 backdrop-blur-sm hover:shadow-glow transition-all duration-300 group">
                  <div className="text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-24">
          <Card className="p-12 shadow-card border-border bg-card/50 backdrop-blur-sm text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Upload your first file and see how GetCleared.ai can help ensure your marketing content meets all regulatory requirements.
            </p>
            <Button 
              onClick={() => navigate('/new-review')}
              variant="hero"
              size="lg"
              className="text-lg px-8 py-6 h-auto shadow-glow"
            >
              Start Free Analysis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Index;
