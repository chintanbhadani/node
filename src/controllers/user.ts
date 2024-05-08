import { Request, Response } from 'express';
import User, { UserModel } from '../models/user';
import { DEFAULT_MESSAGE, DEFAULT_MESSAGE_TYPE, STATUS_CODE } from '../utils/respose';
import { ONE } from '../utils/constant';
import { Op, Order, WhereOptions } from 'sequelize';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const payload = req.query;

    const limit = +(payload.limit as string),
      page = +((payload?.page as string) ?? ONE),
      search = payload.search,
      orderFieldName = payload.orderFieldName as string,
      orderBy = payload.orderBy as string,
      isActive = payload.isActive === 'true' ? true : false,
      offset = ((page ?? ONE) - ONE) * (limit ?? ONE);

    let whereOption: WhereOptions<UserModel> | undefined,
      orderValue: Order = [['questionId', 'DESC']],
      limitValue: number | undefined,
      offsetValue: number | undefined;

    if (search) {
      whereOption = {
        ...whereOption,
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            email: {
              [Op.like]: `%${search}%`,
            },
          },
        ],
      };
    }

    if (orderFieldName && orderBy) {
      orderValue = [[orderFieldName, orderBy]];
    }

    if (page && limit) {
      limitValue = limit;
      offsetValue = offset;
    }

    const users = await User.findAll({
      where: whereOption,
      limit: limitValue,
      offset: offsetValue,
      order: orderValue,
      paranoid: false,
    });

    const total = await User.count({ where: whereOption });

    const metaData = {
      total,
      page,
      limit: offsetValue,
    };

    return res.status(STATUS_CODE.OK).json({
      status: STATUS_CODE.OK,
      success: true,
      message: DEFAULT_MESSAGE('User', DEFAULT_MESSAGE_TYPE.GET),
      data: users,
      metaData,
    });
  } catch (error) {
    return res.sendError(error, 'getAllUser');
  }
};
