import React, { useState, useEffect, useRef } from "react";

const CollegeSelect = ({ onSelect }) => {
  const [colleges, setColleges] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    fetch("http://universities.hipolabs.com/search?country=India")
      .then((res) => res.json())
      .then((data) => {
        const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
        setColleges(sortedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching colleges:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredColleges([]);
    } else {
      const results = colleges.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredColleges(results.slice(0, 50)); 
    }
  }, [search, colleges]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (collegeName) => {
    setSearch(collegeName);
    setIsOpen(false);
    onSelect(collegeName); 
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        College Name
      </label>
      
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={loading ? "Loading colleges..." : "Type to search your college..."}
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:border-blue-brand focus:outline-none transition-colors"
          disabled={loading}
        />
        {loading && (
          <div className="absolute right-3 top-3 animate-spin h-4 w-4 border-2 border-blue-brand border-t-transparent rounded-full"></div>
        )}
      </div>
      {isOpen && filteredColleges.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 max-h-60 overflow-auto bg-white border border-gray-200 rounded-md shadow-lg transition-all">
          {filteredColleges.map((college, index) => (
            <li
              key={index}
              onClick={() => handleSelect(college.name)}
              className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm text-gray-800 transition-colors border-b border-gray-50 last:border-0"
            >
              <div className="font-medium">{college.name}</div>
              <div className="text-xs text-gray-500">{college["state-province"] || "India"}</div>
            </li>
          ))}
        </ul>
      )}

      {isOpen && search && filteredColleges.length === 0 && !loading && (
        <div className="absolute z-10 w-full mt-1 p-4 bg-white border border-gray-200 rounded-md shadow-lg text-sm text-gray-500">
          No college found. You can continue typing to enter manually.
        </div>
      )}
    </div>
  );
};

export default CollegeSelect;