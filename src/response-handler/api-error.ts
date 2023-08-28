export class ApiError {
  message: string;
  code: number;
  constructor(code: number, message: string) {
    this.message = message;
    this.code = code;
  }
  static BadRequest(message: string) {
    return new ApiError(400, message);
  }
  static UnAuthorized(message: string) {
    return new ApiError(401, message);
  }
  static Forbidden(message: string) {
    return new ApiError(403, message);
  }
  static NotFound(message: string) {
    return new ApiError(404, message);
  }
  static Conflict(message: string) {
    return new ApiError(409, message);
  }
  static Internal(message: string) {
    return new ApiError(500, message);
  }
}
