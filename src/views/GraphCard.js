import React, { useState } from "react";
import classnames from "classnames";
import Chart from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRoad, faTachometerAlt, faGasPump } from "@fortawesome/free-solid-svg-icons";

const GraphCard = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  const [selectedUserStats, setSelectedUserStats] = useState(null);

  const MAX_DISTANCE = 1000; // Replace with your maximum distance value
const MAX_MILEAGE = 10000; // Replace with your maximum mileage value
const MAX_FUEL = 500; // Replace with your maximum fuel value



  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const { graphData } = props;

  // Function to calculate total vehicles for each unique date

  const calculateDataByDay = () => {
    const dataByDay = {};
  
    graphData.forEach((dataEntry) => {
      const startDate = new Date(dataEntry.start_time);
      const formattedDate = startDate.toISOString().split("T")[0];
  
      if (!dataByDay[formattedDate]) {
        dataByDay[formattedDate] = 0;
      }
  
      dataByDay[formattedDate]++;
    });
  
    return dataByDay;
  };
  
  const calculateDataByWeek = () => {
    const dataByWeek = {};
  
    graphData.forEach((dataEntry) => {
      const startDate = new Date(dataEntry.start_time);
      const weekNumber = getWeekNumber(startDate);
  
      if (!dataByWeek[weekNumber]) {
        dataByWeek[weekNumber] = 0;
      }
  
      dataByWeek[weekNumber]++;
    });
  
    return dataByWeek;
  };
  
  // Function to get week number
  const getWeekNumber = (date) => {
    const currentDate = new Date(date.getTime());
    currentDate.setHours(0, 0, 0, 0);
    currentDate.setDate(currentDate.getDate() + 3 - ((currentDate.getDay() + 6) % 7));
    const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
    const weekNumber = Math.ceil((((currentDate - startOfYear) / 86400000) + 1) / 7);
    return weekNumber;
  };
  


  const calculateTotalVehiclesByUser = () => {
    const totalVehiclesByUser = {};
  
    graphData.forEach((dataEntry) => {
      const userId = dataEntry.userId;
  
      if (totalVehiclesByUser[userId]) {
        totalVehiclesByUser[userId] += 1;
      } else {
        totalVehiclesByUser[userId] = 1;
      }
    });
  
    return totalVehiclesByUser;
  };
  
  const totalVehiclesByUser = calculateTotalVehiclesByUser();
  
  const userLabels = Object.keys(totalVehiclesByUser);
  const userCounts = Object.values(totalVehiclesByUser);

  const calculateUserStats = () => {
    const userStats = {};
  
    graphData.forEach((dataEntry) => {
      const userId = dataEntry.userId;
  
      if (!userStats[userId]) {
        userStats[userId] = {
          totalDistance: 0,
          totalMileage: 0,
          totalFuelConsumed: 0,
        };
      }
  
      // Assuming you have appropriate properties in dataEntry for distance, mileage, and fuel consumption
      userStats[userId].totalDistance += dataEntry.distance;
      userStats[userId].totalMileage += dataEntry.mileage;
      userStats[userId].totalFuelConsumed += dataEntry.fuelLitre;
    });
  
    return userStats;
  };

  
const userStats = calculateUserStats(); 


