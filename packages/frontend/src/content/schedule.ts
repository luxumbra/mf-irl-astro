export type ScheduleEventType = {
	title: string;
	description: string;
	image: string;
	links?: EventLinkType[];
	grouping: string;
	date?: string;
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
		links: [],
		grouping: "warmup",
		date: ""
	},
	{
		title: "Rt Kamenjak",
		description: `
		🌿🌊 Get ready to discover the untouched beauty of Rt Kamenjak in Premantura! This coastal paradise is a nature lover's dream, boasting pristine beaches, crystal-clear waters, and breathtaking landscapes. Dive into the azure sea and explore vibrant underwater ecosystems. Hike along rugged trails that lead to dramatic cliffs, where panoramic views will leave you in awe. Rt Kamenjak is a haven for outdoor enthusiasts, offering opportunities for snorkeling, cycling, and even cliff jumping for the adventurous souls. With its untouched nature and tranquil atmosphere.

		Discover the authentic charm of *Safari Bar*, a hidden oasis nestled within the natural beauty of Rt Kamenjak in Premantura. This local gem invites you to escape the crowds and immerse yourself in a tranquil beachside setting. 🌿🌊🏖️`,
		image: "https://i.imgur.com/CEkDqZE.png",
		links: [],
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
	{
		title: "Scuba Diving",
		description: `Gear up and get ready for an awe-inspiring underwater adventure with scuba diving! 🐠🌊 Immerse yourself in a vibrant world beneath the waves, surrounded by colorful coral reefs and fascinating marine life. Explore hidden treasures, glide through the crystal-clear waters, and witness the beauty of nature firsthand.  🤿🔆🦈`,
		image: "https://i.imgur.com/9Xe66Iz.jpg",
		links: [
			{
				title: "Diving Pula",
				url: "https://www.diving-pula.com/"
			},
			{
				title: "Hippocampus",
				url: "https://www.hippocampus.hr/"
			}
		],
		grouping: "warmup",
		date: ""
	},
	{
		title: "Jet Skiing",
		description: `Get ready for an exhilarating aquatic adventure with jet skiing! 🌊🚀 Feel the thrill as you zoom across the water. It's the perfect side activity for water enthusiasts. So, gear up and let the waves be your playground. 🌊💨🤙`,
		image: "https://i.imgur.com/Sdwj2ue.jpg",
		links: [
			{
				title: "Map",
				url: "https://goo.gl/maps/4Jom24TTYvys3x7x5"
			}
		],
		grouping: "warmup",
		date: ""
	},
	{
		title: "Aquarium Pula",
		description: `Embark on an enchanting underwater adventure at the Aquarium in Pula! 🐠🌊 Immerse yourself in the mesmerizing world of marine life, where vibrant colors and captivating creatures await. Discover a diverse array of aquatic wonders. It's an experience that will leave you awe-struck and inspired. 🐋🔆🐠`,
		image: "https://i.imgur.com/Bv5p80U.png",
		links: [
			{
				title: "Aquarium Pula",
				url: "https://aquarium.hr/hr"
			}
		],
		grouping: "warmup",
	},
	{
		title: "SUP & Kayak",
		description: `
		🌊🏄‍♀️🚣‍♂️ Get ready to dive into an epic aquatic escapade that will leave you stoked and craving more!

		First up, we've got SUP riding (that's Stand-Up Paddleboarding for the uninitiated). Picture yourself standing tall on a board, a paddle in your hands as you ride the waves, you'll feel the power of the ocean beneath your feet.

		But hey, if you're looking for a more hands-on adventure, grab a kayak and let's set sail! 🚣‍♂️ Glide through the crystal-clear sea, exploring hidden nooks, and crannies along the coast. The kayak becomes your trusty steed as you navigate through stunning cliffs, secret caves, and breathtakingly beautiful bays. It's a chance to connect with nature, embrace the tranquility, and uncover the hidden gems that the sea has to offer.

		Whether you choose SUP, kayak or *transparent lit kayak*, these side activities are more than just a fun way to cool off. They're an invitation to dive deeper, to embrace the natural wonders around us, and to connect with the power and beauty of the sea! 🌊🏄‍♀️🚣‍♂️`,
		image: "https://i.imgur.com/632KzKo.jpg",
		grouping: "warmup",
	},
	{
		title: "Brijuni",
		description: `Welcome to the Brijuni Islands, the paradise that once served as the summer residence of Josip Broz Tito, the visionary leader and former president of Yugoslavia! 🏝️🚢 Witness to the rich history of this extraordinary place. From Tito's former residence to the preserved safari park that houses exotic animals gifted to him by world leaders, the Brijuni Islands are a fascinating blend of natural beauty and a living testament to Tito's legacy. Discover the allure of this unique destination, where history and paradise intertwine. 🌴🏰🐾`,
		image: "https://i.imgur.com/Ti722IQ.jpg",
		links: [
			{
				title: "Brijuni National Park",
				url: "https://www.np-brijuni.hr/en"
			}
		],
		grouping: "warmup",
	},
	{
		title: "Pula Core",
		description: `
		Alright, let's take a stroll through the charming old town of Pula, where history comes alive and every corner tells a story! 🏰✨ Get ready to be transported to a bygone era as we explore the magnificent monuments that dot this enchanting landscape.

First, we have the Temple of Augustus, a beautifully preserved Roman temple dedicated to the first Roman Emperor. Marvel at the intricate details and elegant architecture that have withstood the test of time. It's a reminder of Pula's rich history and the cultural significance it held during the Roman era. 🏛️🌟

As we wander through the old town, we come across the Gate of Hercules, a magnificent triumphal arch that once welcomed visitors to the city. Its grandeur and symbolism will surely capture your imagination and ignite a sense of wonder. 🏰🦁

And let's not forget the Arch of the Sergii, a stunning Roman arch that stands proudly in the heart of the old town. Admire the intricate carvings and reliefs that depict ancient scenes, showcasing the skill and artistry of the time. It's a true gem that highlights Pula's rich architectural heritage. 🏛️🌺

Last but certainly not least, we have the Pula Cathedral, a majestic structure that dominates the skyline with its towering bell tower. Step inside to admire the breathtaking frescoes, ornate decorations, and the tranquil ambiance that surrounds this spiritual sanctuary. It's a peaceful retreat from the bustling streets and a place to reflect on the city's spiritual heritage. ⛪🌅

So, my fellow adventurers, are you ready to immerse yourselves in the history and charm of old town Pula?`,
		image: "https://i.imgur.com/EkhY5k1.jpg",
		grouping: "warmup",
	},
	{
		title: "Waterskiing",
		description: `Get ready to ride the waves and feel the thrill of water-skiing! 🌊🎿 It's an exhilarating adventure that combines the rush of speed with the refreshing embrace of the water. Strap on your skis, hold on tight, and let the excitement take over as you glide across the surface, defying gravity with each turn. It's an adrenaline-pumping experience that will leave you with unforgettable memories and a craving for more. So, are you ready to make a splash and conquer the waves with style and skill? ! 🌊🎿💦`,
		image: "https://i.imgur.com/h0yKOW5.jpg",
		links: [
			{
				title: "WakePark Pula",
				url: "https://www.wakeparkpula.com/"
			}
		],
		grouping: "warmup",
	},
	{
		title: "Adventure Park",
		description: `Get ready for an epic adventure at Glavani Adventure Park in Istria! 🌳🌟 From ziplining through the treetops to conquering challenging obstacle courses, this park is a playground for adventure seekers.  🌳🌟🔥`,
		image: "https://i.imgur.com/8jeDmGv.jpg",
		links: [
			{
				title: "Glavani Park",
				url: "https://www.glavanipark.com/"
			}
		],
		grouping: "warmup",
	},
	{
		title: "Day Trip to Venice",
		description: `🇮🇹🛥️🌊 Venice lies roughly six hours around the Gulf of Trieste from Pula, Croatia by rail. This tour saves you about 3 hours of travel time each way with a direct high-speed catamaran ride across the Adriatic Sea. After you disembark, take a guided tour of St. Mark’s Square and explore the city on your own. Travelers can opt for add-ons, such as guided rides along canals, a gondola ride, and water taxis. 🇮🇹🛥️🌊`,
		image: "https://i.imgur.com/TJftOzW.jpg",
		links: [
			{
				title: "Booking",
				url: "https://www.viator.com/tours/Pula/Venice-Day-Trip-from-Pula-by-High-Speed-Ferry/d22140-65220P3"
			}
		],
		grouping: "warmup"
	},
	{
		title: "Panoramic flight",
		description: `You can experience Medulin and its surroundings with panoramic flights.
		Enjoy the view of Cape Kamenjak, National Park Brijuni, the town of Pula and don't forget to take aerial photos of nature or coastal parts of Istria. 🌅🌳🌊`,
		image: "https://i.imgur.com/i4PZvbH.png",
		links: [
			{
				title: "Booking",
				url: "https://www.istra.hr/en/experience/sun-and-sea/entertainment-theme-parks/panoramic-flights"
			}
		],
		grouping: "warmup"
	},
	{
		title: "Nintendo Switch",
		description: ``,
		image: "https://i.imgur.com/RqwESP5.png",
		links: [
			{
				title: "Nintendo Switch",
				url: "https://www.nabava.net/konzole/nintendo-switch-cijena-36733531"
			}
		],
		grouping: "warmup"
	}
];
