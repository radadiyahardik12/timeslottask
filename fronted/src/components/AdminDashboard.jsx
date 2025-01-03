import React, { useState, useEffect } from 'react';
import moment from 'moment';
import customerservise from '../customer/customerservise';

const AdminDashboard = () => {
  const [timeslots, setTimeslots] = useState([]);
  const [newTimeslot, setNewTimeslot] = useState({
    date: '',
    start_time: '',
    end_time: '',
    max_bookings: 5,
  });
  const [updateSlotToggle, setupdateSlotToggle] = useState(false);
  const [getsubSloteData, setgetsubSloteData] = useState({});

  useEffect(() => {
    const fetchTimeslots = async () => {
      try {
        await customerservise.fetchTimeslots().then((res) => {
          if (res.status) {
            setTimeslots(res.data);
          }
        })
      } catch (error) {
        console.error(error);
      }
    };
    fetchTimeslots();
    
  }, []);

  const createTimeslot = async () => {
    try {
      await customerservise.createTimeslot(newTimeslot).then((res) => {
        if (res.status) {
          setTimeslots(res.data.timeslots);
        }
      })
    } catch (error) {
      console.error(error);
    }
  };

  const updatehandle = (item) => {
    try {
      setNewTimeslot({
        date: item.date,
        start_time: item.start_time,
        end_time: item.end_time,
        max_bookings: item.max_bookings,
        _id: item._id
      });
      setupdateSlotToggle(true);
    } catch (error) {
      console.error(error);
    }
  }

  const updatetimeslot = async () => {
    try {
      await customerservise.editTimeslot(newTimeslot).then((res) => {
        if (res.status) {
          console.log("res", res);
          setTimeslots(timeslots.map((item) => item._id == newTimeslot._id? newTimeslot : item));
          setNewTimeslot({
            date: '',
            start_time: '',
            end_time: '',
            max_bookings: 5,
          });
          setupdateSlotToggle(false);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  const cancelupdatetimeslot = async () => {
    setNewTimeslot({
      date: '',
      start_time: '',
      end_time: '',
      max_bookings: 5,
    });
    setupdateSlotToggle(false);
  }

  const cancelSlotehandle = async (id) => {
    try {
      await customerservise.deleteTimeslot(id).then((res) => {
        if (res.status) {
          console.log("res", res)
          setTimeslots(timeslots.filter((item) => item._id !== id));
        }
      });
    } catch (error) {
      
    }
  }

  const getSubTimeslots = async (id) => {
    try {
      await customerservise.getSubTimeslots(id).then((res) => {
        if (res.status) {
          setgetsubSloteData(res.data[0]);
          console.log("res", res);
        }
      })
    } catch (error) {
      console.error(error);
    }
  }
  console.log("date", newTimeslot)
  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-around', gap:50}}>
        <h1>Admin Dashboard</h1>
        <button onClick={() => {
          localStorage.clear();
          navigate('/login');
        }} >logout</button>
      </div>
      <div>
        <h2>{updateSlotToggle ? "Update Timeslot" : "Create New Timeslot"}</h2>
        <input
          type="date"
          value={moment(newTimeslot.date).format('YYYY-MM-DD')}
          onChange={(e) => setNewTimeslot({ ...newTimeslot, date: e.target.value })}
        />
        <input
          type="time"
          value={newTimeslot.start_time}
          onChange={(e) => setNewTimeslot({ ...newTimeslot, start_time: e.target.value })}
        />
        <input
          type="time"
          value={newTimeslot.end_time}
          onChange={(e) => setNewTimeslot({ ...newTimeslot, end_time: e.target.value })}
        />
        <input
          type="number"
          value={newTimeslot.max_bookings}
          onChange={(e) => setNewTimeslot({ ...newTimeslot, max_bookings: e.target.value })}
        />
        {updateSlotToggle ? 
        <div>
          <button onClick={updatetimeslot}>update Timeslot</button>
          <button onClick={cancelupdatetimeslot}>cancel Update</button>
        </div>
        : 
        <button onClick={createTimeslot}>Create Timeslot</button>
        }
      </div>
      <div>
        <h2>Available Timeslots</h2>
        <ul>
           {timeslots.map((slot, i) => (
              <li key={slot._id} >
                <span>{moment(slot.date).format('YYYY-MM-DD')} | {slot.start_time} - {slot.end_time} </span>
                {/* <button onClick={() => updatehandle(slot)}>update</button> */}
                <button onClick={() => cancelSlotehandle(slot._id)}>Cancel</button>
                <div>
                  {
                    slot.Times && slot.Times.length > 0 && slot.Times.map((item, i) => {
                      return (
                        <div key={i}>
                          <div>
                            <input type="checkbox" name="checkbox" id="checkbox"  
                            checked={getsubSloteData._id ==item._id ? true : false} 
                            onClick={() => getSubTimeslots(item._id)} 
                            />
                            <span>
                              {item.start_time} - {item.end_time} -
                            </span>
                            { item.status ? 
                              <span>
                                Book Slot
                              </span>
                              :
                              <span disabled>
                                Book Slot full
                              </span>
                            }
                          </div>
                          <div >
                            {getsubSloteData._id ==item._id ?
                            getsubSloteData.bookings && getsubSloteData.bookings.length > 0  ?
                             getsubSloteData.bookings.map((sub, i) => {
                              return (
                                <div key={i} style={{display:'flex', justifyContent : 'flex-start'}}>
                                  <span>
                                    name : {sub.client_name},  contact number : {sub.contact_number},  email :{sub.email},  booking time : {moment(sub.booking_time).format('YYYY-MM-DD hh:mm a')}
                                  </span>
                                </div>
                              )
                            }) : <p>No Data</p> : <></>}
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
