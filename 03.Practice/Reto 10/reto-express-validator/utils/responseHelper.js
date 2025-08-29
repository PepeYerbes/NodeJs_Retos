export const sendSuccessResponse = (res, data, message = "Operación exitosa", status = 200) => {
  res.status(status).json({
    success: true,
    mensaje: message,
    data,
  });
};

export const sendErrorResponse = (res, errors, status = 400) => {
  res.status(status).json({
    success: false,
    errors,
  });
};