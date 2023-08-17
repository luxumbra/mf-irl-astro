const isDev = process.env.NODE_ENV !== 'production';
if (!isDev) {
    process.chdir(__dirname);
}

require('dotenv').config();
const express = require('express');
const { DateTime } = require('luxon');
const { google } = require('googleapis');
const cors = require('cors');
const e = require('express');

const app = express();
const PORT = process.env.PORT || 8811;

const fnOptions = {
    GOOGLE_PRIVATE_KEY: process.env.private_key,
    GOOGLE_CLIENT_EMAIL: process.env.client_email,
    GOOGLE_PROJECT_NUMBER: process.env.project_number,
    GOOGLE_CALENDAR_ID: process.env.calendar_id,
    SCOPES: ["https://www.googleapis.com/auth/calendar"],
    client_email: process.env.client_email,
    private_key: process.env.private_key,
};

const corsOptions = {
    origin: isDev ? ['http://metafest.local:1188'] : [
        'https://metafest.wtf',
        'https://test.metafest.wtf',
    ],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));
app.use(express.json());

app.get('/events', async (req, res) => {
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
        const result = await calendar.events.list(
            {
                calendarId,
                // timeMin: new Date().toISOString(),
                singleEvents: true,
                orderBy: 'startTime',
            }
        );

        const events = result.data.items;
        console.log('events', events);
        res.status(200).json(events);
    } catch (err) {
        console.log('err', err);
        res.status(500).json({ error: err.toString() });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

