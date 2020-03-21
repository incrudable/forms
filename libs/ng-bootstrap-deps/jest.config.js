module.exports = {
  name: 'ng-bootstrap-deps',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/ng-bootstrap-deps',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
