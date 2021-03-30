import HttpException from './HttpException';

class TagExistedException extends HttpException {
  constructor(name: string) {
    super(409, `Tag ${name} existed`);
  }
}
export default TagExistedException;
