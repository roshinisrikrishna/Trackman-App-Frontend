import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FilterOperator } from 'primereact/api'; // Import the FilterOperator from primereact



const FilterModal = ({ modalOpen, closeModal }) => {

    console.log('open filter modal');

    const [selectedColumn, setSelectedColumn] = useState('');
    const [selectedFilterOption, setSelectedFilterOption] = useState('');
    const [selectedFilterValue, setSelectedFilterValue] = useState('');
    const [filters, setFilters] = useState(null);
    // Sample data for dropdown options
    const columns = ['vehicle_number', 'initial_location', 'final_location', 'company'];
    const filterOptions = [
      { label: 'Starts with', value: 'STARTS_WITH' },
      { label: 'Contains', value: 'CONTAINS' },
      { label: 'Not contains', value: 'NOT_CONTAINS' },
      { label: 'Ends with', value: 'ENDS_WITH' },
      { label: 'Equals', value: 'EQUALS' },
      { label: 'Not equals', value: 'NOT_EQUALS' },
    ];
  
    const handleColumnChange = (event) => {
      setSelectedColumn(event.target.value);
    };
  
    const handleFilterOptionChange = (event) => {
      setSelectedFilterOption(event.target.value);
    };
  
    const handleFilterValueChange = (event) => {
      setSelectedFilterValue(event.target.value);
    };
  
    const handleApplyFilter = () => {
      // Apply the selected filters to the 'filters' state
      const newFilters = { ...filters };
      newFilters[selectedColumn] = {
        operator: FilterOperator.AND,
        constraints: [
          {
            value: selectedFilterValue,
            matchMode: selectedFilterOption,
          },
        ],
      };
      setFilters(newFilters);
      closeModal();
    };
  
    return (
      <Modal isOpen={modalOpen} toggle={closeModal}>
        <ModalHeader toggle={closeModal}>Filter Columns</ModalHeader>
  <ModalBody>
    {/* Dropdown to select columns */}
    <div className="form-group">
      <label htmlFor="columnSelect">Select Column</label>
      <select className="form-control" id="columnSelect" onChange={handleColumnChange}>
        <option value="">Select Column</option>
        {columns.map((column) => (
          <option key={column} value={column}>
            {column}
          </option>
        ))}
      </select>
    </div>
  
    {/* Dropdown to select filter options */}
    <div className="form-group">
      <label htmlFor="filterSelect">Select Filter Option</label>
      <select className="form-control" id="filterSelect" onChange={handleFilterOptionChange}>
        <option value="">Select Filter Option</option>
        {filterOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  
    {/* Input field for filter value */}
    <div className="form-group">
      <label htmlFor="filterValue">Filter Value</label>
      <input type="text" className="form-control" id="filterValue" onChange={handleFilterValueChange} />
    </div>
  </ModalBody>
  
  <ModalFooter>
    <button className="btn btn-primary" onClick={handleApplyFilter}>
      Apply Filter
    </button>
    <button className="btn btn-secondary" onClick={closeModal}>
      Close
    </button>
  </ModalFooter>;
  
      </Modal>
    );
  };

export default FilterModal