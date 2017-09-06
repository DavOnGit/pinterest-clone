import Users from 'meteor/vulcan:users';

const membersActions = [
  'stars.new',
  'stars.remove.own',
];
Users.groups.members.can(membersActions);

const adminActions = [
  'stars.remove.all'
];
Users.groups.admins.can(adminActions);
