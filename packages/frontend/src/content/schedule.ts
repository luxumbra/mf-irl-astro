export type ScheduleEventType = {
	title: string;
	description: string;
	image: string;
	links: EventLinkType[];
	grouping: string;
	date: string;
};

export type EventLinkType = {
	title: string;
	url: string;
};

export const days: ScheduleEventType[] = [
	{
		title: "Buggies",
		description: "🏎️💨🌿 Jump into a buggy and hold on tight! Feel the wind in your hair as you tear through rugged terrains, conquer twists and turns, and embrace the thrill of the open road. It's a wild adventure that'll leave you grinning from ear to ear. So buckle up and get ready for an adrenaline-fueled ride you won't forget! 🏎️💨",
		image: "https://i.imgur.com/7KsN0Gr.png",
		links: [
			{
				title: "Buggy Safari",
				url: "https://www.google.com"
			}
		],
		grouping: "warmup",
		date: ""
	},
	{
		title: "Roman Amphitheater",
		description: "Step into history at the Roman Amphitheater in Pula! This ancient arena is a window into the past, where gladiators once battled and crowds roared with excitement. Immerse yourself in the grandeur of this iconic amphitheater as you explore its ancient corridors and witness the echoes of a bygone era. Feel the weight of history as you stand in the same arena where epic spectacles unfolded. From its majestic arches to its awe-inspiring architecture, the Roman Amphitheater in Pula is a must-visit destination for history buffs and adventurers alike. Unleash your imagination and transport yourself to a time of ancient glory at this remarkable archaeological marvel. 🏛️🔥",
		image: "https://i.imgur.com/P3opZw7.png",
		links: [
			{
				title: "Buggy Safari",
				url: "https://www.google.com"
			}
		],
		grouping: "warmup",
		date: ""
	},
	{
		title: "Rt Kamenjak",
		description: `
		🌿🌊 Get ready to discover the untouched beauty of Rt Kamenjak in Premantura! This coastal paradise is a nature lover's dream, boasting pristine beaches, crystal-clear waters, and breathtaking landscapes. Dive into the azure sea and explore vibrant underwater ecosystems. Hike along rugged trails that lead to dramatic cliffs, where panoramic views will leave you in awe. Rt Kamenjak is a haven for outdoor enthusiasts, offering opportunities for snorkeling, cycling, and even cliff jumping for the adventurous souls. With its untouched nature and tranquil atmosphere.

		Discover the authentic charm of *Safari Bar*, a hidden oasis nestled within the natural beauty of Rt Kamenjak in Premantura. This local gem invites you to escape the crowds and immerse yourself in a tranquil beachside setting. 🌿🌊🏖️`,
		image: "https://i.imgur.com/CEkDqZE.png",
		links: [
			{
				title: "Buggy Safari",
				url: "https://www.google.com"
			}
		],
		grouping: "warmup",
		date: ""
	},
	{
		title: "Beaches",
		description: `
		- Stoja Beach: A peaceful rocky beach on the Stoja Peninsula, offering untouched beauty and crystal-clear waters. Especially Galebove Stijene Beach: A hidden coastal gem with a secluded cove, located beneath impressive cliffs, offering privacy and rugged beauty.
		- Valkane Beach
		- Valsaline Beach
		- Ambrela Beach
		- Gortanova Bay
		- Saccorgiana Beach
		- Pješčana Uvala (Sandy Cove)
		- Verudela Beach is most popular. This popular pebble beach offers various water sports activities, such as kayaking, paddleboarding, scuba diving and snorkeling. There are several other lesser-known beaches in Pula worth exploring. Consider visiting Stoja Beach which are often less crowded and offer a more tranquil atmosphere. 🌊🏖️`,
		image: "https://i.imgur.com/HZT0ANK.png",
		links: [
			{
				title: "Search: Beaches in Pula",
				url: "https://duckduckgo.com/?q=beaches+in+pula+croatia&t=h_&ia=web"
			}
		],
		grouping: "warmup",
		date: ""
	},
	{
		title: "Go-Karts",
		description: `Get ready to rev up your engines and embrace the wild world of go-karts! 🏎️💨 This ain't your average joyride – we're talking heart-pounding, adrenaline-fueled action that'll leave you breathless. 🤘🏁 Whether you're a speed freak or a newbie, go-karting is the ultimate fusion of speed, community, and pure fun. So grab your helmet, join the movement, and unleash your inner speed demon. 🏎️💥`,
		image: "https://i.imgur.com/WQUU7dG.png",
		links: [{
			title: "Karting Arena Pula",
			url: "https://www.karting.hr/"
		}],
		grouping: "warmup",
		date: ""
	},
	{
		title: "Quad Bikes",
		description: `Picture yourself on a powerful quad bike, conquering rugged terrain and feeling the wind in your face (maybe not wind in August) It's an adrenaline-fueled escape into nature's playground. So, unleash your inner off-road warrior, embrace the freedom, and let the quad biking adventure begin! 🏍️💨🌲`,
		image: "https://i.imgur.com/6BWoxex.png",
		links: [
			{
				title: "Quad Bikes Trip Advisor",
				url: "https://www.tripadvisor.com/Attraction_Review-g4560105-d17511565-Reviews-Quad_Explorer_Tour-Stinjan_Istria.html"
			},
			{
				title: "Quad Explorer Tour",
				url: "https://hr.quadexplorertour.com/"
			}
		],
		grouping: "warmup",
		date: ""
	},
	{
		title: "Paintball",
		description: `Get ready to dive into the action-packed world of paintball! 🎨💥 It's time to suit up, grab your trusty marker, and let the battle begin. Paintball is not just a game—it's a thrilling side activity that will test your strategy, teamwork, and adrenaline tolerance. Engage in epic battles, dodge colorful splatters, and feel the rush of victory as you outsmart your opponents.  🎯🔴💪`,
		image: "https://i.imgur.com/k3GQuAU.png",
		links: [{
			title: "Paintballing Pula",
			url: "https://www.karting.hr/"
		}],
		grouping: "warmup",
		date: ""
	},
	{
		title: "Rock climbing",
		description: `Attention adventure seekers! Get ready for an exhilarating experience as you explore the breathtaking Vinkuran Cave Romane. 🧗‍♀️🕸️ Channel your inner adventurer and conquer the cave's walls, taking on the challenge of climbing through narrow passages and intricate rock formations. Discover hidden wonders and embrace the thrill of reaching new heights. Come in early morning to the crag. During the day the only part that is the shade is overhang. `,
		image: "https://i.imgur.com/XldJzKi.png",
		links: [
			{
				title: "Climbing in Pula",
				url: "https://www.thecrag.com/en/climbing/croatia/istrien/area/3027522510"
			}
		],
		grouping: "warmup",
		date: ""
	},
];
