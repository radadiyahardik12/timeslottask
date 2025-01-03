
import Timeslot from '../Modal/timeslotes.js';
import Booking from '../Modal/bookinglist.js';
import Maintimes from '../Modal/maintimes.js';


export const createBooking = async (req, res) => {
  
  try {
    const { timeslotId, client_name, email, contact_number } = req.body;
    const timeslot = await Timeslot.findById(timeslotId);
  
    if (!timeslot || timeslot.bookings.length >= timeslot.max_bookings) {
      return res.status(200).json({ status : 0, data : [], message: 'Timeslot unavailable or full' });
    }
  
    const newBooking = new Booking({
      client_name,
      email,
      contact_number,
      timeslot: timeslotId,
    });
  
    await newBooking.save();
    timeslot.bookings.push(newBooking._id);
    timeslot.booked = (timeslot.booked || 0) + 1;
    timeslot.status = timeslot.booked >= timeslot.max_bookings  ? false : true  
    await timeslot.save();
    const timeslots = await Maintimes.find().populate('Times');
    
    
  
    res.status(200).json({ status : 1, data : {newBooking, timeslots }, message: 'booking successful' });
  } catch (error) {
    res.status(500).json({massage : error.message, status : 0, data : []}); 
  }
    
  };
  
  export const getClientBookings = async (req, res) => {
    try {
      const bookings = await Booking.find({ email: req.body.email }).populate('timeslot');
      res.status(200).json({ status : 1, data : bookings, message: 'data found' });
    } catch (error) {
      res.status(500).json({massage : error.message, status : 0, data : []}); 
    }
  };

  export const clientBookingCancel = async (req, res) => {
    try {
      const { timeslotId, bookingId } = req.body;

      const timeslot = await Timeslot.findById(timeslotId);
      await Booking.findByIdAndDelete(bookingId);
  
      timeslot.bookings.filter(id => id != bookingId);
      timeslot.booked = (timeslot.booked || 0) - 1;
      timeslot.status = timeslot.booked >= timeslot.max_bookings  ? false : true
      await timeslot.save();
  
      res.status(200).json({ status : 1, data : [], message: 'booking cancel successful' });
    } catch (error) {
      res.status(500).json({massage : error.message, status : 0, data : []}); 
    }
  };

  export const updateClientBookings = async (req, res) => {
    const {id, date, start_time, end_time } = req.body;
        try {
          const edittime = await Timeslot.findOne({ _id : id });
          if (!edittime) {
            return res.status(200).json({status:0, message: "booking not found" });
          }
          const booktimeEdit = await Timeslot.findByIdAndUpdate(id, { date, start_time, end_time}, {new : true})
          res.status(200).json({status: 1, message: "booking updated", data : booktimeEdit });
        } catch (error) {
          res.status(500).json({massage : error.message, status : 0, data : []});
        }
  };