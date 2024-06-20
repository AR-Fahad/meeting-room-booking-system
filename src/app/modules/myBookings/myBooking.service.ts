import { JwtPayload } from 'jsonwebtoken';
import { User } from '../user/user.model';
import { AppError } from '../../errors/AppError';
import { Booking } from '../booking/booking.model';

const getMyBookings = async (user: JwtPayload) => {
  // destructuring email from authenticated user
  const { email } = user;

  // find user by email
  const isUserExists = await User.findOne({ email });

  // check whether user is exists or not
  if (!isUserExists) {
    throw new AppError(401, 'user', 'You have no access to this route');
  }

  // get user bookings
  const myBookings = await Booking.find({ user: isUserExists._id })
    .populate('slots')
    .populate('room')
    .select('-user');

  return myBookings;
};

export const MyBookingsServices = {
  getMyBookings,
};
