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
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import "primereact/resources/themes/viva-light/theme.css";     
import "primereact/resources/primereact.min.css";                                       
import axios from 'axios';
import Sidebar from "components/Sidebar/Sidebar";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { NavLink } from 'react-router-dom'; // Make sure to import NavLink if you haven't already
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Scrollbars } from 'react-custom-scrollbars';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { BsSearch } from 'react-icons/bs';
import { MdFilterAltOff } from 'react-icons/md';
import { FiCheck } from 'react-icons/fi';
import { TfiClose } from 'react-icons/tfi';
import { Checkbox } from 'primereact/checkbox';
import { SelectButton } from 'primereact/selectbutton';
import { toast } from 'react-toastify';
import { PanelMenu } from 'primereact/panelmenu';
import { useNavigate } from 'react-router-dom';
import { classNames } from 'primereact/utils';
import { Dropdown } from 'primereact/dropdown';
import { HiUsers } from "react-icons/hi2";
import CardComponent from "./examples/CardComponent";


const Home = () => {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filters, setFilters] = useState(null);
  const [loading, setLoading] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState(''); 
  const [sizeOptions] = useState([
    { label: 'S', value: 'small' },
    { label: 'M', value: 'normal' },
    { label: 'L', value: 'large' }
  ]);
  const [size, setSize] = useState(sizeOptions[1].value);

  const [selectedColumns, setSelectedColumns] = useState([
    'id',
    'username',
    'email_id',
    'designation',
    'actions'
    ]);


  useEffect(() => {
    console.log("getting into useEffect function at home")
    loadData();
    initFilters();
  }, []);

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
        username: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        email_id: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        designation: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        
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
        {['id', 'username', 'email_id', 'designation', 'actions'].map(column => (
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
        className="p-button-sm p-button-text p-button-outlined"
        style={{ fontFamily: 'Helvetica Neue' }}
      >
        <MdFilterAltOff style={{ marginRight: '5px' }} />
      </Button>
      <span className="p-input-icon-right">
        <InputText
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Keyword Search"
          className="p-inputtext-sm"
          style={{ fontFamily: 'Helvetica Neue', color: 'black' }}
        />
        <BsSearch />
        <i className="pi pi-search" style={{ color: 'black' }} />
      </span>
      <Button
        type="button"
        icon="pi pi-table"
        label="Columns"
        onClick={toggleColumnSelectionModal}
        className="p-button-sm p-button-text p-button-outlined"
        style={{ fontFamily: 'Helvetica Neue' }}
      />
      {showColumnSelectionModal && columnSelectionModal}
                <SelectButton
                   className="float-right"
                  style={{ display: "flex", flexDirection: "row",}}
                  value={size}
                  onChange={(e) => setSize(e.value)}
                  options={sizeOptions}
                />
    </div>
  );
};

const usernameBodyTemplate = (rowData) => {
  return (
      <div className="flex align-items-center gap-2">
        <NavLink className="link-button" onClick={() => openModal(rowData)}>
              {rowData.username}
        </NavLink>
      </div>
  );
};
const emailIdBodyTemplate = (rowData) => {
  return (
      <div className="flex align-items-center gap-2">
        <NavLink className="link-button" onClick={() => openModal(rowData)}>
              {rowData.email_id}
        </NavLink>
      </div>
  );
};
const designationBodyTemplate = (rowData) => {
  return (
      <div className="flex align-items-center gap-2">
        <NavLink className="link-button" onClick={() => openModal(rowData)}>
              {rowData.designation}
        </NavLink>
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

const header = renderHeader();

  const loadData = async () => {
    try {
      const HOME_URL = 'http://localhost:5000/users';
      const response = await axios.get(HOME_URL);
      if (Array.isArray(response.data)) {
        const parsedData = response.data.map((item) => {
          return {
            ...item,
          };
        });
        
        setData(parsedData);
        setLoading(false);

      } else {
        console.log('Response data is not an array:', response.data);
      }
    } catch (error) {
      console.log('Error while loading data:', error);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm('Are you sure you want to DELETE the User?')) {
      try {
        const DELETE_URL = `http://localhost:5000/user/${id}/delete`;
        await axios.delete(DELETE_URL);
        toast.success('User deleted successfully');

        setData((prevData) => prevData.filter((item) => item.id !== id));
      } catch (error) {
        console.log('Error while deleting user:', error);
      }
    }
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const [hoveredRow, setHoveredRow] = useState(null);

  const handleMouseEnter = (row) => {
    setHoveredRow(row);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  };
  const navigate = useNavigate();

  const handleEdit = (userId) => {
    navigate(`/admin/user-profile/${userId}`);
  };

  const handleDelete = (userId) => {
    deleteUser(userId);
  };

  const handleViewTravelDetails = (userId) => {
    navigate(`/admin/travel-details/${userId}`);
  };

const actionsBodyTemplate = (rowData) =>{
  const items = [
    {
      items: [
        {
          label: 'Edit',
          command: () => handleEdit(rowData.id), // Call handleEdit with the row data's id
        },
        {
          label: 'Delete',
          command: () => handleDelete(rowData.id), // Call handleDelete with the row data's id
        },
        {
          label: 'View Travel Details',
          command: () => handleViewTravelDetails(rowData.id), // Call handleViewTravelDetails with the row data's id
        },
      ],
    },
  ];


  return (
       <div className="card flex justify-content-center" >
        <PanelMenu model={items} className="w-full md:w-25rem"/>
    </div>
)
}
  
  return (
    <>

        <Container className="mt-4" style={{ maxWidth: '300px' }}>
            <Row>
            <Col>
            <CardComponent
                    title="Total Users"
                    value={data.length}
                    percentage={100}
                    icon={<HiUsers style={{ color: 'white', fontSize: 30 }} />}
                  />
            </Col>
            </Row>
          
        </Container>
      <Container className="mt-4" style={{ maxWidth: '800px' }}>
        <Row>
          <div className="col">
         

            <Card className="shadow">
              <CardHeader >
                <h3>Users</h3>
              </CardHeader>
            
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
                  dataKey="id"
                  header={header}
                  stickyHeader="true"
                  stickyTopAt=".layout-topbar"
                  globalFilterFields={['username', 'email_id', 'designation']}
                  paginator
                  rows={5}
                  rowsPerPageOptions={[5, 10, 25, 50]}
                  stripedRows
                  tableStyle={{ minWidth: '50rem', fontFamily: 'Helvetica Neue', fontSize: '16px', color: 'black', fontWeight: 200 }}
                  emptyMessage="No users found."
                >
                {selectedColumns.includes('id') && <Column field="id" header="ID" style={{ width: '25%' }} sortable />}
                  {selectedColumns.includes('username') && (
                    <Column
                      header="Username"
                      field="username"
                      filterField="username"
                      style={{ minWidth: '9rem' }}
                      body={usernameBodyTemplate}
                      filter
                      filterPlaceholder="Search by Username"
                      filterClear={filterClearTemplate}
                      filterApply={filterApplyTemplate}
                      filterFooter={filterFooterTemplate}
                      sortable
                    />
                  )}
                  {selectedColumns.includes('email_id') && (
                    <Column
                      header="Email ID"
                      field="email_id"
                      filterField="email_id"
                      style={{ minWidth: '9rem' }}
                      body={emailIdBodyTemplate}
                      filter
                      filterPlaceholder="Search by Email ID"
                      filterClear={filterClearTemplate}
                      filterApply={filterApplyTemplate}
                      filterFooter={filterFooterTemplate}
                      sortable
                    />
                  )}
                  {selectedColumns.includes('designation') && (
                    <Column
                      header="Designation"
                      field="designation"
                      filterField="designation"
                      style={{ minWidth: '9rem' }}
                      body={designationBodyTemplate}
                      filter
                      filterPlaceholder="Search by Designation"
                      filterClear={filterClearTemplate}
                      filterApply={filterApplyTemplate}
                      filterFooter={filterFooterTemplate}
                      sortable
                    />
                  )}
                  {selectedColumns.includes('actions') && (
                  <Column
                    header="Actions"
                    body={actionsBodyTemplate}
                    sortable={false}
                  />
                  )}
                  </DataTable>

                </Scrollbars>
              </div>
              
            </Card>
          </div>
        </Row>
      </Container>
      {selectedUser && (
        <Modal isOpen={modalOpen} toggle={closeModal}>
          <ModalHeader toggle={closeModal}>User Details</ModalHeader>
          <ModalBody>
            <Table bordered={false} className="table">
              <tbody>
                <tr>
                  <th className="modal-details-title">Id</th>
                  <td className="modal-details-value">{selectedUser.id}</td>
                </tr>
                <tr>
                  <th className="modal-details-title">Username</th>
                  <td className="modal-details-value">{selectedUser.username}</td>
                </tr>
                <tr>
                  <th className="modal-details-title">Email</th>
                  <td className="modal-details-value">{selectedUser.email_id}</td>
                </tr>
                <tr>
                  <th className="modal-details-title">Designation</th>
                  <td className="modal-details-value">{selectedUser.designation}</td>
                </tr>
              </tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Link to={`/admin/tables`}>View Travel Details</Link>
            <button className="btn btn-primary" onClick={closeModal}>
              Close
            </button>
          </ModalFooter>
        </Modal>
      )}
    </>
  );
};

export default Home;