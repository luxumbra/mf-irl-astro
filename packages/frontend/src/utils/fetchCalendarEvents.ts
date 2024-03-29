import axios from 'axios';

const fetchCalendarData = async () => {
	try {
		const scheduleEndpoint = 'https://api.metafest.wtf/events';

		const response = await axios.get(scheduleEndpoint);

		if (response.status !== 200) {
			throw new Error('Error fetching data');
		}

		const data = await response.data;
		return {
			data
		};

	} catch (error) {
		console.log(error.message);
	}
}

export {
	fetchCalendarData
}
