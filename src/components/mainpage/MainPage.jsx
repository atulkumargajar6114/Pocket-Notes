import React, { useEffect, useRef, useState } from 'react'
import styles from './MainPage.module.css'
import CreateGroup from '../creategroup/CreateGroup';
import CreateNotes from '../createnote/CreateNotes';
import bg from '../../assets/image-removebg-preview 1.png'

const MainPage = () => {
  const [showComponent,setShowComponent]=useState(false);
  const [groups,setGroups]=useState([]);
  const [selectedGroup,setSelectedGroup]=useState(null);
  const groupsConatinerRef=useRef(null);

  useEffect(()=>{
    const storedGroup=JSON.parse(localStorage.getItem('groups'))??[];
    setGroups(storedGroup);
  },[])

  useEffect(()=>{
    if(groupsConatinerRef.current){
      const height=groupsConatinerRef.current.scrollHeight;
      groupsConatinerRef.current.style.height=`${height}px`;
    }
  },[groups])
  

  const handleSaveGroup=(groupData)=>{
    const updatedGroups=[...groups,groupData];
    localStorage.setItem('groups',JSON.stringify(updatedGroups));
    setGroups(updatedGroups);
  }
  
  const handleGroupClick=(group)=>{
    setSelectedGroup(group);
    
  }
  const handleClick=()=>{
    setShowComponent(!showComponent);
  }
  return (
    <div className={styles.page}>
      <div className={`${styles.left} `}>
        <h1>Pocket Notes</h1>
        <button onClick={handleClick}>+</button>
        {showComponent && <CreateGroup onSave={handleSaveGroup}/>}
        <div className={styles.groupscontainer} ref={groupsConatinerRef}>
          {groups.map((group,index)=>{
            return <div key={index} onClick={()=>{handleGroupClick(group)}}>
              <button className={styles.groupcolor} style={{backgroundColor:group.color}}>{group.name.slice(0,2)}</button>
              <span>{group.name}</span>
            </div>
          })}
        </div>
      </div>
      <div className={`${styles.right} `}>
        {selectedGroup && <CreateNotes selectedGroup={selectedGroup}/>}
        {!selectedGroup && (<>
          <img className={styles.bg} src={bg} alt="bgimage" />
          <div className={styles.bgcontent}>
          <h1>Pocket Notes</h1>
          <p>Send and receive messages without keeping your phone online.<br/>
            Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
          </div>
        </>)}
      </div>
    </div>
  )
}

export default MainPage;