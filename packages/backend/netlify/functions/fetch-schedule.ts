import axios from 'axios';
import { DateTime } from 'luxon';
import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { google } from 'googleapis';
require('dotenv').config();

export const fnOptions = {
    GOOGLE_PRIVATE_KEY: process.env.private_key,
    GOOGLE_CLIENT_EMAIL: process.env.client_email,
    GOOGLE_PROJECT_NUMBER: process.env.project_number,
    GOOGLE_CALENDAR_ID: process.env.calendar_id,
    SCOPES: ["https://www.googleapis.com/auth/calendar"],
    client_email: process.env.client_email,
    private_key: process.env.private_key,
};

async function getScheduleDataFromGoogleCalendar(): Promise<any> {

    const today = DateTime.now();
    const aBitEarlierThanNow = today.minus({ hours: 0.5 }).toISO();
    const next2Days = today.plus({ days: 2 }).toISO();

}

const handler: Handler = async (event, context) => {
    const calId = fnOptions.GOOGLE_CALENDAR_ID;
    const calendarId = `${calId}@group.calendar.google.com`;

    const auth = new google.auth.JWT(
        fnOptions.client_email,
        null,
        fnOptions.private_key,
        ['https://www.googleapis.com/auth/calendar.readonly']
    );

    const calendar = google.calendar({ version: 'v3', auth });

    try {
        const res = await calendar.events.list(
            {
                calendarId,
                timeMin: new Date().toISOString(),
                // maxResults: 10,
                singleEvents: true,
                orderBy: 'startTime',
            }
        );

        const events = res.data.items;

        return {
            statusCode: 200,
            body: JSON.stringify(events),
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.toString() }),
        };
    }
};

export { handler };
