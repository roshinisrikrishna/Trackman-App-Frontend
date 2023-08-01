import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Container,
  Table,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
// core components
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";                                       
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Scrollbars } from 'react-custom-scrollbars';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { BsSearch } from "react-icons/bs";
import { MdFilterAltOff } from "react-icons/md";
import { FiCheck } from "react-icons/fi";
import { TfiClose } from "react-icons/tfi";
import { FiCheckCircle, FiX, FiSearch } from "react-icons/fi";
import { Checkbox } from 'primereact/checkbox';
import { SelectButton } from 'primereact/selectbutton';
import { HiUsers } from "react-icons/hi2";
import { GiPathDistance } from "react-icons/gi";
import { MdGasMeter } from "react-icons/md";
import { BsFillFuelPumpDieselFill } from "react-icons/bs";


const Tables = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState(null);
  const [loading, setLoading] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState(''); 
  const [sizeOptions] = useState([
    { label: 'S', value: 'small' },
    { label: 'M', value: 'normal' },
    { label: 'L', value: 'large' }
  ]);
  const [size, setSize] = useState(sizeOptions[1].value);
  const [totalTravelLogs, setTotalTravelLogs] = useState(0);
  const [totalDistance, setTotalDistance] = useState(0);
  const [totalMileage, setTotalMileage] = useState(0);
  const [totalFuelConsumed, setTotalFuelConsumed] = useState(0);

  const [selectedColumns, setSelectedColumns] = useState([
    'unique_id',
    'id',
    'start_time',
    'initial_location',
    'end_time',
    'final_location',
    'distance',
    'userId',
    'fuelLitre',
    'mileage',
  ]);

  useEffect(() => {
    const calculateTotals = () => {
      let distanceSum = 0;
      let mileageSum = 0;
      let fuelConsumedSum = 0;

      data.forEach((item) => {
        distanceSum += item.distance;
        mileageSum += item.mileage;
        fuelConsumedSum += item.fuelLitre;
      });

      setTotalDistance(distanceSum.toFixed(2)); 
      setTotalMileage(mileageSum.toFixed(2)); 
      setTotalFuelConsumed(fuelConsumedSum.toFixed(2));
    };

    calculateTotals();
    fetchData();
    initFilters();
  }, []);



  const { id } = useParams();
  

  const formatDate = (value) => {
    if (!value || !(value instanceof Date) || isNaN(value.getTime())) {
      return ''; // or any default value you want to display for empty or invalid dates
    }
  
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false, // Use 24-hour format
    };
  
    return value.toLocaleDateString('en-US', options);
  };
 
const clearFilter = () => {
  initFilters();
};

const onGlobalFilterChange = (e) => {
  const value = e.target.value;
  let _filters = { ...filters };

  _filters['global'].value = value;

  setFilters(_filters);
  setGlobalFilterValue(value);
};

const initFilters = () => {
  setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      id: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      initial_location: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      final_location: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      userId: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      end_time: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
      start_time: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
      distance: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
      fuelLitre: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
      mileage: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },

     
  });
  setGlobalFilterValue('');
};

const [showColumnSelectionModal, setShowColumnSelectionModal] = useState(false);
  
const toggleColumnSelectionModal = () => {
  setShowColumnSelectionModal(!showColumnSelectionModal);
};

