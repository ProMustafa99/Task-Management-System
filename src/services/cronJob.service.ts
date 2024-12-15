import Container from 'typedi';
import cron from 'node-cron';
import { EmailService } from '@services/ email.service';


export class CronJobService {    
    public  handlingEmail = Container.get(EmailService);

    public StartCron() {
        cron.schedule('59 * * * *', async () => {
            this.handlingEmail.SendEmailUsingCronJob("Hello");
        });
    }
}

