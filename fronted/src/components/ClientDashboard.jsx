import React, { useState, useEffect } from 'react';
import axios from 'axios';
import customerservise from '../customer/customerservise';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const ClientDashboard = () => {
  const navigate = useNavigate();
  const [timeslots, setTimeslots] = useState([]);
  const [clientBooking, setClientBooking] = useState({
    client_name: localStorage.getItem('name'),
    email: localStorage.getItem('email'),
    contact_number: localStorage.getItem('contact_number'),
    timeslotId: '',
  });

  const [clientSlot, setClientSlot] = useState([]);
  const [emailsearch, setEmailsearch] = useState('');
  const [updateTimeslot, setupdateTimeslot] = useState({});
  
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

  const handleBooking = async () => {
    try {
      await customerservise.handleBooking(clientBooking).then((res) => {
        if (res.status) {
          setTimeslots(res.data.timeslots);
        }
      })
    } catch (error) {
      console.error(error);
    }
  };

  const handleuserSlote = async() => {
    try {
      await customerservise.fetchuserSlote(emailsearch).then((res) => {
        if (res.status) {
          setClientSlot(res.data);
        }
      })
    } catch (error) {
      console.error(error);
    }
  }

  const cancelBooking = async(timeslotId, bookingId) => {
    try {
      await customerservise.cancelBooking(timeslotId, bookingId).then((res) => {
        if (res.status) {
          setClientSlot(clientSlot.filter((item) => item._id !== bookingId));
        }
      })
    } catch (error) {
      console.error(error);
    }
  };

  const updateSlote = (item, ids) => {
    setupdateTimeslot({
      id: item._id,
      date: item.date,
      start_time: item.start_time,
      end_time: item.end_time,
      parent_id: ids
    })
  }

  const updateSloteBooking = async () => {
    try {
      await customerservise.updateClientBookings(updateTimeslot).then((res) => {
        if (res.status) {
          setClientSlot(clientSlot.map((item) => {
            if (item.timeslot._id == res.data._id) {
              item.timeslot = res.data
            }
            return item;
          }));
          setupdateTimeslot({});
        }
      })
    } catch (error) {
      console.error(error);
    } 
  }
console.log("timeslots", timeslots)
  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-around', gap:50}}>
        <h1>Client Dashboard</h1>
        <button onClick={() => {
          localStorage.clear();
          navigate('/login');
        }} >logout</button>
      </div>
      <h2>Available Timeslots</h2>
      <ul>
        {timeslots.map((slot) => (
          <li key={slot._id}>
            <span>{moment(slot.date).format('YYYY-MM-DD')} | {slot.start_time} - {slot.end_time} </span>
            <div>
              {
                slot.Times && slot.Times.length > 0 && slot.Times.map((item, i) => {
                  return (
                    <div key={i}>
                      <input type="checkbox" name="checkbox" id="checkbox" disabled={!item.status} checked={item._id == clientBooking.timeslotId ? true : false} 
                        onClick={() => {
                          setClientBooking({ 
                            ...clientBooking, 
                            timeslotId: item._id 
                            })}} />
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
                  )
                })
              }
            </div>
          </li>
        ))}
      </ul>

      {clientBooking.timeslotId && (
        <div>
          <h2>Booking Details</h2>
          <input
            type="text"
            placeholder="Your Name"
            value={clientBooking.client_name}
            onChange={(e) => setClientBooking({ ...clientBooking, client_name: e.target.value })}
            disabled
          />
          <input
            type="email"
            placeholder="Your Email"
            value={clientBooking.email}
            onChange={(e) => setClientBooking({ ...clientBooking, email: e.target.value })}
            disabled
          />
          <input
            type="tel"
            value={clientBooking.contact_number}
            placeholder="Your Contact Number"
            onChange={(e) => setClientBooking({ ...clientBooking, contact_number: e.target.value })}
            disabled
          />
          <button onClick={handleBooking}>Confirm Booking</button>
        </div>
      )}
      <div>
          <h2>Find Your Booking Details</h2>
          <label htmlFor="email">enter your email </label>
          <input
            type="text"
            placeholder="Your email address"
            onChange={(e) => setEmailsearch(e.target.value)}
          />
          <button onClick={handleuserSlote}>Search</button>
        </div>
        <ul>
        {clientSlot && clientSlot.length > 0 && clientSlot.map((slot) => (
          <li key={slot._id}>
            {
              updateTimeslot.parent_id ==  slot._id? 
              <div>
                <input
                  type="date"
                  value={moment(updateTimeslot.date).format('YYYY-MM-DD')}
                  onChange={(e) => setupdateTimeslot({ ...updateTimeslot, date: e.target.value })}
                />
                <input
                  type="time"
                  value={updateTimeslot.start_time}
                  onChange={(e) => setupdateTimeslot({ ...updateTimeslot, start_time: e.target.value })}
                />
                <input
                  type="time"
                  value={updateTimeslot.end_time}
                  onChange={(e) => setupdateTimeslot({ ...updateTimeslot, end_time: e.target.value })}
                /> 

              </div>
              : 
                <span>
                {moment(slot.timeslot.date).format('YYYY-MM-DD')} | {slot.timeslot.start_time} - {slot.timeslot.end_time}
                </span>
            }
            {
              updateTimeslot.parent_id ==  slot._id ? 
                <button onClick={() => updateSloteBooking()}>update Booking</button> 
              :
                <button onClick={() => updateSlote(slot.timeslot, slot._id)}>update</button>
            }
            
            <button onClick={() => cancelBooking(slot.timeslot._id, slot._id)}>Cancel</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientDashboard;
