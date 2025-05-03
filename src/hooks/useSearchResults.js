
import { useState, useEffect } from 'react';
import { journalEntries, users, popularTags, popularLocations } from '@/utils/mockData';
import { format } from 'date-fns';

const useSearchResults = (searchQuery, filters) => {
  const [results, setResults] = useState({ entries: [], users: [], tags: [], locations: [] });
  
  useEffect(() => {
    if (!searchQuery) {
      setResults({ entries: [], users: [], tags: [], locations: [] });
      return;
    }
    
    const lowercaseQuery = searchQuery.toLowerCase();
    
    // Filter journal entries
    let filteredEntries = journalEntries.filter(entry => 
      entry.title.toLowerCase().includes(lowercaseQuery) || 
      entry.location.toLowerCase().includes(lowercaseQuery) ||
      entry.content.toLowerCase().includes(lowercaseQuery) ||
      entry.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
    
    // Apply additional filters if any
    if (filters.date) {
      filteredEntries = filteredEntries.filter(entry => 
        format(entry.date, 'yyyy-MM') === filters.date
      );
    }
    
    if (filters.tags.length > 0) {
      filteredEntries = filteredEntries.filter(entry => 
        filters.tags.some(tag => entry.tags.includes(tag))
      );
    }
    
    // Filter users
    const filteredUsers = users.filter(user => 
      user.name.toLowerCase().includes(lowercaseQuery) || 
      user.username.toLowerCase().includes(lowercaseQuery) ||
      user.bio?.toLowerCase().includes(lowercaseQuery)
    );
    
    // Filter tags
    const filteredTags = popularTags.filter(tag => 
      tag.name.toLowerCase().includes(lowercaseQuery)
    );
    
    // Filter locations
    const filteredLocations = popularLocations.filter(location => 
      location.name.toLowerCase().includes(lowercaseQuery)
    );
    
    setResults({ 
      entries: filteredEntries, 
      users: filteredUsers, 
      tags: filteredTags, 
      locations: filteredLocations 
    });
  }, [searchQuery, filters]);
  
  return results;
};

export default useSearchResults;
