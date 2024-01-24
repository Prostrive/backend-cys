import { Translate } from '@google-cloud/translate/build/src/v2';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleTranslateService {
  private readonly translator: Translate;
  constructor() {
    this.translator = new Translate({
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID.toString(),
      credentials: {
        private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY.split(
          String.raw`\n`,
        ).join('\n'),
        client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL.toString(),
      },
    });
  }

  async translate(text: string, language: string) {
    try {
      const [translation] = await this.translator.translate(text, language);
      return translation;
    } catch (error) {
      console.error(`Error translating text: ${error}`);
      throw new Error(`Error translating text: ${error}`);
    }
  }
}
