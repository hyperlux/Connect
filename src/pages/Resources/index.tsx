import React from 'react';
import { Book, FileText, Building2, Eye, Globe, ExternalLink, Scale, Shield, Users, Home, School, Zap, Bus, Heart, Umbrella, Info } from 'lucide-react';
import ResourceCard from './components/ResourceCard';
import ElectricityStats from './components/ElectricityStats';

const resourceCategories = [
  {
    title: "Community Services",
    items: [
      {
        title: "Bus Schedule",
        description: "Accessible Bus trips Time Table (Updated November 2021)",
        url: "/docs/bus-timetable-2021.pdf",
        icon: Bus
      },
      {
        title: "Mediation Service",
        description: "Information about AV Mediation Service",
        url: "/docs/mediation-service.pdf",
        icon: Heart
      },
      {
        title: "Eco Service",
        description: "Comprehensive information about Eco Service operations",
        url: "/docs/eco-service.pdf",
        icon: Globe
      },
      {
        title: "Support Network",
        description: "Support Network for alcohol addiction",
        url: "/docs/support-network.pdf",
        icon: Heart
      }
    ]
  },
  {
    title: "Health & Safety",
    items: [
      {
        title: "Snake Safety",
        description: "Information about the four poisonous snakes",
        url: "/docs/snake-safety.pdf",
        icon: Shield
      },
      {
        title: "Personal Care",
        description: "Personal Care preference form and guidelines",
        url: "/docs/personal-care.pdf",
        icon: Heart
      },
      {
        title: "Farewell Services",
        description: "Map to the Farewell House and related forms",
        url: "/docs/farewell-services.pdf",
        icon: Info
      }
    ]
  },
  {
    title: "Administrative Documents",
    items: [
      {
        title: "Grant Applications",
        description: "Project Coordination Group grant application formats",
        url: "/docs/grant-application.pdf",
        icon: FileText
      },
      {
        title: "FAMC Forms",
        description: "New units and activities application forms",
        url: "/docs/famc-forms.pdf",
        icon: FileText
      },
      {
        title: "Standing Orders",
        description: "L'Avenir and LCC Standing Orders",
        url: "/docs/standing-orders.pdf",
        icon: Scale
      }
    ]
  },
  {
    title: "Environmental Data",
    items: [
      {
        title: "Rain Data",
        description: "Rainfall statistics from 2006",
        url: "/docs/rain-data-2006.pdf",
        icon: Umbrella
      },
      {
        title: "Rainwater Harvesting",
        description: "Comprehensive report on rainwater harvesting",
        url: "/docs/rainwater-harvesting.pdf",
        icon: Umbrella
      }
    ]
  },
  {
    title: "Employment & Benefits",
    items: [
      {
        title: "Wages & Holidays",
        description: "Minimum wages and list of paid holidays",
        url: "/docs/wages-holidays-2015.pdf",
        icon: FileText
      },
      {
        title: "MT&D Programme",
        description: "Management Training & Development Programme 2010",
        url: "/docs/mtd-programme.pdf",
        icon: Users
      }
    ]
  },
  {
    title: "Historical Documents",
    items: [
      {
        title: "CIRHU Concept",
        description: "The CIRHU concept paper from 1999",
        url: "/docs/cirhu-1999.pdf",
        icon: Book
      },
      {
        title: "Organizational Structure",
        description: "Secretary's office organizational structure",
        url: "/docs/org-structure.pdf",
        icon: Building2
      }
    ]
  }
];

export default function Resources() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Community Resources</h1>
        <a
          href="/archives"
          className="text-auroville-primary hover:text-opacity-80 flex items-center gap-2"
        >
          <ExternalLink className="h-5 w-5" />
          <span>Archives</span>
        </a>
      </div>

      <div className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Electricity Consumption</h2>
        <ElectricityStats />
      </div>

      <div className="space-y-12">
        {resourceCategories.map((category) => (
          <div key={category.title}>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">{category.title}</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {category.items.map((item) => (
                <ResourceCard
                  key={item.title}
                  title={item.title}
                  description={item.description}
                  url={item.url}
                  icon={item.icon}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}