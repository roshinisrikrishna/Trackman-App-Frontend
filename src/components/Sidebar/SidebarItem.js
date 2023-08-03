import React, { useState } from "react"
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
import { NavItem, NavLink } from "reactstrap";
const SidebarItem = ({item}) =>{
    const [open, setOpen] = useState(false)

    console.log("item at sidebaritem ",item);
    
    if(item.childrens){
        return (
            <div className={open ? "sidebar-item open" : "sidebar-item"}>
                <NavItem>
                <NavLink to={item.layout + item.path} tag={NavLinkRRD} onClick={() => setOpen(!open)}>
                <span style={{ backgroundColor: 'rgb(255, 255, 255)', boxShadow: '5px 5px 10px rgba(163,177,198,0.5), -5px -5px 10px rgba(255, 255, 255, 0.6)', padding: '15px', display: 'inline-block', paddingRight: '52px', borderRadius: '10px' }}>
  <div style={{ backgroundColor: '#fc3c30', padding: '10px', borderRadius: '10px', display: 'inline-block' }}>
    { item.icon && <i className={item.icon}></i> }
  </div>
  <div style={{ marginLeft: '10px' }}>
    {item.name}
  </div>
</span>

                    

                    {/* <i  onClick={() => setOpen(!open)}></i> */}
                </NavLink>
                </NavItem>
                <div>
                    { item.childrens.map((child, index) => <SidebarItem key={index} item={child} />) }
                </div>
            </div>
        )
    }else{
        return (
            <NavItem>
            <NavLink to={item.layout + item.path} tag={NavLinkRRD}>
                {/* {item.name} */}
                <span className="icon-style">
                    { item.icon && <i className={item.icon}></i> }
                    </span>  
                    {item.name}    
            </NavLink>
            </NavItem>
        );
    }
}

export default SidebarItem;
