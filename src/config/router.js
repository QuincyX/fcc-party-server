module.exports = [
  [/\/user\/login/, 'login', 'rest'],
  [/\/user\/logout/, 'logout', 'rest'],
  [/\/user(?:\/(\w+))?/, 'user?id=:1', 'rest'],
  [/\/post\/register/, 'post/register', 'rest'],
  [/\/post\/checkin/, 'post/checkin', 'rest'],
  [/\/post(?:\/(\w+))?/, 'post?id=:1', 'rest'],
  [/\/survey(?:\/(\w+))?/, 'survey?id=:1', 'rest']
]