const positions = {

			left: '_ _                   π₯π₯π₯\n_ _                   π΄οΈ\n      \n_ _                         β½',

			middle: '_ _                   π₯π₯π₯\n_ _                        π΄οΈ\n      \n_ _                         β½',

			right: '_ _                   π₯π₯π₯\n_ _                              π΄οΈ\n      \n_ _                         β½',

		};

		let randomized = Math.floor(Math.random() * Object.keys(positions).length);

		let gameEnded = false;

		let randomPos = positions[Object.keys(positions)[randomized]];

		const componentsArray = [

			{

				type: 1,

				components: [

					{

						type: 2,

						style: 'SECONDARY',

						custom_id: 'left',

						label: 'Left',

					},

					{

						type: 2,

						style: 'PRIMARY',

						custom_id: 'middle',

						label: 'Middle',

					},

					{

						type: 2,

						style: 'SECONDARY',

						custom_id: 'right',

						label: 'Right',

					},

				],

			},

		];

		const msg = await message.channel.send(randomPos, {componentsArray}

		);

		function update() {

			randomized = Math.floor(Math.random() * Object.keys(positions).length);

			randomPos = positions[Object.keys(positions)[randomized]];

			msg.edit({

				content: randomPos,

				components: componentsArray,

			});

		}

		setInterval(() => {

			if(gameEnded == false) return update();

		}, 1000);

		const filter = button => {

			return button.user.id === message.author.id;

		};

		const button = await msg.awaitMessageComponent({ filter: filter, componentType: 'BUTTON', max: 1 });

		if(button.customId !== Object.keys(positions)[randomized]) {

			gameEnded = true;

			return button.reply({ content: 'KazandΔ±n!' });

		}

		else {

			gameEnded = true;

			return button.reply({ content: 'Kaybettin...' });

		}

	},

};