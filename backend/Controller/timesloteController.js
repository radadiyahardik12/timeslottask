import TimeSlote from '../Modal/timeslotes.js';
import Maintimes from '../Modal/maintimes.js';
import moment from 'moment';

export const getTimeslots = async (req, res) => {
  try {
    const timeslots = await Maintimes.find().populate('Times');
    res.status(200).json({massage : "data found", status : 1, data : timeslots});
  } catch (error) {
    res.status(500).json({massage : error.message, status : 0, data : []});
  }
};

export const getSubTimeslots = async (req, res) => {
  try {
    const { id } = req.body;
    const timeslots = await TimeSlote.find({_id : id }).populate('bookings');
    res.status(200).json({massage : "data found", status : 1, data : timeslots});
  } catch (error) {
    res.status(500).json({massage : error.message, status : 0, data : []});
  }
};

export const createTimeslot = async (req, res) => {
  try {
    const { date, start_time, end_time, max_bookings } = req.body;
    const startTime = moment(start_time, 'HH:mm').format();
    const endTime = moment(end_time, 'HH:mm').format();
    const diff = new Date(endTime).getTime() - new Date(startTime).getTime();
    const gethours = Math.floor(diff / 1000 / 60 / 60)

    const newMainTimes = new Maintimes({
      date,
      start_time,
      end_time,
    })


    for (let index = 0; index < gethours; index++) {
      const newTimeSlot = new TimeSlote({
        date: moment(new Date(date)).format('YYYY-MM-DD'),
        start_time: moment(new Date(startTime)).add(index, 'hours').format('HH:mm'),
        end_time: moment(new Date(startTime)).add(index + 1, 'hours').format('HH:mm'),
        max_bookings,
      }); 
      await newTimeSlot.save();
      newMainTimes.Times.push(newTimeSlot._id);
      await newMainTimes.save();
      
    }
    const timeslots = await Maintimes.find().populate('Times');
   
    res.status(200).json({massage : "time slot added successfully", status : 1, data : {newMainTimes,timeslots}});
  } catch (error) {
    res.status(500).json({massage : error.message, status : 0, data : []});
  }
};

export const timeslotEdit = async (req, res) => {
  const {id, date, start_time, end_time, max_bookings } = req.body;
    try {
      const edittime = await TimeSlote.findOne({ _id : id });
      if (!edittime) {
        return res.status(200).json({status:0, message: "slote not found" });
      }
      const slottimeEdit = await TimeSlote.findByIdAndUpdate(id, { date, start_time, end_time, max_bookings}, {new : true})
      res.status(200).json({status: 1, message: "slote updated", data : slottimeEdit });
    } catch (error) {
      res.status(500).json({massage : error.message, status : 0, data : []});
    }
  }

  export const deleteTimeslot = async (req, res) => {
    const {id} = req.body;
    try {
      const deletetimeslot = await Maintimes.findOne({ _id : id });
      if (!deletetimeslot) {
        return res.status(200).json({status:0, message: "slote not found" });
      }
      await Maintimes.findByIdAndDelete(id);
      res.status(200).json({status: 1, message: "slote deleted", data : [] });
  
    } catch (error) {
      res.status(500).json({massage : error.message, status : 0, data : []});
    }
  }