const calculateTotalStats = () => {
    let totalDistance = 0;
    let totalMileage = 0;
    let totalFuelConsumed = 0;
  
    graphData.forEach((dataEntry) => {
      totalDistance += dataEntry.distance;
      totalMileage += dataEntry.mileage;
      totalFuelConsumed += dataEntry.fuelLitre;
    });
  
    return {
      totalDistance,
      totalMileage,
      totalFuelConsumed,
    };
  };
  
  const totalStats = calculateTotalStats();

  const handleBarClick = (element, event) => {
    if (element.length > 0) {
      const clickedIndex = element[0]._index;
      const clickedUserId = userLabels[clickedIndex];
      setSelectedUserStats({
        userId: clickedUserId,
        ...userStats[clickedUserId],
      });
    }
  };
  

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
  
    if (index === 1) {
      setChartExample1Data("data1");
    } else if (index === 2) {
      setChartExample1Data("data2");
    }
  };
  

  return (
    <>
      {/* Page content */}
      <Container className="mt-3" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="6">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Overview
                    </h6>
                    <h2 className="mb-0">Total Vehicles</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 1,
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 1)}
                        >
                          <span className="d-none d-md-block">Day</span>
                          <span className="d-md-none">D</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 2,
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 2)}
                        >
                          <span className="d-none d-md-block">Week</span>
                          <span className="d-md-none">W</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                <Line
                    data={{
                        labels: activeNav === 1 ? Object.keys(calculateDataByDay()) : Object.keys(calculateDataByWeek()),
                        datasets: [
                        {
                            label: "Total Vehicles",
                            data: activeNav === 1 ? Object.values(calculateDataByDay()) : Object.values(calculateDataByWeek()),
                            borderColor: "#f00", // Adjust the color as needed
                            fill: false,
                        },
                        ],
                    }}
                    options={chartExample1.options}
                    getDatasetAtEvent={(e) => console.log(e)}
                    />

                </div>
              </CardBody>
            </Card>
            
          </Col>
          <Col xl="6">
        <Card className="shadow">
          <CardHeader className="bg-transparent">
            <Row className="align-items-center">
            <h2 className="mb-0">User Statistics</h2>

            </Row>
          </CardHeader>
          <CardBody >
            {/* Chart */}
            <div className="bg-gradient-default shadow chart" style={{ borderRadius: "10px" }}>
  <Bar
    data={{
      labels: userLabels,
      datasets: [
        {
          label: "Total Vehicles",
          data: userCounts,
          borderColor: "#fff",
          backgroundColor: "#fff",
          fill: false,
        },
      ],
    }}
    options={{
      ...chartExample2.options,
      scales: {
        ...chartExample2.options.scales,
        xAxes: [
          {
            barPercentage: 0.5,
            categoryPercentage: 0.8,
            gridLines: {
              drawBorder: false,
              drawTicks: false,
            },
            ticks: {
              fontColor: "#fff", // Change the color of the x-axis labels
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              callback: function (value) {
                if (!(value % 10)) {
                  return value;
                }
              },
              fontColor: "#fff", // Change the color of the y-axis labels
            },
          },
        ],
      },
    }}
    onElementsClick={handleBarClick}
  />
</div>
{selectedUserStats && (
            <div className="mb-2 mt-3">
        <h5>User ID: {selectedUserStats.userId}</h5>
              <div className="d-flex">
                {/* Distance */}
                <div className="mr-4">
                  <p style={{ display: "flex", alignItems: "center" }}>
                    <span
                      style={{
                        backgroundImage: 'linear-gradient(45deg, #FFA500, #FF4500)',
                        padding: '15px',
                        borderRadius: '10px',
                        boxShadow: '3px 3px 8px #cbcbcb, -3px -3px 8px #ffffff',
                        marginRight: "10px",
                        color: "white"
                      }}
                    >
                      <FontAwesomeIcon icon={faRoad} />
                    </span>{" "}
                    Distance: {selectedUserStats.totalDistance}
                  </p>
                  <Progress
                max={totalStats.totalDistance}
                value={selectedUserStats.totalDistance}
                barClassName="bg-gradient-warning"
              />
                </div>
                {/* Mileage */}
                <div className="mr-4">
                  <p style={{ display: "flex", alignItems: "center" }}>
                    <span
                      style={{
                        backgroundImage: 'linear-gradient(45deg, #FFA500, #FF4500)',
                        padding: '15px',
                        borderRadius: '10px',
                        boxShadow: '3px 3px 8px #cbcbcb, -3px -3px 8px #ffffff',
                        marginRight: "10px",
                        color: "white"
                      }}
                    >
                      <FontAwesomeIcon icon={faTachometerAlt} />
                    </span>{" "}
                    Mileage: {selectedUserStats.totalMileage}
                  </p>
                  <Progress
                max={totalStats.totalMileage}
                value={selectedUserStats.totalMileage}
                barClassName="bg-gradient-warning"
              />
                </div>
                {/* Fuel Consumed */}
                <div>
                  <p style={{ display: "flex", alignItems: "center" }}>
                    <span
                      style={{
                        backgroundImage: 'linear-gradient(45deg, #FFA500, #FF4500)',
                        padding: '15px',
                        borderRadius: '10px',
                        boxShadow: '3px 3px 8px #cbcbcb, -3px -3px 8px #ffffff',
                        marginRight: "10px",
                        color: "white"
                      }}
                    >
                      <FontAwesomeIcon icon={faGasPump} />
                    </span>{" "}
                    Fuel Consumed: {selectedUserStats.totalFuelConsumed}
                  </p>
                  <Progress
                max={totalStats.totalFuelConsumed}
                value={selectedUserStats.totalFuelConsumed}
                barClassName="bg-gradient-warning"
              />
                </div>
              </div>
            </div>
          )}
        </CardBody>
        </Card>
</Col>


        </Row>
      </Container>
    </>
  );
};

export default GraphCard;
