import React from 'react';
import { Plus } from 'lucide-react';

export default function NewListingButton() {
  return (
    <button className="flex items-center gap-2 px-4 py-2 bg-auroville-primary text-white rounded-lg hover:bg-opacity-90 transition-colors">
      <Plus className="h-5 w-5" />
      <span>New Listing</span>
    </button>
  );
}