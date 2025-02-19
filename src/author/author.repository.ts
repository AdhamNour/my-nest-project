import { Repository } from 'typeorm';
import { Author } from './author.entity';

export class AuthorRepository extends Repository<Author> {
  // Add your custom methods here
}
