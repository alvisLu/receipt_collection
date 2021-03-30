import HttpException from './HttpException';

class WrongQueryItemException extends HttpException {
  constructor() {
    super(404, 'Wrong query item');
  }
}
export default WrongQueryItemException;
