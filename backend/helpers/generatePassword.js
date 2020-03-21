exports.generatePassword = () => {
	const mask = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@[]{}/\\|%&*()#$&'
		.split('')
		.sort((a, b) => (Math.random() > 0.5 ? -1 : 1))
		.join('');
	let password = '';
	for (var i = 15; i > 0; --i) {
		password += mask[Math.round(Math.random() * (mask.length - 1))];
	}

	return password;
};
