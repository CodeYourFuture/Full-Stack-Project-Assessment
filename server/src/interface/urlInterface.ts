import { IsNotEmpty, Matches } from 'class-validator';

const regexUrl =
  /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        

export class CreateUrlDto {
  @IsNotEmpty()
  title: string;

  @Matches(regexUrl)
  url: string;
}
