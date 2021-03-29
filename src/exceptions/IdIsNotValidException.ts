import HttpException from './HttpException';

class IdIsNotValidException extends HttpException {
  constructor(id: string) {
    super(404, `ID ${id} is invalid`);
  }
}
export default IdIsNotValidException;
