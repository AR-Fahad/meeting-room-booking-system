export type TRoom = {
  name: string;
  roomNo: number;
  floorNo: number;
  capacity: number;
  pricePerSlot: number;
  amenities: string[];
  image: string[];
  isDeleted?: boolean;
};

// Multiple Images, Room Name, Room No., Floor No., Capacity, Price Per Slot, Amenities.
