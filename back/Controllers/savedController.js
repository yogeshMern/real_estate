const Save = require("../Model/Save");
const catchAsync = require("../Common/globalAsyncHandler");
const AppError = require("../Common/globalErrorHandler");

exports.getAllSavedProperties = catchAsync(async (req, res, next) => {
  const imgUrl = `${req.protocol}://${req.get("host")}/property_images/`;

  const data = await Save.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $project: { user: { password: 0, _id: 0, __v: 0 } },
    },
    {
      $unwind: "$user",
    },
    {
      $lookup: {
        from: "properties",
        localField: "property",
        foreignField: "_id",
        as: "property",
      },
    },
    {
      $addFields: {
        property: {
          $map: {
            input: "$property",
            as: "prop",
            in: {
              $mergeObjects: [
                "$$prop",
                { property_img: { $concat: [imgUrl, "$$prop.property_img"] } },
              ],
            },
          },
        },
      },
    },
    {
      $group: {
        _id: "$_id",
        user: { $push: "$user" },
        property: { $first: "$property" },
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    message: data.length
      ? "Saved Property fetched Successfully"
      : "Data not found!",
    data,
  });
});

// exports.saveProperty = catchAsync(async (req, res, next) => {
//   const { propertyId } = req.body;
//   const userId = req.user.userId; // Accessing the user ID from decoded token

//   if (!userId || !propertyId) {
//     return next(new AppError("userId or propertyId is missing!", 400));
//   }

//   try {
//     let savedDocument = await Save.findOne({ user: userId });

//     if (!savedDocument) {
//       savedDocument = await Save.create({
//         user: userId,
//         property: [propertyId],
//       });
//     } else {
//       savedDocument.property.push(propertyId);
//       savedDocument = await savedDocument.save();
//     }

//     res.status(201).json({
//       status: "success",
//       message: "Property saved successfully",
//       data: savedDocument,
//     });
//   } catch (error) {
//     return next(
//       new AppError("An error occurred while saving the property", 500)
//     );
//   }
// });

exports.saveProperty = catchAsync(async (req, res, next) => {
  const { propertyId } = req.body;
  const userId = req.user._id;

  console.log(propertyId, userId);

  if (!userId || !propertyId) {
    return next(new AppError("userId or propertyId is missing!", 400));
  }

  try {
    let savedDocument = await Save.findOne({ user: userId });

    if (!savedDocument) {
      savedDocument = await Save.create({
        user: userId,
        property: [propertyId],
      });
    } else {
      savedDocument.property.push(propertyId);
      savedDocument = await savedDocument.save();
    }

    res.status(201).json({
      status: "success",
      message: "Property saved successfully",
      data: savedDocument,
    });
  } catch (error) {
    return next(
      new AppError("An error occurred while saving the property", 500)
    );
  }
});

exports.removeSavedProperties = catchAsync(async (req, res, next) => {
  const _id = req.params.id;
  if (!_id) {
    return next(new AppError("Id is not defined!"), 400);
  }

  const data = await Save.deleteOne({ _id });
  res.status(200).json({
    success: true,
    message: "Saved property removed successfuly",
  });
});
