
import { useState, useEffect } from 'react';
import { journalEntries, users, popularTags, popularLocations } from '@/utils/mockData';

const useSearchFilter = (query) => {
  const [filteredResults, setFilteredResults] = useState({
    entries: [],
    users: [],
    tags: [],
    locations: []
  });
  
  useEffect(() => {
    if (!query.trim()) {
      setFilteredResults({ entries: [], users: [], tags: [], locations: [] });
      return;
    }
    
    const lowercaseQuery = query.toLowerCase();
    
    const filteredEntries = journalEntries.filter(entry => 
      entry.title.toLowerCase().includes(lowercaseQuery) || 
      entry.location.toLowerCase().includes(lowercaseQuery) ||
      entry.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    ).slice(0, 3);
    
    const filteredUsers = users.filter(user => 
      user.name.toLowerCase().includes(lowercaseQuery) || 
      user.username.toLowerCase().includes(lowercaseQuery)
    ).slice(0, 3);
    
    const filteredTags = popularTags.filter(tag => 
      tag.name.toLowerCase().includes(lowercaseQuery)
    ).slice(0, 3);
    
    const filteredLocations = popularLocations.filter(location => 
      location.name.toLowerCase().includes(lowercaseQuery)
    ).slice(0, 3);
    
    setFilteredResults({
      entries: filteredEntries,
      users: filteredUsers,
      tags: filteredTags,
      locations: filteredLocations
    });
  }, [query]);
  
  return filteredResults;
};

export default useSearchFilter;
