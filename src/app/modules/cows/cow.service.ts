import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helper/paginationHelper';
import { IGenericResponse } from '../../../intefaces/common';
import { IPaginationOPtion } from '../../../intefaces/pagination';
import { User } from '../user/user.model';
import { cowFilterableFields, cowSearchableFields } from './cow.constant';
import { ICow, ICowFilters } from './cow.interface';
import { Cow } from './cow.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const createCow = async (cow: ICow) => {
  // Check if the seller exists and has the required role
  const seller = await User.findOne({ _id: cow.seller, role: 'seller' });
  if (!seller) {
    throw new ApiError(httpStatus.NOT_FOUND,'Invalid seller!');
  }
  const result = await Cow.create(cow);
  return result;
};

const getCow = async (
  filters: ICowFilters,
  paginationOptions: IPaginationOPtion
): Promise<IGenericResponse<ICow[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
  paginationHelpers.calculatePagination(paginationOptions);
   
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: cowSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

//   if (Object.keys(filtersData).length) {
//     andConditions.push({
//       $and: Object.entries(filtersData).map(([field, value]) => ({
//         [field]: value,
//       })),
//     });
//   }
if (Object.keys(filtersData).length) {
    const filterConditions = Object.entries(filtersData).map(([field, value]) => {
      if (cowFilterableFields.includes(field)) {
        if (field === "location") {
          return {
            location: {
              $regex: value,
              $options: "i",
            },
          };
        }
        if (field === "minPrice") {
          return {
            price: {
              $gte: value,
            },
          };
        }
        if (field === "maxPrice") {
          return {
            price: {
              $lte: value,
            },
          };
        }
        // Handle additional fields and their corresponding conditions here
      }
      return {};
    });
    andConditions.push(...filterConditions);
  }
  


  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Cow.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Cow.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleCow = async (id: string) => {
  const result = await Cow.findById({ _id: id });
  return result;
};

const updateCow = async (payload: string, id: string) => {
  const result = await Cow.findByIdAndUpdate({ _id: id, payload });
  return result;
};

const deleteCow = async (id: string) => {
  const result = await Cow.findByIdAndDelete({ _id: id });
  return result;
};

export const CowService = {
  createCow,
  getCow,
  getSingleCow,
  updateCow,
  deleteCow,
};
