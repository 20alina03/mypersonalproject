
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, Book, Map, Users } from "lucide-react";
import MainLayout from "@/components/layouts/MainLayout";
import JournalGrid from "@/components/journal/JournalGrid";
import InteractiveMap from "@/components/map/InteractiveMap";

const Index = () => {
  // Initial render assumes user is not logged in
  const isLoggedIn = false;

  const features = [
    {
      title: "Travel Journal",
      description: "Document your journeys with photos, stories, and memories.",
      icon: <Book className="h-8 w-8 text-atlas-teal" />,
      link: "/journal",
    },
    {
      title: "Interactive Map",
      description: "Track and showcase the places you've visited worldwide.",
      icon: <Map className="h-8 w-8 text-atlas-orange" />,
      link: "/map",
    },
    {
      title: "Connect with Travelers",
      description: "Find and connect with other travelers sharing your interests.",
      icon: <Users className="h-8 w-8 text-atlas-yellow" />,
      link: "/roammates",
    },
    {
      title: "Location-Based Memories",
      description: "Organize your memories and find experiences by location.",
      icon: <MapPin className="h-8 w-8 text-atlas-teal" />,
      link: "/memories",
    },
  ];

  if (isLoggedIn) {
    return (
      <MainLayout>
        <section className="container py-6 space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Your Travel Feed</h1>
              <p className="text-muted-foreground">
                Discover travel stories from people you follow
              </p>
            </div>
            <Button asChild>
              <Link to="/journal/new">
                Create New Journal Entry
              </Link>
            </Button>
          </div>

          <JournalGrid />
        </section>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="container py-12 md:py-24 lg:py-32 hero-pattern">
        <div className="flex flex-col items-center text-center space-y-4 animate-fade-in">
          <div className="rounded-full bg-atlas-teal/10 p-4 mb-4">
            <MapPin className="h-10 w-10 text-atlas-teal" />
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            Document Your Journey, Share Your <span className="text-atlas-teal">Adventures</span>
          </h1>
          
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8 mb-4">
            Atlas helps you capture your travel memories, connect with fellow explorers, 
            and discover new destinations through authentic experiences.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/register">
                Start Your Journey
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/about">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-12 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Your Ultimate Travel Companion</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Atlas combines the best of travel journaling, mapping, and social networking to create 
            a complete platform for travelers to document and share their experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card p-6 rounded-lg shadow-sm border transition-all hover:shadow-md animate-enter" 
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground mb-4">{feature.description}</p>
              <Button asChild variant="link" className="p-0">
                <Link to={feature.link}>
                  Learn more <span aria-hidden="true">→</span>
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Map Preview Section */}
      <section className="container py-12 md:py-24 bg-muted/30">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Track Your Global Adventures</h2>
            <p className="text-muted-foreground">
              Visualize your journey with an interactive map that shows all the places you've visited.
              Tag your journal entries with locations to build a visual representation of your travels.
            </p>
            <div className="flex flex-col sm:flex-row sm:gap-4 space-y-2 sm:space-y-0">
              <Button asChild>
                <Link to="/map">
                  Explore the Map
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/journal">
                  Browse Travel Journals
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="rounded-lg overflow-hidden shadow-lg">
            <InteractiveMap />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container py-12 md:py-24">
        <div className="rounded-lg bg-atlas-teal/10 p-8 md:p-12 shadow-sm">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center lg:text-left">
              <h2 className="text-3xl font-bold">Ready to Start Your Travel Journal?</h2>
              <p className="text-muted-foreground max-w-2xl">
                Join our community of passionate travelers and start documenting your adventures today.
                Share your experiences, connect with like-minded explorers, and discover new destinations.
              </p>
            </div>
            <Button asChild size="lg" className="bg-atlas-teal hover:bg-atlas-teal/90">
              <Link to="/register">
                Sign Up Now
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
