import axios from 'axios';
import { DateTime } from 'luxon';
import { Handler, HandlerEvent, Context } from '@netlify/functions';

async function getScheduleDataFromGoogleCalendar(): Promise<any> {
  const today = DateTime.now();
  const aBitEarlierThanNow = today.minus({ hours: 0.5 }).toISO();
  const next2Days = today.plus({ days: 2 }).toISO();
  const calUrl = `https://www.googleapis.com/calendar/v3/calendars/85ftetvc3cdl0qop7a36iguacc@group.calendar.google.com/events?key=AIzaSyDo07MSotIB3Q4ETlx_7yxVUB2YKU3MySs&maxResults=10&orderBy=startTime&singleEvents=true&timeMin=${aBitEarlierThanNow}&timeMax=${next2Days}`;

  try {
    const res = await axios.get(calUrl)

    const events = res.data.items.filter((item, i) => {
      if (item.status === 'confirmed' && !item.summary.includes('FREE') && item.description !== undefined) {
        return item
      }
    });
    return events;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error fetching calendar', error);
  }

}

const handler: Handler = async (event: HandlerEvent, context: Context) => {

  try {
    const events = await getScheduleDataFromGoogleCalendar();
    return {
      statusCode: 200,
      body: JSON.stringify(events),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  }

  // const speakerList = useRef([]);

  // const getSpeakers = useCallback(async () => {
  // 	try {
  // 		const res = await axios.get(calUrl)

  // 		const speakers = res.data.items.filter((item, i) => {
  // 			// const itemDate = new Date(item.start.dateTime);
  // 			// if (itemDate > aBitEarlierThanNow && itemDate < next2Days) {
  // 			if (item.status === 'confirmed' && !item.summary.includes('FREE') && item.description !== undefined) {
  // 				// if (!item.description.includes('<html-blob>')) {
  // 				// console.log('item', item.description);
  // 				return item
  // 			}
  // 			// }
  // 			// }
  // 		});
  // 		setGot(true);
  // 		if (speakerList.current) {
  // 			speakerList.current = speakers.length ? speakers : [];
  // 		}
  // 	} catch (error) {
  // 		// eslint-disable-next-line no-console
  // 		console.log('error fetching calendar', error);
  // 	}
  // }, [calUrl]);

  // useEffect(() => {
  // 	const resetGot = setInterval(() => {
  // 		setGot(false);
  // 	}, 1000);
  // 	if (!got) {
  // 		getSpeakers();
  // 	}

  // 	return () => {
  // 		clearInterval(resetGot);
  // 	}
  // }, [getSpeakers, got]);

  // if (speakerList.current.length === 0) {
  // 	return speakerList.current;
  // }
  // return []
};

export { handler }
