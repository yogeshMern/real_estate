const Property = require("../Model/Property");
const catchAsync = require("../Common/globalAsyncHandler");
const AppError = require("../Common/globalErrorHandler");

exports.getAllProperty = catchAsync(async (req, res, next) => {
  let filter = {};

  if (req.query.location) {
    filter.location = req.query.location;
  }

  if (req.query.minPrice && req.query.maxPrice) {
    filter.price = { $gte: req.query.minPrice, $lte: req.query.maxPrice };
  } else if (req.query.minPrice) {
    filter.price = { $gte: req.query.minPrice };
  } else if (req.query.maxPrice) {
    filter.price = { $lte: req.query.maxPrice };
  }

  if (req.query.propertyType) {
    filter.property_type = req.query.propertyType;
  }

  if (req.query.name) {
    // filter.name = { $regex: req.query.name, $options: "1" };
    const escapedPattern = req.query.name.replace(
      /[-[\]{}()*+?.,\\^$|#\s]/g,
      "\\$&"
    );
    filter.name = { $regex: escapedPattern, $options: "i" };
  }

  const data = await Property.find(filter);

  const imgUrl = `${req.protocol}://${req.get("host")}/property_images/`;
  const propertyImages = data.map((property) => ({
    ...property.toObject(),
    property_img: `${imgUrl}${property.property_img}`,
  }));

  res.status(200).json({
    status: "success",
    message: propertyImages.length
      ? "Property fetched Successfully"
      : "Data not found!",
    length: propertyImages.length,
    data: propertyImages,
  });
});

exports.createProperty = catchAsync(async (req, res, next) => {
  const {
    name,
    price,
    description,
    location,
    property_diameter,
    property_type,
    agent_contact_number,
  } = req.body;
  const property_img = req.file ? req.file.filename : null;

  if (
    !name ||
    !price ||
    !description ||
    !location ||
    !property_diameter ||
    !property_img ||
    !property_type ||
    !agent_contact_number
  ) {
    return next(new AppError("All fields are required!"), 200);
  }

  const data = await Property.create({
    name,
    price,
    description,
    location,
    property_diameter,
    property_img,
    property_type,
    agent_contact_number,
  });

  res.status(201).json({
    success: true,
    message: "Product created successfuly!",
    data,
  });
});

exports.updatePropertyDetails = catchAsync(async (req, res, next) => {
  const _id = req.params.id;

  if (!_id) {
    return next(new AppError("Id is not defined!"), 400);
  }

  const data = await Property.findOneAndUpdate({ _id }, req.body, {
    new: true,
    runValidator: true,
  });

  res.status(200).json({
    status: "success",
    message: "Details Updated Successfully!",
    data,
  });
});

exports.removeProperty = catchAsync(async (req, res, next) => {
  const _id = req.params.id;
  if (!_id) {
    return next(new AppError("Id is not defined!"), 400);
  }

  const data = await Property.deleteOne({ _id });
  res.status(200).json({
    success: true,
    message: "Product Deleted successfuly!",
  });
});
