import mongoose from 'mongoose';
import { AppError } from '../../errors/AppError';
import { Room } from '../room/room.model';
import { Slot } from '../slot/slot.model';
import { User } from '../user/user.model';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';

const createBooking = async (payload: TBooking) => {
  // session needed because if user is confirmed then slots booked will update
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const isRoomExists = await Room.findOne({
      _id: payload.room,
      isDeleted: false,
    });

    // checking is room exists or not in the database, if it was softly deleted then also return error
    if (!isRoomExists) {
      throw new AppError(400, 'room', 'Room is not exists');
    }

    // find user by user come from body
    const isUserExists = await User.findOne({
      _id: payload?.user,
    });

    // checking whether user is exists or not
    if (!isUserExists) {
      throw new AppError(400, 'user', 'User is not exists');
    }

    // checking whether slots array is empty or not
    if (!payload?.slots?.length) {
      throw new AppError(
        400,
        'slots',
        "Slots can't be blank, minimum one slot needed",
      );
    }

    const isSlotsExists = await Slot.find({
      _id: { $in: payload?.slots },
      isBooked: false,
      room: payload?.room,
    });

    // checking the lengths of isSlotsExists & slots come from body that slots are valid or not
    if (isSlotsExists?.length !== payload?.slots?.length) {
      throw new AppError(
        400,
        'slots',
        'One or more slots are invalid or not available',
      );
    }

    // only for confirmed booking, isBooked will update to true
    if (payload?.isConfirmed === 'confirmed') {
      await Slot.updateMany(
        { _id: { $in: payload?.slots } },
        { isBooked: true },
        { new: true },
      ).session(session);
    }

    delete payload?.totalAmount;

    // totalAmount is calculated in server like below
    const totalAmount = isRoomExists?.pricePerSlot * payload?.slots?.length;

    // create booking
    const booking = await Booking.create([{ ...payload, totalAmount }], {
      session,
    });

    // if everything is okay then commit and end the session
    await session.commitTransaction();
    await session.endSession();

    // for showcasing the result with populate
    const result = await Booking.findById(booking[0]?._id)
      .populate('slots')
      .populate('room')
      .populate('user');

    return result;
  } catch (err: any) {
    // if any error then abort & end session
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(err?.statusCode, err?.path, err?.message);
  }
};

const getAllBookings = async () => {
  const result = await Booking.find()
    .populate('slots')
    .populate('room')
    .populate('user');
  return result;
};

const updateBooking = async (id: string, payload: Partial<TBooking>) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // admin can only update confirmation
    const { isConfirmed } = payload;

    const result = await Booking.findByIdAndUpdate(
      id,
      { isConfirmed },
      {
        new: true,
        session,
      },
    );

    // check whether result is found or not for update
    if (!result) {
      throw new AppError(404, '_id', 'Booking is not found for update');
    }

    // check isConfirmed value, base on its value update slots as well
    if (isConfirmed === 'confirmed') {
      await Slot.updateMany(
        {
          _id: { $in: result?.slots },
          room: result?.room,
        },
        { isBooked: true },
        { new: true },
      ).session(session);
    }

    if (isConfirmed === 'canceled' || isConfirmed === 'unconfirmed') {
      await Slot.updateMany(
        {
          _id: { $in: result?.slots },
          room: result?.room,
        },
        { isBooked: false },
        { new: true },
      ).session(session);
    }

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(err?.statusCode, err?.path, err?.message);
  }
};

const deleteBooking = async (id: string) => {
  const result = await Booking.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  // check whether result is found or not for delete
  if (!result) {
    throw new AppError(404, '_id', 'Booking is not found for delete');
  }

  return result;
};

export const BookingServices = {
  createBooking,
  getAllBookings,
  updateBooking,
  deleteBooking,
};