const renderHeader = () => {
   
  
    const handleColumnCheckboxChange = (event) => {
      const { name, checked } = event.target;
      setSelectedColumns((prevColumns) => {
        if (checked) {
          return [...prevColumns, name];
        } else {
          return prevColumns.filter((column) => column !== name);
        }
      });
    };
  
    const columnSelectionModal = (
      <div className="p-dialog p-fluid" style={{ width: '400px' }}>
        <div className="p-dialog-header">
          <h5>Select Columns</h5>
          <span className="p-dialog-header-icon p-clickable" onClick={toggleColumnSelectionModal}>
            <i className="pi pi-times" />
          </span>
        </div>
        <div className="p-dialog-content">
          {['unique_id', 'id', 'start_time', 'initial_location', 'end_time', 'final_location', 'distance', 'userId', 'fuelLitre', 'mileage'].map(column => (
            <div key={column} className="p-field-checkbox">
              <Checkbox
                inputId={column}
                name={column}
                value={column}
                onChange={handleColumnCheckboxChange}
                checked={selectedColumns.includes(column)}
              />
              <label htmlFor={column}>{column}</label>
            </div>
          ))}
        </div>
        <div className="p-dialog-footer">
          <Button label="Save" onClick={toggleColumnSelectionModal} />
        </div>
      </div>
    );
  
    return (
      <div className="flex justify-content-between">
     <Button
          type="button"
          label="Clear"
          outlined
          onClick={clearFilter}
          className="p-button-sm p-button-text p-button-outlined button-transition"
          style={{
            fontFamily: 'Roboto',
            borderRadius: '20px',
            backgroundImage: 'linear-gradient(45deg, #FFA500, #f26411)',
            color: 'white',
            marginRight: '20px'
          }}
        >
          <MdFilterAltOff style={{ marginRight: '5px' }} />
        </Button>

        <span className="p-input-icon-right" style={{ marginRight: '20px' }}>
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
            className="p-inputtext-sm"
            style={{ fontFamily: 'Montserrat', color: 'black' }}
          />
          <BsSearch />
          <i className="pi pi-search" style={{ color: 'black' }} />
        </span>

        <Button
          type="button"
          icon="pi pi-table"
          label="Columns"
          onClick={toggleColumnSelectionModal}
          className="p-button-sm p-button-text p-button-outlined button-transition"
          style={{
            fontFamily: 'Roboto',
            color: 'black',
            borderColor: 'orange',
            backgroundColor: 'white',
            borderWidth: '2px'
          }}
        />

        {showColumnSelectionModal && columnSelectionModal}

        <SelectButton
          className="float-right"
          style={{ display: "flex", flexDirection: "row", color: "black" }}  
          value={size}
          onChange={(e) => setSize(e.value)}
          options={sizeOptions}
          optionStyle={{ backgroundColor: "yellow" }} 
        />

      </div>
    );
    }    
  
const idBodyTemplate = (rowData) => {
  return (
      <div className="flex align-items-center gap-2">
          <span>{rowData.id}</span>
      </div>
  );
};
const companyBodyTemplate = (rowData) => {
  return (
      <div className="flex align-items-center gap-2">
          <span>{rowData.userId}</span>
      </div>
  );
};
const initialLocationBodyTemplate = (rowData) => {
  return (
      <div className="flex align-items-center gap-2">
          <span>{rowData.initial_location}</span>
      </div>
  );
};
const finalLocationBodyTemplate = (rowData) => {
  return (
      <div className="flex align-items-center gap-2">
          <span>{rowData.final_location}</span>
      </div>
  );
};
const distanceBodyTemplate = (rowData) => {
  return (
      <div className="flex align-items-center gap-2">
          <span>{rowData.distance}</span>
      </div>
  );
};
const fuelBodyTemplate = (rowData) => {
  return (
      <div className="flex align-items-center gap-2">
          <span>{rowData.fuelLitre}</span>
      </div>
  );
};
const mileageBodyTemplate = (rowData) => {
  return (
      <div className="flex align-items-center gap-2">
          <span>{rowData.mileage}</span>
      </div>
  );
};

const filterClearTemplate = (options) => {
  return <Button type="button" icon={<TfiClose/>} onClick={options.filterClearCallback} severity="secondary"></Button>;
};

const filterApplyTemplate = (options) => {
  return <Button type="button" icon={<FiCheck />} onClick={options.filterApplyCallback} severity="success"></Button>;
};

const filterFooterTemplate = () => {
  return <div className="px-3 pt-0 pb-3 text-center">Filter by Country</div>;
};

