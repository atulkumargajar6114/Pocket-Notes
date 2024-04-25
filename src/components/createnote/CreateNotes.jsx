import React,{useState,useEffect, useRef} from 'react'
import styles from './CreateNotes.module.css';
import vector from '../../assets/Vector (2).png';
function CreateNotes({selectedGroup}) {
  const [notes,setNotes]=useState([]);
  const [newNote,setNewNote]=useState('');
  const notesContainerRef=useRef(null);
  useEffect(()=>{
    const storedNote=JSON.parse(localStorage.getItem('Notes'))??[];
    setNotes(storedNote);
  },[])

  useEffect(()=>{
    if(notesContainerRef.current){
      const height=notesContainerRef.current.scrollHeight;
      notesContainerRef.current.style.height=`${height}px`;
    }
  },[notes])
  const handleSaveNote=(Note)=>{
    const updatedNotes=[...notes,{...Note,groupid:selectedGroup.name}];
    localStorage.setItem('Notes',JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
  }
  const handleClickNote=()=>{
    const trimmedNote=newNote.trim();
    if(!trimmedNote){
      return;
    }
    let dateOptions={
      year:'numeric',
      month:'short',
      day:'numeric'
    }
    let timeOptions={
      hour:'numeric',
      minute:'2-digit',
      hour12:true
    }
    const newNotes={
      content:newNote,
      date:new Date().toLocaleString('en-GB',dateOptions),
      time:new Date().toLocaleTimeString('en-US',timeOptions)
    }
    handleSaveNote(newNotes);
    setNewNote('');
  }
  const selectedGroupNotes=notes.filter((note)=>note.groupid===selectedGroup.name);
  return (
    <div>
      <div className={styles.header}>
      <button className={styles.groupcolor} style={{backgroundColor:selectedGroup.color}}>{selectedGroup.name.slice(0,2)}
      </button>
      <span className={styles.heading}>{selectedGroup.name}</span>
      </div>
      <div className={styles.notesContainer} ref={notesContainerRef} >
        {selectedGroupNotes.map((note,index)=>{
          return (<div key={index} className={styles.notes}>
            {note.content}
            <br/>
            <br />
            <span>{note.date} {note.time}</span>
          </div>)
        })}
      </div>
      <div className={styles.writenotes}>
        <input type="text" placeholder='Enter your text here...........' value={newNote} onChange={(e)=>{setNewNote(e.target.value)}}/>
        {newNote.trim()?(<img src={vector} alt="vector" className={styles.vector} onClick={handleClickNote}/>):(<img src={vector} alt="vector" className={styles.vector} onClick={handleClickNote} style={{ opacity: 0.5}}/>)}
      </div>
    </div>
  )
}

export default CreateNotes;