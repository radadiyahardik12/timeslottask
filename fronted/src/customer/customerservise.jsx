import { Api } from "./customerauth";

const WEB_API = "http://localhost:3000/api/";

const fetchTimeslots = () => {
    const form = new FormData();
    const endpoint = WEB_API + 'time/timeslots';
    console.log("endpoint", endpoint)
   return Api(form, endpoint);
}

const createTimeslot = (newTimeslot) => {
    const form = new FormData();
    const endpoint = WEB_API +  'time/create';

    console.log("endpoint", endpoint)

    form.append('start_time', newTimeslot.start_time);
    form.append('end_time', newTimeslot.end_time);
    form.append('date', newTimeslot.date);
    form.append('max_bookings', newTimeslot.max_bookings);
   return Api(form, endpoint);
}

const editTimeslot = (editTimeslot) => {
    const form = new FormData();
    const endpoint = WEB_API +  'time/timeslotEdit';

    console.log("endpoint", endpoint)
    form.append('id', editTimeslot._id);
    form.append('start_time', editTimeslot.start_time);
    form.append('end_time', editTimeslot.end_time);
    form.append('date', editTimeslot.date);
    form.append('max_bookings', editTimeslot.max_bookings);
   return Api(form, endpoint);
}

const deleteTimeslot = (id) => {
    const form = new FormData();
    const endpoint = WEB_API +  'time/timeslotsDelete';
    form.append('id', id);
   return Api(form, endpoint);
}

const handleBooking = (clientBooking) => {
     const form = new FormData();
    const endpoint = WEB_API +  'client/booking';

    console.log("endpoint", endpoint)

    form.append('client_name', clientBooking.client_name);
    form.append('email', clientBooking.email);
    form.append('contact_number', clientBooking.contact_number);
    form.append('timeslotId', clientBooking.timeslotId);
   return Api(form, endpoint);
}
const cancelBooking = (timeslotId, bookingId) => {
    const form = new FormData();
    const endpoint = WEB_API +  'client/bookings/cancel';
    console.log("endpoint", endpoint)
    form.append('timeslotId', timeslotId);
    form.append('bookingId', bookingId);
   return Api(form, endpoint);
}

const fetchuserSlote = (email) => {
    const form = new FormData();
    const endpoint = WEB_API +  'client/bookings/email';
    form.append('email', email);
   return Api(form, endpoint);
}

const updateClientBookings = (updateItem) => {
    const form = new FormData();
    const endpoint = WEB_API +  'client/bookings/update';
    console.log("endpoint", endpoint)
    form.append('id', updateItem.id);
    form.append('date', updateItem.date);
    form.append('start_time', updateItem.start_time);
    form.append('end_time', updateItem.end_time);
   return Api(form, endpoint);
}

const getSubTimeslots = (id) => {
    const form = new FormData();
    const endpoint = WEB_API +  'time/getSubTimeslots';
    form.append('id', id);
   return Api(form, endpoint);
}

export default {
    fetchTimeslots,
    createTimeslot,
    handleBooking,
    fetchuserSlote,
    cancelBooking,
    editTimeslot,
    deleteTimeslot,
    updateClientBookings,
    getSubTimeslots
}