const startdateBodyTemplate = (rowData) => {
  return formatDate(new Date(rowData.start_time)); // Pass the date value as a Date object
};

const enddateBodyTemplate = (rowData) => {
  return formatDate(new Date(rowData.end_time)); // Pass the date value as a Date object
};



const startdateFilterTemplate = (options) => {
  const value = options.value ? new Date(options.value) : null; // Convert the value to a Date object if it exists
  const formattedDateWithTime = formatDate(value);

  return (
    <Calendar
      value={value}
      onChange={(e) => options.filterCallback(e.value, options.index)}
      dateFormat="mm/dd/yy"
      placeholder="mm/dd/yyyy"
      showTime
      timeOnly={false}
      hourFormat="12"
      hourCycle="12"
      valueToShow={formattedDateWithTime}
    />
  );
};

const enddateFilterTemplate = (options) => {
  const value = options.value ? new Date(options.value) : null; // Convert the value to a Date object if it exists

  return (
    <Calendar
      value={value}
      onChange={(e) => options.filterCallback(e.value, options.index)}
      dateFormat="mm/dd/yy"
      placeholder="mm/dd/yyyy"
      showTime
      timeOnly={false}
      hourFormat="12"
      hourCycle="12"
      valueToShow={formatDate(value)}
    />
  );
};

const balanceFilterTemplate = (options) => {
  return <InputNumber value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} mode="currency" currency="USD" locale="en-US" />;
};



