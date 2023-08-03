import React, { useState } from "react"

const SidebarItem = ({item}) =>{
    const [open, setOpen] = useState(false)

    console.log("item at sidebaritem ",item);
    
    if(item.childrens){
        return (
            <div className={open ? "sidebar-item open" : "sidebar-item"}>
                <div>
                    <span>
                        { item.icon && <i className={item.icon}></i> }
                        {item.name}    
                    </span> 
                    <i  onClick={() => setOpen(!open)}></i>
                </div>
                <div>
                    { item.childrens.map((child, index) => <SidebarItem key={index} item={child} />) }
                </div>
            </div>
        )
    }else{
        return (
            <a href={item.path || "#"}>
                { item.icon && <i className={item.icon}></i> }
                {item.name}
            </a>
        );
    }
}

export default SidebarItem;
