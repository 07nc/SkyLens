import React, { useState } from 'react';
import airlinesData from '../../data/airlines.json';

export default function MapFilterBar({ onAirlineSelect }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsDropdownOpen(value.trim().length > 0);
    if (value.trim().length === 0) onAirlineSelect(null);
  };

  const handleSelect = (airline) => {
    setSearchTerm(airline.name);
    setIsDropdownOpen(false);
    onAirlineSelect(airline.icao);
  };

  const handleClear = () => {
    setSearchTerm('');
    setIsDropdownOpen(false);
    onAirlineSelect(null);
  };

  const suggestions = searchTerm.trim() ? airlinesData.filter(a => 
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.icao.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <div className="map-filter-bar">
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input 
          type="text" 
          placeholder="Search Airlines..." 
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={() => setIsDropdownOpen(searchTerm.trim().length > 0)}
        />
        {searchTerm && <button className="clear-btn" onClick={handleClear}>✕</button>}
      </div>

      {isDropdownOpen && suggestions.length > 0 && (
        <ul className="autocomplete-dropdown">
          {suggestions.map((airline) => (
            <li key={airline.icao} onClick={() => handleSelect(airline)}>
              <span className="airline-name">{airline.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}