const header = renderHeader();

  console.log('data ', data);

  const fetchData = async () => {
    try {
      console.log('entered fetch data function ');
      const TRAVEL_URL = `http://localhost:5000/travel/admin`;
      const response = await axios.get(TRAVEL_URL); // Replace with your API endpoint
      const responseData = response.data;
  
      // Parse the date strings to Date objects
      const parsedData = responseData.map((item) => {
        return {
          ...item,
          start_time: new Date(item.start_time),
          end_time: new Date(item.end_time),
        };
      });
  
      console.log("Data Type of 'Start Time':", typeof parsedData[0].start_time);
      console.log("Data Type of 'End Time':", typeof parsedData[0].end_time);
  
      setData(parsedData);
      setLoading(false);
      setTotalTravelLogs(parsedData.length);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  return (
    <>
      <Container className="mt-5" style={{ maxWidth: '800px' }}>
        {/* <div className="col">
            <div className="col-lg-6 col-sm-6"> */}
              <Row>
              <Col>
              {/* Card for Total Vehicles */}
              <Card className="p-1 mb-4 mt-2" style={{ fontSize: '10px', borderRadius: '15px', display: 'flex', alignItems: 'center', width: '200px', boxShadow: '15px 15px 30px #cbcbcb, -15px -15px 30px #ffffff' }}>
                <CardBody >
                  <div className="row align-items-center" >
                    <div className="col-lg-8 col-sm-8" style={{ marginBottom: '-30px', marginTop: '-20px', }}>
                      <h4 className="mb-2" style={{ color: "#7d7d7d", fontWeight: 600, textAlign: 'left', marginBottom: '-10px', marginLeft: '-20px' }}>Total Vehicles</h4>
                      <h4 style={{ fontWeight: 700, fontSize: 18, marginTop: '-5px', marginLeft: '-10px' }}>
                        {totalTravelLogs}
                      </h4>
                    </div>
                    <div className="col-4">
                      <span
                        style={{
                          backgroundImage: 'linear-gradient(45deg, #FFA500, #FF4500)',
                          padding: '15px',
                          marginLeft: '-20px',
                          borderRadius: '10px',
                          boxShadow: '3px 3px 8px #cbcbcb, -3px -3px 8px #ffffff'

                        }}
                      >
                        <HiUsers style={{ color: 'white', fontSize: 30 }} />
                      </span>
                    </div>
                  </div>
                </CardBody>
              </Card>
              </Col>
              <Col>
              {/* Card for Total Distance */}
              <Card className="p-1 mb-4" style={{ fontSize: '10px', borderRadius: '15px', display: 'flex', alignItems: 'center', width: '300px', marginLeft: -175, marginTop: 8, boxShadow: '15px 15px 30px #cbcbcb, -15px -15px 30px #ffffff' }}>
                <CardBody>
                  <div className="row align-items-center">
                    <div className="col-lg-8 col-sm-8" style={{ marginBottom: '-30px', marginTop: '-20px' }}>
                      <h4 className="mb-2" style={{ color: "#7d7d7d", fontWeight: 600, textAlign: 'left', marginBottom: '0px', marginLeft: '-20px' }}>Total Distance Covered</h4>
                      <h4 style={{ fontWeight: 700, fontSize: 18, marginTop: '-5px', marginLeft: '-10px' }}>
                        {totalDistance} km
                      </h4>
                    </div>
                    <div className="col-4">
                      <span
                        style={{
                          backgroundImage: 'linear-gradient(45deg, #FFA500, #FF4500)',
                          padding: '15px',
                          marginRight: '-1px',
                          borderRadius: '10px',
                          boxShadow: '3px 3px 8px #cbcbcb, -3px -3px 8px #ffffff'
                        }}
                      >
                        {/* Icon for Total Distance */}
                        <GiPathDistance style={{ color: 'white', fontSize: 30 }} />
                      </span>
                    </div>
                  </div>
                </CardBody>
              </Card>
              </Col>
              </Row>
              {/* Card for Total Mileage */}
              <Row>
                <Col>
                  <Card className="p-1 mb-4" style={{ fontSize: '10px', borderRadius: '15px', display: 'flex', alignItems: 'center', width: '280px', boxShadow: '15px 15px 30px #cbcbcb, -15px -15px 30px #ffffff' }}>
                <CardBody>
                  <div className="row align-items-center">
                    <div className="col-lg-8 col-sm-8" style={{ marginBottom: '-30px', marginTop: '-20px' }}>
                      <h4 className="mb-2" style={{ color: "#7d7d7d", fontWeight: 600, textAlign: 'left', marginBottom: '-10px', marginLeft: '-20px' }}>Total Mileage Covered</h4>
                      <h4 style={{ fontWeight: 700, fontSize: 18, marginTop: '-5px', marginLeft: '-10px' }}>
                        {totalMileage} km/L
                      </h4>
                    </div>
                    <div className="col-4">
                      <span
                        style={{
                          backgroundImage: 'linear-gradient(45deg, #FFA500, #FF4500)',
                          padding: '15px',
                          marginRight: '-1px',
                          borderRadius: '10px',
                          boxShadow: '3px 3px 8px #cbcbcb, -3px -3px 8px #ffffff'

                        }}
                      >
                        {/* Icon for Total Mileage */}
                        <MdGasMeter style={{ color: 'white', fontSize: 30 }} />
                      </span>
                    </div>
                  </div>
                </CardBody>
              </Card>
              </Col>
              <Col>
              {/* Card for Total Fuel Consumed */}
              <Card className="p-1 mb-4" style={{ fontSize: '10px', borderRadius: '15px', display: 'flex', alignItems: 'center', width: '270px', marginLeft: -95, boxShadow: '15px 15px 30px #cbcbcb, -15px -15px 30px #ffffff' }}>
                <CardBody>
                  <div className="row align-items-center">
                    <div className="col-lg-8 col-sm-8" style={{ marginBottom: '-30px', marginTop: '-20px' }}>
                      <h4 className="mb-2" style={{ color: "#7d7d7d", fontWeight: 600, textAlign: 'left', marginBottom: '-10px', marginLeft: '-20px' }}>Total Fuel Consumed</h4>
                      <h4 style={{ fontWeight: 700, fontSize: 18, marginTop: '-5px', marginLeft: '-10px' }}>
                        {totalFuelConsumed} L
                      </h4>
                    </div>
                    <div className="col-4">
                      <span
                        style={{
                          backgroundImage: 'linear-gradient(45deg, #FFA500, #FF4500)',
                          padding: '15px',
                          marginRight: '5px',
                          borderRadius: '10px',
                          boxShadow: '3px 3px 8px #cbcbcb, -3px -3px 8px #ffffff'

                        }}
                      >
                        {/* Icon for Total Fuel Consumed */}
                        <BsFillFuelPumpDieselFill style={{ color: 'white', fontSize: 30 }} />
                      </span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            {/* </div> */}
            </Row>
      </Container>
      <Container className="mt-4" style={{ maxWidth: '1200px' }}>
        <Row>
        <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Travel Logs</h3>
              </CardHeader>
             <div style={{ maxHeight: '400px', overflow: 'auto' }}>
              <div className="table-wrapper" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <Scrollbars style={{ width: 800, height: 500 }}>
                <DataTable
                  value={data}
                  sortMode="multiple"
                  showGridlines
                  columnResizeMode="expand"
                  resizableColumns
                  filters={filters}
                  size={size}                 
                  loading={loading}
                  scrollable
                  scrollHeight="400px"
                  dataKey="unique_id"
                  header={header}
                  stickyHeader="true"
                  stickyTopAt=".layout-topbar"
                  globalFilterFields={['initial_location', 'final_location', 'distance', 'userId', 'fuelLitre', 'mileage']}
                  paginator
                  rows={5}
                  rowsPerPageOptions={[5, 10, 25, 50]}
                  tableStyle={{ minWidth: '50rem', color: 'black', fontWeight: 200 }}
                  emptyMessage="No vehicles found."
                >
                    {selectedColumns.includes('id') && (
                      <Column
                        header="Vehicle Number"
                        filterField="id"
                        field="id"
                        sortable
                        style={{ minWidth: '9rem' }}
                        body={idBodyTemplate}
                        filter
                        filterPlaceholder="Search by Vehicle Number"
                        filterClear={filterClearTemplate}
                        filterApply={filterApplyTemplate}
                        filterFooter={filterFooterTemplate}
                      />
                    )}
                    {selectedColumns.includes('start_time') && (
                      <Column
                        header="Start Time"
                        field="start_time"
                        sortable
                        filterField="start_time"
                        dataType="date"
                        style={{ minWidth: '9rem' }}
                        body={startdateBodyTemplate}
                        filter
                        filterElement={startdateFilterTemplate}
                      />
                    )}
                    {selectedColumns.includes('initial_location') && (
                      <Column
                        header="Initial Location"
                        field="initial_location"
                        filterField="initial_location"
                        style={{ minWidth: '9rem' }}
                        body={initialLocationBodyTemplate}
                        filter
                        filterPlaceholder="Search by Location"
                        filterClear={filterClearTemplate}
                        filterApply={filterApplyTemplate}
                        filterFooter={filterFooterTemplate}
                        sortable
                      />
                    )}
                    {selectedColumns.includes('end_time') && (
                      <Column
                        field="end_time"
                        header="End Time"
                        style={{ width: '25%' }}
                        body={enddateBodyTemplate}
                        filter
                        filterField="end_time"
                        dataType="date"
                        filterElement={enddateFilterTemplate}
                      />
                    )}
                    {selectedColumns.includes('final_location') && (
                      <Column
                        header="Final Location"
                        filterField="final_location"
                        field="final_location"
                        sortable
                        style={{ minWidth: '9rem' }}
                        body={finalLocationBodyTemplate}
                        filter
                        filterPlaceholder="Search by Location"
                        filterClear={filterClearTemplate}
                        filterApply={filterApplyTemplate}
                        filterFooter={filterFooterTemplate}
                      />
                    )}
                    {selectedColumns.includes('distance') && (
                      <Column
                        header="Distance"
                        filterField="distance"
                        field="distance"
                        sortable
                        dataType="numeric"
                        style={{ minWidth: '9rem' }}
                        body={distanceBodyTemplate}
                        filter
                        filterElement={balanceFilterTemplate}
                      />
                    )}
                    {selectedColumns.includes('userId') && (
                      <Column
                        header="Company"
                        filterField="userId"
                        field="userId"
                        sortable
                        style={{ minWidth: '9rem' }}
                        body={companyBodyTemplate}
                        filter
                        filterPlaceholder="Search by Company"
                        filterClear={filterClearTemplate}
                        filterApply={filterApplyTemplate}
                        filterFooter={filterFooterTemplate}
                      />
                    )}
                    {selectedColumns.includes('fuelLitre') && (
                      <Column
                        header="Fuel Consumed"
                        filterField="fuelLitre"
                        field="fuelLitre"
                        sortable
                        dataType="numeric"
                        style={{ minWidth: '9rem' }}
                        body={fuelBodyTemplate}
                        filter
                        filterElement={balanceFilterTemplate}
                      />
                    )}
                    {selectedColumns.includes('mileage') && (
                      <Column
                        header="Mileage"
                        filterField="mileage"
                        field="mileage"
                        sortable
                        dataType="numeric"
                        style={{ minWidth: '9rem' }}
                        body={mileageBodyTemplate}
                        filter
                        filterElement={balanceFilterTemplate}
                      />
                    )}
                  </DataTable>
                  
                  </Scrollbars>
                  </div>
              </div>
   
            </Card>
                          </div>

        </Row>
      </Container>
      <style>
      {`
      ::-webkit-scrollbar {
        width: 4px;
        height:6px;
      }
      
      ::-webkit-scrollbar-thumb {
        background-color: #fff; /* Blueish Green color */
        border-radius: 10px;
        border: 0.1px solid black;
        box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.3);
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background-color: #fff; /* Darker shade on hover */
      }
      
      /* Styling the vertical scrollbar */
      ::-webkit-scrollbar-track {
        background-color: #0521f7;
      }
      
      ::-webkit-scrollbar-track-piece {
        background-color: #f5f5f5; /* Scrollbar background color */
      }
      
      .button-transition {
        transition: transform 0.2s ease-in-out;
      }
      
      .button-transition:hover {
        transform: scale(1.02);
      }
      
      .p-selectbutton .p-button.p-highlight {
        background-image: linear-gradient(45deg, #FFA500, #f26411); 
        font-size: 16px;
        font-family: 'Roboto', sans-serif;
      
      }

      .p-datatable .p-datatable-thead > tr > th,
          .p-datatable .p-datatable-tbody > tr > td {
            font-family: 'Montserrat', sans-serif;
          }

      .p-datatable .p-datatable-thead > tr > th {
        position: sticky;
        top: 0;
        background-color: black; 
        color: white;
        font-family: 'Montserrat', sans-serif;
        text-transform: uppercase;
        font-size: 14px;
        transition: background-color 0.3s;
      }

      .p-datatable .p-datatable-tbody > tr:nth-child(even) {
        background-color: #f5f5f7;
        color: black;
        font-size: 14px;
        font-weight: 500; /* Set font weight to 700 for bold text */
    }

      .p-datatable .p-datatable-tbody > tr:nth-child(odd) {
        color: black;
        font-size: 14px;
        font-weight: 500;
      }
      
      .p-datatable .p-datatable-thead > tr > th .p-sortable-column-icon svg {
        fill: white;
      }
      
      .p-datatable .p-datatable-thead > tr > th .p-sortable-column-icon svg {
        color: white;
      }

        .p-paginator .p-paginator-pages .p-paginator-page.p-highlight {
          background-image: linear-gradient(45deg, #FFA500, #f26411); 
          color: white;
          outline: none;
          border-radius: 25px;
        }
        .p-paginator .p-paginator-pages .p-paginator-page {
          font-size: 18px;
          font-weight: 600;
          padding: 5px;
          border-radius: 4px;
        }

      `}
    </style>
     </>
  );
};

export default Tables;
