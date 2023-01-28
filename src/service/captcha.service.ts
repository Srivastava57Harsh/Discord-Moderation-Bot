/// -------------------------------------------------------------------------------------- #
/// ** Captcha Service **
/// sends a captcha to the user and validates it
/// -------------------------------------------------------------------------------------- #
import { Message, AttachmentBuilder } from 'discord.js';
import { Captcha } from 'captcha-canvas';
import Logger from '../loaders/logger';
import { createBasicEmbed } from '../utils/messages';
import database from '../loaders/database';
import { INFO } from '../utils/constants';
import LoggerInstance from '../loaders/logger';

const captcha = new Captcha();

export async function captchaVerification(
  incomingMessage: Message,
  incomingUserId: string,
  dbCollection: string,
  isTest?: boolean,
) {
  captcha.async = true;
  captcha.addDecoy();
  captcha.drawTrace();
  captcha.drawCaptcha();

  const captchaImage = new AttachmentBuilder(await captcha.png);
  // console.log('captchaVerification', JSON.stringify(incomingUserId), JSON.stringify(process.env))
  if (isTest && incomingUserId.toString() === process.env.TEST_USER_ID) {
    try {
      await (await database())
        .collection(dbCollection)
        .updateOne({ userId: incomingUserId }, { $set: { wasTimedOut: false } });

      Logger.info('Captcha validation successful');
    } catch (err) {
      LoggerInstance.error(err);
    }
  } else {
    const cmsg = await incomingMessage.author.send({
      embeds: [createBasicEmbed(INFO.CAPTCHA(), 'INFO')],
      files: [captchaImage],
    });

    const filter = (collected: { author: { id: string } }) => collected.author.id === incomingMessage.author.id;
    await cmsg.channel
      .awaitMessages({
        filter,
        max: 1,
        time: 1000 * 150,
        errors: ['time'],
      })
      .then(async value => {
        const isValid = value.first().content == captcha.text;
        if (isValid) {
          Logger.info('Captcha validation successful');

          await (await database())
            .collection(dbCollection)
            .updateOne({ userId: incomingUserId }, { $set: { wasTimedOut: false } });
          return incomingMessage.author.send({ embeds: [createBasicEmbed(INFO.CAPTCHA_SUCCESS(), 'SUCCESS')] });
        }

        return incomingMessage.author.send({
          embeds: [
            createBasicEmbed(
              {
                title: 'Captcha Validation Failed',
                message: 'Try posting anything in the general channel of the server to regenerate the captcha',
              },
              'ERROR',
            ),
          ],
        });
      })

      .catch(err => {
        console.log(err);
      });
  }
}
