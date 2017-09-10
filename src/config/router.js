module.exports = [
    [/\/user(?:\/(\w+))?/, 'user?id=:1', 'rest'],
    [/\/post(?:\/(\w+))?/, 'post?id=:1', 'rest'],
    [/\/login/, 'login', 'rest'],
    [/\/register/, 'register', 'rest'],
];
