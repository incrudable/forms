module.exports = {
  name: 'demo-ng-bootstrap',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/demo-ng-bootstrap',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
